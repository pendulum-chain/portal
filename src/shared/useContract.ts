// https://www.npmjs.com/package/@pendulum-chain/api-solang?activeTab=readme
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { ApiPromise } from '@polkadot/api';
import { Abi, ContractPromise } from '@polkadot/api-contract';
import { ContractOptions } from '@polkadot/api-contract/types';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { useMemo } from 'preact/compat';
import { emptyCacheKey, emptyFn, gasDefaults, QueryOptions } from './helpers';
import { useSharedState } from './Provider';

type ContractOpts = ContractOptions | ((api: ApiPromise) => ContractOptions);
export type UseContractProps<TAbi extends Abi | Record<string, unknown>> = QueryOptions & {
  abi: TAbi;
  address?: string;
  owner?: string;
  method: string;
  args?: any[];
  options?: ContractOpts;
};

const getOptions = (options: ContractOpts | undefined, api: ApiPromise) =>
  typeof options === 'function'
    ? options(api)
    : options || {
        gasLimit: api.createType('WeightV2', gasDefaults),
        storageDepositLimit: null,
      };

export const useContract = <TAbi extends Abi | Record<string, unknown>>(
  key: QueryKey,
  { abi, address, owner, method, args, options, ...rest }: UseContractProps<TAbi>,
) => {
  const { api } = useSharedState();
  const contract = useMemo(
    () => (api && address ? new ContractPromise(api, abi, address) : undefined),
    [abi, address, api],
  );
  const enabled = !!contract && rest.enabled !== false && !!api && !!owner;
  const query = useQuery(
    enabled ? key : emptyCacheKey,
    enabled
      ? async () => {
          const opts = getOptions(options, api);
          const response = await contract.query[method](owner, opts, ...(args || []));
          if (!response?.result?.isOk || response?.output === undefined) {
            throw response;
          }
          // ? TODO: maybe not ideal to cache only output
          // caching the whole object causes the output to be converted to hex string
          return response.output?.toString();
        }
      : emptyFn,
    {
      ...rest,
      enabled,
    },
  );
  return { ...query, enabled };
};
