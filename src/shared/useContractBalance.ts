import { Abi } from '@polkadot/api-contract';
import { FrameSystemAccountInfo } from '@polkadot/types/lookup';
import { UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'preact/compat';
import { erc20WrapperAbi } from '../contracts/nabla/ERC20Wrapper';
import { cacheKeys } from './constants';
import { QueryOptions } from './helpers';
import { nativeToDecimal, prettyNumbers } from './parseNumbers';
import { useSharedState } from './Provider';
import { useContract } from './useContract';

export type UseBalanceProps<TAbi extends Abi | Record<string, unknown>> = {
  /** token or contract address */
  contractAddress?: string;
  /** account address */
  account?: string;
  /** contract abi */
  abi?: TAbi;
  /** parse decimals */
  decimals?: number;
};
export type UseBalanceResponse = UseQueryResult<FrameSystemAccountInfo | undefined, unknown> & {
  balance?: number;
  formatted?: string;
  enabled: boolean;
};

export const useContractBalance = <TAbi extends Abi | Record<string, unknown>>(
  { contractAddress, account, abi, decimals }: UseBalanceProps<TAbi>,
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
    abi: abi || erc20WrapperAbi,
    address: contractAddress,
    owner: address,
    method: 'balanceOf',
    args: [address],
    enabled,
  });
  const { data } = query;
  const val = useMemo(() => {
    if (!data) return undefined;
    const balance = nativeToDecimal(parseFloat(data || '0'), decimals).toNumber();
    return { balance, formatted: prettyNumbers(balance) };
  }, [data, decimals]);

  return {
    ...query,
    ...val,
  };
};
