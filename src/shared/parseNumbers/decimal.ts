import { nativeToDecimal, prettyNumbers } from './metric';
import BigNumber from 'big.js';

const DECIMAL_PLACES = 6;
const MICRO = 1e-6;

const formatDecimal = (n: number, tokenSymbol: string | undefined) => {
  if (n < MICRO) {
    return formatNumberLessThanMicro(tokenSymbol);
  }

  return formatNumber(n, tokenSymbol);
};

const formatNumberLessThanMicro = (tokenSymbol: string | undefined) => {
  return `< 0.000001 ${tokenSymbol}`;
};

const formatNumber = (n: number, tokenSymbol: string | undefined) => {
  return `${removeUnnecessaryDecimalNumbers(n.toFixed(DECIMAL_PLACES))} ${tokenSymbol}`;
};

const removeUnnecessaryDecimalNumbers = (value: string) => {
  return prettyNumbers(Number(value), navigator.language, {
    maximumFractionDigits: DECIMAL_PLACES,
    minimumFractionDigits: 2,
  });
};

export const nativeToFormatDecimal = (value: BigNumber | number | string, tokenSymbol: string | undefined) =>
  formatDecimal(nativeToDecimal(value).toNumber(), tokenSymbol);
