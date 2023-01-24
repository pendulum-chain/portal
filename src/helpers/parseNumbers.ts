import BN from "bn.js";

export const UNIT_PRECISION = 1000000000000;

export const toUnit = (value: bigint) => {
  const bigIntValue = new BN(value.toString());
  const divisor = new BN(UNIT_PRECISION);
  const quotient = bigIntValue.div(divisor);

  return quotient.toNumber();
};

export const prettyNumbers = (number: number, lang = "en-US") =>
  number.toLocaleString(lang, {
    minimumFractionDigits: 2,
  });
