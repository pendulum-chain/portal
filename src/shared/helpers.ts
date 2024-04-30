import { Limits, MessageCallResult } from '@pendulum-chain/api-solang';
import type { QueryKey, UseQueryOptions } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryOptions<TFnData = any, TError = any, TData = any> = Partial<
  Omit<UseQueryOptions<TFnData, TError, TData, QueryKey>, 'queryKey' | 'queryFn'>
>;

export const emptyFn = () => undefined;
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

export const getMessageCallValue = (response: MessageCallResult | undefined) => {
  return response?.result.type === 'success' ? response.result.value : undefined;
};
