import { Asset, Keypair, StrKey } from "stellar-sdk";
import { Buffer } from "buffer";

export function convertRawHexKeyToPublicKey(rawPublicKeyHex: string): Keypair {
  const ed25519PublicKey = StrKey.encodeEd25519PublicKey(
    Buffer.from(rawPublicKeyHex.slice(2), "hex")
  );
  return Keypair.fromPublicKey(ed25519PublicKey);
}

export function stringifyStellarAsset(asset: Asset): string {
  return asset.isNative() ? "XLM" : `${asset.getCode()}:${asset.getIssuer()}`;
}
