import { FrameSystemAccountInfo } from '@polkadot/types/lookup';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'preact/compat';
import { emptyCacheKey, QueryOptions } from './helpers';
import { nativeToDecimal, prettyNumbers } from './parseNumbers/metric';
import { useSharedState } from './Provider';
import { cacheKeys } from '../constants/cache';
import { calculateTransferableBalance } from '../helpers/substrate';

export interface UseAccountBalanceResponse {
  query: UseQueryResult<FrameSystemAccountInfo | undefined, unknown>;
  balances: { total: string; transferable: string };
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
    async () => {
      if (!enabled) return undefined;
      const response = await api.query.system.account(accountAddress);
      const val = response?.data?.free;
      if (!isValid(val)) throw new Error('Error!');
      return response;
    },
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

  const balances = useMemo(() => {
    if (!data || !data?.data) return { total: '0', transferable: '0' };

    const { free: freeRaw, frozen: frozenRaw, reserved: reservedRaw } = data.data;

    const free = nativeToDecimal(freeRaw || 0, decimals);
    const frozen = nativeToDecimal(frozenRaw || 0, decimals);
    const reserved = nativeToDecimal(reservedRaw || 0, decimals);
    const total = prettyNumbers(free.toNumber());
    const transferable = prettyNumbers(calculateTransferableBalance(free, frozen, reserved).toNumber());
    return { total, transferable };
  }, [data, decimals]);

  return {
    query,
    balances,
    enabled,
  };
};
