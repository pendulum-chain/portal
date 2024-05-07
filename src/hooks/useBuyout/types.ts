import { SpacewalkPrimitivesCurrencyId } from '@polkadot/types/lookup';

export interface OrmlTraitsAssetRegistryAssetMetadata {
  metadata: {
    decimals: number;
    name: string;
    symbol: string;
    additional: { diaKeys: { blockchain: string; symbol: string } };
  };
  currencyId: SpacewalkPrimitivesCurrencyId;
}
