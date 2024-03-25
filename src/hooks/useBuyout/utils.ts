import { OrmlTraitsAssetRegistryAssetMetadata } from './types';

const AMPE_HARDCODED_METADATA: Record<string, OrmlTraitsAssetRegistryAssetMetadata> = {
  usdt: {
    metadata: {
      decimals: 6,
      name: 'Tether USD',
      symbol: 'USDT',
      existentialDeposit: 1000,
    },
    assetId: {
      XCM: 1,
    },
  },
  ksm: {
    metadata: {
      decimals: 12,
      name: 'Kusama',
      symbol: 'KSM',
      existentialDeposit: 1000,
    },
    assetId: {
      XCM: 0,
    },
  },
};

export const NATIVE_CURRENCY: Record<string, OrmlTraitsAssetRegistryAssetMetadata> = {
  ampe: {
    metadata: {
      decimals: 12,
      name: 'Amplitude',
      symbol: 'AMPE',
      existentialDeposit: 1000,
    },
    assetId: 'Native',
  },
};

export function getMetadata() {
  return { currencies: AMPE_HARDCODED_METADATA, nativeCurrency: NATIVE_CURRENCY };
}
