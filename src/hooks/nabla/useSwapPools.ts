import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import request from 'graphql-request';
import { graphql } from '../../../gql/gql';
import { SwapPool } from '../../../gql/graphql';
import { cacheKeys, inactiveOptions } from '../../constants/cache';
import { emptyCacheKey, emptyFn } from '../../helpers/general';
import { useGetAppDataByTenant } from '../useGetAppDataByTenant';
import { mockSwapPools } from './mock';

export type UseSwapPoolsProps = UseQueryOptions<SwapPool[] | undefined>;

export const useSwapPools = (options?: UseSwapPoolsProps) => {
  const { indexerUrl, swapPools } = useGetAppDataByTenant('nabla').data || {};
  const enabled = !!indexerUrl && !!swapPools && options?.enabled !== false;
  return useQuery<SwapPool[] | undefined>(
    enabled ? [cacheKeys.swapPools, indexerUrl] : emptyCacheKey,
    enabled
      ? async () =>
          // TODO: temporary solution
          (mockSwapPools || (await request(indexerUrl, getSwapPools, { ids: swapPools }))?.swapPools) as SwapPool[]
      : emptyFn,
    {
      ...inactiveOptions['1m'],
      refetchInterval: 30000,
      ...options,
      enabled,
    },
  );
};

export const getSwapPools = graphql(`
  query getSwapPools($ids: [String!]) {
    swapPools(where: { paused_eq: false, id_in: $ids }) {
      id
      liabilities
      paused
      reserves
      totalSupply
      token {
        id
        name
        symbol
        decimals
      }
      router {
        id
        paused
      }
      backstop {
        id
        liabilities
        paused
        reserves
        totalSupply
      }
    }
  }
`);
