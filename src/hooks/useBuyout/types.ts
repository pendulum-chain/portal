export interface OrmlTraitsAssetRegistryAssetMetadata {
  metadata: {
    decimals: number;
    name: string;
    symbol: string;
  };
  assetId:
    | {
        XCM: number;
      }
    | string;
}
