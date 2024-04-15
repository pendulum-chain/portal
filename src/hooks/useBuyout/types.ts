export interface OrmlTraitsAssetRegistryAssetMetadata {
  metadata: {
    decimals: number;
    name: string;
    symbol: string;
    existentialDeposit: number;
  };
  assetId:
    | {
        XCM: number;
      }
    | string;
}
