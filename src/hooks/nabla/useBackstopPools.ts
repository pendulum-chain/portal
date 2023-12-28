import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import request from 'graphql-request';
import { graphql } from '../../../gql/gql';
import { BackstopPool } from '../../../gql/graphql';
import { cacheKeys, inactiveOptions } from '../../constants/cache';
import { emptyCacheKey, emptyFn } from '../../helpers/general';
import { useGetAppDataByTenant } from '../useGetAppDataByTenant';
import { mockBackstopPools } from './mock';

export type UseBackstopPoolsProps = UseQueryOptions<BackstopPool[] | undefined>;

export const useBackstopPools = (options?: UseBackstopPoolsProps) => {
  const { indexerUrl, backstopPools } = useGetAppDataByTenant('nabla').data || {};
  const enabled = !!indexerUrl && !!backstopPools && options?.enabled !== false;
  return useQuery<BackstopPool[] | undefined>(
    enabled ? [cacheKeys.backstopPools, indexerUrl] : emptyCacheKey,
    enabled
      ? async () =>
          (mockBackstopPools || // TODO: temporary solution
            (await request(indexerUrl, getBackstopPools, { ids: backstopPools }))?.backstopPools) as BackstopPool[]
      : emptyFn,
    {
      ...inactiveOptions['1m'],
      refetchInterval: 30000,
      ...options,
      enabled,
    },
  );
};

export const getBackstopPools = graphql(`
  query getBackstopPools($ids: [String!]) {
    backstopPools(where: { paused_eq: false, id_in: $ids }) {
      id
      liabilities
      paused
      reserves
      totalSupply
      token {
        id
        decimals
        name
        symbol
      }
      router {
        swapPools(where: { router_isNull: false, paused_not_eq: true }) {
          id
        }
        id
      }
    }
  }
`);
