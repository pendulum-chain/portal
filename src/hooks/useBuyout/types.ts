import { SpacewalkPrimitivesAsset } from '@pendulum-chain/types/interfaces';

export type AssetId =
  | {
      XCM: number;
    }
  | string
  | SpacewalkPrimitivesAsset;

export interface OrmlTraitsAssetRegistryAssetMetadata {
  metadata: {
    decimals: number;
    name: string;
    symbol: string;
    additional: { diaKeys: { blockchain: string; symbol: string } };
  };
  assetId: AssetId;
}
