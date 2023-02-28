import { pow } from "@polkadot/types/interfaces/definitions";
import BigNumber from "big.js";
import { on } from "events";

export const TOKEN_DECIMALS = 12;

// Change the positive exponent to a high value to prevent toString() returning exponential notation
BigNumber.PE = 100;
// Change the negative exponent to a low value to show more decimals with toString()
BigNumber.NE = -20;

// Converts a decimal number to the native representation (a large integer)
export const decimalToNative = (value: BigNumber | number | string) => {
  const bigIntValue = new BigNumber(value);
  const multiplier = new BigNumber(10).pow(TOKEN_DECIMALS);

  return bigIntValue.times(multiplier);
};

export const nativeToDecimal = (value: BigNumber | number | string) => {
  if (typeof value === "string") {
    // Replace the unnecessary ',' with '' to prevent BigNumber from throwing an error
    value = new BigNumber(value.replaceAll(",", ""));
  }
  const bigIntValue = new BigNumber(value);
  const divisor = new BigNumber(10).pow(TOKEN_DECIMALS);
  const quotient = bigIntValue.div(divisor);

  return quotient.toNumber();
};

const units = [
  { divider: 1e9, prefix: "billion", char: "B" },
  { divider: 1e6, prefix: "million", char: "M" },
  { divider: 1, prefix: "", char: "" },
  { divider: 1e-3, prefix: "milli", char: "m" },
  { divider: 1e-6, prefix: "micro", char: "u" },
  { divider: 1e-9, prefix: "nano", char: "n" },
  { divider: 1e-12, prefix: "pico", char: "p" },
];

export const format = (
  n: number,
  tokenSymbol: string | undefined,
  oneCharOnly = false
) => {
  for (let i = 0; i < units.length; i++) {
    if (n >= units[i].divider) {
      return (
        prettyNumbers(n / units[i].divider) +
        " " +
        (oneCharOnly ? units[i].char : units[i].prefix + " ") +
        tokenSymbol
      );
    }
  }
  return prettyNumbers(n);
};

export const nativeToFormat = (
  value: BigNumber | number | string,
  tokenSymbol: string | undefined,
  oneCharOnly = false
) => format(nativeToDecimal(value), tokenSymbol, oneCharOnly);

export const prettyNumbers = (number: number, lang?: string) =>
  number.toLocaleString(lang || navigator.language, {
    minimumFractionDigits: 2,
  });
