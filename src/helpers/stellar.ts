import { Keypair, StrKey } from "stellar-sdk";
import { Buffer } from "buffer";

export function convertRawHexKeyToPublicKey(rawPublicKeyHex: string): Keypair {
  const ed25519PublicKey = StrKey.encodeEd25519PublicKey(
    Buffer.from(rawPublicKeyHex.slice(2), "hex")
  );
  return Keypair.fromPublicKey(ed25519PublicKey);
}
