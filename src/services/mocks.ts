import { SwapPoolColumn } from '../components/Pools/Swap/columns';
import { Asset } from '../models/Asset';
import { BackstopPool } from '../models/BackstopPool';

// ! TODO: remove
export const swapTokens: Asset[] = [
  {
    address: '123456',
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 2,
  },
  {
    address: '123457',
    name: 'USDC',
    symbol: 'USDC',
    decimals: 2,
  },
  {
    address: '123458',
    name: 'Pendulum',
    symbol: 'PEN',
    decimals: 2,
  },
  {
    address: '123459',
    name: 'Bitcoin',
    symbol: 'BTC',
    decimals: 2,
  },
];
export const swapPools: SwapPoolColumn[] = [
  {
    asset: swapTokens[0],
    apr: 5,
    balance: 100,
    liabilities: 1,
    wallet: undefined,
    myAmount: 100,
    coverage: 5,
  },
  {
    asset: swapTokens[1],
    apr: 1.5,
    balance: 0,
    liabilities: 1,
    wallet: undefined,
    myAmount: 0,
    coverage: 15,
  },
  {
    asset: swapTokens[2],
    apr: 8.1,
    balance: 0,
    liabilities: 3,
    wallet: undefined,
    myAmount: 54,
    coverage: 0,
  },
  {
    asset: swapTokens[3],
    apr: 10.5,
    balance: 89,
    liabilities: 3,
    wallet: undefined,
    myAmount: 11,
    coverage: 2,
  },
];
export const backstopPool: BackstopPool[] = [
  {
    assets: [swapTokens[0], swapTokens[1], swapTokens[2]],
  },
  {
    assets: [swapTokens[1], swapTokens[2], swapTokens[3]],
  },
  {
    assets: [swapTokens[0], swapTokens[2]],
  },
];
