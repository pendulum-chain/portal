import { ColumnDef } from '@tanstack/table-core';

export type TransferStatus = 'Pending' | 'Completed' | 'Cancelled' | 'Reimbursed' | 'Retried';

export enum TransferType {
  issue = 'issue',
  redeem = 'redeem',
}

export interface TTransfer {
  updated: string;
  amount: string;
  transactionId: string;
  type: TransferType;
  status: TransferStatus;
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

export const transactionIdColumn: ColumnDef<TTransfer> = {
  header: 'Transaction ID',
  accessorKey: 'transactionId',
  accessorFn: (row) => row.transactionId.slice(0, 10) + '...' + row.transactionId.slice(-10),
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
