import { SwapPoolColumn } from '../components/Pools/Swap/columns';
import { addresses } from '../contracts/NablaAddresses';
import { BackstopPool } from '../models/BackstopPool';

const mock = addresses.foucoco;

export const swapPools: SwapPoolColumn[] = [
  {
    ...mock.swapPoolsWithMeta[0],
    asset: mock.tokensWithMeta[2],
    balance: 100,
    liabilities: 1,
    wallet: undefined,
    myAmount: 100,
    coverage: 5,
  },
  {
    ...mock.swapPoolsWithMeta[1],
    asset: mock.tokensWithMeta[0],
    balance: 0,
    liabilities: 1,
    wallet: undefined,
    myAmount: 0,
    coverage: 15,
  },
  {
    ...mock.swapPoolsWithMeta[2],
    asset: mock.tokensWithMeta[1],
    balance: 0,
    liabilities: 3,
    wallet: undefined,
    myAmount: 54,
    coverage: 0,
  },
];
export const backstopPool: BackstopPool[] = [
  {
    address: '6koGpLFoFAbBRCPDBVpqsENKqPeDASTJL9UCoqh7wFLbS3Tf',
    asset: mock.tokensWithMeta[2],
    liabilities: 100,
    totalSupply: 1000,
  },
];
