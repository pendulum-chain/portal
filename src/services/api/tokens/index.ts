import { ApiPromise } from '@polkadot/api';
import { Asset } from '../../../models/Asset';

const list: Asset[] = [];

export const getSwapTokens = async (api: ApiPromise): Promise<Asset[]> => {
  // ! TODO: get the list of tokens for swap component
  console.log(api);
  return Promise.resolve(list);
};
