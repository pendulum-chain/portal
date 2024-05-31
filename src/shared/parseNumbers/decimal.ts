import { nativeToDecimal, prettyNumbers } from './metric';
import BigNumber from 'big.js';

const MINIMUM_DECIMAL_PLACES = 2;
const DECIMAL_PLACES = 6;
const MICRO = 1e-6;

export enum USER_INPUT_MAX_DECIMALS {
  PENDULUM = 12,
  STELLAR = 7,
}

const formatNumberLessThanMicro = (tokenSymbol?: string) => {
  return `< 0.000001 ${tokenSymbol ? tokenSymbol : ''}`;
};

const formatDecimal = (n: number, tokenSymbol?: string) => {
  if (n < MICRO) {
    return formatNumberLessThanMicro(tokenSymbol);
  }

  return formatNumber(n, tokenSymbol);
};

const formatNumber = (n: number, tokenSymbol?: string) => {
  const formattedNumber = n.toFixed(DECIMAL_PLACES);
  const trimmedNumber = removeUnnecessaryDecimalNumbers(formattedNumber);
  return `${trimmedNumber} ${tokenSymbol ? tokenSymbol : ''}`;
};

const removeUnnecessaryDecimalNumbers = (value: string) => {
  return prettyNumbers(Number(value), navigator.language, {
    maximumFractionDigits: DECIMAL_PLACES,
    minimumFractionDigits: MINIMUM_DECIMAL_PLACES,
  });
};

export const nativeToFormatDecimal = (value: BigNumber | number | string, tokenSymbol?: string) =>
  formatDecimal(nativeToDecimal(value).toNumber(), tokenSymbol);

// Without the tokenSymbol and prettyNumbers, formatNumberLessThanMicro functions
export const nativeToFormatDecimalPure = (value: BigNumber | number | string) => nativeToDecimal(value).toNumber();

export function exceedsMaxDecimals(value: unknown, maxDecimals: number) {
  if (value === undefined || value === null) return true;
  const decimalPlaces = value.toString().split('.')[1];
  return decimalPlaces ? decimalPlaces.length > maxDecimals : false;
}
