/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { ApiPromise } from '@polkadot/api';
import { SubmittableResultValue } from '@polkadot/api-base/types';
import { Abi, ContractPromise } from '@polkadot/api-contract';
import { DispatchError, ExtrinsicStatus } from '@polkadot/types/interfaces';
import { MutationOptions, useMutation } from '@tanstack/react-query';
import { useMemo, useState } from 'preact/compat';
import { useSharedState } from './Provider';

// TODO: fix types
export type TransactionsStatus = {
  hex?: string;
  status?: ExtrinsicStatus['type'] | 'Pending';
};

export type UseContractWriteProps<
  TAbi extends Abi | Record<string, unknown> = Record<string, unknown>,
  TVariables = void,
> = Partial<MutationOptions<TransactionsStatus | undefined, DispatchError, TVariables>> & {
  abi: TAbi;
  address?: string;
  fn?: (
    data: {
      contract: any; //ContractPromise;
      api: ApiPromise;
      address: string;
      signer: unknown;
    },
    variables: TVariables,
  ) => any;
};

export const useContractWrite = <TAbi extends Abi | Record<string, unknown>, TVariables = void>({
  abi,
  address,
  fn,
  ...rest
}: UseContractWriteProps<TAbi, TVariables>) => {
  const { api, signer, address: walletAddress } = useSharedState();

  const [transaction, setTransaction] = useState<TransactionsStatus | undefined>();
  const contract = useMemo(
    () => (api && address ? new ContractPromise(api, abi, address) : undefined),
    [abi, address, api],
  );
  const isReady = !!contract && !!fn && !!api && !!walletAddress && !!signer;
  const submit = async (variables: TVariables) => {
    return new Promise<TransactionsStatus | undefined>((resolve, reject) => {
      if (!isReady) return reject(undefined);
      setTransaction({ status: 'Pending' });
      const unsubPromise: Promise<Fn> | undefined = fn({ contract, api, signer, address: walletAddress }, variables)
        .signAndSend(walletAddress, { signer }, (result: SubmittableResultValue) => {
          const tx = {
            hex: result.txHash.toHex(),
            status: result.status.type,
          };
          setTransaction(tx);
          if (result.dispatchError) {
            // TODO: improve this part - log and format errors
            if (result.dispatchError.isModule) {
              // for module errors, we have the section indexed, lookup
              const decoded = api.registry.findMetaError(result.dispatchError.asModule);
              const { docs, name, section } = decoded;
              console.log(`${section}.${name}: ${docs.join(' ')}`);
            } else {
              // Other, CannotLookup, BadOrigin, no extra info
              console.log(result.dispatchError.toString());
            }
            reject(result.dispatchError);
          }
          if (result.status.isFinalized) {
            if (unsubPromise) {
              unsubPromise.then((unsub) => (typeof unsub === 'function' ? unsub() : undefined));
            }
            resolve(tx);
          }
        })
        .catch((err: Error) => {
          console.log(err);
          setTransaction(undefined);
          reject(err);
        });
    });
  };
  const mutation = useMutation(submit, rest);
  return { ...mutation, data: transaction, isReady };
};
