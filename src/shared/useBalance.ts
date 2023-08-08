import { FrameSystemAccountInfo } from '@polkadot/types/lookup';
import { UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'preact/compat';
import { useGlobalState } from '../GlobalStateProvider';
import { useNodeInfoState } from '../NodeInfoProvider';
import { mockERC20 } from '../contracts/nabla/MockERC20';
import { createOptions } from '../services/api/helpers';
import { cacheKeys } from './constants';
import { QueryOptions } from './helpers';
import { nativeToDecimal, prettyNumbers } from './parseNumbers';
import { useContract } from './useContract';

export type UseBalanceProps = {
  /** token or contract address */
  token?: string;
  /** account address */
  account?: string;
};
export type UseBalanceResponse = UseQueryResult<FrameSystemAccountInfo | undefined, unknown> & {
  balance?: number;
  formatted?: string;
  enabled: boolean;
};

// TODO: refactor useNodeInfoState and useGlobalState
export const useBalance = ({ token, account }: UseBalanceProps, options?: QueryOptions): UseBalanceResponse => {
  const {
    state: { api },
  } = useNodeInfoState();
  const wallet = useGlobalState().walletAccount;
  const address = account || wallet?.address;

  const enabled = !!api && !!address && options?.enabled !== false;
  const query = useContract([cacheKeys.balance, token, address], {
    cacheTime: 180000,
    staleTime: 180000,
    retry: 2,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    ...options,
    abi: mockERC20,
    address: token,
    fn:
      ({ contract, api }) =>
      () =>
        contract.query.balanceOf(address, createOptions(api), address),
    enabled,
  });
  const { data } = query;
  const val = useMemo(() => {
    if (!data?.result?.isOk || data?.output === undefined) return {};
    const balance = nativeToDecimal(parseFloat(data.output.toString()) || 0).toNumber();
    return { balance, formatted: prettyNumbers(balance) };
  }, [data]);

  return {
    ...query,
    ...val,
  };
};
