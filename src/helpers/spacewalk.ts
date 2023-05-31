import bs58 from 'bs58';
import { H256 } from '@polkadot/types/interfaces';
import { ApiPromise } from '@polkadot/api';
import { SpacewalkPrimitivesCurrencyId } from '@polkadot/types/lookup';
import { DateTime } from 'luxon';
import { Asset, Keypair } from 'stellar-sdk';
import { convertRawHexKeyToPublicKey } from './stellar';
import { TenantName } from '../models/Tenant';
import { U8aFixed } from '@polkadot/types-codec';

// Convert a hex string to an ASCII string
function hex_to_ascii(hexString: string, leading0x = true) {
  const hex = hexString.toString();
  let str = '';
  for (let n = leading0x ? 2 : 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}

// This function is used to derive a shorter identifier that can be used as a TEXT MEMO by a user when creating a Stellar transaction
// to fulfill an issue request. This is only used for _issue_ requests, not for redeem or replace requests.
export function deriveShortenedRequestId(requestId: H256 | Uint8Array) {
  // This derivation matches the one used in the Spacewalk pallets
  return bs58.encode(requestId).slice(0, 28);
}

export function convertCurrencyToStellarAsset(currency: SpacewalkPrimitivesCurrencyId): Asset | null {
  if (!currency.isStellar) {
    return null;
  }

  const stellarAsset = currency.asStellar;

  try {
    if (stellarAsset.isStellarNative) {
      return Asset.native();
    } else if (stellarAsset.isAlphaNum4) {
      const code = tryConvertCodeToAscii(stellarAsset.asAlphaNum4.code);
      const issuer = convertRawHexKeyToPublicKey(stellarAsset.asAlphaNum4.issuer.toHex());
      return new Asset(code, issuer.publicKey());
    } else if (stellarAsset.isAlphaNum12) {
      const code = tryConvertCodeToAscii(stellarAsset.asAlphaNum12.code);
      const issuer = convertRawHexKeyToPublicKey(stellarAsset.asAlphaNum12.issuer.toHex());
      return new Asset(code, issuer.publicKey());
    } else {
      return null;
    }
  } catch (e) {
    console.error('Error converting currency to stellar asset', e);
    return null;
  }
}

export function convertStellarAssetToCurrency(asset: Asset, api: ApiPromise): SpacewalkPrimitivesCurrencyId {
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

const XCM_ASSETS: { [network: string]: { [xcmIndex: string]: string } } = {
  pendulum: {
    '0': 'DOT',
  },
  amplitude: {
    '0': 'KSM',
  },
};

// Convert a currency to a string
// The supplied network is used to choose the list of XCM assets per network.
export function currencyToString(currency: SpacewalkPrimitivesCurrencyId, tenant: TenantName = TenantName.Pendulum) {
  try {
    if (currency.isStellar) {
      const stellarAsset = currency.asStellar;
      if (stellarAsset.isStellarNative) {
        return 'XLM';
      } else if (stellarAsset.isAlphaNum4) {
        const code = tryConvertCodeToAscii(stellarAsset.asAlphaNum4.code);
        const issuer = convertRawHexKeyToPublicKey(stellarAsset.asAlphaNum4.issuer.toHex());
        return `${code}:${issuer.publicKey()}`;
      } else if (stellarAsset.isAlphaNum12) {
        const code = tryConvertCodeToAscii(stellarAsset.asAlphaNum12.code);
        const issuer = convertRawHexKeyToPublicKey(stellarAsset.asAlphaNum12.issuer.toHex());
        return `${code}:${issuer.publicKey()}`;
      } else {
        return 'Unknown';
      }
    } else if (currency.isXcm) {
      const network = tenant === TenantName.Pendulum ? 'pendulum' : 'amplitude';
      const assetsForNetwork = XCM_ASSETS[network];

      const xcmIndex = currency.asXcm.toString();
      if (xcmIndex in assetsForNetwork) {
        return assetsForNetwork[xcmIndex];
      } else {
        return `XCM:${xcmIndex}`;
      }
    } else {
      return 'Unknown';
    }
  } catch (e) {
    console.error('Error converting currency to stellar asset', e);
    return null;
  }
}

function tryConvertCodeToAscii(code: U8aFixed) {
  const ascii = hex_to_ascii(code.toHex());
  if (ascii !== ascii.trim()) {
    throw Error('Asset code contains invalid space characters');
  }
  return ascii.replace('\0', '');
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

export function estimateRequestCreationTime(
  currentActiveBlock: number,
  activeBlockOpenTime: number,
  blockTimeSec = 12,
) {
  const activeBlocksPassed = currentActiveBlock - activeBlockOpenTime;
  const secondsAgo = activeBlocksPassed * blockTimeSec;
  const now = DateTime.now();
  return now.minus({ seconds: secondsAgo });
}