import { SpacewalkPrimitivesIssueIssueRequest, SpacewalkPrimitivesRedeemRedeemRequest } from '@polkadot/types/lookup';
import { ColumnDef } from '@tanstack/table-core';
import { CopyableAddress } from '../../components/PublicKey';

export type TransferStatus = 'Pending' | 'Completed' | 'Cancelled' | 'Reimbursed' | 'Failed' | 'Retried';

export enum TransferType {
  issue = 'issue',
  redeem = 'redeem',
}

export interface TTransfer {
  updated: string;
  amount: string;
  asset?: string;
  transactionId: string;
  type: TransferType;
  status: TransferStatus;
  original: SpacewalkPrimitivesIssueIssueRequest | SpacewalkPrimitivesRedeemRedeemRequest;
}

export interface UserStaking {
  candidateId: string;
  amount: string;
}

export const updatedColumn: ColumnDef<TTransfer> = {
  header: 'Updated',
  accessorKey: 'updated',
};

export const amountColumn: ColumnDef<TTransfer> = {
  header: 'Amount',
  accessorKey: 'amount',
};

export const assetColumn: ColumnDef<TTransfer> = {
  header: 'Asset',
  accessorKey: 'asset',
};

export const transactionIdColumn: ColumnDef<TTransfer> = {
  header: 'Transaction ID',
  accessorKey: 'transactionId',
  cell: ({ row }) => {
    return <CopyableAddress publicKey={row.original.transactionId} variant="hexa" />;
  },
};

export const typeColumn: ColumnDef<TTransfer> = {
  header: 'Type',
  accessorKey: 'type',
  accessorFn: (row) => (row.type === TransferType.issue ? 'To Pendulum' : 'Back to Stellar'),
};

export const statusColumn: ColumnDef<TTransfer> = {
  header: 'Status',
  accessorKey: 'status',
  cell: ({ row }) => {
    return (
      <div className={'status-box ' + row.original.status.toLowerCase()}>
        <div className={'status-dot ' + row.original.status.toLowerCase()}></div>
        <div>{row.original.status}</div>
      </div>
    );
  },
};
