/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Limits, messageCall } from '@pendulum-chain/api-solang';
import { ApiPromise } from '@polkadot/api';
import { Abi } from '@polkadot/api-contract';
import { DispatchError, ExtrinsicStatus } from '@polkadot/types/interfaces';
import { MutationOptions, useMutation } from '@tanstack/react-query';
import { useState } from 'preact/compat';
import { createWriteOptions } from '../services/api/helpers';
import { useSharedState } from './Provider';

// TODO: fix/improve types
// - parse abi file
export type TransactionsStatus = {
  hex?: string;
  status?: ExtrinsicStatus['type'] | 'Pending';
};

export type UseContractWriteProps<TAbi extends Abi | Record<string, unknown> = Record<string, unknown>> = Partial<
  MutationOptions<TransactionsStatus | undefined, DispatchError, any[] | void>
> & {
  abi: TAbi;
  address?: string;
  method: string;
  args?: any[];
  options?: Limits | ((api: ApiPromise) => Limits);
};

const defaultLimits: Limits = {
  gas: {
    refTime: '18000000000',
    proofSize: '1750000',
  },
  storageDeposit: undefined,
};

export const useContractWrite = <TAbi extends Abi | Record<string, unknown>>({
  abi,
  address,
  method,
  args,
  options,
  ...rest
}: UseContractWriteProps<TAbi>) => {
  const { api, signer, address: walletAddress } = useSharedState();
  const [transaction, setTransaction] = useState<TransactionsStatus | undefined>();

  const isReady = !!abi && !!address && !!api && !!walletAddress && !!signer;
  const submit = async (submitArgs?: any[] | void): Promise<any> => {
    if (!isReady) throw 'Missing data';
    setTransaction({ status: 'Pending' });
    const fnArgs = submitArgs || args || [];
    const contractOptions = (typeof options === 'function' ? options(api) : options) || createWriteOptions(api);

    /**
     * return new Promise<TransactionsStatus | undefined>((resolve, reject) => {
      const unsubPromise = contract.tx[method](contractOptions || {}, ...fnArgs)
        .signAndSend(walletAddress, { signer }, (result: SubmittableResultValue) => {
          const tx = {
            hex: result.txHash.toHex(),
            status: result.status.type,
          };
          setTransaction(tx);
          if (result.dispatchError) {
            parseTransactionError(result, api);
            reject(result);
          }
          if (result.status.isFinalized) {
            if (unsubPromise) {
              unsubPromise.then((unsub) => (typeof unsub === 'function' ? unsub() : undefined));
            }
            resolve(tx);
          }
        })
        .catch((err: Error) => {
          console.error(err);
          setTransaction(undefined);
          reject(err);
        });
    });
     */
    return messageCall({
      abi: abi as Abi,
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
  console.log('test', mutation.data);
  return { ...mutation, data: transaction, isReady };
};
