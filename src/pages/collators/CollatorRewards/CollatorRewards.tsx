import { JSX, useCallback, useEffect, useMemo, useState } from 'preact/compat';
import { Signer } from '@polkadot/types/types';
import { ApiPromise } from '@polkadot/api';
import { StateUpdater } from 'preact/hooks';
import { BTreeMap } from '@polkadot/types-codec';

import { useGlobalState } from '../../../GlobalStateProvider';
import { useNodeInfoState } from '../../../NodeInfoProvider';
import { getAddressForFormat } from '../../../helpers/addressFormatter';
import { useStakingPallet } from '../../../hooks/staking/useStakingPallet';
import { ToastMessage, showToast } from '../../../shared/showToast';
import { Skeleton } from '../../../components/Skeleton';
import { useFeePallet } from '../../../hooks/spacewalk/useFeePallet';

import { UserStaking } from '../CollatorColumns';
import ClaimRewardsDialog from '../dialogs/ClaimRewardsDialog';
import { UnlockDialog } from '../dialogs/unlock/UnlockDialog';
import { doSubmitExtrinsic } from '../dialogs/helpers';

import { StakingRewardsContent } from './StakingRewardsContent/StakingRewardsContent';
import { StakingContent } from './StakingContent/StakingContent';
import {
  calculateTokensReadyToUnlock,
  generateUnstakingTooltipText,
  UnstakingDataType,
  handleTransactionStatus,
} from './helpers';
import Big from 'big.js';

function CollatorRewards() {
  const { api, tokenSymbol, ss58Format } = useNodeInfoState().state;
  const { walletAccount } = useGlobalState();
  const { candidates, estimatedRewards, refreshRewards, createUpdateDelegatorRewardsExtrinsic, unlockUnstaked } =
    useStakingPallet();

  const [userAvailableBalance, setUserAvailableBalance] = useState<string>('0.00');
  const [userStaking, setUserStaking] = useState<UserStaking>();
  const [claimDialogVisible, setClaimDialogVisible] = useState<boolean>(false);
  const [submissionPending, setSubmissionPending] = useState(false);
  const [unlockDialogSuccess, setUnlockDialogSuccess] = useState(false);
  const [unstaking, setUnstaking] = useState<string>('0.00');
  const [balanceEnabledForUnlock, setBalanceEnabledForUnlock] = useState<string>('0.00');
  const [updateEnabled, setUpdateEnabled] = useState<boolean>(true);
  const [unlockDialogVisible, setUnlockDialogVisible] = useState<boolean>(false);
  const [tokensTipText, setTokensTipText] = useState<string>('Locked for 7 days.');
  const [loadingToken, setLoadingToken] = useState<boolean>(true);
  const [unlockGasFee, setUnlockGasFee] = useState<Big>(new Big(0));

  const { getTransactionFee } = useFeePallet();

  const getUnlockGasFee = useCallback(async () => {
    if (unlockUnstaked && walletAccount?.address) {
      const submittableExtrinsic = unlockUnstaked(walletAccount.address);
      setUnlockGasFee(await getTransactionFee(submittableExtrinsic));
    }

    return 0;
  }, [getTransactionFee, unlockUnstaked, walletAccount?.address]);

  const userAccountAddress = useMemo(() => {
    return walletAccount && ss58Format ? getAddressForFormat(walletAccount?.address, ss58Format) : '';
  }, [walletAccount, ss58Format]);

  useMemo(() => {
    setUserStaking(undefined);
    return candidates?.forEach((candidate) => {
      const isDelegator = candidate.delegators.find((delegator) => delegator.owner === userAccountAddress);
      if (isDelegator) {
        setUserStaking({
          candidateId: candidate.id,
          amount: isDelegator.amount,
        });
      }
    });
  }, [candidates, userAccountAddress, setUserStaking]);

  async function setTooltipText(
    unstakingDataJSON: UnstakingDataType,
    api: ApiPromise,
    tokenSymbol: string,
    setTokensTipText: StateUpdater<string>,
  ) {
    const tooltipText = await generateUnstakingTooltipText(unstakingDataJSON, api, tokenSymbol);
    setTokensTipText(tooltipText);
  }

  async function setBalanceForUnlock(
    unstakingDataJSON: UnstakingDataType,
    api: ApiPromise,
    setBalanceEnabledForUnlock: StateUpdater<string>,
  ) {
    const tokensReadyToUnlock = await calculateTokensReadyToUnlock(unstakingDataJSON, api);
    setBalanceEnabledForUnlock(tokensReadyToUnlock.toString());
  }

  function setUnstakingTokens(unstakingData: BTreeMap, setUnstaking: StateUpdater<string>) {
    const unstakingParts: number[] = [];
    unstakingData.forEach((n) => unstakingParts.push(Number(n.toString())));
    const allUnstakingTokens = unstakingParts.reduce((a, b) => a + b, 0);
    setUnstaking(allUnstakingTokens.toString());
  }

  useEffect(() => {
    const fetchAvailableBalance = async () => {
      if (!api || !walletAccount) {
        return '0';
      }
      const { data: balance } = await api.query.system.account(walletAccount?.address);
      setUserAvailableBalance(balance.free.sub(balance.miscFrozen).toString());
    };
    const fetchUnstaking = async () => {
      if (!api || !walletAccount) {
        return;
      }

      const unstakingData = await api.query.parachainStaking.unstaking(walletAccount?.address);

      const unstakingDataJSON = unstakingData.toJSON() as UnstakingDataType;
      setTooltipText(unstakingDataJSON, api, tokenSymbol || '', setTokensTipText);
      setBalanceForUnlock(unstakingDataJSON, api, setBalanceEnabledForUnlock);
      setUnstakingTokens(unstakingData, setUnstaking);
    };

    fetchUnstaking();
    fetchAvailableBalance();
  }, [api, tokenSymbol, walletAccount]);

  const updateRewardsExtrinsic = useMemo(() => {
    if (!api) {
      return undefined;
    }

    return createUpdateDelegatorRewardsExtrinsic();
  }, [api, createUpdateDelegatorRewardsExtrinsic]);

  const submitUpdate = useCallback(() => {
    if (!updateRewardsExtrinsic || !api || !walletAccount) {
      return;
    }
    setSubmissionPending(true);
    updateRewardsExtrinsic
      .signAndSend(walletAccount.address, { signer: walletAccount.signer as Signer | undefined }, (result) => {
        handleTransactionStatus(
          result.status,
          result.events,
          api,
          showToast,
          setSubmissionPending,
          refreshRewards,
          setUpdateEnabled,
        );
      })
      .catch((error) => {
        showToast(ToastMessage.ERROR, 'Transaction submission failed: ' + error.toString());
        setSubmissionPending(false);
      });
  }, [api, refreshRewards, updateRewardsExtrinsic, walletAccount, setUpdateEnabled]);

  const handleUnlock = () => {
    if (unlockUnstaked && walletAccount?.address) {
      const submittableExtrinsic = unlockUnstaked(walletAccount.address);

      if (api && walletAccount) {
        doSubmitExtrinsic(api, submittableExtrinsic, walletAccount, setSubmissionPending, setUnlockDialogSuccess);
      }
    }
  };

  useEffect(() => {
    if (tokenSymbol) {
      setLoadingToken(false);
    } else {
      setLoadingToken(true);
    }
  }, [tokenSymbol]);

  const handleUnlockButtonClick = () => {
    getUnlockGasFee();
    setUnlockDialogVisible(true);
  };

  const renderContentWithLoading = (content: JSX.Element) => {
    if (loadingToken) {
      return (
        <>
          <Skeleton className="w-full h-8 mb-2" />
          <Skeleton className="w-full h-8 mb-2" />
          <Skeleton className="w-full h-8 mb-2" />
        </>
      );
    }

    return content;
  };

  return (
    <>
      <div className="flex flex-col mb-8 justify-between md:flex-row ">
        <div className="card rounded-lg bg-base-200 mb-3 md:w-1/2 md:mb-0 md:mr-5 collators-box">
          <div className="card-body py-6 px-4 xs:px-8">
            <h2 className="card-title font-normal">Staking</h2>
            {renderContentWithLoading(
              <StakingContent
                userStakingAmount={userStaking?.amount}
                onButtonClick={handleUnlockButtonClick}
                balanceEnabledForUnlock={balanceEnabledForUnlock}
                tokenSymbol={tokenSymbol as string}
                userAvailableBalance={userAvailableBalance}
                unstaking={unstaking}
                tokensTipText={tokensTipText}
              />,
            )}
          </div>
        </div>
        <div className="card rounded-lg bg-base-200 md:w-1/2 collators-box">
          <div className="card-body py-6 px-4 xs:px-8">
            <h2 className="card-title font-normal mb-2">Staking Rewards</h2>
            {renderContentWithLoading(
              <StakingRewardsContent
                updateButton={{
                  loading: submissionPending,
                  disabled: !updateEnabled || !walletAccount,
                  onClick: () => submitUpdate(),
                }}
                claimButton={{
                  onClick: () => setClaimDialogVisible(true),
                  disabled: !walletAccount || parseFloat(estimatedRewards) <= 0,
                }}
                estimatedRewards={estimatedRewards}
                tokenSymbol={tokenSymbol as string}
              />,
            )}
          </div>
        </div>
      </div>
      <UnlockDialog
        gasFee={unlockGasFee}
        unlockSuccess={unlockDialogSuccess}
        onUnlock={handleUnlock}
        userStakeBalance={balanceEnabledForUnlock}
        visible={unlockDialogVisible}
        onClose={() => setUnlockDialogVisible(false)}
      />
      <ClaimRewardsDialog
        tokenSymbol={tokenSymbol}
        userRewardsBalance={estimatedRewards}
        visible={claimDialogVisible}
        onClose={() => setClaimDialogVisible(false)}
      />
    </>
  );
}

export default CollatorRewards;
