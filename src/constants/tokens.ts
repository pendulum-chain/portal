import { TenantName } from '../models/Tenant';

export interface PriceFetcherAsset {
  assetName: string;
  blockchain: string;
  assetId: string | undefined;
  exclude?: TenantName[];
  provider: 'dia' | 'diaForeign' | 'subsquid';
}

export const TOKENS: PriceFetcherAsset[] = [
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
    assetName: 'NGNC.s',
    blockchain: 'YahooFinance',
    assetId: 'NGN-USD',
    provider: 'diaForeign',
    exclude: [TenantName.Pendulum],
  },
  {
    assetName: 'EURC.s',
    blockchain: 'YahooFinance',
    assetId: 'EUR-USD',
    provider: 'diaForeign',
    exclude: [TenantName.Pendulum],
  },
  {
    assetName: 'AUDD.s',
    blockchain: 'YahooFinance',
    assetId: 'AUD-USD',
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
    assetId: 'ampe',
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
  {
    assetName: 'USDC',
    blockchain: 'Ethereum',
    assetId: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    provider: 'dia',
  },
];
