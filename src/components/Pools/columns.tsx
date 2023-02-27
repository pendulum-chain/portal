import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

export const nameColumn: ColumnDef<any> = {
  header: 'Name',
  accessorKey: 'name',
  enableSorting: true,
} as const;

export const walletColumn: ColumnDef<any> = {
  header: 'Wallet',
  accessorKey: 'wallet',
  accessorFn: (row) => row.wallet?.toString(),
  enableSorting: true,
} as const;

export const myAmountColumn: ColumnDef<any> = {
  header: 'My Pool Amount',
  accessorKey: 'myAmount',
  accessorFn: (row) => row.myAmount?.toString(),
  enableSorting: true,
} as const;

export const liabilitiesColumn: ColumnDef<any> = {
  header: 'Pool liabilities',
  accessorKey: 'liabilities',
  accessorFn: (row) => row.liabilities?.toString(),
  enableSorting: true,
} as const;

export const coverageColumn: ColumnDef<any> = {
  header: 'Coverage Ratio',
  accessorKey: 'coverage',
  accessorFn: (row) => row.coverage?.toString(),
  enableSorting: true,
} as const;

export const aprColumn: ColumnDef<any> = {
  header: 'APR',
  accessorKey: 'apr',
  accessorFn: (row) => row.apr?.toString(),
  enableSorting: true,
} as const;

export const actionsColumn: ColumnDef<any> = {
  header: '',
  accessorKey: 'id',
  enableSorting: false,
  enableGlobalFilter: false,
  enableColumnFilter: false,
  size: 150,
  cell: ({ row: { original } }): JSX.Element => (
    <div className="text-right">
      <Link className="btn btn-sm btn-outline px-3" to={`/${original.id}`}>
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
