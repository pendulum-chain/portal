import { nativeToDecimal, prettyNumbers } from './metric';
import BigNumber from 'big.js';

const MINIMUM_DECIMAL_PLACES = 2;
const DECIMAL_PLACES = 6;
const MICRO = 1e-6;

const formatDecimal = (n: number, tokenSymbol?: string) => {
  if (n < MICRO) {
    return formatNumberLessThanMicro(tokenSymbol);
  }

  return formatNumber(n, tokenSymbol);
};

const formatNumberLessThanMicro = (tokenSymbol?: string) => {
  return `< 0.000001 ${tokenSymbol ? tokenSymbol : ''}`;
};

const formatNumber = (n: number, tokenSymbol?: string) => {
  return `${removeUnnecessaryDecimalNumbers(n.toFixed(DECIMAL_PLACES))} ${tokenSymbol ? tokenSymbol : ''}`;
};

const removeUnnecessaryDecimalNumbers = (value: string) => {
  return prettyNumbers(Number(value), navigator.language, {
    maximumFractionDigits: DECIMAL_PLACES,
    minimumFractionDigits: MINIMUM_DECIMAL_PLACES,
  });
};

export const nativeToFormatDecimal = (value: BigNumber | number | string, tokenSymbol?: string) =>
  formatDecimal(nativeToDecimal(value).toNumber(), tokenSymbol);

export const nativeToFormatDecimalPure = (value: BigNumber | number | string) =>
  formatNumber(nativeToDecimal(value).toNumber());
