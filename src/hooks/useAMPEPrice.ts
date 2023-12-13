import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { QueryOptions, cacheKeys, inactiveOptions } from '../constants/cache';
import { emptyCacheKey, emptyFn } from '../helpers/general';

interface PriceData {
  data: {
    bundleById: {
      ethPrice: string;
    };
  };
}

export const useTokens = (options?: QueryOptions) => {
  const indexerUrl = 'https://squid.subsquid.io/amplitude-squid/graphql';
  const enabled = !!indexerUrl && options?.enabled !== false;
  return useQuery<PriceData | undefined>(
    enabled ? [cacheKeys.tokens, indexerUrl] : emptyCacheKey,
    enabled
      ? async () => {
          const response = (await request(indexerUrl, getPrice)) as PriceData;
          return response;
        }
      : emptyFn,
    {
      ...inactiveOptions['15m'],
      ...options,
    },
  );
};

const getPrice = `
  query GetAMPEPrice {
    bundleById(id: "1") {
      ethPrice
    }
  }
`;
