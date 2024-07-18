import { ColumnDef } from '@tanstack/table-core';
import { getIcon } from '../../shared/AssetIcons';
import { Asset } from 'stellar-sdk';

export interface PortfolioAsset {
  // token is the symbol of the asset
  token: string;
  // asset is also passed if it's a Stellar asset
  asset?: Asset;
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
        <img
          src={
            row.original.asset
              ? getIcon(row.original.asset.code, row.original.asset.issuer)
              : getIcon(row.original.token)
          }
          className="mr-2"
          style={{
            objectFit: 'cover',
            width: '32px',
            height: '32px',
          }}
        />
        <div className="leading-8"> {row.original.token} </div>
      </div>
    );
  },
};

export const priceColumn: ColumnDef<PortfolioAsset> = {
  header: 'Price',
  accessorKey: 'price',
  enableMultiSort: true,
  cell: ({ row }) => {
    return (
      <div title={row.original.price ? row.original.price.toString() : undefined}>
        {row.original.price ? '$ ' + row.original.price.toFixed(4) : '-'}
      </div>
    );
  },
};

export const amountColumn: ColumnDef<PortfolioAsset> = {
  header: 'Amount',
  accessorKey: 'amount',
  enableMultiSort: true,
  cell: ({ row }) => {
    const amount = row.original.amount;
    const amountToFixed = amount.toFixed(3);
    const displayValue = Number(amountToFixed) >= 0.001 ? amountToFixed : amount.toPrecision(3);
    return <div title={row.original.amount.toString()}>{displayValue}</div>;
  },
};

export const usdValueColumn: ColumnDef<PortfolioAsset> = {
  header: 'USD Value',
  accessorKey: 'usdValue',
  enableMultiSort: true,
  accessorFn: ({ price, amount }) => (price ? '$ ' + (price * amount).toFixed(2) : '-'),
  cell: ({ row }) => {
    const { price, amount } = row.original;
    return (
      <div title={price ? (price * amount).toString() : '-'}>{price ? '$ ' + (price * amount).toFixed(2) : '-'}</div>
    );
  },
};
