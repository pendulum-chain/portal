/* eslint-disable @typescript-eslint/ban-types */
import { Abi, ContractPromise } from '@polkadot/api-contract';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { useMemo } from 'preact/compat';
import { useNodeInfoState } from '../NodeInfoProvider';
import { QueryOptions } from '../constants/cache';
import { emptyFn } from '../helpers/general';

export type UseContractProps<T, TFn> = QueryOptions & {
  abi: T;
  address?: string;
  fn: TFn;
};
export const useContract = <
  T extends Abi | Record<string, unknown>,
  TFn extends (contract: ContractPromise) => () => Promise<unknown>,
>(
  key: QueryKey,
  { abi, address, fn, ...rest }: UseContractProps<T, TFn>,
) => {
  const { api } = useNodeInfoState().state;
  const contract = useMemo(
    () => (api && address ? new ContractPromise(api, abi, address) : undefined),
    [abi, address, api],
  );
  const enabled = !!contract && rest.enabled !== false;
  const query = useQuery(enabled ? key : [''], enabled ? () => fn(contract) : emptyFn, { ...rest, enabled });
  return { ...query, enabled };
};
