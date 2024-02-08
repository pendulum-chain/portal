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
import { nativeToFormat } from '../../shared/parseNumbers';
import { UserStaking } from './CollatorColumns';
import ClaimRewardsDialog from './dialogs/ClaimRewardsDialog';

function CollatorRewards() {
  const { api, tokenSymbol, ss58Format } = useNodeInfoState().state;
  const { walletAccount } = useGlobalState();
  const { candidates, estimatedRewards, refreshRewards, createUpdateDelegatorRewardsExtrinsic } = useStakingPallet();

  const [userAvailableBalance, setUserAvailableBalance] = useState<string>('0.00');
  const [userStaking, setUserStaking] = useState<UserStaking>();
  const [claimDialogOpen, setClaimDialogOpen] = useState<boolean>(false);
  const [submissionPending, setSubmissionPending] = useState(false);
  const [unstaking, setUnstaking] = useState<string>('0.00');

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

  const submitUpdateExtrinsic = useCallback(() => {
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
          }
        }
      })
      .catch((error) => {
        toast('Transaction submission failed: ' + error.toString(), {
          type: 'error',
        });
        setSubmissionPending(false);
      });
  }, [api, refreshRewards, updateRewardsExtrinsic, walletAccount]);

  return (
    <>
      <div className="flex flex-col mb-8 justify-between md:flex-row ">
        <div className="card rounded-lg bg-base-200  mb-3 md:w-1/2 md:mb-0 md:mr-5 collators-box">
          <div className="card-body">
            <h2 className="card-title">Staking</h2>
            <div className="flex flex-row flex-wrap gap-4">
              <div className="flex-initial">
                <StakedIcon className="staked-icon mt-1" />
              </div>
              <div className="flex-auto">
                <h3>{nativeToFormat(userStaking?.amount || '0.00', tokenSymbol)}</h3>
                <p>My Staking</p>
              </div>
              <div className="flex-auto">
                <h3>{nativeToFormat(userAvailableBalance, tokenSymbol)}</h3>
                <p>Free balance</p>
              </div>
              <div className="flex flex-auto place-content-end">
                <button className="btn btn-secondary w-full" disabled>
                  {unstaking} unstaking
                </button>
              </div>
            </div>
            <div className="flex flex-none flex-col items-center">
              <h3 className="font-semibold">{nativeToFormat(parseInt(unstaking), tokenSymbol)}</h3>
              <button className="btn btn-primary btn-unlock w-full m-auto px-8" disabled>
                Unlock
              </button>
            </div>
          </div>
        </div>
        <div className="card rounded-lg bg-base-200 md:w-1/2 collators-box">
          <div className="card-body">
            <h2 className="card-title">Staking Rewards</h2>
            <div className="flex flex-row">
              <div className="flex-initial pt-1 pr-5 pb-0">
                <RewardsIcon className="rewards-icon" />
              </div>
              <div className="flex-auto">
                <h3 className="font-semibold">{nativeToFormat(estimatedRewards, tokenSymbol)}</h3>
                <p>Estimated reward</p>
              </div>
              <div className="flex flex-auto place-content-end">
                <Button
                  loading={submissionPending}
                  onClick={() => submitUpdateExtrinsic()}
                  className="btn btn-primary lg:w-1/3 btn-outline mr-2 rounded-md px-2 py-0 leading-3"
                  disabled={!walletAccount}
                >
                  {submissionPending ? '' : 'Update'}
                </Button>
                <Button
                  onClick={() => setClaimDialogOpen(true)}
                  className="btn btn-primary rounded-md lg:w-1/3 leading-3"
                  disabled={!walletAccount || parseFloat(estimatedRewards) <= 0}
                >
                  Claim
                </Button>
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
}

export default CollatorRewards;
