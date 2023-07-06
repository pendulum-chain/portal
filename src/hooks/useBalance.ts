import { FrameSystemAccountInfo } from '@polkadot/types/lookup';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'preact/compat';
import { cacheKeys, inactiveOptions, QueryOptions } from '../constants/cache';
import { useGlobalState } from '../GlobalStateProvider';
import { emptyFn } from '../helpers/general';
import { nativeToDecimal, prettyNumbers } from '../helpers/parseNumbers';
import { useNodeInfoState } from '../NodeInfoProvider';

export type UseBalanceResponse = UseQueryResult<FrameSystemAccountInfo | undefined, unknown> & {
  balance: string | undefined;
};

// ! TODO
export const useBalance = (tokenAddress?: string, options?: QueryOptions): UseBalanceResponse => {
  const {
    state: { api },
  } = useNodeInfoState();
  const { address } = useGlobalState().walletAccount || {};

  const enabled = !!api && !!address && !!tokenAddress && options?.enabled !== false;
  const query = useQuery<FrameSystemAccountInfo | undefined, unknown>(
    enabled ? [cacheKeys.walletBalance, tokenAddress, address] : [''],
    enabled ? () => api.query.system.account(address) : emptyFn,
    {
      ...inactiveOptions['3m'],
      ...options,
      enabled,
    },
  );
  const { data } = query;

  const balance = useMemo(() => {
    if (!data?.data) return undefined;
    return prettyNumbers(nativeToDecimal(data.data.free).toNumber());
  }, [data?.data]);

  return {
    ...query,
    balance,
  };
};
