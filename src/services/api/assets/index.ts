import { SwapPoolColumn } from '../../../components/Pools/Swap/columns';
import { Asset } from '../../../models/Asset';
import { BackstopPool } from '../../../models/BackstopPool';
import { backstopPool, swapPools, swapTokens } from '../../mocks';

// ! TODO
export const assetsApi = {
  getSwapTokens: async (): Promise<Asset[]> => {
    return new Promise((r) => setTimeout(() => r(swapTokens), 1000));
  },
  getSwapPools: async (): Promise<SwapPoolColumn[]> => {
    return new Promise((r) => setTimeout(() => r(swapPools), 1000));
  },
  getBackstopPools: async (): Promise<BackstopPool[]> => {
    return new Promise((r) => setTimeout(() => r(backstopPool), 1000));
  },
};
