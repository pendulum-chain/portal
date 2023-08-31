import { ColumnDef } from '@tanstack/table-core';
import CoinIcon from '../../assets/coin-placeholder.png';
export interface PortfolioAsset {
  token: string;
  tokenIcon?: () => Element;
  price: number;
  amount: number;
  usdValue?: number;
}

export const tokenColumn: ColumnDef<PortfolioAsset> = {
  header: 'Token',
  accessorKey: 'token',
  enableMultiSort: true,
  cell: ({ row }) => {
    return (
      <div className="flex flex-row">
        <img src={CoinIcon} width={40} className="mr-2" />
        <div className="leading-10"> {row.original.token} </div>
      </div>
    );
  },
};

export const priceColumn: ColumnDef<PortfolioAsset> = {
  header: 'Price',
  accessorKey: 'price',
  enableMultiSort: true,
  cell: ({ row }) => {
    return <div title={row.original.price.toString()}>{row.original.price.toFixed(5)}</div>;
  },
};

export const amountColumn: ColumnDef<PortfolioAsset> = {
  header: 'Amount',
  accessorKey: 'amount',
  enableMultiSort: true,
  cell: ({ row }) => {
    return <div title={row.original.price.toString()}>{row.original.amount.toFixed(3)}</div>;
  },
};

export const usdValueColumn: ColumnDef<PortfolioAsset> = {
  header: 'USD Value',
  accessorKey: 'usdValue',
  enableMultiSort: true,
  accessorFn: ({ price, amount }) => '$ ' + (price * amount).toFixed(2),
};
