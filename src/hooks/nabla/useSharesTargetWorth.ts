import { cacheKeys, inactiveOptions } from '../../constants/cache';
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
  enabled?: boolean,
) {
  return useContractRead([cacheKeys.sharesTargetWorth, lpTokenDecimalAmount], {
    abi,
    address,
    method: 'sharesTargetWorth',
    args: [decimalToRaw(lpTokenDecimalAmount, lpTokenDecimals).toString()],
    queryOptions: {
      ...inactiveOptions['1m'],
      enabled: Boolean(address && lpTokenDecimalAmount && enabled !== false),
    },
  });
}
