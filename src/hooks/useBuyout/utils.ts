import { OrmlTraitsAssetRegistryAssetMetadata } from './types';
import { TenantName } from '../../models/Tenant';

const FOUCOCO_HARDCODED_METADATA: Record<string, OrmlTraitsAssetRegistryAssetMetadata> = {
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

const AMPE_HARDCODED_METADATA: Record<string, OrmlTraitsAssetRegistryAssetMetadata> = {
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

export function getMetadata(network: TenantName) {
  const currencies = network === TenantName.Foucoco ? FOUCOCO_HARDCODED_METADATA : AMPE_HARDCODED_METADATA;
  return { currencies, nativeCurrency: NATIVE_CURRENCY };
}
