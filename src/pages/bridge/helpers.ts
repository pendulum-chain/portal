import { SpacewalkPrimitivesCurrencyId } from "@pendulum-chain/types/interfaces/types";

export function decodeAssetCode(asset: SpacewalkPrimitivesCurrencyId): string  | undefined {
  try{
    switch (asset.type) {
      case 'Stellar':
        return asset.asStellar.isStellarNative
          ? 'XLM'
          : asset.asStellar.isAlphaNum4
            ? asset.asStellar.asAlphaNum4.code.toHuman()?.toString()
            :  asset.asStellar.asAlphaNum12.code.toHuman()?.toString();
      case 'Xcm': return asset.asXcm.type.toString();
    }
  } catch (e) {
    console.error('Unable to decode asset', e);
    return undefined;
  }
}
