import {
  ParachainStakingCandidate,
  useStakingPallet,
} from "../../../hooks/staking/staking";
import { useNodeInfoState } from "../../../NodeInfoProvider";
import { useGlobalState } from "../../../GlobalStateProvider";
import { useCallback, useMemo, useState } from "preact/hooks";
import { decimalToNative } from "../../../helpers/parseNumbers";
import { toast } from "react-toastify";
import DelegateToCollatorDialog from "./DelegateToCollatorDialog";
import ConfirmDelegateDialog from "./ConfirmDelegateDialog";
import DelegationSuccessfulDialog from "./DelegationSuccessfulDialog";
import { h } from "preact";
import { doSubmitExtrinsic } from "./helpers";

interface ExecuteDelegationDialogsProps {
  userAvailableBalance: string;
  userStake: string;
  selectedCandidate: ParachainStakingCandidate | undefined;
  isDelegatingMore?: boolean;
  isDelegatingLess?: boolean;
  onClose: () => void;
}


function ExecuteDelegationDialogs(props: ExecuteDelegationDialogsProps) {
  const {
    userAvailableBalance,
    userStake,
    selectedCandidate,
    isDelegatingMore = false,
    isDelegatingLess = false,
    onClose
  } = props;

  const { api, tokenSymbol } = useNodeInfoState().state;
  const { walletAccount } = useGlobalState().state;

  const {
    inflationInfo,
    minDelegatorStake,
    createJoinDelegatorsExtrinsic,
    createDelegateMoreExtrinsic,
    createDelegateLessExtrinsic,
    fees,
  } = useStakingPallet();

  // Holds the amount that is to be delegated to the candidate
  const [delegationAmount, setDelegationAmount] = useState<string | undefined>(
    undefined
  );
  const [submissionPending, setSubmissionPending] = useState<boolean>(false);
  const [confirmationDialogVisible, setConfirmationDialogVisible] =
    useState<boolean>(false);

  const totalFee = useMemo(() => {
    return isDelegatingLess ? fees.delegatorStakeLess :
      isDelegatingMore ? fees.delegatorStakeMore : fees.joinDelegators
  }, [isDelegatingMore, isDelegatingLess]);

  const submitExtrinsic = useCallback(() => {
    if (
      !walletAccount ||
      !api ||
      !delegationAmount ||
      !selectedCandidate
    ) {
      return;
    }

    const amount = decimalToNative(delegationAmount);

    const getExtrinsic = () => {
      if (isDelegatingLess) {
        return createDelegateLessExtrinsic(
          selectedCandidate.id,
          amount.toString());
      } else if (isDelegatingMore) {
        return createDelegateMoreExtrinsic(
          selectedCandidate.id,
          amount.toString());
      } else {
        return createJoinDelegatorsExtrinsic(
          selectedCandidate.id,
          amount.toString()
        );
      }
    }

    doSubmitExtrinsic(api, getExtrinsic(), walletAccount, setSubmissionPending, setConfirmationDialogVisible);
  }, [
    walletAccount, api, delegationAmount,
    selectedCandidate, isDelegatingMore,
    createJoinDelegatorsExtrinsic, createDelegateMoreExtrinsic
  ]);

  return (
    <>
      <DelegateToCollatorDialog
        availableBalance={isDelegatingLess ? userStake : userAvailableBalance}
        collator={selectedCandidate}
        inflationInfo={inflationInfo}
        minDelegatorStake={minDelegatorStake}
        tokenSymbol={tokenSymbol || ""}
        isDelegatingMore={isDelegatingMore}
        isDelegatingLess={isDelegatingLess}
        visible={Boolean(selectedCandidate && !delegationAmount)}
        onClose={() => {
          setDelegationAmount(undefined);
          onClose();
        }}
        onSubmit={(amount) => setDelegationAmount(amount)}
      />
      <ConfirmDelegateDialog
        delegationAmountDecimal={delegationAmount}
        availableBalance={userAvailableBalance}
        transactionFee={totalFee}
        submissionPending={submissionPending}
        isDelegatingMore={isDelegatingMore}
        isDelegatingLess={isDelegatingLess}
        onConfirm={submitExtrinsic}
        tokenSymbol={tokenSymbol}
        onCancel={() => setDelegationAmount(undefined)}
        onClose={() => {
          setDelegationAmount(undefined);
          onClose();
        }}
        visible={Boolean(selectedCandidate && delegationAmount)}
      />
      <DelegationSuccessfulDialog
        visible={confirmationDialogVisible}
        message={isDelegatingLess ? "Successfully unbonded." : "Successfully delegated."}
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
