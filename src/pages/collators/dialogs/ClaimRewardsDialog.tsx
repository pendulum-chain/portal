import {
  ParachainStakingInflationInflationInfo, useStakingPallet,
} from "../../../hooks/staking/staking";
import { useCallback, useMemo, useState } from "preact/hooks";
import { nativeToDecimal, format } from "../../../helpers/parseNumbers";
import { Button, Modal } from "react-daisyui";
import LabelledInputField from "../../../components/LabelledInputField";
import { h } from "preact";
import SuccessDialogIcon from "../../../assets/success-dialog";
import { CloseButton } from "../../../components/CloseButton";
import { useGlobalState } from "../../../GlobalStateProvider";
import { useNodeInfoState } from "../../../NodeInfoProvider";
import { getErrors } from "../../../helpers/substrate";
import { toast } from "react-toastify";

interface Props {
  userRewardsBalance?: string;
  inflationInfo?: ParachainStakingInflationInflationInfo;
  tokenSymbol?: string;
  visible?: boolean;
  onClose: () => void;
  onSubmit?: (amount: string) => void;
}

enum ClaimStep {
  Start = 0,
  Confirm = 1,
  Success = 2
}

function ClaimRewardsDialog(props: Props) {
  const {
    userRewardsBalance = "0",
    tokenSymbol,
    visible,
    onClose,
  } = props;

  const { createClaimRewardExtrinsic } = useStakingPallet();
  const { api } = useNodeInfoState().state;
  const { walletAccount } = useGlobalState().state;
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [step, setStep] = useState<ClaimStep>(ClaimStep.Start);
  const available = nativeToDecimal(userRewardsBalance);
  const nextStep = step == ClaimStep.Success ? undefined : step + 1;

  useMemo(() => {
    if (!visible)
      setTimeout(() => {
        setStep(ClaimStep.Start)
        setAmount("")
      }, 500)
  }, [visible])


  const submitExtrinsic = useCallback(() => {
    if (!walletAccount || !api || !amount)
      return;

    const extrinsic = createClaimRewardExtrinsic(amount);

    extrinsic
      ?.signAndSend(
        walletAccount.address,
        { signer: walletAccount.signer as any },
        (result) => {
          const { status, events } = result;

          const errors = getErrors(events, api);
          if (status.isInBlock) {
            if (errors.length > 0) {
              const errorMessage = `Transaction failed with errors: ${errors.join(
                "\n"
              )}`;
              console.error(errorMessage);
              toast(errorMessage, { type: "error" });
            }
          } else if (status.isFinalized) {
            setLoading(true)

            if (errors.length === 0) {
              setStep(ClaimStep.Success)
            }
          }
        }
      )
      .catch((error) => {
        console.error("Transaction submission failed", error);
        toast("Transaction submission failed", { type: "error" });
        setLoading(false);
      });
  }, [api, amount, createClaimRewardExtrinsic,
    walletAccount, setLoading, setStep]);


  const getContentForStep = (step: ClaimStep) => {
    switch (step) {
      case ClaimStep.Start:
        return (
          <LabelledInputField
            type="number"
            value={available.toString()}
            onChange={setAmount}
            label="Amount"
            secondaryLabel={`Rewards Balance: ${format(available, tokenSymbol)}`}
            placeholder="Enter amount..."
            extraBtnText="Max"
            extraBtnAction={() => setAmount(available.toString())}
            disabled={true}
          />
        )
      case ClaimStep.Confirm:
        return (
          <div className="rounded-lg bg-base-200 flex flex-col p-8 items-center w-fit center m-auto">
            <p className="flex">Amount</p>
            <h1 className="flex text-4xl">{format(parseFloat(amount), tokenSymbol, true)}</h1>
          </div>
        )
      case ClaimStep.Success:
        return (
          <div className="flex flex-col items-center justify-between">
            <SuccessDialogIcon />
            <div className="mt-4" />
            <h2 className="text-xl">
              Rewards succesfully claimed!
            </h2>
          </div>)
    }
  }

  const getButtonText = (step: ClaimStep) => {
    switch (step) {
      case ClaimStep.Start:
        return "Claim"
      case ClaimStep.Confirm:
        return "Confirm"
      case ClaimStep.Success:
        return "Ok"
    }
  }

  const getButtonAction = (step: ClaimStep) => {
    switch (step) {
      case ClaimStep.Start:
        return () => setStep(ClaimStep.Confirm)
      case ClaimStep.Confirm:
        return () => {
          submitExtrinsic();
        }
      case ClaimStep.Success:
        return onClose
    }
  }


  return (
    <Modal open={visible}>
      <Modal.Header className="font-bold">Claim Rewards</Modal.Header>
      <CloseButton onClick={onClose} />
      <Modal.Body>
        <div className="mt-4" />
        {getContentForStep(step)}
      </Modal.Body>
      <Modal.Actions className="justify-center">
        <Button
          className="px-6 text-thin"
          color="primary"
          loading={loading}
          onClick={getButtonAction(step)}
        >
          {getButtonText(step)}
        </Button>
      </Modal.Actions>
    </Modal >
  );
}

export default ClaimRewardsDialog;
