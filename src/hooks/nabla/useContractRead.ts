/* eslint-disable @typescript-eslint/no-explicit-any */

import { Abi } from '@polkadot/api-contract';
import { QueryKey, useQuery, UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'preact/compat';

import { defaultReadLimits, emptyCacheKey, QueryOptions } from '../../shared/helpers';
import { useSharedState } from '../../shared/Provider';
import { config } from '../../config';
import { readMessage, ReadMessageResult } from '@pendulum-chain/api-solang';

const isDevelopment = config.isDev;
const ALICE = '6mfqoTMHrMeVMyKwjqomUjVomPMJ4AjdCm1VReFtk7Be8wqr';

export type MessageCallErrorResult = ReadMessageResult & { type: 'error' | 'panic' | 'reverted' };

export type UseContractReadProps<ReturnType> = {
  abi: Dict;
  address: string | undefined;
  method: string;
  args: any[];
  noWalletAddressRequired?: boolean;
  parseSuccessOutput: (successResult: any) => ReturnType;
  parseError: string | ((errorResult: MessageCallErrorResult) => string);
  queryOptions: QueryOptions<ReturnType | undefined, string>;
};

export type UseContractReadResult<ReturnType> = UseQueryResult<ReturnType | undefined, string>;

export function useContractRead<ReturnType>(
  key: QueryKey,
  {
    abi,
    address,
    method,
    args,
    noWalletAddressRequired,
    queryOptions,
    parseSuccessOutput,
    parseError,
  }: UseContractReadProps<ReturnType>,
): UseContractReadResult<ReturnType> {
  const { api, address: walletAddress } = useSharedState();
  const contractAbi = useMemo(
    () => (abi && api?.registry ? new Abi(abi, api.registry.getChainProperties()) : undefined),
    [abi, api?.registry],
  );

  const actualWalletAddress = noWalletAddressRequired === true ? ALICE : walletAddress;

  const enabled = !!contractAbi && queryOptions.enabled === true && !!address && !!api && !!actualWalletAddress;
  console.log(
    'Execute contract read',
    address,
    method,
    enabled,
    !!contractAbi,
    queryOptions.enabled !== false,
    !!address,
    !!api,
    !!actualWalletAddress,
  );
  const query = useQuery<ReturnType | undefined, string>(
    enabled ? key : emptyCacheKey,
    async () => {
      if (isDevelopment) {
        console.log('read', 'Call message enabled', enabled);
      }
      if (!enabled) return;

      const limits = defaultReadLimits;

      if (isDevelopment) {
        console.log('read', 'Call message', address, method, args);
      }

      const response = await readMessage({
        abi: contractAbi,
        api,
        contractDeploymentAddress: address,
        callerAddress: actualWalletAddress,
        messageName: method,
        messageArguments: args || [],
        limits,
      });

      if (isDevelopment) {
        console.log('read', 'Call message result', address, method, args, response);
      }

      if (response.type !== 'success') {
        let message;
        if (typeof parseError === 'string') {
          message = parseError;
        } else {
          message = parseError(response as MessageCallErrorResult);
        }
        return Promise.reject(message);
      }

      return parseSuccessOutput(response.value);
    },
    {
      ...queryOptions,
      retry: false,
      enabled,
    },
  );

  return query;
}
