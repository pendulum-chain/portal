import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'preact/hooks';
import Big from 'big.js';
import { useGlobalState } from '../../GlobalStateProvider';
import { useNodeInfoState } from '../../NodeInfoProvider';
import Table, { SortingOrder } from '../../components/Table';
import { getAddressForFormat } from '../../helpers/addressFormatter';
import { ParachainStakingCandidate, useStakingPallet } from '../../hooks/staking/useStakingPallet';
import { PalletIdentityInfo, useIdentityPallet } from '../../hooks/useIdentityPallet';
import { nativeToFormatMetric } from '../../shared/parseNumbers/metric';
import {
  TCollator,
  UserStaking,
  actionsColumn,
  aprColumn,
  delegatorsColumn,
  myStakedColumn,
  nameColumn,
  stakedColumn,
} from './CollatorColumns';
import ExecuteDelegationDialogs from './dialogs/ExecuteDelegationDialogs';

function CollatorsTable() {
  const { api, tokenSymbol, ss58Format } = useNodeInfoState().state;
  const { walletAccount } = useGlobalState();
  const { candidates, inflationInfo } = useStakingPallet();
  const { identityOf } = useIdentityPallet();

  // Holds the candidate for which the delegation modal is to be shown
  const [selectedCandidate, setSelectedCandidate] = useState<ParachainStakingCandidate | undefined>(undefined);
  const [userAvailableBalance, setUserAvailableBalance] = useState<string>('0.00');
  const [userStaking, setUserStaking] = useState<UserStaking>();
  const [unstaking, setUnstaking] = useState<boolean>(false);
  const [data, setData] = useState<TCollator[] | undefined>();

  const userAccountAddress = useMemo(() => {
    return walletAccount && ss58Format ? getAddressForFormat(walletAccount?.address, ss58Format) : '';
  }, [walletAccount, ss58Format]);

  useEffect(() => {
    setUserStaking(undefined);
    if (!candidates) return;

    candidates.map((candidate) => {
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
      return balance.free.sub(balance.frozen).toString();
    };

    fetchAvailableBalance().then((balance) => setUserAvailableBalance(balance));
  }, [api, walletAccount]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const identitiesPrefetch = async (candidatesArray: any) => {
      const m: Map<string, PalletIdentityInfo | undefined> = new Map();
      for (let i = 0; i < candidatesArray.length; i++) {
        const c = candidatesArray[i];
        m.set(c.id, await identityOf(c.id));
      }
      return m;
    };

    const decorateCandidates = (
      candidatesArray: ParachainStakingCandidate[],
      identities: Map<string, PalletIdentityInfo | undefined>,
    ) => {
      return candidatesArray?.map((candidate) => ({
        candidate: candidate,
        collator: candidate.id,
        identityInfo: identities.get(candidate.id),
        totalStaked: nativeToFormatMetric(candidate.total, tokenSymbol),
        delegators: candidate.delegators.length,
        apr: inflationInfo?.delegator.rewardRate.annual || '0.00%',
      }));
    };

    if (candidates) {
      identitiesPrefetch(candidates).then((identitiesMap) => {
        const d = decorateCandidates(candidates, identitiesMap);
        setData(d);
      });
    }
  }, [candidates, inflationInfo?.delegator.rewardRate.annual, tokenSymbol, identityOf]);

  const columns = useMemo(() => {
    let stakedCol = undefined;
    if (walletAccount && userStaking) {
      stakedCol = myStakedColumn({ userAccountAddress, tokenSymbol });
    }
    return [
      nameColumn,
      stakedColumn,
      delegatorsColumn,
      aprColumn,
      stakedCol,
      actionsColumn({
        userAccountAddress,
        walletAccount,
        userStaking,
        setSelectedCandidate,
        setUnstaking,
      }),
    ].filter((c) => !!c) as ColumnDef<TCollator>[];
  }, [tokenSymbol, userAccountAddress, userStaking, walletAccount, setUnstaking]);

  return (
    <>
      <ExecuteDelegationDialogs
        userAvailableBalance={userAvailableBalance}
        userStake={userStaking?.amount}
        selectedCandidate={selectedCandidate}
        mode={
          unstaking ? 'unstaking' : userStaking?.candidateId === selectedCandidate?.id ? 'delegatingMore' : 'joining'
        }
        onClose={() => {
          setSelectedCandidate(undefined);
          setUnstaking(false);
        }}
      />
      <Table
        className="collators-list-table text-md w-full bg-base-100"
        data={data}
        columns={columns}
        isLoading={!candidates}
        sortBy={{ myStaked: SortingOrder.DESC, collator: SortingOrder.ASC }}
        search={false}
        pageSize={8}
        oddRowsClassname="odd-rows bg-table-row border-b-base-300 table-border"
        evenRowsClassname="bg-base-200 border-b-base-300 table-border"
      />
    </>
  );
}

export default CollatorsTable;
