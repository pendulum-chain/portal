/* eslint-disable @typescript-eslint/no-explicit-any */
import { Limits, messageCall, MessageCallResult } from '@pendulum-chain/api-solang';
import { ApiPromise } from '@polkadot/api';
import { Abi } from '@polkadot/api-contract';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { useMemo } from 'preact/compat';
import { defaultReadLimits, emptyCacheKey, emptyFn, QueryOptions } from './helpers';
import { useSharedState } from './Provider';

type ContractOpts = Limits | ((api: ApiPromise) => Limits);
export type UseContractProps<TAbi extends Record<string, unknown>> = QueryOptions & {
  abi: TAbi;
  address?: string;
  owner?: string;
  method: string;
  args?: any[];
  options?: ContractOpts;
};

const getLimits = (options: ContractOpts | undefined, api: ApiPromise) =>
  typeof options === 'function' ? options(api) : options || defaultReadLimits;

export const useContract = <TAbi extends Record<string, unknown>>(
  key: QueryKey,
  { abi, address, owner, method, options, args, ...rest }: UseContractProps<TAbi>,
) => {
  const { api, address: walletAddress } = useSharedState();
  const contractAbi = useMemo(
    () => (abi && api?.registry ? new Abi(abi, api.registry.getChainProperties()) : undefined),
    [abi, api?.registry],
  );

  const enabled = !!contractAbi && rest.enabled !== false && !!address && !!api && !!owner && !!walletAddress;
  const query = useQuery<MessageCallResult | undefined, MessageCallResult | undefined>(
    enabled ? key : emptyCacheKey,
    enabled
      ? async () => {
          const limits = getLimits(options, api);
          const response = await messageCall({
            abi: contractAbi,
            api,
            callerAddress: walletAddress,
            contractDeploymentAddress: address,
            getSigner: () => Promise.resolve({} as any), // TODO: cleanup in api-solang lib
            messageName: method,
            messageArguments: args || [],
            limits,
          });
          if (response?.result?.type !== 'success') throw response;
          return response;
        }
      : emptyFn,
    {
      ...rest,
      enabled,
    },
  );
  return { ...query, enabled };
};
