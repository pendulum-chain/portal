import { Asset, Keypair, StrKey } from 'stellar-sdk';
import { Buffer } from 'buffer';

export const isPublicKey = (str: string) =>
  Boolean(str.match(/^G[A-Z0-9]{55}$/));
export const isMuxedAddress = (str: string) =>
  Boolean(str.match(/^M[A-Z0-9]{68}$/));
export const isStellarAddress = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  Boolean(str.match(/^[^\*> \t\n\r]+\*[^\*\.> \t\n\r]+\.[^\*> \t\n\r]+$/));

export function convertRawHexKeyToPublicKey(rawPublicKeyHex: string): Keypair {
  const ed25519PublicKey = StrKey.encodeEd25519PublicKey(
    Buffer.from(rawPublicKeyHex.slice(2), 'hex'),
  );
  return Keypair.fromPublicKey(ed25519PublicKey);
}

export function stringifyStellarAsset(asset: Asset): string {
  return asset.isNative() ? 'XLM' : `${asset.getCode()}:${asset.getIssuer()}`;
}
