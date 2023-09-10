import { FrameSystemAccountInfo } from '@polkadot/types/lookup';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'preact/compat';
import { cacheKeys } from './constants';
import { emptyCacheKey, emptyFn, QueryOptions } from './helpers';
import { nativeToDecimal, prettyNumbers } from './parseNumbers';
import { useSharedState } from './Provider';

export interface UseAccountBalanceResponse {
  query: UseQueryResult<FrameSystemAccountInfo | undefined, unknown>;
  balance?: string;
  enabled: boolean;
}

const isValid = (value: unknown) => value !== undefined && typeof value !== 'string';

export const useAccountBalance = (
  address?: string,
  options?: QueryOptions<FrameSystemAccountInfo | undefined, unknown> & { decimals?: number },
): UseAccountBalanceResponse => {
  const { api, address: defAddress } = useSharedState();

  const accountAddress = address || defAddress;
  const enabled = !!api && !!accountAddress && options?.enabled !== false;
  const query = useQuery<FrameSystemAccountInfo | undefined, unknown>(
    enabled ? [cacheKeys.accountBalance, accountAddress] : emptyCacheKey,
    enabled
      ? async () => {
          const response = await api.query.system.account(accountAddress);
          const val = response?.data?.free;
          if (!isValid(val)) throw new Error('Error!');
          return response;
        }
      : emptyFn,
    {
      cacheTime: 0,
      staleTime: 0,
      retry: 2,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onError: console.error,
      ...options,
      enabled,
    },
  );
  const { data } = query;
  const decimals = options?.decimals;
  const balance = useMemo(() => {
    const val = data?.data.free;
    if (!isValid(val)) return undefined;
    return prettyNumbers(nativeToDecimal(val || 0, decimals).toNumber());
  }, [data?.data, decimals]);

  return {
    query,
    balance,
    enabled,
  };
};
