import { cacheKeys, inactiveOptions, QueryOptions } from '../../constants/cache';
import { priceOracleAbi } from '../../contracts/nabla/PriceOracle';
import { useContract } from '../../shared/useContract';
import { useGetAppDataByTenant } from '../useGetAppDataByTenant';

export const useTokenPrice = (address: string, owner?: string, options?: QueryOptions) => {
  const { oracle } = useGetAppDataByTenant('nabla').data || {};
  const enabled = !!address && !!oracle && options?.enabled !== false;

  return useContract([cacheKeys.tokenPrice, address], {
    ...inactiveOptions['1m'],
    ...options,
    enabled,
    address: oracle,
    owner,
    abi: priceOracleAbi,
    method: 'getAssetPrice',
    args: [address],
  });
};
