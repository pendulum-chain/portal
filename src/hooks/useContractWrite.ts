/* eslint-disable @typescript-eslint/ban-types */
import { Abi, ContractPromise } from '@polkadot/api-contract';
import { MutationOptions, useMutation } from '@tanstack/react-query';
import { useMemo } from 'preact/compat';
import { useNodeInfoState } from '../NodeInfoProvider';

export type UseContractWriteProps<TAbi, TVariables, TData> = Partial<
  MutationOptions<TData | undefined, unknown, TVariables>
> & {
  abi: TAbi;
  address?: string;
  fn?: (contract: ContractPromise, variables: TVariables) => Promise<TData | undefined>;
};
export const useContractWrite = <TAbi extends Abi | Record<string, unknown>, TData = unknown, TVariables = void>({
  abi,
  address,
  fn,
  ...rest
}: UseContractWriteProps<TAbi, TVariables, TData>) => {
  const { api } = useNodeInfoState().state;
  const contract = useMemo(
    () => (api && address ? new ContractPromise(api, abi, address) : undefined),
    [abi, address, api],
  );
  const isReady = !!contract && !!fn;
  const submit = async (variables: TVariables) => (isReady ? fn(contract, variables) : undefined);
  const mutation = useMutation(submit, rest);
  return { ...mutation, isReady };
};
