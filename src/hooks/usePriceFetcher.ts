import request from 'graphql-request';
import { useMemo } from 'preact/compat';
import { TenantName } from '../models/Tenant';

const AMPLITUDE_INDEXER_URL = 'https://squid.subsquid.io/amplitude-squid/graphql';

interface PriceFetcherAsset {
  assetName: string;
  blockchain: string;
  assetId: string | undefined;
  exclude?: TenantName[];
  provider: 'dia' | 'diaForeign' | 'subsquid';
}

type PricesCache = {
  [key: string]: number;
};

const assets: PriceFetcherAsset[] = [
  {
    assetName: 'USDC.s',
    blockchain: 'Ethereum',
    assetId: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    provider: 'dia',
    exclude: [TenantName.Pendulum],
  },
  {
    assetName: 'XLM.s',
    blockchain: 'Stellar',
    assetId: '0x0000000000000000000000000000000000000000/',
    provider: 'dia',
    exclude: [TenantName.Pendulum],
  },
  {
    assetName: 'TZS.s',
    blockchain: 'YahooFinance',
    assetId: 'TZS-USD',
    provider: 'diaForeign',
    exclude: [TenantName.Pendulum],
  },
  {
    assetName: 'BRL.s',
    blockchain: 'YahooFinance',
    assetId: 'BRL-USD',
    provider: 'diaForeign',
    exclude: [TenantName.Pendulum],
  },
  {
    assetName: 'KSM',
    blockchain: 'Kusama',
    assetId: '0x0000000000000000000000000000000000000000',
    provider: 'dia',
    exclude: [TenantName.Pendulum],
  },
  {
    assetName: 'USDT',
    blockchain: 'Ethereum',
    assetId: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    provider: 'dia',
  },
  {
    assetName: 'DOT',
    blockchain: 'Polkadot',
    assetId: '0x0000000000000000000000000000000000000000',
    provider: 'dia',
    exclude: [TenantName.Amplitude],
  },
  {
    assetName: 'AMPE',
    blockchain: 'Amplitude',
    assetId: 'eth',
    provider: 'subsquid',
    exclude: [TenantName.Pendulum],
  },
  {
    assetName: 'PEN',
    blockchain: 'Pendulum',
    assetId: '0x0000000000000000000000000000000000000000',
    provider: 'dia',
    exclude: [TenantName.Amplitude],
  },
];

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

const lookup = (assetCode: string) => {
  const found = assets.find(({ assetName }) => assetName === assetCode);

  if (!found) throw Error(`Asset ${assetCode} was not found`);

  return found;
};

const getPrice = async (asset: PriceFetcherAsset) => {
  try {
    return await providers[asset.provider](asset);
  } catch (e) {
    console.error('Not able to fetch price for asset: ', e);
  }
};

// TODO: using react-query will do caching, loading states, refetching... out of the box
export const usePriceFetcher = () => {
  const pricesCache: Promise<PricesCache> = useMemo(async () => {
    let cache = {};
    for (let i = 0; i < assets.length; i++) {
      cache = { ...cache, [assets[i].assetName]: await getPrice(assets[i]) };
    }
    return cache;
  }, []);

  const fetch = async (assetCode: string) => {
    try {
      return await getPrice(lookup(assetCode));
    } catch (e) {
      console.error(e);
    }
  };

  return { fetch, pricesCache };
};
