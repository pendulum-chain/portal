import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import request from 'graphql-request';
import { graphql } from '../../../gql/gql';
import { BackstopPool } from '../../../gql/graphql';
import { cacheKeys, inactiveOptions } from '../../constants/cache';
import { emptyCacheKey, emptyFn } from '../../helpers/general';
import { useGetAppDataByTenant } from '../useGetAppDataByTenant';

export type UseBackstopPoolProps = UseQueryOptions<BackstopPool | undefined>;

export const useBackstopPool = (id: string, options?: UseBackstopPoolProps) => {
  const { indexerUrl } = useGetAppDataByTenant('nabla').data || {};
  const enabled = !!indexerUrl && options?.enabled !== false;
  return useQuery<BackstopPool | undefined>(
    enabled ? [cacheKeys.backstopPools, id, indexerUrl] : emptyCacheKey,
    enabled
      ? async () => (await request(indexerUrl, getBackstopPool, { id }))?.backstopPoolById as BackstopPool
      : emptyFn,
    {
      ...inactiveOptions['1m'],
      refetchInterval: 30000,
      ...options,
      enabled,
    },
  );
};

export const getBackstopPool = graphql(`
  query getBackstopPool($id: String!) {
    backstopPoolById(id: $id) {
      id
      liabilities
      paused
      reserves
      totalSupply
      token {
        decimals
        id
        name
        symbol
      }
      router {
        swapPools(where: { router_isNull: false, paused_not_eq: true }) {
          id
          liabilities
          paused
          reserves
          totalSupply
          token {
            decimals
            id
            name
            symbol
          }
        }
        id
      }
    }
  }
`);
