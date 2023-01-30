import BigNumber from "big.js";

export const UNIT_PRECISION = 1000000000000;

export const AMPLITUDE_DECIMALS = 18;

export const toUnit = (value: BigNumber | number | string) => {
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
