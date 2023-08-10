import { Asset } from '../../models/Asset';
import { SwapPool } from '../../models/SwapPool';
import { TenantName } from '../../models/Tenant';
import type { AppConfig } from './types';

export type NablaConfig = AppConfig &
  Partial<
    Record<
      TenantName,
      {
        router: string;
        oracle: string;
        curve: string;
        backstopPool: string; // ! temporary (should come from indexer)
        swapPools: SwapPool[]; // ! temporary (should come from indexer)
        assets: Asset[]; // ! temporary (should come from indexer)
      }
    >
  >;

const assets = [
  {
    address: '6h6JMHYBV7P6uQekZXzHmmpzx7tzHutTyx448MnFogR6dNde',
    name: 'Mock USD',
    symbol: 'mUSD',
    decimals: 12,
  },
  {
    address: '6hJHAXrCYNFbuDzgwZb2S1UhamDBtR8Jw1cn9gKQ4QewvSh1',
    name: 'Mock EUR',
    symbol: 'mEUR',
    decimals: 12,
  },
  {
    address: '6kwiNhGTHAfGb5x3gZBQxhiG2rf9F8W7Da3HhQRdBHQopSHv',
    name: 'Mock ETH',
    symbol: 'mETH',
    decimals: 12,
  },
];

export const nablaConfig = {
  tenants: [TenantName.Foucoco],
  foucoco: {
    router: '6mrTyH54tYXKsVxrahapG1S54cVMqqwqtnmTLLbj3NZT2f1k',
    oracle: '6n32n4F11qfFXfFYhVj15fChZTXpVP5zJSM98361gK5QKrxW',
    curve: '6mnENTpY6B5mqtUHsjv3BxwKucT9hqF761QrYGfD22ccLzdC',
    backstopPool: '6h7p67AZyzWiN42FSzkWyGZaqMuajo2BAm43LXBQHVXJ8sq7',
    assets: assets,
    swapPools: [
      {
        address: '6gxRBjkhfaWMAhMQmEA1MUvGssc2f9ercXPZrzFUKWTTaCyq',
        asset: assets[0],
        apr: 0.0,
      },
      {
        address: '6kauoQTrdZzBCR3RcqJKJwxEGeQyj6zd3yx8H7XBNwbzrcT5',
        asset: assets[1],
        apr: 0.0,
      },
      {
        address: '6mMDtTPgghASfTpW4cuwdxSJvuM6mvGMxTHZxXQf9cWVUioS',
        asset: assets[2],
        apr: 0.0,
      },
    ],
  },
} satisfies NablaConfig;
