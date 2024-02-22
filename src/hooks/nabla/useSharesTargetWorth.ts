import { cacheKeys, inactiveOptions } from '../../constants/cache';
import { QueryOptions } from '../../shared/helpers';
import { decimalToRaw } from '../../shared/parseNumbers';
import { useContract } from '../../shared/useContract';

export type UseSharesTargetWorthProps = {
  address: string | undefined;
  lpTokenDecimalAmount: number;
  lpTokenDecimals: number;
  abi: Dict;
};

export const useSharesTargetWorth = (
  { address, lpTokenDecimalAmount, abi, lpTokenDecimals }: UseSharesTargetWorthProps,
  options?: QueryOptions,
) => {
  return useContract([cacheKeys.sharesTargetWorth, lpTokenDecimalAmount], {
    ...inactiveOptions['1m'],
    ...options,
    address,
    abi,
    method: 'sharesTargetWorth',
    args: [decimalToRaw(lpTokenDecimalAmount, lpTokenDecimals).toString()],
    enabled: Boolean(address && lpTokenDecimalAmount && options?.enabled !== false),
  });
};
