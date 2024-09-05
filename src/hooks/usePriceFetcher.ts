import { SpacewalkPrimitivesCurrencyId } from '@polkadot/types/lookup';
import { useCallback } from 'preact/compat';
import { useQuery } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import { TenantName } from '../models/Tenant';
import useSwitchChain from './useSwitchChain';
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
  const { getAllAssetsMetadata } = useAssetRegistryMetadata();
  const allAssetsMetadata = getAllAssetsMetadata();
  const diaKeys = allAssetsMetadata.map((asset) => asset.metadata.additional.diaKeys);

  const getPriceFromBatchingServer = useCallback(async () => {
    try {
      const response = await fetch('https://batching-server.pendulumchain.tech/currencies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(diaKeys.map(({ blockchain, symbol }) => ({ blockchain, symbol }))),
      });

      if (!response.ok) {
        console.error('Batching server response was not ok:', response.status, response.statusText);
        return {};
      }

      const batchingServerPrices = await response.json();

      return batchingServerPrices.reduce(
        (acc: PricesCache, { symbol, price, blockchain }: { symbol: string; price: number; blockchain: string }) => {
          acc[diaKeysToString({ symbol, blockchain })] = nativeToDecimal(price.toString()).toNumber();
          return acc;
        },
        {},
      );
    } catch (error) {
      console.error('Error fetching prices from batching server:', error);
      return {};
    }
  }, [diaKeys]);

  const { data: pricesCache = {} } = useQuery({
    queryKey: ['prices', allAssetsMetadata],
    queryFn: getPriceFromBatchingServer,
  });

  const getTokenPriceForKeys = useCallback((asset: DiaKeys) => pricesCache[diaKeysToString(asset)] || 0, [pricesCache]);

  const handleNativeTokenPrice = useCallback(
    () => (currentTenant === TenantName.Pendulum ? pricesCache['Pendulum:PEN'] : pricesCache['Amplitude:AMPE']),
    [currentTenant, pricesCache],
  );

  const getTokenPriceForCurrency = useCallback(
    (currency: SpacewalkPrimitivesCurrencyId) => {
      if (currency.toHuman() === 'Native') return handleNativeTokenPrice();

      const asset = getAllAssetsMetadata().find((asset) => isEqual(asset.currencyId.toHuman(), currency.toHuman()));

      return asset ? getTokenPriceForKeys(asset.metadata.additional.diaKeys) : 0;
    },
    [getAllAssetsMetadata, getTokenPriceForKeys, handleNativeTokenPrice],
  );

  return { getTokenPriceForKeys, getTokenPriceForCurrency };
};
