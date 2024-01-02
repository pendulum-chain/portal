/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Limits, messageCall, MessageCallResult } from '@pendulum-chain/api-solang';
import { ApiPromise } from '@polkadot/api';
import { Abi } from '@polkadot/api-contract';
import { DispatchError, ExtrinsicStatus } from '@polkadot/types/interfaces';
import { MutationOptions, useMutation } from '@tanstack/react-query';
import { useMemo, useState } from 'preact/compat';
import { createWriteOptions } from '../services/api/helpers';
import { useSharedState } from './Provider';

// TODO: fix/improve types - parse abi file
export type TransactionsStatus = {
  hex?: string;
  status?: ExtrinsicStatus['type'] | 'Pending';
};

export type UseContractWriteProps<TAbi extends Record<string, unknown>> = Partial<
  MutationOptions<MessageCallResult | undefined, DispatchError, any[] | void>
> & {
  abi: TAbi;
  address?: string;
  method: string;
  args?: any[];
  options?: Limits | ((api: ApiPromise) => Limits);
};

const defaultLimits: Limits = {
  gas: {
    refTime: '30000000000',
    proofSize: '2400000',
  },
  storageDeposit: undefined,
};

export const useContractWrite = <TAbi extends Record<string, unknown>>({
  abi,
  address,
  method,
  args,
  options,
  ...rest
}: UseContractWriteProps<TAbi>) => {
  const { api, signer, address: walletAddress } = useSharedState();
  const [transaction /* setTransaction */] = useState<TransactionsStatus | undefined>();
  const contractAbi = useMemo(
    () => (abi && api?.registry ? new Abi(abi, api.registry.getChainProperties()) : undefined),
    [abi, api?.registry],
  );

  const isReady = !!contractAbi && !!address && !!api && !!walletAddress && !!signer;
  const submit = async (submitArgs?: any[] | void): Promise<any> => {
    if (!isReady) throw 'Missing data';
    //setTransaction({ status: 'Pending' });
    const fnArgs = submitArgs || args || [];
    const contractOptions = (typeof options === 'function' ? options(api) : options) || createWriteOptions(api);
    return messageCall({
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
      limits: { ...defaultLimits, ...contractOptions },
    });
  };
  const mutation = useMutation(submit, rest);
  return { ...mutation, transaction, isReady };
};

export type UseContractWriteResponse = ReturnType<typeof useContractWrite>;
