/**
 * FIXME remove @ts-nocheck, it was specifically added because of some errors in react-table.
 * Probably fixed in https://github.com/pendulum-chain/portal/pull/64
 */
import { useEffect, useMemo, useState } from 'preact/hooks';
import RewardsIcon from '../../assets/collators-rewards-icon';
import StakedIcon from '../../assets/collators-staked-icon';
import { useGlobalState } from '../../GlobalStateProvider';
import { format, nativeToDecimal, nativeToFormat } from '../../helpers/parseNumbers';
import { useNodeInfoState } from '../../NodeInfoProvider';

import Table from '../../components/Table';
import { getAddressForFormat } from '../../helpers/addressFormatter';
import { ParachainStakingCandidate, useStakingPallet } from '../../hooks/staking/staking';
import {
  actionsColumn,
  apyColumn,
  delegatorsColumn,
  myStakedColumn,
  nameColumn,
  stakedColumn,
  TCollator,
  UserStaking,
} from './columns';
import ClaimRewardsDialog from './dialogs/ClaimRewardsDialog';
import ExecuteDelegationDialogs from './dialogs/ExecuteDelegationDialogs';

function Collators() {
  const { api, tokenSymbol, ss58Format } = useNodeInfoState().state;
  const { walletAccount } = useGlobalState().state;

  const { candidates, inflationInfo, estimatedRewards } = useStakingPallet();

  // Holds the candidate for which the delegation modal is to be shown
  const [selectedCandidate, setSelectedCandidate] = useState<ParachainStakingCandidate | undefined>(undefined);

  const [userAvailableBalance, setUserAvailableBalance] = useState<string>('0.00');
  const [userStaking, setUserStaking] = useState<UserStaking>();
  const [claimDialogOpen, setClaimDialogOpen] = useState<boolean>(false);
  const [unbonding, setUnbonding] = useState<boolean>(false);

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
      return balance.free.sub(balance.miscFrozen).toString();
    };

    fetchAvailableBalance().then((balance) => setUserAvailableBalance(balance));
  }, [api, walletAccount]);

  const data = useMemo<TCollator[] | undefined>(
    () =>
      candidates?.map((candidate) => {
        const totalStaked = nativeToDecimal(candidate.total);
        return {
          candidate: candidate,
          collator: candidate.id,
          totalStaked: format(totalStaked, tokenSymbol),
          delegators: candidate.delegators.length,
          apy: inflationInfo?.delegator.rewardRate.annual || '0.00%',
        };
      }),
    [candidates, inflationInfo?.delegator.rewardRate.annual, tokenSymbol],
  );

  const columns = useMemo(() => {
    return [
      nameColumn,
      stakedColumn,
      delegatorsColumn,
      apyColumn,
      myStakedColumn({ userAccountAddress, tokenSymbol }),
      actionsColumn({
        userAccountAddress,
        walletAccount,
        userStaking,
        setSelectedCandidate,
      }),
    ];
  }, [tokenSymbol, userAccountAddress, userStaking, walletAccount]);

  return (
    <div className="overflow-x-auto collators-list-container mt-10">
      <div className="flex mb-8 justify-between">
        <div className="card gap-0 rounded-lg text-primary-content bg-base-200 w-1/2 mr-4 collators-box">
          <div className="card-body">
            <h2 className="card-title">Collators</h2>
            <div className="flex flex-row">
              <div className="flex-initial pr-5">
                <StakedIcon />
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
                  0 {tokenSymbol} Unboarding
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card rounded-lg text-primary-content bg-base-200 w-1/2 ml-4 collators-box">
          <div className="card-body">
            <h2 className="card-title">Staking Rewards</h2>
            <div className="flex flex-row">
              <div className="flex-initial pt-1 pr-5 pb-0">
                <RewardsIcon />
              </div>
              <div className="flex-auto">
                <h4>{nativeToFormat(estimatedRewards, tokenSymbol)}</h4>
                <p>Estimated reward</p>
              </div>
              <div className="flex flex-auto place-content-end">
                <button
                  onClick={() => setClaimDialogOpen(true)}
                  className="btn btn-primary w-1/3"
                  disabled={!walletAccount || parseFloat(estimatedRewards) <= 0}
                >
                  Claim
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ExecuteDelegationDialogs
        userAvailableBalance={userAvailableBalance}
        userStake={userStaking?.amount}
        selectedCandidate={selectedCandidate}
        mode={
          unbonding ? 'undelegating' : userStaking?.candidateId === selectedCandidate?.id ? 'delegatingMore' : 'joining'
        }
        onClose={() => {
          setSelectedCandidate(undefined);
          setUnbonding(false);
        }}
      />
      <ClaimRewardsDialog
        userRewardsBalance={estimatedRewards}
        tokenSymbol={tokenSymbol}
        visible={claimDialogOpen}
        onClose={() => setClaimDialogOpen(false)}
      />
      <Table
        className="collators-list-table bg-base-100 text-md"
        data={data}
        columns={columns}
        isLoading={!candidates}
        search={false}
        pageSize={8}
      />
    </div>
  );
}

export default Collators;
