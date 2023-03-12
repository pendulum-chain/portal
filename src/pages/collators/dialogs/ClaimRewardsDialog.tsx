import type { Signer } from '@polkadot/types/types';
import { useCallback, useMemo, useState } from 'preact/hooks';
import { Button, Modal } from 'react-daisyui';
import { toast } from 'react-toastify';
import SuccessDialogIcon from '../../../assets/success-dialog';
import { CloseButton } from '../../../components/CloseButton';
import { useGlobalState } from '../../../GlobalStateProvider';
import { format, nativeToDecimal } from '../../../helpers/parseNumbers';
import { getErrors } from '../../../helpers/substrate';
import {
  ParachainStakingInflationInflationInfo,
  useStakingPallet,
} from '../../../hooks/staking/staking';
import { useNodeInfoState } from '../../../NodeInfoProvider';

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

function ClaimRewardsDialog(props: Props) {
  const { userRewardsBalance = '0', tokenSymbol, visible, onClose } = props;

  const { createClaimRewardExtrinsic } = useStakingPallet();
  const { api } = useNodeInfoState().state;
  const { walletAccount } = useGlobalState().state;
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<ClaimStep>(ClaimStep.Confirm);
  const amount = nativeToDecimal(userRewardsBalance);

  useMemo(() => {
    if (!visible)
      setTimeout(() => {
        setStep(ClaimStep.Confirm);
      }, 500);
  }, [visible]);

  const submitExtrinsic = useCallback(() => {
    if (!walletAccount || !api || !amount) return;

    const extrinsic = createClaimRewardExtrinsic(userRewardsBalance);

    extrinsic
      ?.signAndSend(
        walletAccount.address,
        { signer: walletAccount.signer as Signer },
        (result) => {
          const { status, events } = result;

          const errors = getErrors(events, api);
          if (status.isInBlock) {
            if (errors.length > 0) {
              const errorMessage = `Transaction failed with errors: ${errors.join(
                '\n',
              )}`;
              console.error(errorMessage);
              toast(errorMessage, { type: 'error' });
            }
          } else if (status.isFinalized) {
            setLoading(true);

            if (errors.length === 0) {
              setStep(ClaimStep.Success);
            }
          }
        },
      )
      .catch((error) => {
        console.error('Transaction submission failed', error);
        toast('Transaction submission failed', { type: 'error' });
        setLoading(false);
      });
  }, [
    walletAccount,
    api,
    amount,
    createClaimRewardExtrinsic,
    userRewardsBalance,
  ]);

  const content = useMemo(() => {
    switch (step) {
      case ClaimStep.Confirm:
        return (
          <div className="rounded-lg bg-base-200 flex flex-col p-8 items-center w-fit center m-auto">
            <p className="flex">Amount</p>
            <h1 className="flex text-4xl">
              {format(amount, tokenSymbol, true)}
            </h1>
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
  }, [amount, step, tokenSymbol]);

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
          submitExtrinsic();
        };
      case ClaimStep.Success:
        return onClose;
    }
  };

  return (
    <Modal open={visible}>
      <Modal.Header className="font-bold">Claim Rewards</Modal.Header>
      <CloseButton onClick={onClose} />
      <Modal.Body>
        <div className="mt-4" />
        {content}
      </Modal.Body>
      <Modal.Actions className="justify-center mt-10">
        <Button
          className="px-12 text-thin"
          color="primary"
          loading={loading}
          onClick={getButtonAction(step)}
          disabled={!walletAccount || amount <= 0}
        >
          {getButtonText(step)}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ClaimRewardsDialog;
