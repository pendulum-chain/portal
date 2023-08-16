import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { graphql } from '../../../gql/gql';
import { BackstopPool } from '../../../gql/graphql';
import { nablaConfig } from '../../config/apps/nabla';
import { cacheKeys, inactiveOptions } from '../../constants/cache';
import { emptyCacheKey, emptyFn } from '../../helpers/general';
import { useGetTenantData } from '../useGetTenantData';

export type UseBackstopPoolsProps = UseQueryOptions<BackstopPool[] | undefined>;

export const useBackstopPools = (options?: UseBackstopPoolsProps) => {
  const { indexerUrl } = useGetTenantData(nablaConfig)[0] || {};
  const enabled = !!indexerUrl && options?.enabled !== false;
  return useQuery<BackstopPool[] | undefined>(
    enabled ? [cacheKeys.backstopPools, indexerUrl] : emptyCacheKey,
    enabled ? async () => (await request(indexerUrl, getBackstopPools))?.backstopPools as BackstopPool[] : emptyFn,
    {
      ...inactiveOptions['1m'],
      refetchInterval: 30000,
      ...options,
      enabled,
    },
  );
};

export const getBackstopPools = graphql(`
  query getBackstopPools {
    backstopPools {
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
    }
  }
`);
