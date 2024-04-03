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
  const ccc = n.toFixed(DECIMAL_PLACES);
  const ddd = removeUnnecessaryDecimalNumbers(ccc);
  return `${ddd} ${tokenSymbol ? tokenSymbol : ''}`;
};

const formatToSignificantDecimals = (n: number, tokenSymbol?: string) => {
  if (n < MICRO) {
    return formatNumberLessThanMicro(tokenSymbol);
  }

  let str = n.toString();

  if (str.indexOf('e') !== -1) {
    str = n.toFixed(20);
  }

  let count = 0;
  let decimalPlaces = 0;

  for (let i = str.indexOf('.') + 1; i < str.length; i++) {
    decimalPlaces++;

    if (str[i] !== '0') {
      count++;
    }
    if (count === 2) {
      break;
    }
  }

  const formattedNumber = n.toFixed(decimalPlaces);

  return `${formattedNumber} ${tokenSymbol ? tokenSymbol : ''}`;
};

const formatNumberPure = (n: number, tokenSymbol?: string) => {
  let count = 0;
  let decimalPlaces = 0;
  let str = n.toString();

  if (str.indexOf('e') !== -1) {
    // Convert the number to decimal notation
    str = n.toFixed(20);
  }

  for (let i = str.indexOf('.') + 1; i < str.length; i++) {
    decimalPlaces++;
    if (count == 1) {
      break;
    }
    if (str[i] !== '0') {
      count++;
    }
  }

  const ccc = n.toFixed(decimalPlaces);
  return `${ccc} ${tokenSymbol ? tokenSymbol : ''}`;
};

const removeUnnecessaryDecimalNumbers = (value: string) => {
  return prettyNumbers(Number(value), navigator.language, {
    maximumFractionDigits: DECIMAL_PLACES,
    minimumFractionDigits: MINIMUM_DECIMAL_PLACES,
  });
};

export const nativeToFormatDecimal = (value: BigNumber | number | string, tokenSymbol?: string) => {
  const ebda = nativeToDecimal(value).toNumber();
  const fdgc = formatDecimal(ebda, tokenSymbol);
  return fdgc;
};

export const abcedfg = (value: number) => formatToSignificantDecimals(value);

export const nativeToFormatDecimalPure = (value: BigNumber | number | string) => {
  const aaa = nativeToDecimal(value).toNumber();
  const bbb = formatNumberPure(aaa);
  return bbb;
};
