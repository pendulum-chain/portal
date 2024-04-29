import { useState, useEffect, useCallback } from 'preact/hooks';
import { useNodeInfoState } from '../NodeInfoProvider';
import { AssetId, OrmlTraitsAssetRegistryAssetMetadata } from './useBuyout/types';
import { StorageKey } from '@polkadot/types';
import { Codec } from '@polkadot/types-codec/types';

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
  getAssetMetadata: (assetId: AssetId) => Promise<OrmlTraitsAssetRegistryAssetMetadata | undefined>;
  getNativeAssetMetadata: () => Promise<OrmlTraitsAssetRegistryAssetMetadata | undefined>;
  getAllAssetsMetadata: () => OrmlTraitsAssetRegistryAssetMetadata[];
}

function convertToOrmlAssetRegistryAssetMetadata(metadata: [StorageKey, Codec]): OrmlTraitsAssetRegistryAssetMetadata {
  const { decimals, name, symbol, additional } = metadata[1].toHuman() as CurrencyMetadataType;
  const assetId = (metadata[0].toHuman() as string[])[0] as string;

  return {
    metadata: { decimals: Number(decimals), name, symbol, additional },
    assetId,
  };
}

export const useAssetRegistryMetadata = (): UseAssetRegistryMetadata => {
  const { api } = useNodeInfoState().state;
  const [metadataCache, setMetadataCache] = useState<OrmlTraitsAssetRegistryAssetMetadata[]>([]);

  const fetchMetadata = useCallback(async () => {
    if (api) {
      const fetchedMetadata = await api.query.assetRegistry.metadata.entries();
      setMetadataCache(fetchedMetadata.map((m) => convertToOrmlAssetRegistryAssetMetadata(m)));
    }
  }, [api]);

  useEffect(() => {
    fetchMetadata().catch(console.error);
  }, [fetchMetadata]);

  const getAssetMetadata = useCallback(
    async (assetId: AssetId): Promise<OrmlTraitsAssetRegistryAssetMetadata | undefined> =>
      metadataCache.find(
        // When JSON.stringify we check for the same object structure as OrmlTraitsAssetRegistryAssetMetadata.assetId's are really different
        (m: OrmlTraitsAssetRegistryAssetMetadata) => JSON.stringify(m.assetId) === JSON.stringify(assetId),
      ),
    [metadataCache],
  );

  const getNativeAssetMetadata = useCallback(async () => {
    return getAssetMetadata('Native');
  }, [getAssetMetadata]);

  const getAllAssetsMetadata = useCallback(() => {
    return metadataCache;
  }, [metadataCache]);

  return { getAssetMetadata, getNativeAssetMetadata, getAllAssetsMetadata };
};
