import { SwapPoolColumn } from '../components/Pools/Swap/columns';
import { nablaConfig } from '../config/apps/nabla';
import { BackstopPool } from '../models/BackstopPool';

const mock = nablaConfig.foucoco;

export const swapPools: SwapPoolColumn[] = [
  {
    ...mock.swapPools[0],
    asset: mock.assets[0],
    balance: 100,
    liabilities: 1,
    wallet: undefined,
    myAmount: 100,
    coverage: 5,
  },
  {
    ...mock.swapPools[1],
    asset: mock.assets[1],
    balance: 0,
    liabilities: 1,
    wallet: undefined,
    myAmount: 0,
    coverage: 15,
  },
  {
    ...mock.swapPools[2],
    asset: mock.assets[2],
    balance: 0,
    liabilities: 3,
    wallet: undefined,
    myAmount: 54,
    coverage: 0,
  },
];
export const backstopPool: BackstopPool[] = [
  {
    address: mock.backstopPool,
    asset: mock.assets[2],
    liabilities: 100,
    totalSupply: 1000,
  },
];
