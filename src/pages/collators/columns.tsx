import { WalletAccount } from '@talismn/connect-wallets';
import { ColumnDef } from '@tanstack/table-core';
import { StateUpdater } from 'preact/hooks';
import { Button } from 'react-daisyui';
import UnlinkIcon from '../../assets/UnlinkIcon';
import { nativeToFormat } from '../../helpers/parseNumbers';
import { ParachainStakingCandidate } from '../../hooks/staking/staking';

export interface TCollator {
  candidate: ParachainStakingCandidate;
  collator: string;
  totalStaked: string;
  delegators: number;
  apy: string;
}

export interface UserStaking {
  candidateId: string;
  amount: string;
}

const getAmountDelegated = (
  candidate: ParachainStakingCandidate,
  address: string,
) => candidate.delegators.find(({ owner }) => owner === address)?.amount;

export const nameColumn: ColumnDef<TCollator> = {
  header: 'Collator',
  accessorKey: 'collator',
};

export const stakedColumn: ColumnDef<TCollator> = {
  header: 'Total Staked',
  accessorKey: 'totalStaked',
};

export const delegatorsColumn: ColumnDef<TCollator> = {
  header: 'Delegators',
  accessorKey: 'delegators',
  accessorFn: ({ delegators }) => delegators?.toString(),
};

export const apyColumn: ColumnDef<TCollator> = {
  header: 'APY',
  accessorKey: 'apy',
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
  cell: ({ row }) => {
    const amountDelegated = getAmountDelegated(
      row.original.candidate,
      userAccountAddress,
    );
    return (
      <div>
        {amountDelegated ? nativeToFormat(amountDelegated, tokenSymbol) : ''}
      </div>
    );
  },
});

export const actionsColumn = ({
  userAccountAddress,
  walletAccount,
  userStaking,
  setSelectedCandidate,
}: {
  userAccountAddress: string;
  walletAccount: WalletAccount | undefined;
  userStaking: UserStaking | undefined;
  setSelectedCandidate: StateUpdater<ParachainStakingCandidate | undefined>;
}): ColumnDef<TCollator> => ({
  header: '',
  accessorKey: 'actions',
  cell: ({ row }) => {
    const showUnbond = Boolean(
      getAmountDelegated(row.original.candidate, userAccountAddress),
    );
    const showDelegate = walletAccount && (!userStaking || showUnbond);
    return (
      <div className="flex flex-row justify-center">
        <Button
          className="mr-2 text-primary"
          size="sm"
          color="ghost"
          onClick={() => undefined}
          startIcon={<UnlinkIcon className="w-4 h-4" />}
          style={{ visibility: showUnbond ? 'visible' : 'hidden' }}
        >
          Unbond
        </Button>
        <Button
          size="sm"
          color="primary"
          variant="outline"
          onClick={() => {
            setSelectedCandidate(row.original.candidate);
          }}
          disabled={!showDelegate}
        >
          Delegate
        </Button>
      </div>
    );
  },
});
