import { SpacewalkPrimitivesCurrencyId } from '@polkadot/types/lookup';
import { ApiPromise } from '@polkadot/api';
import { Asset, Keypair } from 'stellar-sdk';
import { convertRawHexKeyToPublicKey } from './stellar';
import { DateTime } from 'luxon';

// Convert a hex string to an ASCII string
function hex_to_ascii(hexString: string, leading0x = true) {
  const hex = hexString.toString();
  let str = '';
  for (let n = leading0x ? 2 : 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}

export function convertCurrencyToStellarAsset(
  currency: SpacewalkPrimitivesCurrencyId,
): Asset | null {
  if (currency.isStellarNative) {
    return Asset.native();
  } else if (currency.isAlphaNum4) {
    const code = hex_to_ascii(currency.asAlphaNum4.code.toHex());
    const issuer = convertRawHexKeyToPublicKey(
      currency.asAlphaNum4.issuer.toHex(),
    );
    return new Asset(code, issuer.publicKey());
  } else if (currency.isAlphaNum12) {
    const code = hex_to_ascii(currency.asAlphaNum12.code.toHex());
    const issuer = convertRawHexKeyToPublicKey(
      currency.asAlphaNum12.issuer.toHex(),
    );
    return new Asset(code, issuer.publicKey());
  } else {
    return null;
  }
}

export function convertStellarAssetToCurrency(
  asset: Asset,
  api: ApiPromise,
): SpacewalkPrimitivesCurrencyId {
  if (asset.isNative()) {
    return api.createType('SpacewalkPrimitivesCurrencyId', 'StellarNative');
  } else {
    const pair = Keypair.fromPublicKey(asset.getIssuer());
    // We need the raw public key, not the base58 encoded version
    const issuerRawPublicKey = pair.rawPublicKey();
    const issuer = api.createType('Raw', issuerRawPublicKey, 32);

    if (asset.getCode().length <= 4) {
      const code = api.createType('Raw', asset.getCode(), 4);
      return api.createType('SpacewalkPrimitivesCurrencyId', {
        AlphaNum4: {
          code,
          issuer,
        },
      });
    } else {
      const code = api.createType('Raw', asset.getCode(), 12);
      return api.createType('SpacewalkPrimitivesCurrencyId', {
        AlphaNum12: {
          code,
          issuer,
        },
      });
    }
  }
}

// Calculate the remaining duration for a request
// Params:
//   currentActiveBlock: The block number of the current active block
//   activeBlockOpenTime: The block number of the active block when the request was opened
//   period: The period of the request
//   blockTimeSec: The average block time in seconds
// Returns:
//   The estimated end time of the request
export function calculateDeadline(
  currentActiveBlock: number,
  activeBlockOpenTime: number,
  period: number,
  blockTimeSec = 12,
) {
  const deadlineBlock = activeBlockOpenTime + period;
  const blocksRemaining = deadlineBlock - currentActiveBlock;
  const remainingDurationSecs = blocksRemaining * blockTimeSec;

  const now = DateTime.now();
  const end = now.plus({ seconds: remainingDurationSecs });
  return end;
}
