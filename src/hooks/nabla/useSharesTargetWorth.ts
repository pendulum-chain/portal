import { cacheKeys, inactiveOptions } from '../../constants/cache';
import { ContractBalance, parseContractBalanceResponse } from '../../helpers/contracts';
import { decimalToRaw } from '../../shared/parseNumbers/metric';
import { useContractRead } from './useContractRead';

export type UseSharesTargetWorthProps = {
  address: string | undefined;
  lpTokenDecimalAmount: number;
  lpTokenDecimals: number;
  poolTokenDecimals: number;
  abi: Dict;
};

// TODO Torsten: where is this still used? Not for swap pool withdrawals anymore
export function useSharesTargetWorth(
  { address, lpTokenDecimalAmount, abi, lpTokenDecimals, poolTokenDecimals }: UseSharesTargetWorthProps,
  enabled?: boolean,
) {
  return useContractRead<ContractBalance | undefined>([cacheKeys.sharesTargetWorth, lpTokenDecimalAmount], {
    abi,
    address,
    method: 'sharesTargetWorth',
    args: [decimalToRaw(lpTokenDecimalAmount, lpTokenDecimals).toString()],
    queryOptions: {
      ...inactiveOptions['1m'],
      enabled: Boolean(address && lpTokenDecimalAmount && enabled !== false),
    },
    parseSuccessOutput: parseContractBalanceResponse.bind(null, poolTokenDecimals),
    parseError: 'Could not load the share value.',
  });
}
