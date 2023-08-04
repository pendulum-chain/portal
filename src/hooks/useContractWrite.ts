/* eslint-disable @typescript-eslint/ban-types */
import { TransactionInfo } from '@pendulum-chain/types/interfaces';
import { ApiPromise } from '@polkadot/api';
import { Abi, ContractPromise } from '@polkadot/api-contract';
import { WalletAccount } from '@talismn/connect-wallets';
import { MutationOptions, useMutation } from '@tanstack/react-query';
import { useMemo, useState } from 'preact/compat';
import { useGlobalState } from '../GlobalStateProvider';
import { useNodeInfoState } from '../NodeInfoProvider';

export type Transactions = TransactionInfo & {
  status: 'idle' | 'pending' | 'loading' | 'success' | 'error';
};

export type UseContractWriteProps<TAbi, TVariables, TData> = Partial<
  MutationOptions<TData | undefined, unknown, TVariables>
> & {
  abi: TAbi;
  address?: string;
  fn?: (
    data: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contract: any; //ContractPromise; // TODO: fix types
      api: ApiPromise;
      walletAccount: WalletAccount;
    },
    variables: TVariables,
  ) => Promise<TData | undefined>;
};
export const useContractWrite = <TAbi extends Abi | Record<string, unknown>, TData = unknown, TVariables = void>({
  abi,
  address,
  fn,
  ...rest
}: UseContractWriteProps<TAbi, TVariables, TData>) => {
  const { api } = useNodeInfoState().state;
  const walletAccount = useGlobalState().walletAccount;
  const [transactionStatus, setStatus] = useState<Transactions | undefined>(); // TODO: implement
  const contract = useMemo(
    () => (api && address ? new ContractPromise(api, abi, address) : undefined),
    [abi, address, api],
  );
  const isReady = !!contract && !!fn && !!api && !!walletAccount && !!walletAccount.signer;
  const submit = async (variables: TVariables) =>
    isReady ? fn({ contract, api, walletAccount }, variables) : undefined;
  const mutation = useMutation(submit, rest);
  return { ...mutation, transactionStatus, isReady };
};
