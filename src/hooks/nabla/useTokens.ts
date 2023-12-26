import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { graphql } from '../../../gql/gql';
import { Token } from '../../../gql/graphql';
import { cacheKeys, inactiveOptions, QueryOptions } from '../../constants/cache';
import { emptyCacheKey, emptyFn } from '../../helpers/general';
import { useGetAppDataByTenant } from '../useGetAppDataByTenant';

export type TokensData = {
  tokensMap: Record<string, Token>;
  tokens: Token[] | undefined;
};

export const useTokens = (options?: QueryOptions) => {
  const { indexerUrl, assets } = useGetAppDataByTenant('nabla').data || {};
  const enabled = !!indexerUrl && options?.enabled !== false && !!assets;
  return useQuery<TokensData | undefined>(
    enabled ? [cacheKeys.tokens, indexerUrl] : emptyCacheKey,
    enabled
      ? async () => {
          const response = (await request(indexerUrl, getTokens, { ids: assets }))?.nablaTokens as Token[];
          return response?.reduce(
            (acc, curr) => {
              acc.tokensMap[curr.id] = curr;
              return acc;
            },
            {
              tokens: response,
              tokensMap: {},
            } as TokensData,
          );
        }
      : emptyFn,
    {
      ...inactiveOptions['15m'],
      ...options,
    },
  );
};

const getTokens = graphql(`
  query getTokens($ids: [String!]) {
    nablaTokens(where: { id_in: $ids }) {
      id
      name
      symbol
      decimals
    }
  }
`);
