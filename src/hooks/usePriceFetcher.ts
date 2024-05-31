import { useCallback, useEffect, useState } from 'preact/compat';
import { TenantName } from '../models/Tenant';
import useSwitchChain from './useSwitchChain';
import { useNodeInfoState } from '../NodeInfoProvider';
import { nativeToDecimal } from '../shared/parseNumbers/metric';
import { SpacewalkPrimitivesCurrencyId } from '@polkadot/types/lookup';
import { useAssetRegistryMetadata } from './useAssetRegistryMetadata';
import { isEqual } from 'lodash';

export interface DiaKeys {
  blockchain: string;
  symbol: string;
}

// Helper function to convert DiaKeys to a string
function diaKeysToString(diaKeys: DiaKeys) {
  return `${diaKeys.blockchain}:${diaKeys.symbol}`;
}

type PricesCache = { [diaKeys: string]: number };

export const usePriceFetcher = () => {
  const [pricesCache, setPricesCache] = useState<PricesCache>({});
  const { currentTenant } = useSwitchChain();
  const { api } = useNodeInfoState().state;
  const { getAllAssetsMetadata } = useAssetRegistryMetadata();

  useEffect(() => {
    if (!api) return;

    const fetchPrices = async () => {
      const allPrices = await api.query.diaOracleModule.coinInfosMap.entries();

      const prices = allPrices.map(([key, value]) => {
        const keyJson = key.toHuman() as unknown as DiaKeys[];
        const assetKeys = keyJson[0];
        const priceRaw = value.price;
        const price = nativeToDecimal(priceRaw.toString()).toNumber();

        return { assetKeys, price };
      });

      setPricesCache((prev) => {
        const newPricesCache = { ...prev };
        prices.forEach(({ assetKeys, price }) => {
          newPricesCache[diaKeysToString(assetKeys)] = price;
        });

        return newPricesCache;
      });
    };

    fetchPrices().catch(console.error);
  }, [api]);

  const getTokenPriceForKeys = useCallback(
    async (asset: DiaKeys) => {
      try {
        const diaKeys = diaKeysToString(asset);
        const cachedAssetPrice = pricesCache[diaKeys];
        if (cachedAssetPrice) return cachedAssetPrice;
      } catch (e) {
        console.error(e);
      }
      return 0;
    },
    [pricesCache],
  );

  const handleNativeTokenPrice = useCallback(() => {
    if (currentTenant === TenantName.Pendulum) return pricesCache['Pendulum:PEN'];
    return pricesCache['Amplitude:AMPE'];
  }, [currentTenant, pricesCache]);

  const getTokenPriceForCurrency = useCallback(
    async (currency: SpacewalkPrimitivesCurrencyId) => {
      if (typeof currency.toHuman() === 'string' && (currency.toHuman() as string).toUpperCase() === 'NATIVE')
        return handleNativeTokenPrice();
      const asset = getAllAssetsMetadata().find((asset) => {
        return isEqual(asset.currencyId.toHuman(), currency.toHuman());
      });
      if (!asset) {
        return 0;
      }
      return getTokenPriceForKeys(asset.metadata.additional.diaKeys);
    },
    [getAllAssetsMetadata, getTokenPriceForKeys, handleNativeTokenPrice],
  );

  return { getTokenPriceForKeys, getTokenPriceForCurrency };
};
