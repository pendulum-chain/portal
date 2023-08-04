import { FrameSystemAccountInfo } from '@polkadot/types/lookup';
import { UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'preact/compat';
import { cacheKeys, inactiveOptions, QueryOptions } from '../constants/cache';
import { mockERC20 } from '../contracts/nabla/MockERC20';
import { useGlobalState } from '../GlobalStateProvider';
import { nativeToDecimal, prettyNumbers } from '../helpers/parseNumbers';
import { useNodeInfoState } from '../NodeInfoProvider';
import { createOptions } from '../services/api/helpers';
import { useContract } from './useContract';

export type UseBalanceResponse = UseQueryResult<FrameSystemAccountInfo | undefined, unknown> & {
  balance?: number;
  formatted?: string;
  enabled: boolean;
};

export const useBalance = (tokenAddress?: string, options?: QueryOptions): UseBalanceResponse => {
  const {
    state: { api },
  } = useNodeInfoState();
  const { address } = useGlobalState().walletAccount || {};

  const enabled = !!api && !!address && options?.enabled !== false;
  const query = useContract([cacheKeys.walletBalance, tokenAddress, address], {
    abi: mockERC20,
    address: tokenAddress, // contract address
    fn:
      ({ contract, api }) =>
      () =>
        contract.query.balanceOf(address, createOptions(api), address),
    ...inactiveOptions['3m'],
    ...options,
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
