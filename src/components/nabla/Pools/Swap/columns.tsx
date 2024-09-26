import { CellContext, ColumnDef } from '@tanstack/react-table';
import { Badge, Button, Tooltip } from 'react-daisyui';
import { useModalToggle } from '../../../../services/modal';
import { rawToDecimal } from '../../../../shared/parseNumbers/metric';
import { NablaInstanceBackstopPool, NablaInstanceSwapPool } from '../../../../hooks/nabla/useNablaInstance';
import { swapPoolAbi } from '../../../../contracts/nabla/SwapPool';
import { Erc20Balance } from '../../common/Erc20Balance';
import { LiquidityModalProps } from './SwapPoolModals';
import Big from 'big.js';

export type SwapPoolColumn = NablaInstanceSwapPool & {
  backstopPool: NablaInstanceBackstopPool;
};

const BIG_100 = new Big(100);

export const assetColumn: ColumnDef<SwapPoolColumn> = {
  header: 'Asset',
  accessorKey: 'asset',
  accessorFn: (row) => row.token?.symbol || '',
  enableSorting: true,
} as const;

export const liabilitiesColumn: ColumnDef<SwapPoolColumn> = {
  header: () => (
    <Tooltip color="secondary" message="Amount of liquidity provided initially by LPs" position="bottom">
      Pool liabilities
    </Tooltip>
  ),
  accessorKey: 'liabilities',
  accessorFn: (row) => rawToDecimal(row.totalLiabilities, row.lpTokenDecimals).toFixed(2, 0),
  enableSorting: true,
  meta: {
    className: 'text-right justify-end',
  },
} as const;

export const reservesColumn: ColumnDef<SwapPoolColumn> = {
  header: () => (
    <Tooltip message="Amount of tokens in the pool" color="secondary" position="bottom">
      Reserves
    </Tooltip>
  ),
  accessorKey: 'reserves',
  accessorFn: (row) => rawToDecimal(row.reserve, row.token.decimals).toFixed(2, 0),
  enableSorting: true,
  meta: {
    className: 'text-right justify-end',
  },
} as const;

export const aprColumn: ColumnDef<SwapPoolColumn> = {
  header: 'APR',
  accessorKey: 'apr',
  accessorFn: (row) => rawToDecimal(row.apr, row.token.decimals).mul(BIG_100).toFixed(2, 0),
  cell: (props): JSX.Element | null => (
    <Badge className="h-auto rounded-lg bg-success/35 px-2 py-1 text-blackAlpha-700 dark:text-white">
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
  cell: ({ row: { original } }) => (
    <Erc20Balance
      abi={swapPoolAbi}
      erc20ContractDefinition={{
        contractAddress: original.id,
        decimals: original.lpTokenDecimals,
        symbol: original.symbol,
      }}
    />
  ),
  enableSorting: false,
  meta: {
    className: 'text-right justify-end',
  },
} as const;

const ActionsColumn = ({ row: { original } }: CellContext<SwapPoolColumn, unknown>): JSX.Element | null => {
  const toggle = useModalToggle<LiquidityModalProps>();
  return (
    <div className="flex items-center justify-end gap-2 text-right">
      <Button
        onClick={() => toggle({ type: 'AddLiquidity', props: { data: original } })}
        size="sm"
        variant="outline"
        className="px-3"
      >
        Deposit
      </Button>
      <Button
        onClick={() =>
          toggle({
            type: 'WithdrawLiquidity',
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

export const columnsWithMyAmount = [
  assetColumn,
  liabilitiesColumn,
  reservesColumn,
  aprColumn,
  myAmountColumn,
  actionsColumn,
];
export const columnsWithoutMyAmount = [assetColumn, liabilitiesColumn, reservesColumn, aprColumn, actionsColumn];
