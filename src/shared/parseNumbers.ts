import { u128, UInt } from '@polkadot/types-codec';
import BigNumber from 'big.js';

// These are the decimals used by the Stellar network
// We actually up-scale the amounts on Stellar now to match the expected decimals of the other tokens.
export const StellarDecimals = 12;
export const NativeDecimals = 12;

// These are the decimals used by the FixedU128 type
export const FixedU128Decimals = 18;

// Change the positive exponent to a high value to prevent toString() returning exponential notation
BigNumber.PE = 100;
// Change the negative exponent to a low value to show more decimals with toString()
BigNumber.NE = -20;

// Converts a decimal number to the native representation (a large integer)
export const decimalToNative = (value: BigNumber | number | string, decimals: number = NativeDecimals) => {
  let bigIntValue;
  try {
    bigIntValue = new BigNumber(value);
  } catch (error) {
    bigIntValue = new BigNumber(0);
  }
  const multiplier = new BigNumber(10).pow(decimals);
  return bigIntValue.times(multiplier).round(0);
};

export const decimalToRaw = (value: BigNumber | number | string, decimals: number) => {
  return decimalToNative(value, decimals);
};

export const decimalToStellarNative = (value: BigNumber | number | string) => {
  let bigIntValue;
  try {
    bigIntValue = new BigNumber(value);
  } catch (error) {
    bigIntValue = new BigNumber(0);
  }
  const multiplier = new BigNumber(10).pow(StellarDecimals);
  return bigIntValue.times(multiplier);
};

export const fixedPointToDecimal = (value: BigNumber | number | string) => {
  const bigIntValue = new BigNumber(value);
  const divisor = new BigNumber(10).pow(FixedU128Decimals);

  return bigIntValue.div(divisor);
};

export const nativeToDecimal = (
  value: BigNumber | number | string | u128 | UInt,
  decimals: number = NativeDecimals,
) => {
  if (!value) return new BigNumber(0);

  if (typeof value === 'string' || value instanceof u128 || value instanceof UInt) {
    // Replace the unnecessary ',' with '' to prevent BigNumber from throwing an error
    value = new BigNumber(value.toString().replaceAll(',', ''));
  }
  const bigIntValue = new BigNumber(value);
  const divisor = new BigNumber(10).pow(decimals);

  return bigIntValue.div(divisor);
};

export const rawToDecimal = (value: BigNumber | number | string | u128 | UInt, decimals: number) => {
  return nativeToDecimal(value, decimals);
};

export const nativeStellarToDecimal = (value: BigNumber | number | string) => {
  const bigIntValue = new BigNumber(value);
  const divisor = new BigNumber(10).pow(StellarDecimals);

  return bigIntValue.div(divisor);
};

const units = [
  { divider: 1e9, prefix: 'billion', char: 'B' },
  { divider: 1e6, prefix: 'million', char: 'M' },
  { divider: 1, prefix: '', char: '' },
  { divider: 1e-3, prefix: 'milli', char: 'm' },
  { divider: 1e-6, prefix: 'micro', char: 'μ' },
  { divider: 1e-9, prefix: 'nano', char: 'n' },
  { divider: 1e-12, prefix: 'pico', char: 'p' },
];

export const format = (n: number, tokenSymbol: string | undefined, oneCharOnly = false) => {
  for (let i = 0; i < units.length; i++) {
    if (n >= units[i].divider) {
      return (
        prettyNumbers(n / units[i].divider) + ' ' + (oneCharOnly ? units[i].char : units[i].prefix + ' ') + tokenSymbol
      );
    }
  }
  return prettyNumbers(n);
};

export const nativeToFormat = (
  value: BigNumber | number | string,
  tokenSymbol: string | undefined,
  oneCharOnly = false,
) => format(rawToDecimal(value, StellarDecimals).toNumber(), tokenSymbol, oneCharOnly);

export const prettyNumbers = (number: number, lang?: string, opts?: Intl.NumberFormatOptions) =>
  number.toLocaleString(lang || navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...opts,
  });

export const roundNumber = (value: number | string = 0, round = 6) => {
  return +Number(value).toFixed(round);
};

/** Calculate deadline from minutes */
export const calcDeadline = (min: number) => `${Math.floor(Date.now() / 1000) + min * 60}`;
