import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { graphql } from '../../../gql/gql';
import { GetRouterQuery } from '../../../gql/graphql';
import { cacheKeys, inactiveOptions } from '../../constants/cache';
import { emptyCacheKey, emptyFn } from '../../helpers/general';
import { useGetAppDataByTenant } from '../useGetAppDataByTenant';

export type NablaInstanceRouter = NonNullable<GetRouterQuery['routerById']>;
export type NablaInstanceBackstopPool = NablaInstanceRouter['backstopPool'][number];
export type NablaInstanceSwapPool = NablaInstanceRouter['swapPools'][number];
export type NablaInstanceToken = NablaInstanceBackstopPool['token'];

export interface NablaInstance {
  router: NablaInstanceRouter;
  backstopPool: NablaInstanceBackstopPool;
  swapPools: NablaInstanceSwapPool[];
  tokens: Partial<Record<string, NablaInstanceToken>>;
}

export function useNablaInstance(): { nabla: NablaInstance | undefined; isLoading: boolean } {
  const { indexerUrl, router } = useGetAppDataByTenant('nabla').data ?? {};
  const enabled = !!indexerUrl && !!router;

  const result = useQuery<GetRouterQuery | undefined>(
    enabled ? [cacheKeys.nablaInstance] : emptyCacheKey,
    enabled ? async () => await request(indexerUrl, getNablaInstance, { id: router }) : emptyFn,
    {
      ...inactiveOptions['1m'],
      refetchInterval: 10000,
    },
  );

  if (result.data !== undefined && result.data.routerById && result.data.routerById.backstopPool.length === 1) {
    const router = result.data.routerById;
    const backstopPool = router.backstopPool[0];
    const tokensMap = router.swapPools.reduce((acc, pool) => ({ ...acc, [pool.token.id]: pool.token }), {
      [backstopPool.token.id]: backstopPool.token,
    });

    return {
      nabla: {
        router,
        backstopPool,
        swapPools: router.swapPools,
        tokens: tokensMap,
      },
      isLoading: result.isLoading,
    };
  }

  return { nabla: undefined, isLoading: result.isLoading };
}

export const getNablaInstance = graphql(`
  query getRouter($id: String!) {
    routerById(id: $id) {
      id
      swapPools {
        id
        paused
        name
        reserve
        reserveWithSlippage
        totalLiabilities
        totalSupply
        lpTokenDecimals
        apr
        symbol
        token {
          id
          decimals
          name
          symbol
        }
        insuranceFeeBps
        protocolTreasuryAddress
      }
      backstopPool {
        id
        name
        paused
        symbol
        totalSupply
        apr
        reserves
        lpTokenDecimals
        token {
          id
          decimals
          name
          symbol
        }
      }
      paused
    }
  }
`);
