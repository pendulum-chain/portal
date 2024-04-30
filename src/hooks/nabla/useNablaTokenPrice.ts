import { cacheKeys, inactiveOptions } from '../../constants/cache';
import { priceOracleAbi } from '../../contracts/nabla/PriceOracle';
import { useGetAppDataByTenant } from '../useGetAppDataByTenant';
import { useContractRead } from './useContractRead';

export function useNablaTokenPrice(address: string | undefined, enabled?: boolean) {
  const { oracle } = useGetAppDataByTenant('nabla').data || {};

  enabled = !!address && !!oracle && enabled !== false;

  return useContractRead([cacheKeys.tokenPrice, address], {
    abi: priceOracleAbi,
    address: oracle,
    method: 'getAssetPrice',
    args: [address],
    noWalletAddressRequired: true,
    queryOptions: {
      ...inactiveOptions['1m'],
      enabled,
    },
  });
}
