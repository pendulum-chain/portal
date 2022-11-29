import BN from "bn.js";

export const UNIT_PRECISION = 1000000000000;

export const toUnit = (value: BigInt) => {
  const bigIntValue = new BN(value.toString());
  const divisor = new BN(UNIT_PRECISION);
  const quotient = bigIntValue.div(divisor);

  return quotient.toNumber();
};

export const prettyNumbers = (number: number, lang: string = "en-US") =>
  number.toLocaleString(lang, {
    minimumFractionDigits: 2,
  });
