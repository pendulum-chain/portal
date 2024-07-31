export enum USER_INPUT_MAX_DECIMALS {
  PENDULUM = 12,
  STELLAR = 7,
}

/**
 * Trims the decimal part of a numeric string to a specified maximum number of decimal places.
 *
 * @param value - The numeric string to be trimmed.
 * @param maxDecimals - The maximum number of decimal places allowed.
 * @returns The trimmed numeric string with at most maxDecimals decimal places.
 */

export function trimToMaxDecimals(value: string, maxDecimals: number): string {
  const [integer, decimal] = value.split('.');
  return decimal ? `${integer}.${decimal.slice(0, maxDecimals)}` : value;
}
