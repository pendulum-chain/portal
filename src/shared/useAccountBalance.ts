import { FrameSystemAccountInfo } from '@polkadot/types/lookup';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'preact/compat';
import { useGlobalState } from '../GlobalStateProvider';
import { useNodeInfoState } from '../NodeInfoProvider';
import { cacheKeys } from './constants';
import { emptyCacheKey, emptyFn, QueryOptions } from './helpers';
import { nativeToDecimal, prettyNumbers } from './parseNumbers';

export interface UseAccountBalanceResponse {
  query: UseQueryResult<FrameSystemAccountInfo | undefined, unknown>;
  balance?: string;
  enabled: boolean;
}

// TODO: refactor useNodeInfoState and useGlobalState
export const useAccountBalance = (
  address?: string,
  options?: QueryOptions<FrameSystemAccountInfo | undefined, unknown>,
): UseAccountBalanceResponse => {
  const wallet = useGlobalState().walletAccount;
  const {
    state: { api },
  } = useNodeInfoState();

  const accountAddress = address || wallet?.address;
  const enabled = !!api && !!accountAddress && options?.enabled !== false;
  const query = useQuery<FrameSystemAccountInfo | undefined, unknown>(
    enabled ? [cacheKeys.accountBalance, accountAddress] : emptyCacheKey,
    enabled ? () => api.query.system.account(accountAddress) : emptyFn,
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

  const balance = useMemo(() => {
    if (!data?.data || !accountAddress) return undefined;
    return prettyNumbers(nativeToDecimal(data.data.free).toNumber());
  }, [data?.data, accountAddress]);

  return {
    query,
    balance,
    enabled,
  };
};
