import { u128, UInt } from '@polkadot/types-codec';
import BigNumber from 'big.js';

// These are the decimals used for the native currency on the Amplitude network
export const ChainDecimals = 12;

// These are the decimals used by the Stellar network
// We actually up-scale the amounts on Stellar now to match the expected decimals of the other tokens.
export const StellarDecimals = 12;

// These are the decimals used by the FixedU128 type
export const FixedU128Decimals = 18;

const BIG_100 = new BigNumber('100');
const BIG_0 = new BigNumber('0');

// Change the positive exponent to a high value to prevent toString() returning exponential notation
BigNumber.PE = 100;
// Change the negative exponent to a low value to show more decimals with toString()
BigNumber.NE = -20;

// Converts a decimal number to the native representation (a large integer)
export const decimalToNative = (value: BigNumber | number | string, decimals: number = ChainDecimals) => {
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

export const sanitizeNative = (value: BigNumber | number | string | u128 | UInt) => {
  if (!value) return new BigNumber(0);

  if (typeof value === 'string' || value instanceof u128 || value instanceof UInt) {
    // Replace the unnecessary ',' with '' to prevent BigNumber from throwing an error
    return new BigNumber(value.toString().replaceAll(',', ''));
  }
  return new BigNumber(value);
};

export const nativeToDecimal = (value: BigNumber | number | string | u128 | UInt, decimals: number = ChainDecimals) => {
  const bigIntValue = sanitizeNative(value);
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
        prettyNumbers(n / units[i].divider) +
        ' ' +
        (oneCharOnly ? units[i].char : units[i].prefix.length ? units[i].prefix + ' ' : '') +
        tokenSymbol
      );
    }
  }
  return prettyNumbers(n) + ' ' + tokenSymbol;
};

export const nativeToFormatMetric = (
  value: BigNumber | number | string,
  tokenSymbol: string | undefined,
  oneCharOnly = false,
) => format(rawToDecimal(value, StellarDecimals).toNumber(), tokenSymbol, oneCharOnly);

export const prettyNumbers = (number: number, lang?: string, opts?: Intl.NumberFormatOptions) =>
  number.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...opts,
  });

export const roundNumber = (value: number | string = 0, round = 6) => {
  return +Number(value).toFixed(round);
};

// Round a number to a specified number of decimals
// If the number is small, ensure that the required number of significant
// decimals is retained
// e.g., if decimals = 2, then
// - 12345 -> 12345
// - 12.345 -> 12.34
// - 1.2345 -> 1.23
// - 0.012345 -> 0.012
// - 0.00012345 -> 0.00012
export function roundDownToSignificantDecimals(big: BigNumber, decimals: number) {
  return big.prec(Math.max(0, big.e + 1) + decimals, 0);
}

// toString method where the resulting string will have at least the number of
// decimals or more if the number is very small
// e.g., if decimals = 4, then
// - 12345678 -> 12345678.0000
// - 1234.5678 -> 1234.5678
// - 123.45678 -> 123.4567
// - 1.2345678 -> 1.2345
// - 0.12345678 -> 0.1234
// - 0.012345678 -> 0.01234
// - 0.00012345678 -> 0.0001234
// - 12 -> 12.0000
// - 0.12 -> 0.1200
// - 0.012 -> 0.0120
// - 0.0012 -> 0.0012
// - 0.00012 -> 0.00012
// - 0.000012 -> 0.000012
export function stringifyBigWithSignificantDecimals(big: BigNumber, decimals: number) {
  const rounded = roundDownToSignificantDecimals(big, decimals);

  let significantDecimals;
  if (rounded.eq(BIG_0)) {
    significantDecimals = decimals;
  } else {
    significantDecimals = Math.max(decimals, Math.min(decimals, rounded.c.length) - 1 - rounded.e);
  }

  return rounded.toFixed(significantDecimals, 0);
}

export function multiplyByPowerOfTen(bigDecimal: BigNumber, power: number) {
  const newBigDecimal = new BigNumber(bigDecimal);
  if (newBigDecimal.c[0] === 0) return newBigDecimal;

  newBigDecimal.e += power;
  return newBigDecimal;
}

export function fractionOfValue(maxValue: BigNumber, percentage: number): string {
  const preciseResult = new BigNumber(percentage).div(BIG_100).mul(maxValue);

  return stringifyBigWithSignificantDecimals(preciseResult, 2);
}

/** Calculate deadline from minutes */
export const calcDeadline = (min: number) => `${Math.floor(Date.now() / 1000) + min * 60}`;
