import request from 'graphql-request';
import { useCallback, useEffect, useState } from 'preact/compat';
import { OrmlTraitsAssetRegistryAssetMetadata } from './useBuyout/types';
import { PriceFetcherAsset, TOKENS } from '../constants/tokens';
import { TenantName } from '../models/Tenant';
import useSwitchChain from './useSwitchChain';

const AMPLITUDE_INDEXER_URL = 'https://squid.subsquid.io/amplitude-squid/graphql';

type PricesCache = {
  [key: string]: number;
};

const getDIAAssetPrice = async (asset: PriceFetcherAsset): Promise<number> => {
  if (!asset.assetId) return 0;

  try {
    const data = await fetch(`https://api.diadata.org/v1/assetQuotation/${asset.blockchain}/${asset.assetId}`);
    if (data.ok) {
      return (await data.json())['Price'];
    }
  } catch (e) {
    console.error(e);
  }

  return 0;
};

const getDIAAssetForeignPrice = async (asset: PriceFetcherAsset): Promise<number> => {
  if (!asset.assetId) return 0;
  try {
    const data = await fetch(`https://api.diadata.org/v1/foreignQuotation/${asset.blockchain}/${asset.assetId}`);
    if (data.ok) {
      return (await data.json())['Price'];
    }
  } catch (e) {
    console.error(e);
  }

  return 0;
};

interface SubsquidResponse {
  bundleById: {
    ethPrice: string;
  };
}

const getSubsquidAssetPrice = async (asset: PriceFetcherAsset): Promise<number> => {
  if (!asset.assetId) return 0;
  const query = `
    query MyQuery {
      bundleById(id: "1") {
        ethPrice
      }
    }
  `;
  try {
    const response = (await request(AMPLITUDE_INDEXER_URL, query)) as SubsquidResponse;
    return parseFloat(response.bundleById.ethPrice);
  } catch (e) {
    console.error(e);
  }

  return 0;
};

const providers = {
  dia: getDIAAssetPrice,
  diaForeign: getDIAAssetForeignPrice,
  subsquid: getSubsquidAssetPrice,
};

const getPrice = async (asset: PriceFetcherAsset) => {
  try {
    return await providers[asset.provider](asset);
  } catch (e) {
    console.error('Not able to fetch price for asset: ', e);
  }
};

export const usePriceFetcher = () => {
  const [pricesCache, setPricesCache] = useState<PricesCache>({});
  const { currentTenant } = useSwitchChain();

  useEffect(() => {
    const fetchPrices = async () => {
      let cache = {};
      for (let i = 0; i < TOKENS.length; i++) {
        cache = { ...cache, [TOKENS[i].assetName]: await getPrice(TOKENS[i]) };
      }
      setPricesCache(cache);
    };

    fetchPrices();
  }, []);

  const handleNativeTokenPrice = useCallback(() => {
    if (currentTenant === TenantName.Pendulum) return pricesCache['PEN'];
    return pricesCache['AMPE'];
  }, [currentTenant, pricesCache]);

  const getTokenPrice = useCallback(
    async (asset: OrmlTraitsAssetRegistryAssetMetadata | string) => {
      if (typeof asset === 'string') {
        try {
          if (asset.toUpperCase() === 'NATIVE') return handleNativeTokenPrice();
          else {
            const cachedAssetPrice = pricesCache[asset];
            if (cachedAssetPrice) return cachedAssetPrice;
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        const assetDiaDetails = {
          blockchain: asset.metadata.additional.diaKeys.blockchain,
          assetId: asset.metadata.additional.diaKeys.symbol,
        } as PriceFetcherAsset;

        const assetPrice = await getDIAAssetPrice(assetDiaDetails);

        return assetPrice;
      }
      return 0;
    },
    [handleNativeTokenPrice, pricesCache],
  );

  return { getTokenPrice };
};
