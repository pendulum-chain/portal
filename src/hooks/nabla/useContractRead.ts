/* eslint-disable @typescript-eslint/no-explicit-any */
import { messageCall, MessageCallResult } from '@pendulum-chain/api-solang';
import { Abi } from '@polkadot/api-contract';
import { QueryKey, useQuery, UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'preact/compat';

import { defaultReadLimits, emptyCacheKey, emptyFn, QueryOptions } from '../../shared/helpers';
import { useSharedState } from '../../shared/Provider';

// TODO Torsten
import { blurp } from '../../blurp';

export type UseContractProps = {
  abi: Dict;
  address: string | undefined;
  method: string;
  args?: any[];
  noWalletAddressRequired?: boolean;
  queryOptions: QueryOptions;
};

export type UseContractResult = Pick<
  UseQueryResult<MessageCallResult | undefined>,
  'refetch' | 'isLoading' | 'data' | 'fetchStatus'
>;

const ALICE = '6mfqoTMHrMeVMyKwjqomUjVomPMJ4AjdCm1VReFtk7Be8wqr';

export function useContractRead(
  key: QueryKey,
  { abi, address, method, args, noWalletAddressRequired, queryOptions }: UseContractProps,
): UseContractResult {
  const { api, address: walletAddress } = useSharedState();
  const contractAbi = useMemo(
    () => (abi && api?.registry ? new Abi(abi, api.registry.getChainProperties()) : undefined),
    [abi, api?.registry],
  );

  const actualWalletAddress = noWalletAddressRequired ? ALICE : walletAddress;

  const enabled = !!contractAbi && queryOptions.enabled !== false && !!address && !!api && !!actualWalletAddress;
  const query = useQuery<MessageCallResult | undefined>(
    enabled ? key : emptyCacheKey,
    enabled
      ? async () => {
          const limits = defaultReadLimits;
          blurp('read', 'Call message', address, method, args);

          const response = await messageCall({
            abi: contractAbi,
            api,
            callerAddress: actualWalletAddress,
            contractDeploymentAddress: address,
            getSigner: () => Promise.resolve({} as any), // TODO: cleanup in api-solang lib
            messageName: method,
            messageArguments: args || [],
            limits,
          });
          blurp('read', 'messageCall result', method, response);

          return response;
        }
      : emptyFn,
    {
      ...queryOptions,
      enabled,
    },
  );

  blurp('read', !!contractAbi, queryOptions.enabled !== false, !!address, !!api, !!actualWalletAddress);
  blurp(
    'read',
    'useContract result',
    method,
    enabled,
    key,
    address,
    method,
    args,
    query.status,
    query.data,
    (query.data?.result as any)?.value,
    (query.data?.result as any)?.value?.toString(),
  );

  return {
    refetch: query.refetch,
    isLoading: query.isLoading,
    data: query.data,
    fetchStatus: query.fetchStatus,
  };
}
