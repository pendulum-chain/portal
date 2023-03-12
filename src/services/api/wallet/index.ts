import { ApiPromise } from '@polkadot/api';
import { Asset } from '../../../models/Asset';

export const getWalletBalances = async (
  api: ApiPromise,
  address: string,
): Promise<Asset[]> => {
  console.log(api, address);
  return Promise.resolve([]);
};
