import { ColumnDef } from '@tanstack/table-core';
import CoinIcon from '../../assets/coin-placeholder.png';
export interface TAsset {
  token: string;
  tokenIcon?: () => Element;
  price: number;
  amount: number;
}

export const tokenColumn: ColumnDef<TAsset> = {
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

export const priceColumn: ColumnDef<TAsset> = {
  header: 'Price',
  accessorKey: 'price',
};

export const amountColumn: ColumnDef<TAsset> = {
  header: 'Amount',
  accessorKey: 'amount',
};

export const usdValueColumn: ColumnDef<TAsset> = {
  header: 'USD Value',
  accessorKey: 'usdValue',
  accessorFn: ({ price, amount }) => (price * amount).toFixed(2),
};
