import { cacheKeys, inactiveOptions, QueryOptions } from '../../constants/cache';
import { useContract } from '../../shared/useContract';

export const useTokenPrice = (address: string, options?: QueryOptions) => {
  const enabled = !!address && options?.enabled !== false;
  return useContract([cacheKeys.tokenPrice, address], {
    enabled,
    ...inactiveOptions['1m'],
    ...options,
    address: oracleAddress,
    abi: priceOracleAbi,
    method: 'getAssetPrice',
    args: [address],
  });
};
