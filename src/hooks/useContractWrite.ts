/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { ApiPromise } from '@polkadot/api';
import { SubmittableResultValue } from '@polkadot/api-base/types';
import { Abi, ContractPromise } from '@polkadot/api-contract';
import { ExtrinsicStatus } from '@polkadot/types/interfaces';
import { WalletAccount } from '@talismn/connect-wallets';
import { MutationOptions, useMutation } from '@tanstack/react-query';
import { useMemo, useState } from 'preact/compat';
import { useGlobalState } from '../GlobalStateProvider';
import { useNodeInfoState } from '../NodeInfoProvider';

// TODO: fix types
export type TransactionsStatus = {
  hex?: string;
  status?: ExtrinsicStatus['type'] | 'Pending';
};

export type UseContractWriteProps<
  TAbi extends Abi | Record<string, unknown> = Record<string, unknown>,
  TVariables = void,
> = Partial<MutationOptions<undefined, unknown, TVariables>> & {
  abi: TAbi;
  address?: string;
  fn?: (
    data: {
      contract: any; //ContractPromise;
      api: ApiPromise;
      walletAccount: WalletAccount;
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
  const { api } = useNodeInfoState().state;
  const walletAccount = useGlobalState().walletAccount;
  const [transaction, setTransaction] = useState<TransactionsStatus | undefined>();
  const contract = useMemo(
    () => (api && address ? new ContractPromise(api, abi, address) : undefined),
    [abi, address, api],
  );
  const isReady = !!contract && !!fn && !!api && !!walletAccount && !!walletAccount.signer;
  const submit = async (variables: TVariables) => {
    if (!isReady) return undefined;
    return new Promise<undefined>((resolve, reject) => {
      setTransaction({ status: 'Pending' });
      const unsubPromise: Promise<Fn> | undefined = fn({ contract, api, walletAccount }, variables)
        .signAndSend(walletAccount.address, { signer: walletAccount.signer }, (result: SubmittableResultValue) => {
          setTransaction({
            hex: result.txHash.toHex(),
            status: result.status.type,
          });
          if (result.dispatchError) {
            // TODO: complete
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
            resolve(undefined);
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

export type UseContractWriteResponse = ReturnType<typeof useContractWrite>;
