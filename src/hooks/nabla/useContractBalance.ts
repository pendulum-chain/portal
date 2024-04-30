import { MessageCallResult } from '@pendulum-chain/api-solang';
import { UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'preact/compat';
import { cacheKeys } from '../../shared/constants';
import { getMessageCallValue, QueryOptions } from '../../shared/helpers';
import { rawToDecimal, prettyNumbers } from '../../shared/parseNumbers';
import { useSharedState } from '../../shared/Provider';
import { useContractRead } from './useContractRead';

export type UseBalanceProps = {
  /** token or contract address */
  contractAddress: string | undefined;
  /** account address */
  account?: string;
  /** contract abi */
  abi: Dict;
  /** parse decimals */
  decimals: number | undefined;
};
export type UseBalanceResponse = Pick<
  UseQueryResult<MessageCallResult | undefined, unknown>,
  'refetch' | 'isLoading'
> & {
  balance?: number;
  formatted?: string;
  enabled: boolean;
};

export const useContractBalance = (
  { contractAddress, account, abi, decimals }: UseBalanceProps,
  queryOptions?: QueryOptions,
): UseBalanceResponse => {
  const { api, address: defAddress } = useSharedState();
  const address = account || defAddress;

  const enabled = !!api && !!address && queryOptions?.enabled !== false;
  const query = useContractRead([cacheKeys.balance, contractAddress, address], {
    abi,
    address: contractAddress,
    method: 'balanceOf',
    args: [address],
    queryOptions: {
      ...(queryOptions ?? {}),
      cacheTime: 120000,
      staleTime: 120000,
      retry: 2,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onError: console.error,
      enabled,
    },
  });

  const { data } = query;
  const val = useMemo(() => {
    if (!data || data.result.type !== 'success') return undefined;
    const value = getMessageCallValue(data);
    const balance = rawToDecimal(value.toString(), decimals!).toNumber();
    return { balance, formatted: prettyNumbers(balance) };
  }, [data, decimals]);

  return {
    isLoading: query.isLoading,
    refetch: query.refetch,
    enabled,
    ...val,
  };
};
