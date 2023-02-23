import { ApiPromise } from '@polkadot/api';
import { Asset } from '../../../models/Asset';
import { fnOrEmpty } from '../helpers';

const list: Asset[] = [];

export const getSwapTokens = fnOrEmpty(
  async (api: ApiPromise): Promise<Asset[]> => {
    // TODO: get the list of tokens for swap component
    const assets = await api.query.assets?.metadata?.entries();
    console.log(assets);
    return Promise.resolve(list);
  },
);
