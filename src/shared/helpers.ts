import { Limits } from '@pendulum-chain/api-solang';
import type { QueryKey, UseQueryOptions } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryOptions<TFnData = any, TError = any, TData = TFnData> = Omit<
  UseQueryOptions<TFnData, TError, TData, QueryKey>,
  'queryKey' | 'queryFn'
>;
export const emptyCacheKey = [''];

export const defaultReadLimits: Limits = {
  gas: {
    refTime: '10000000000000000',
    proofSize: '10000000000000000',
  },
  storageDeposit: undefined,
};

export const defaultWriteLimits: Limits = {
  gas: {
    refTime: '10000000000000',
    proofSize: '10000000000',
  },
  storageDeposit: undefined,
};
