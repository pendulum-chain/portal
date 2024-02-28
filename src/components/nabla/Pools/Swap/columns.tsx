import { CellContext, ColumnDef } from '@tanstack/react-table';
import { Badge, Button } from 'react-daisyui';
import { SwapPool } from '../../../../../gql/graphql';
import { useModalToggle } from '../../../../services/modal';
import { FixedU128Decimals, nativeToDecimal, prettyNumbers } from '../../../../shared/parseNumbers/metric';
import { LiquidityModalProps, ModalTypes } from './Modals/types';

export type SwapPoolColumn = SwapPool & {
  myAmount?: number;
};

export const nameColumn: ColumnDef<SwapPoolColumn> = {
  header: 'Name',
  accessorKey: 'name',
  accessorFn: (row) => row.token?.name || '',
  enableSorting: true,
} as const;

export const liabilitiesColumn: ColumnDef<SwapPoolColumn> = {
  header: 'Pool liabilities',
  accessorKey: 'liabilities',
  accessorFn: (row) => prettyNumbers(nativeToDecimal(row.liabilities || 0, FixedU128Decimals).toNumber()),
  enableSorting: true,
  meta: {
    className: 'text-right justify-end',
  },
} as const;

export const reservesColumn: ColumnDef<SwapPoolColumn> = {
  header: 'Reserves',
  accessorKey: 'reserves',
  accessorFn: (row) => prettyNumbers(nativeToDecimal(row.reserves || 0, FixedU128Decimals).toNumber()),
  enableSorting: true,
  meta: {
    className: 'text-right justify-end',
  },
} as const;

export const aprColumn: ColumnDef<SwapPoolColumn> = {
  header: 'APR',
  accessorKey: 'apr',
  accessorFn: (_row) => 0,
  cell: (props): JSX.Element | null => (
    <Badge color="success" className="py-1 px-2 h-auto rounded-md text-blackAlpha-700">
      {props.renderValue()}%
    </Badge>
  ),
  enableSorting: true,
  meta: {
    className: 'text-right justify-end',
  },
} as const;

export const myAmountColumn: ColumnDef<SwapPoolColumn> = {
  header: 'My Pool Amount',
  accessorKey: 'myAmount',
  accessorFn: (row) => prettyNumbers(nativeToDecimal(row.myAmount || 0, FixedU128Decimals).toNumber()),
  enableSorting: true,
  meta: {
    className: 'text-right justify-end',
  },
} as const;

const ActionsColumn = ({ row: { original } }: CellContext<SwapPoolColumn, unknown>): JSX.Element | null => {
  const toggle = useModalToggle<LiquidityModalProps>();
  return (
    <div className="flex items-center justify-end gap-2 text-right">
      <Button
        onClick={() => toggle({ type: ModalTypes.AddLiquidity, props: { data: original } })}
        size="sm"
        variant="outline"
        className="px-3"
      >
        Deposit
      </Button>
      <Button
        onClick={() =>
          toggle({
            type: ModalTypes.WithdrawLiquidity,
            props: { data: original },
          })
        }
        size="sm"
        variant="outline"
        className="px-3"
      >
        Withdraw
      </Button>
    </div>
  );
};

export const actionsColumn: ColumnDef<SwapPoolColumn> = {
  header: '',
  accessorKey: 'address',
  enableSorting: false,
  enableGlobalFilter: false,
  enableColumnFilter: false,
  size: 150,
  cell: (props): JSX.Element | null => <ActionsColumn {...props} />,
} as const;

export const columns = [nameColumn, liabilitiesColumn, reservesColumn, aprColumn, myAmountColumn, actionsColumn];
