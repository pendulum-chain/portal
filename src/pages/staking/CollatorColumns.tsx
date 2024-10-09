import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { WalletAccount } from '@talismn/connect-wallets';
import { ColumnDef } from '@tanstack/table-core';
import { StateUpdater, Dispatch } from 'react';
import { Button } from 'react-daisyui';
import UnlinkIcon from '../../assets/UnlinkIcon';
import { CopyablePublicKey } from '../../components/PublicKey/CopyablePublicKey';
import { ParachainStakingCandidate } from '../../hooks/staking/useStakingPallet';
import { PalletIdentityInfo } from '../../hooks/useIdentityPallet';
import { nativeToFormatMetric } from '../../shared/parseNumbers/metric';

const MAX_DELEGATORS_AMOUNT = 40;

export interface TCollator {
  candidate: ParachainStakingCandidate;
  collator: string;
  totalStaked: string;
  delegators: number;
  apr: string;
  identityInfo?: PalletIdentityInfo;
}

export interface UserStaking {
  candidateId: string;
  amount: string;
}

const getAmountDelegated = (candidate: ParachainStakingCandidate, address: string) =>
  candidate.delegators.find(({ owner }) => owner === address)?.amount;

export const nameColumn: ColumnDef<TCollator> = {
  header: 'Collator',
  accessorKey: 'collator',
  enableMultiSort: true,
  accessorFn: ({ identityInfo }) => identityInfo?.display || '0',
  cell: ({ row }) => {
    const desc = row.original.identityInfo
      ? `${row.original.identityInfo.email ? row.original.identityInfo.email + '\n' : ''}` +
        `${row.original.identityInfo.riot ? row.original.identityInfo.riot + '\n' : ''}` +
        `${row.original.identityInfo.twitter ? row.original.identityInfo.twitter + '\n' : ''}` +
        `${row.original.identityInfo.web ? row.original.identityInfo.web + '\n' : ''}`
      : '';
    return (
      <div className="flex flex-row" title={desc}>
        <div className="mr-2">{(row.original.identityInfo ? row.original.identityInfo.display : 'Unknown') + ' |'}</div>
        <CopyablePublicKey publicKey={row.original.candidate.id} variant="short" inline />
      </div>
    );
  },
};

export const stakedColumn: ColumnDef<TCollator> = {
  header: 'Total Staked',
  accessorKey: 'totalStaked',
};

export const delegatorsColumn: ColumnDef<TCollator> = {
  header: 'Delegators',
  accessorKey: 'delegators',
  enableMultiSort: true,
  accessorFn: ({ delegators }) => delegators?.toString(),
  cell: ({ row }) => {
    const maxDelegatorsReached = row.original.delegators >= MAX_DELEGATORS_AMOUNT;
    return (
      <div className="flex align-baseline">
        <div>{row.original.delegators}</div>
        {maxDelegatorsReached && (
          <div
            className="tooltip tooltip-error before:whitespace-pre-wrap before:content-[attr(data-tip)]"
            data-tip="The collator candidate has reached maximum number of delegators"
          >
            <InformationCircleIcon className="ml-1 h-4 w-4" />
          </div>
        )}
      </div>
    );
  },
};

export const aprColumn: ColumnDef<TCollator> = {
  header: 'APR',
  accessorKey: 'apr',
};

export const myStakedColumn = ({
  userAccountAddress,
  tokenSymbol,
}: {
  userAccountAddress: string;
  tokenSymbol?: string;
}): ColumnDef<TCollator> => ({
  header: 'My Staked',
  accessorKey: 'myStaked',
  enableMultiSort: true,
  accessorFn: ({ candidate }) => getAmountDelegated(candidate, userAccountAddress) || '0',
  cell: ({ row }) => {
    const amountDelegated = getAmountDelegated(row.original.candidate, userAccountAddress);
    return <div>{amountDelegated ? nativeToFormatMetric(amountDelegated, tokenSymbol) : ''}</div>;
  },
});

export const actionsColumn = ({
  userAccountAddress,
  walletAccount,
  userStaking,
  setSelectedCandidate,
  setUnstaking,
}: {
  userAccountAddress: string;
  walletAccount: WalletAccount | undefined;
  userStaking: UserStaking | undefined;
  setSelectedCandidate: Dispatch<StateUpdater<ParachainStakingCandidate | undefined>>;
  setUnstaking: Dispatch<StateUpdater<boolean>>;
}): ColumnDef<TCollator> => ({
  header: '',
  enableSorting: false,
  accessorKey: 'actions',
  cell: ({ row }) => {
    const maxDelegatorsReached = row.original.delegators >= MAX_DELEGATORS_AMOUNT;

    const canUnstake = Boolean(getAmountDelegated(row.original.candidate, userAccountAddress));

    // Check if current user is in list of delegators
    const isDelegator = row.original.candidate.delegators.find(({ owner }) => owner === userAccountAddress);
    const canStake = isDelegator || (walletAccount && !maxDelegatorsReached && (!userStaking || canUnstake));
    return (
      <div className="mr-2 flex flex-row justify-start">
        <Button
          className="mr-2 text-primary"
          size="sm"
          color="ghost"
          onClick={() => {
            setUnstaking(true);
            setSelectedCandidate(row.original.candidate);
          }}
          startIcon={<UnlinkIcon className="h-4 w-4" />}
          disabled={!canUnstake}
          style={{ opacity: canUnstake ? '1' : '0' }}
        >
          <p className="ml-1">Unstake</p>
        </Button>
        <Button
          size="sm"
          variant="outline"
          color="primary"
          onClick={() => {
            setSelectedCandidate(row.original.candidate);
          }}
          disabled={!canStake}
          className="rounded-md px-8"
        >
          Stake
        </Button>
      </div>
    );
  },
});
