import { cacheKeys, inactiveOptions } from '../../constants/cache';
import { QueryOptions } from '../../shared/helpers';
import { decimalToRaw } from '../../shared/parseNumbers';
import { useContractRead } from './useContractRead';

export type UseSharesTargetWorthProps = {
  address: string | undefined;
  lpTokenDecimalAmount: number;
  lpTokenDecimals: number;
  abi: Dict;
};

export function useSharesTargetWorth(
  { address, lpTokenDecimalAmount, abi, lpTokenDecimals }: UseSharesTargetWorthProps,
  queryOptions?: QueryOptions,
) {
  return useContractRead([cacheKeys.sharesTargetWorth, lpTokenDecimalAmount], {
    abi,
    address,
    method: 'sharesTargetWorth',
    args: [decimalToRaw(lpTokenDecimalAmount, lpTokenDecimals).toString()],
    queryOptions: {
      ...inactiveOptions['1m'],
      ...queryOptions,
      enabled: Boolean(address && lpTokenDecimalAmount && queryOptions?.enabled !== false),
    },
  });
}
