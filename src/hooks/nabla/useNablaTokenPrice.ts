import { cacheKeys, inactiveOptions, QueryOptions } from '../../constants/cache';
import { priceOracleAbi } from '../../contracts/nabla/PriceOracle';
import { useGetAppDataByTenant } from '../useGetAppDataByTenant';
import { useContractRead } from './useContractRead';

export function useNablaTokenPrice(address: string | undefined, queryOptions?: QueryOptions) {
  const { oracle } = useGetAppDataByTenant('nabla').data || {};

  const enabled = !!address && !!oracle && queryOptions?.enabled !== false;

  return useContractRead([cacheKeys.tokenPrice, address], {
    abi: priceOracleAbi,
    address: oracle,
    method: 'getAssetPrice',
    args: [address],
    noWalletAddressRequired: true,
    queryOptions: {
      ...inactiveOptions['1m'],
      ...queryOptions,
      enabled,
    },
  });
}
