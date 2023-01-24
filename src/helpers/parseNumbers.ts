import BN from "bn.js";
import BigNumber from "big.js";

export const UNIT_PRECISION = 1000000000000;

export const AMPLITUDE_DECIMALS = 18;

export const toUnit = (value: BigNumber) => {
  const bigIntValue = value;
  // const divisor = new BN(UNIT_PRECISION);
  const divisor = new BigNumber(10).pow(AMPLITUDE_DECIMALS);

  const quotient = bigIntValue.div(divisor);

  return quotient.toNumber();
};

export const prettyNumbers = (number: number, lang: string = "en-US") =>
  number.toLocaleString(lang, {
    minimumFractionDigits: 2,
  });
