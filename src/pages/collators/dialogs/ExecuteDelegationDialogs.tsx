import {
  ParachainStakingCandidate,
  useStakingPallet,
} from "../../../hooks/staking/staking";
import { useNodeInfoState } from "../../../NodeInfoProvider";
import { useGlobalState } from "../../../GlobalStateProvider";
import { useCallback, useState } from "preact/hooks";
import { decimalToNative } from "../../../helpers/parseNumbers";
import { getErrors } from "../../../helpers/substrate";
import { toast } from "react-toastify";
import DelegateToCollatorDialog from "./DelegateToCollatorDialog";
import ConfirmDelegateDialog from "./ConfirmDelegateDialog";
import DelegationSuccessfulDialog from "./DelegationSuccessfulDialog";
import { h } from "preact";

interface ExecuteDelegationDialogsProps {
  userAvailableBalance: string;
  selectedCandidateForDelegation: ParachainStakingCandidate | undefined;
  onClose: () => void;
}

function ExecuteDelegationDialogs(props: ExecuteDelegationDialogsProps) {
  const { userAvailableBalance, selectedCandidateForDelegation, onClose } =
    props;

  const { api, tokenSymbol } = useNodeInfoState().state;
  const { walletAccount } = useGlobalState().state;

  const {
    inflationInfo,
    minDelegatorStake,
    createJoinDelegatorsExtrinsic,
    joinDelegatorsTransactionFee,
  } = useStakingPallet();

  // Holds the amount that is to be delegated to the candidate
  const [delegationAmount, setDelegationAmount] = useState<string | undefined>(
    undefined
  );
  const [submissionPending, setSubmissionPending] = useState<boolean>(false);
  const [confirmationDialogVisible, setConfirmationDialogVisible] =
    useState<boolean>(false);

  const submitJoinDelegatorsExtrinsic = useCallback(() => {
    if (
      !walletAccount ||
      !api ||
      !delegationAmount ||
      !selectedCandidateForDelegation
    ) {
      return;
    }

    const amount = decimalToNative(delegationAmount);
    const joinDelegatorsExtrinsic = createJoinDelegatorsExtrinsic(
      selectedCandidateForDelegation.id,
      amount.toString()
    );

    setSubmissionPending(true);

    joinDelegatorsExtrinsic
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
            setSubmissionPending(false);

            if (errors.length === 0) {
              setConfirmationDialogVisible(true);
            }
          }
        }
      )
      .catch((error) => {
        console.error("Transaction submission failed", error);
        toast("Transaction submission failed", { type: "error" });
        setSubmissionPending(false);
      });
  }, [
    api,
    createJoinDelegatorsExtrinsic,
    delegationAmount,
    selectedCandidateForDelegation,
    walletAccount,
  ]);

  return (
    <>
      <DelegateToCollatorDialog
        availableBalance={userAvailableBalance}
        collator={selectedCandidateForDelegation}
        inflationInfo={inflationInfo}
        minDelegatorStake={minDelegatorStake}
        tokenSymbol={tokenSymbol || ""}
        visible={Boolean(selectedCandidateForDelegation && !delegationAmount)}
        onClose={onClose}
        onSubmit={(amount) => setDelegationAmount(amount)}
      />
      <ConfirmDelegateDialog
        delegationAmountDecimal={delegationAmount}
        availableBalance={userAvailableBalance}
        transactionFee={joinDelegatorsTransactionFee}
        submissionPending={submissionPending}
        onConfirm={submitJoinDelegatorsExtrinsic}
        onCancel={() => setDelegationAmount(undefined)}
        onClose={() => {
          setDelegationAmount(undefined);
          onClose();
        }}
        tokenSymbol={tokenSymbol || ""}
        visible={Boolean(selectedCandidateForDelegation && delegationAmount)}
      />
      <DelegationSuccessfulDialog
        visible={confirmationDialogVisible}
        onClose={() => {
          setConfirmationDialogVisible(false);
          onClose();
        }}
        onConfirm={() => {
          setConfirmationDialogVisible(false);
          onClose();
        }}
      />
    </>
  );
}

export default ExecuteDelegationDialogs;
