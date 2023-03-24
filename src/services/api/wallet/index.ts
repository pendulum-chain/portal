import { ApiPromise } from '@polkadot/api';
import { Asset } from '../../../models/Asset';

export const getWalletBalances = async (api: ApiPromise, address: string): Promise<Asset[]> => {
  return new Promise((r) => setTimeout(() => r([]), 800));
};
