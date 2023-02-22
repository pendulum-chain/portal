import BigNumber from "big.js";

// These are the decimals used for the native currency on the Amplitude network
export const AmplitudeDecimals = 12;

// These are the decimals used by the Stellar network
export const StellarDecimals = 7;

// These are the decimals used by the FixedU128 type
export const FixedU128Decimals = 18;

// Change the positive exponent to a high value to prevent toString() returning exponential notation
BigNumber.PE = 100;
// Change the negative exponent to a low value to show more decimals with toString()
BigNumber.NE = -20;

// Converts a decimal number to the native representation (a large integer)
export const decimalToNative = (value: BigNumber | number | string) => {
  const bigIntValue = new BigNumber(value);
  const multiplier = new BigNumber(10).pow(AmplitudeDecimals);

  return bigIntValue.times(multiplier);
};

export const decimalToStellarNative = (value: BigNumber | number | string) => {
  const bigIntValue = new BigNumber(value);
  const multiplier = new BigNumber(10).pow(StellarDecimals);

  return bigIntValue.times(multiplier);
};

export const fixedPointToDecimal = (value: BigNumber | number | string) => {
  const bigIntValue = new BigNumber(value);
  const divisor = new BigNumber(10).pow(FixedU128Decimals);

  const quotient = bigIntValue.div(divisor);

  return quotient.toNumber();
};

export const nativeToDecimal = (value: BigNumber | number | string) => {
  const bigIntValue = new BigNumber(value);
  const divisor = new BigNumber(10).pow(AmplitudeDecimals);

  const quotient = bigIntValue.div(divisor);

  return quotient.toNumber();
};

export const nativeStellarToDecimal = (value: BigNumber | number | string) => {
  const bigIntValue = new BigNumber(value);
  const divisor = new BigNumber(10).pow(StellarDecimals);

  const quotient = bigIntValue.div(divisor);

  return quotient.toNumber();
};

export const prettyNumbers = (number: number, lang = "en-US") =>
  number.toLocaleString(lang, {
    minimumFractionDigits: 2,
  });
