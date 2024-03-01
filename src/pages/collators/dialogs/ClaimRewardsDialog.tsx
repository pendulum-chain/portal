import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo, useState } from 'preact/hooks';
import { Button, Modal } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { useGlobalState } from '../../../GlobalStateProvider';
import { useNodeInfoState } from '../../../NodeInfoProvider';
import SuccessDialogIcon from '../../../assets/dialog-status-success';
import { CloseButton } from '../../../components/CloseButton';
import Amount from '../../../components/Form/Amount';
import { getErrors } from '../../../helpers/substrate';
import { ParachainStakingInflationInflationInfo, useStakingPallet } from '../../../hooks/staking/useStakingPallet';
import { nativeToDecimal } from '../../../shared/parseNumbers/metric';
import { getClaimingValidationSchema } from './ValidationSchema';
import { ToastMessage, showToast } from '../../../shared/showToast';

interface Props {
  userRewardsBalance?: string;
  inflationInfo?: ParachainStakingInflationInflationInfo;
  tokenSymbol?: string;
  visible?: boolean;
  onClose: () => void;
  onSubmit?: (amount: string) => void;
}

enum ClaimStep {
  Confirm = 0,
  Success = 1,
}

export type ClaimFormValues = {
  amount: number;
};

function ClaimRewardsDialog(props: Props) {
  const { userRewardsBalance = '0', visible, onClose } = props;
  const { createClaimRewardExtrinsic } = useStakingPallet();
  const { api } = useNodeInfoState().state;
  const { walletAccount } = useGlobalState();
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<ClaimStep>(ClaimStep.Confirm);
  const balance = nativeToDecimal(userRewardsBalance).toNumber();

  const form = useForm<ClaimFormValues>({
    resolver: yupResolver(getClaimingValidationSchema(balance)),
    defaultValues: {
      amount: parseFloat(balance.toFixed(2)),
    },
  });

  const { formState, register, setValue, getValues } = form;

  useMemo(() => {
    if (!visible)
      setTimeout(() => {
        setStep(ClaimStep.Confirm);
      }, 500);
  }, [visible]);

  const submitExtrinsic = useCallback(
    (selectedAmount: number) => {
      if (!walletAccount || !api || formState.errors.amount) return;

      setLoading(true);

      const extrinsic = createClaimRewardExtrinsic(selectedAmount.toString());

      extrinsic
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ?.signAndSend(walletAccount.address, { signer: walletAccount.signer as any }, (result) => {
          const { status, events } = result;

          const errors = getErrors(events, api);
          if (status.isInBlock) {
            if (errors.length > 0) {
              const errorMessage = `Transaction failed with errors: ${errors.join('\n')}`;
              showToast(ToastMessage.ERROR, errorMessage);
            }
          } else if (status.isFinalized) {
            setLoading(false);
            if (errors.length === 0) {
              setStep(ClaimStep.Success);
            }
          }
        })
        .catch((error) => {
          console.error('Transaction submission failed', error);
          showToast(ToastMessage.TX_SUBMISSION_FAILED);
          setLoading(false);
        });
    },
    [api, formState, createClaimRewardExtrinsic, walletAccount, setLoading, setStep],
  );

  const content = useMemo(() => {
    switch (step) {
      case ClaimStep.Confirm:
        return (
          <div className="rounded-lg flex flex-col items-center w-full">
            <form className="flex flex-col">
              <Amount
                register={register('amount')}
                max={nativeToDecimal(userRewardsBalance).toNumber()}
                setValue={(n: number) => setValue('amount', n)}
                error={formState.errors.amount?.message?.toString()}
              />
            </form>
          </div>
        );
      case ClaimStep.Success:
        return (
          <div className="flex flex-col items-center justify-between">
            <SuccessDialogIcon />
            <div className="mt-4" />
            <h2 className="text-xl">Rewards succesfully claimed!</h2>
          </div>
        );
    }
  }, [step, formState, register, setValue, userRewardsBalance]);

  const getButtonText = (step: ClaimStep) => {
    switch (step) {
      case ClaimStep.Confirm:
        return 'Claim';
      case ClaimStep.Success:
        return 'Ok';
    }
  };

  const getButtonAction = (step: ClaimStep) => {
    switch (step) {
      case ClaimStep.Confirm:
        return () => {
          submitExtrinsic(getValues().amount);
        };
      case ClaimStep.Success:
        return onClose;
    }
  };

  return (
    <Modal className="bg-base-200" open={visible}>
      <Modal.Header className="text-2xl claim-title">Claim Rewards</Modal.Header>
      <CloseButton onClick={onClose} />
      <Modal.Body>{content}</Modal.Body>
      <Modal.Actions className="justify-center">
        <Button color="primary" loading={loading} onClick={getButtonAction(step)} disabled={!walletAccount}>
          {getButtonText(step)}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ClaimRewardsDialog;
