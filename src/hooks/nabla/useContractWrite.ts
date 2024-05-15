/* eslint-disable @typescript-eslint/no-explicit-any */
import { executeMessage, ExecuteMessageResult } from '@pendulum-chain/api-solang';
import { Abi } from '@polkadot/api-contract';
import { MutationOptions, useMutation, UseMutationResult } from '@tanstack/react-query';
import { useCallback, useMemo } from 'preact/compat';

import { defaultWriteLimits } from '../../shared/helpers';
import { useSharedState } from '../../shared/Provider';
import { createWriteOptions } from '../../services/api/helpers';
import { config } from '../../config';

const isDevelopment = config.isDev;

export type UseContractWriteProps<TAbi extends Record<string, unknown>> = {
  abi: TAbi;
  address?: string;
  method: string;
  args?: any[];
  mutateOptions: Partial<MutationOptions<ExecuteMessageResult, ExecuteMessageResult, any[]>>;
};

export type UseContractWriteResponse = UseMutationResult<ExecuteMessageResult, ExecuteMessageResult, any[], unknown> & {
  isReady: boolean;
};

export function useContractWrite<TAbi extends Record<string, unknown>>({
  abi,
  address,
  method,
  args,
  mutateOptions,
}: UseContractWriteProps<TAbi>): UseContractWriteResponse {
  const { api, signer, address: walletAddress } = useSharedState();

  const contractAbi = useMemo(
    () => (abi && api?.registry ? new Abi(abi, api.registry.getChainProperties()) : undefined),
    [abi, api?.registry],
  );

  const isReady = !!contractAbi && !!address && !!api && !!walletAddress && !!signer;
  const submit = useCallback(
    async (submitArgs?: any[]): Promise<ExecuteMessageResult> => {
      if (!isReady) throw 'Missing data';
      //setTransaction({ status: 'Pending' });
      const fnArgs = submitArgs || args || [];
      const contractOptions = createWriteOptions(api);

      if (isDevelopment) {
        console.log('write', 'call message write', address, method, args, submitArgs);
      }

      let response;
      try {
        response = await executeMessage({
          abi: contractAbi,
          api,
          callerAddress: walletAddress,
          contractDeploymentAddress: address,
          getSigner: () =>
            Promise.resolve({
              type: 'signer',
              address: walletAddress,
              signer,
            }),
          messageName: method,
          messageArguments: fnArgs,
          limits: { ...defaultWriteLimits, ...contractOptions },
          gasLimitTolerancePercentage: 10, // Allow 3 fold gas tolerance
        });
      } catch (error) {
        console.error('An error occurred', error);
        throw error;
      }

      if (isDevelopment) {
        console.log('write', 'call message write response', address, method, fnArgs, response);
      }

      if (response?.result?.type !== 'success') throw response;
      return response;
    },
    [address, api, args, contractAbi, isReady, method, signer, walletAddress],
  );

  const mutation = useMutation(submit, mutateOptions);
  return { ...mutation, isReady };
}
