import { useCallback, useMemo, useState } from 'preact/hooks';
import { useGlobalState } from '../../../GlobalStateProvider';
import { decimalToNative, nativeToDecimal } from '../../../helpers/parseNumbers';
import { ParachainStakingCandidate, useStakingPallet } from '../../../hooks/staking/staking';
import { useNodeInfoState } from '../../../NodeInfoProvider';
import ConfirmDelegateDialog from './ConfirmDelegateDialog';
import DelegateToCollatorDialog from './DelegateToCollatorDialog';
import DelegationSuccessfulDialog from './DelegationSuccessfulDialog';
import { doSubmitExtrinsic } from './helpers';

export type DelegationMode = 'joining' | 'delegatingMore' | 'undelegating';

interface ExecuteDelegationDialogsProps {
  userAvailableBalance: string;
  userStake?: string;
  selectedCandidate: ParachainStakingCandidate | undefined;
  mode: DelegationMode;
  onClose: () => void;
}

function ExecuteDelegationDialogs(props: ExecuteDelegationDialogsProps) {
  const { userAvailableBalance, userStake, selectedCandidate, mode, onClose } = props;

  const { api, tokenSymbol } = useNodeInfoState().state;
  const { walletAccount } = useGlobalState();

  const {
    inflationInfo,
    minDelegatorStake,
    createJoinDelegatorsExtrinsic,
    createDelegateMoreExtrinsic,
    createDelegateLessExtrinsic,
    createLeaveDelegatorsExtrinsic,
    fees,
  } = useStakingPallet();

  // Holds the amount that is to be delegated to the candidate
  const [delegationAmount, setDelegationAmount] = useState<string | undefined>(undefined);
  const [submissionPending, setSubmissionPending] = useState<boolean>(false);
  const [confirmationDialogVisible, setConfirmationDialogVisible] = useState<boolean>(false);
  const [undelegatingAll, setUndelegatingAll] = useState<boolean>(false);

  const totalFee = useMemo(() => {
    switch (mode) {
      case 'undelegating':
        return fees.delegatorStakeLess;
      case 'delegatingMore':
        return fees.delegatorStakeMore;
      case 'joining':
        return fees.joinDelegators;
    }
  }, [fees.delegatorStakeLess, fees.delegatorStakeMore, fees.joinDelegators, mode]);

  const submitExtrinsic = useCallback(() => {
    if (!walletAccount || !api || !delegationAmount || !selectedCandidate) {
      return;
    }

    const amount = decimalToNative(delegationAmount);

    const getExtrinsic = () => {
      if (mode === 'undelegating' && undelegatingAll) {
        return createLeaveDelegatorsExtrinsic();
      } else if (mode === 'undelegating') {
        return createDelegateLessExtrinsic(selectedCandidate.id, amount.toString());
      } else if (mode === 'delegatingMore') {
        return createDelegateMoreExtrinsic(selectedCandidate.id, amount.toString());
      } else if (mode === 'joining') {
        return createJoinDelegatorsExtrinsic(selectedCandidate.id, amount.toString());
      }
    };

    doSubmitExtrinsic(api, getExtrinsic(), walletAccount, setSubmissionPending, setConfirmationDialogVisible);
  }, [
    api,
    createLeaveDelegatorsExtrinsic,
    createDelegateLessExtrinsic,
    createDelegateMoreExtrinsic,
    createJoinDelegatorsExtrinsic,
    delegationAmount,
    mode,
    selectedCandidate,
    walletAccount,
  ]);

  return (
    <>
      <DelegateToCollatorDialog
        availableBalance={mode === 'undelegating' ? userStake : userAvailableBalance}
        collator={selectedCandidate}
        inflationInfo={inflationInfo}
        minDelegatorStake={minDelegatorStake}
        tokenSymbol={tokenSymbol || ''}
        mode={mode}
        visible={Boolean(selectedCandidate && !delegationAmount)}
        onClose={() => {
          setDelegationAmount(undefined);
          onClose();
        }}
        onSubmit={(amount) => {
          const userStakeAsString = nativeToDecimal(userStake || '0').toString();
          setDelegationAmount(amount);
          setUndelegatingAll(parseFloat(amount) === parseFloat(userStakeAsString));
        }}
      />
      <ConfirmDelegateDialog
        delegationAmountDecimal={delegationAmount}
        availableBalance={userAvailableBalance}
        transactionFee={totalFee}
        submissionPending={submissionPending}
        mode={mode}
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
        message={mode === 'undelegating' ? 'Successfully unbonded.' : 'Successfully delegated.'}
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
