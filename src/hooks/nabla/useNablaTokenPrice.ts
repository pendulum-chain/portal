import { cacheKeys, inactiveOptions, QueryOptions } from '../../constants/cache';
import { priceOracleAbi } from '../../contracts/nabla/PriceOracle';
import { useGetAppDataByTenant } from '../useGetAppDataByTenant';
import { useContractRead } from './useContractRead';

export function useNablaTokenPrice(address: string | undefined, options?: QueryOptions) {
  const { oracle } = useGetAppDataByTenant('nabla').data || {};

  const enabled = !!address && !!oracle && options?.enabled !== false;

  return useContractRead([cacheKeys.tokenPrice, address], {
    ...inactiveOptions['1m'],
    ...options,
    enabled,
    address: oracle,
    abi: priceOracleAbi,
    method: 'getAssetPrice',
    noWalletAddressRequired: true,
    args: [address],
  });
}
