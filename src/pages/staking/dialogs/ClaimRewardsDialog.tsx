import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo, useState } from 'react';
import { Button } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { useGlobalState } from '../../../GlobalStateProvider';
import { useNodeInfoState } from '../../../NodeInfoProvider';
import SuccessDialogIcon from '../../../assets/dialog-status-success';
import Amount from '../../../components/Form/Amount';
import { Dialog } from '../../../components/Dialog';
import { getErrors } from '../../../helpers/substrate';
import { ParachainStakingInflationInflationInfo, useStakingPallet } from '../../../hooks/staking/useStakingPallet';
import { nativeToDecimal } from '../../../shared/parseNumbers/metric';
import { ToastMessage, showToast } from '../../../shared/showToast';
import { getClaimingValidationSchema } from './ValidationSchema';

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
  const { userRewardsBalance = '0', visible = false, onClose } = props;
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
          <div className="flex flex-col items-center w-full rounded-lg">
            <form className="flex flex-col">
              <Amount
                fullMax={true}
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

  const actions = (
    <Button
      color="primary"
      loading={loading}
      onClick={getButtonAction(step)}
      disabled={!walletAccount || loading}
      className="w-full"
    >
      {getButtonText(step)}
    </Button>
  );

  const getHeaderText = (step: ClaimStep) => {
    switch (step) {
      case ClaimStep.Confirm:
        return 'Claim Rewards';
      case ClaimStep.Success:
        return '';
    }
  };

  return (
    <Dialog actions={actions} visible={visible} headerText={getHeaderText(step)} onClose={onClose} content={content} />
  );
}

export default ClaimRewardsDialog;
