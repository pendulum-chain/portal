import { FrameSystemAccountInfo } from '@polkadot/types/lookup';
import { UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'preact/compat';
import { mockERC20 } from '../contracts/nabla/MockERC20';
import { useSharedState } from './Provider';
import { cacheKeys } from './constants';
import { QueryOptions } from './helpers';
import { nativeToDecimal, prettyNumbers } from './parseNumbers';
import { useContract } from './useContract';

export type UseBalanceProps = {
  /** token or contract address */
  contractAddress?: string;
  /** account address */
  account?: string;
};
export type UseBalanceResponse = UseQueryResult<FrameSystemAccountInfo | undefined, unknown> & {
  balance?: number;
  formatted?: string;
  enabled: boolean;
};

export const useContractBalance = (
  { contractAddress, account }: UseBalanceProps,
  options?: QueryOptions,
): UseBalanceResponse => {
  const { api, address: defAddress } = useSharedState();
  const address = account || defAddress;

  const enabled = !!api && !!address && options?.enabled !== false;
  const query = useContract([cacheKeys.balance, contractAddress, address], {
    cacheTime: 180000,
    staleTime: 180000,
    retry: 2,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    ...options,
    abi: mockERC20,
    address: contractAddress,
    fn:
      ({ contract, api }) =>
      () =>
        contract.query.balanceOf(
          address,
          {
            gasLimit: api.createType('WeightV2', {
              refTime: '100000000000',
              proofSize: '1000000',
            }),
            storageDepositLimit: null,
          },
          address,
        ),
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
