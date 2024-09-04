import { SpacewalkPrimitivesCurrencyId } from '@polkadot/types/lookup';
import { useCallback, useEffect } from 'preact/compat';
import { useQuery } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import { TenantName } from '../models/Tenant';
import useSwitchChain from './useSwitchChain';
import { useNodeInfoState } from '../NodeInfoProvider';
import { nativeToDecimal } from '../shared/parseNumbers/metric';
import { useAssetRegistryMetadata } from './useAssetRegistryMetadata';

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
  const { currentTenant } = useSwitchChain();
  const { api } = useNodeInfoState().state;
  const { getAllAssetsMetadata } = useAssetRegistryMetadata();
  const allAssetsMetadata = getAllAssetsMetadata();
  const diaKeys = allAssetsMetadata.map((asset) => asset.metadata.additional.diaKeys);

  const getPricesFromChain = async () => {
    if (!api) return {};
    const allPrices = await api.query.diaOracleModule.coinInfosMap.entries();

    return allPrices.reduce((acc, [key, value]) => {
      const keyJson = key.toHuman() as unknown as DiaKeys[];
      const assetKeys = keyJson[0];
      const priceRaw = value.price;
      const price = nativeToDecimal(priceRaw.toString()).toNumber();
      acc[diaKeysToString(assetKeys)] = price;
      return acc;
    }, {} as PricesCache);
  };

  const getPriceFromBatchingServer = async () => {
    const response = await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(diaKeys.map(({ blockchain, symbol }) => ({ blockchain, symbol }))),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const batchingServerPrices = await response.json();

    return batchingServerPrices.reduce(
      (acc: PricesCache, { symbol, price, blockchain }: { symbol: string; price: number; blockchain: string }) => {
        acc[diaKeysToString({ symbol, blockchain })] = nativeToDecimal(price.toString()).toNumber();
        return acc;
      },
      {},
    );
  };

  const { data: pricesCache = {} } = useQuery({
    queryKey: ['prices', allAssetsMetadata],
    queryFn: async () => {
      const chainPrices = await getPricesFromChain();
      const batchingServerPrices = await getPriceFromBatchingServer();

      return {
        ...chainPrices,
        ...batchingServerPrices,
      };
    },
  });

  const getTokenPriceForKeys = useCallback(
    (asset: DiaKeys) => {
      const diaKeys = diaKeysToString(asset);
      return pricesCache[diaKeys] || 0;
    },
    [pricesCache],
  );

  const handleNativeTokenPrice = useCallback(() => {
    if (currentTenant === TenantName.Pendulum) return pricesCache['Pendulum:PEN'];
    return pricesCache['Amplitude:AMPE'];
  }, [currentTenant, pricesCache]);

  const getTokenPriceForCurrency = useCallback(
    async (currency: SpacewalkPrimitivesCurrencyId) => {
      if (currency.toHuman() === 'Native') return handleNativeTokenPrice();
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
