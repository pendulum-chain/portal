import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { SwapPool } from '../../models/SwapPool';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SwapPoolColumn = SwapPool & any;

export const nameColumn: ColumnDef<SwapPoolColumn> = {
  header: 'Name',
  accessorKey: 'name',
  enableSorting: true,
} as const;

export const walletColumn: ColumnDef<SwapPoolColumn> = {
  header: 'Wallet',
  accessorKey: 'wallet',
  accessorFn: (row) => row.wallet?.toString(),
  enableSorting: true,
} as const;

export const myAmountColumn: ColumnDef<SwapPoolColumn> = {
  header: 'My Pool Amount',
  accessorKey: 'myAmount',
  accessorFn: (row) => row.myAmount?.toString(),
  enableSorting: true,
} as const;

export const liabilitiesColumn: ColumnDef<SwapPoolColumn> = {
  header: 'Pool liabilities',
  accessorKey: 'liabilities',
  accessorFn: (row) => row.liabilities?.toString(),
  enableSorting: true,
} as const;

export const coverageColumn: ColumnDef<SwapPoolColumn> = {
  header: 'Coverage Ratio',
  accessorKey: 'coverage',
  accessorFn: (row) => row.coverage?.toString(),
  enableSorting: true,
} as const;

export const aprColumn: ColumnDef<SwapPoolColumn> = {
  header: 'APR',
  accessorKey: 'apr',
  accessorFn: (row) => row.apr?.toString(),
  enableSorting: true,
} as const;

export const actionsColumn: ColumnDef<SwapPoolColumn> = {
  header: '',
  accessorKey: 'address',
  enableSorting: false,
  enableGlobalFilter: false,
  enableColumnFilter: false,
  size: 150,
  cell: ({ row: { original } }): JSX.Element => (
    <div className="text-right">
      <Link className="btn btn-sm btn-outline px-3" to={`${original.address}`}>
        Manage
      </Link>
    </div>
  ),
} as const;

export const columns = [
  nameColumn,
  walletColumn,
  myAmountColumn,
  liabilitiesColumn,
  coverageColumn,
  aprColumn,
  actionsColumn,
];
