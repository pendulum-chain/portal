import { MessageCallResult } from '@pendulum-chain/api-solang';
import { UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'preact/compat';
import { cacheKeys } from './constants';
import { getMessageCallValue, QueryOptions } from './helpers';
import { rawToDecimal, prettyNumbers } from './parseNumbers';
import { useSharedState } from './Provider';
import { useContract } from './useContract';

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
  options?: QueryOptions,
): UseBalanceResponse => {
  const { api, address: defAddress } = useSharedState();
  const address = account || defAddress;

  const enabled = !!api && !!address && options?.enabled !== false;
  const query = useContract([cacheKeys.balance, contractAddress, address], {
    cacheTime: 120000,
    staleTime: 120000,
    retry: 2,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    onError: console.error,
    ...options,
    abi,
    address: contractAddress,
    method: 'balanceOf',
    args: [address],
    enabled,
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
