import { cacheKeys, inactiveOptions } from '../../constants/cache';
import { priceOracleAbi } from '../../contracts/nabla/PriceOracle';
import { ContractBalance, parseContractBalanceResponse } from '../../helpers/contracts';
import { useGetAppDataByTenant } from '../useGetAppDataByTenant';
import { useContractRead } from './useContractRead';

const TOKEN_PRICE_DECIMALS = 12;

export function useNablaTokenPrice(address: string | undefined, enabled?: boolean) {
  const { oracle } = useGetAppDataByTenant('nabla').data || {};

  enabled = !!address && !!oracle && enabled !== false;

  return useContractRead<ContractBalance | undefined>([cacheKeys.tokenPrice, address], {
    abi: priceOracleAbi,
    address: oracle,
    method: 'getAssetPrice',
    args: [address],
    noWalletAddressRequired: true,
    queryOptions: {
      ...inactiveOptions['1m'],
      enabled,
    },
    parseSuccessOutput: parseContractBalanceResponse.bind(null, TOKEN_PRICE_DECIMALS),
    parseError: 'Could not retrieve asset price',
  });
}
