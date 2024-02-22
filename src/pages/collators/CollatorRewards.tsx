import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useMemo, useState } from 'preact/compat';
import { Button } from 'react-daisyui';
import { toast } from 'react-toastify';
import { useGlobalState } from '../../GlobalStateProvider';
import { useNodeInfoState } from '../../NodeInfoProvider';
import RewardsIcon from '../../assets/collators-rewards-icon';
import StakedIcon from '../../assets/collators-staked-icon';
import { getAddressForFormat } from '../../helpers/addressFormatter';
import { getErrors } from '../../helpers/substrate';
import { useStakingPallet } from '../../hooks/staking/staking';
import { nativeToFormatMetric } from '../../shared/parseNumbers/metric';
import { nativeToFormatDecimal } from '../../shared/parseNumbers/decimal';
import { UserStaking } from './CollatorColumns';
import ClaimRewardsDialog from './dialogs/ClaimRewardsDialog';

const WAIT_15_MINUTES = 15 * 60 * 1000;

function CollatorRewards() {
  const { api, tokenSymbol, ss58Format } = useNodeInfoState().state;
  const { walletAccount } = useGlobalState();
  const { candidates, estimatedRewards, refreshRewards, createUpdateDelegatorRewardsExtrinsic } = useStakingPallet();

  const [userAvailableBalance, setUserAvailableBalance] = useState<string>('0.00');
  const [userStaking, setUserStaking] = useState<UserStaking>();
  const [claimDialogOpen, setClaimDialogOpen] = useState<boolean>(false);
  const [submissionPending, setSubmissionPending] = useState(false);
  const [unstaking, setUnstaking] = useState<string>('0.00');
  const [updateEnabled, setUpdateEnabled] = useState<boolean>(true);

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
      unstakingData.forEach((n) => setUnstaking(n.toString()));
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .signAndSend(walletAccount.address, { signer: walletAccount.signer as any }, (result) => {
        const { status, events } = result;
        const errors = getErrors(events, api);
        if (status.isInBlock) {
          if (errors.length > 0) {
            const errorMessage = `Transaction failed with errors: ${errors.join('\n')}`;
            console.error(errorMessage);
            toast(errorMessage, { type: 'error' });
          }
        } else if (status.isFinalized) {
          setSubmissionPending(false);
          refreshRewards();
          if (errors.length === 0) {
            toast('Delegator rewards updated', { type: 'success' });
            setUpdateEnabled(false);
            setTimeout(() => {
              setUpdateEnabled(true);
            }, WAIT_15_MINUTES);
          }
        }
      })
      .catch((error) => {
        toast('Transaction submission failed: ' + error.toString(), {
          type: 'error',
        });
        setSubmissionPending(false);
      });
  }, [api, refreshRewards, updateRewardsExtrinsic, walletAccount, setUpdateEnabled]);

  return (
    <>
      <div className="flex flex-col mb-8 justify-between md:flex-row ">
        <div className="card rounded-lg bg-base-200 mb-3 md:w-1/2 md:mb-0 md:mr-5 collators-box">
          <div className="card-body py-6 px-4 xs:px-8">
            <h2 className="card-title font-normal">Staking</h2>
            <div className="flex flex-row flex-wrap gap-4 items-center">
              <div className="flex-initial">
                <StakedIcon className="staked-icon mt-1" />
              </div>
              <div className="flex-auto">
                <h3>{nativeToFormatMetric(userStaking?.amount || '0.00', tokenSymbol)}</h3>
                <p>My Staking</p>
              </div>
              <div className="flex-auto">
                <h3>{nativeToFormatMetric(userAvailableBalance, tokenSymbol)}</h3>
                <p>Free balance</p>
              </div>
              <div className="flex flex-auto flex-col items-center">
                <div className="flex flex-row items-center mb-1">
                  <h3>{nativeToFormatMetric(unstaking, tokenSymbol)}</h3>
                  <div className="tooltip tooltip-primary" data-tip="Locked for 7 days.">
                    <ExclamationCircleIcon className="w-5 h-5 ml-2 text-gray-400" />
                  </div>
                </div>
                <button className="btn btn-primary btn-unlock min-h-fit max-h-10 w-full m-auto px-8">Unlock</button>
              </div>
            </div>
          </div>
        </div>
        <div className="card rounded-lg bg-base-200 md:w-1/2 collators-box">
          <div className="card-body py-6 px-4 xs:px-8">
            <h2 className="card-title font-normal mb-2">Staking Rewards</h2>
            <div className="flex flex-row">
              <div className="flex-initial pt-1 pr-5 pb-0">
                <RewardsIcon className="rewards-icon" />
              </div>
              <div className="flex-auto">
                <h3 className="font-semibold primary">{nativeToFormatDecimal(estimatedRewards, tokenSymbol)}</h3>
                <p>Estimated reward</p>
              </div>
              <div className="flex flex-auto flex-col xs:flex-row place-content-end">
                {UpdateButton()}
                {ClaimButton()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ClaimRewardsDialog
        userRewardsBalance={estimatedRewards}
        tokenSymbol={tokenSymbol}
        visible={claimDialogOpen}
        onClose={() => setClaimDialogOpen(false)}
      />
    </>
  );

  function ClaimButton() {
    return (
      <Button
        onClick={() => setClaimDialogOpen(true)}
        className="btn btn-primary btn-outline rounded-md w-full xs:w-1/2 leading-3 p-0 min-h-fit max-h-10"
        disabled={!walletAccount || parseFloat(estimatedRewards) <= 0}
      >
        Claim
      </Button>
    );
  }

  function UpdateButton() {
    return (
      <Button
        loading={submissionPending}
        onClick={() => submitUpdate()}
        className="btn btn-primary w-full xs:w-1/2 xs:mr-2 mb-2 rounded-md p-0 leading-3 min-h-fit max-h-10 min-w-20"
        disabled={!updateEnabled || !walletAccount}
      >
        {submissionPending ? '' : 'Update'}
      </Button>
    );
  }
}

export default CollatorRewards;
