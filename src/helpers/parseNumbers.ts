import BigNumber from "big.js";

export const UNIT_PRECISION = 1000000000000;

export const AMPLITUDE_DECIMALS = 18;

// Change the positive exponent to a high value to prevent toString() returning exponential notation
BigNumber.PE = 100;
// Change the negative exponent to a low value to show more decimals with toString()
BigNumber.NE = -20;

// Converts a decimal number to the native representation (a large integer)
export const decimalToNative = (value: BigNumber | number | string) => {
  const bigIntValue = new BigNumber(value);
  const multiplier = new BigNumber(10).pow(AMPLITUDE_DECIMALS);

  return bigIntValue.times(multiplier);
};

export const nativeToDecimal = (value: BigNumber | number | string) => {
  const bigIntValue = new BigNumber(value);
  // const divisor = new BN(UNIT_PRECISION);
  const divisor = new BigNumber(10).pow(AMPLITUDE_DECIMALS);

  const quotient = bigIntValue.div(divisor);

  return quotient.toNumber();
};

export const prettyNumbers = (number: number, lang = "en-US") =>
  number.toLocaleString(lang, {
    minimumFractionDigits: 2,
  });
