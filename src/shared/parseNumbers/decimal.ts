import { nativeToDecimal, prettyNumbers } from './metric';
import BigNumber from 'big.js';

const MINIMUM_DECIMAL_PLACES = 2;
const DECIMAL_PLACES = 6;
const MICRO = 1e-6;

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

export const convertNativeToFormattedDecimal = (value: BigNumber | number | string, tokenSymbol?: string) => {
  const decimalValue = nativeToDecimal(value).toNumber();
  const formattedDecimal = formatDecimal(decimalValue, tokenSymbol);
  return formattedDecimal;
};

export const convertNativeToDecimal = (value: BigNumber | number | string) => {
  return nativeToDecimal(value).toNumber();
};
