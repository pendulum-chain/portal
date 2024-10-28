import { useEffect, useCallback } from 'react';
import { SpacewalkPrimitivesCurrencyId } from '@polkadot/types/lookup';
import { Codec } from '@polkadot/types-codec/types';
import { StorageKey } from '@polkadot/types';
import { useQuery } from '@tanstack/react-query';
import { cacheKeys } from '../constants/cache';
import { useNodeInfoState } from '../NodeInfoProvider';
import { OrmlTraitsAssetRegistryAssetMetadata } from './useBuyout/types';

type CurrencyMetadataType = {
  decimals: string;
  name: string;
  symbol: string;
  additional: {
    diaKeys: {
      blockchain: string;
      symbol: string;
    };
    feePerSecond: string;
  };
  // There are more coming, but are not used in this context
};

interface UseAssetRegistryMetadata {
  getAssetMetadata: (
    currencyId: SpacewalkPrimitivesCurrencyId,
  ) => Promise<OrmlTraitsAssetRegistryAssetMetadata | undefined>;
  getNativeAssetMetadata: () => Promise<OrmlTraitsAssetRegistryAssetMetadata | undefined>;
  getAllAssetsMetadata: () => OrmlTraitsAssetRegistryAssetMetadata[];
}

function convertToOrmlAssetRegistryAssetMetadata(metadata: [StorageKey, Codec]): OrmlTraitsAssetRegistryAssetMetadata {
  const { decimals, name, symbol, additional } = metadata[1].toHuman() as CurrencyMetadataType;
  const currencyIdStorageKey = metadata[0] as StorageKey;
  // We need to convert the currencyId StorageKey to the correct type
  const currencyIdJsonArray = currencyIdStorageKey.toHuman() as unknown as SpacewalkPrimitivesCurrencyId[];
  const currencyIdJson = currencyIdJsonArray[0];
  const currencyId = currencyIdStorageKey.registry.createType('SpacewalkPrimitivesCurrencyId', currencyIdJson);
  return {
    metadata: { decimals: Number(decimals), name, symbol, additional },
    currencyId,
  };
}

export const useAssetRegistryMetadata = (): UseAssetRegistryMetadata => {
  const { api } = useNodeInfoState().state;

  const fetchMetadata = useCallback(async () => {
    if (api) {
      const fetchedMetadata = await api.query.assetRegistry.metadata.entries();
      return fetchedMetadata.map(convertToOrmlAssetRegistryAssetMetadata);
    }

    return [];
  }, [api]);

  const { data: metadataCache = [], refetch } = useQuery<OrmlTraitsAssetRegistryAssetMetadata[]>(
    [cacheKeys.assetRegistryMetadata],
    fetchMetadata,
  );

  useEffect(() => {
    api && refetch();
  }, [api, refetch]);

  const getAssetMetadata = useCallback(
    async (currencyId: SpacewalkPrimitivesCurrencyId): Promise<OrmlTraitsAssetRegistryAssetMetadata | undefined> => {
      return metadataCache.find((currencyMetadata: OrmlTraitsAssetRegistryAssetMetadata) => {
        const currencyMetadataHuman =
          currencyMetadata.currencyId.toHuman() as unknown as SpacewalkPrimitivesCurrencyId[];

        // When JSON.stringify we check for the same object structure as OrmlTraitsAssetRegistryAssetMetadata.assetId's are really different
        return JSON.stringify(currencyMetadataHuman) === JSON.stringify(currencyId);
      });
    },
    [metadataCache],
  );

  const getNativeAssetMetadata = useCallback(async () => {
    const nativeCurrencyId = 'Native' as unknown as SpacewalkPrimitivesCurrencyId;
    return getAssetMetadata(nativeCurrencyId);
  }, [getAssetMetadata]);

  const getAllAssetsMetadata = useCallback(() => {
    return metadataCache;
  }, [metadataCache]);

  return { getAssetMetadata, getNativeAssetMetadata, getAllAssetsMetadata };
};
