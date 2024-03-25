export interface OrmlTraitsAssetRegistryAssetMetadata {
  metadata: {
    decimals: number;
    name: string;
    symbol: string;
    existentialDeposit: number;
  };
  assetId:
    | {
        [key: string]: number;
      }
    | string;
}
