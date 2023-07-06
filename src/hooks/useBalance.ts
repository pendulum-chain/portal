import { FrameSystemAccountInfo } from '@polkadot/types/lookup';
import { UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'preact/compat';
import { cacheKeys, inactiveOptions, QueryOptions } from '../constants/cache';
import { mockERC20 } from '../contracts/MockERC20';
import { useGlobalState } from '../GlobalStateProvider';
import { nativeToDecimal, prettyNumbers } from '../helpers/parseNumbers';
import { useNodeInfoState } from '../NodeInfoProvider';
import { useContract } from './useContract';

export type UseBalanceResponse = UseQueryResult<FrameSystemAccountInfo | undefined, unknown> & {
  balance?: number;
  formatted?: string;
};

/* const createOptions = (api: ApiPromise) => ({
  gasLimit: api.createType('WeightV2', {
    refTime: '100000000000',
    proofSize: '1000000',
  }) as WeightV2,
  storageDepositLimit: null,
}); */

export const useBalance = (tokenAddress?: string, options?: QueryOptions): UseBalanceResponse => {
  const {
    state: { api },
  } = useNodeInfoState();
  const { address } = useGlobalState().walletAccount || {};

  const enabled = !!api && !!address && !!tokenAddress && options?.enabled !== false;
  const query = useContract([cacheKeys.walletBalance, tokenAddress, address], {
    abi: mockERC20,
    address: tokenAddress, // contract address
    // ! TODO: fix types
    fn: (contract) => (contract.query as any).balanceOf(address, { gasLimit: -1 } /* createOptions(api) */, address),
    ...inactiveOptions['3m'],
    ...options,
    enabled,
  });
  const { data } = query;

  const val = useMemo(() => {
    if (!data?.data) return {};
    const balance = nativeToDecimal(data.data.free).toNumber();
    return { balance, formatted: prettyNumbers(balance) };
  }, [data?.data]);

  return {
    ...query,
    ...val,
  };
};
