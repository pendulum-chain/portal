import BN from "bn.js";

export const DIV_PRECISION = 1000;
export const UNIT_PRECISION = 1000000000000;

export const toUnit = (value: BigInt) => {
  const BigIntValue = new BN(value.toString(12), 12);
  const dividend = BigIntValue.muln(DIV_PRECISION);
  const divisor = new BN(UNIT_PRECISION);
  const quotient = dividend.div(divisor);

  return quotient.toNumber();
};
