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
};

export const amountColumn: ColumnDef<PortfolioAsset> = {
  header: 'Amount',
  accessorKey: 'amount',
};

export const usdValueColumn: ColumnDef<PortfolioAsset> = {
  header: 'USD Value',
  accessorKey: 'usdValue',
  accessorFn: ({ price, amount }) => '$ ' + (price * amount).toFixed(2),
};
