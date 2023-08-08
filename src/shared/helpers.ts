import type { QueryKey, UseQueryOptions } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryOptions<TFnData = any, TError = any, TData = any> = Partial<
  Omit<UseQueryOptions<TFnData, TError, TData, QueryKey>, 'queryKey' | 'queryFn'>
>;

export const emptyFn = () => undefined;
export const emptyCacheKey = [''];
