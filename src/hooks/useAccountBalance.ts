import { FrameSystemAccountInfo } from '@polkadot/types/lookup';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'preact/compat';
import { cacheKeys, inactiveOptions } from '../constants/cache';
import { useGlobalState } from '../GlobalStateProvider';
import { nativeToDecimal, prettyNumbers } from '../helpers/parseNumbers';
import { useNodeInfoState } from '../NodeInfoProvider';

export interface UseAccountBalanceResponse {
  globalState: ReturnType<typeof useGlobalState>;
  query: UseQueryResult<FrameSystemAccountInfo>;
  balance?: string;
}

export const useAccountBalance = (): UseAccountBalanceResponse => {
  const globalState = useGlobalState();
  const { walletAccount } = globalState;
  const {
    state: { api },
  } = useNodeInfoState();

  const enabled = !!api && !!walletAccount;
  const query = useQuery(
    enabled ? [cacheKeys.walletBalance, walletAccount?.address] : [''],
    () => (api && walletAccount ? api.query.system.account(walletAccount.address) : undefined),
    {
      enabled,
      ...inactiveOptions[0],
      onError: (err) => console.error(err),
    },
  );
  const { data } = query;

  const balance = useMemo(() => {
    if (!data?.data || !walletAccount) return undefined;
    return prettyNumbers(nativeToDecimal(data.data.free).toNumber());
  }, [data?.data, walletAccount]);

  return {
    globalState,
    query,
    balance,
  };
};
