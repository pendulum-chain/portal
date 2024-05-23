import Big, { BigSource } from "big.js";

// Maximum value for u128 (2^128 - 1)
const maxU128 = Big('340282366920938463463374607431768211455'); // 2^128 - 1

const isValidBigSource = (value: unknown): value is BigSource => {
    try {
      new Big(value as BigSource);
      return true;
    } catch {
      return false;
    }
  };

export function isU128(value: unknown): boolean {

    if (!isValidBigSource(value)) {
        return false;
    }

    try {
      const bigValue = new Big(value);

      // Check if the value is negative or decimal
      if (bigValue.lt(0) || !bigValue.eq(bigValue.round(0, 0)) ) {
        return false;
      }

      // Check if the value is within the range of 0 to 2^128 - 1
      return bigValue.lte(maxU128);
    } catch (e) {
      return false;
    }
  }
