export enum USER_INPUT_MAX_DECIMALS {
  PENDULUM = 12,
  STELLAR = 7,
}

export function alreadyHasDecimal(e: KeyboardEvent) {
  const decimalChars = ['.', ','];

  // In the onInput event, "," is replaced by ".", so we check if the e.target.value already contains a "."
  return decimalChars.some((char) => e.key === char && e.target && (e.target as HTMLInputElement).value.includes('.'));
}

export function trimMaxDecimals(value: string, maxDecimals: number): string {
  const [integer, decimal] = value.split('.');
  return decimal ? `${integer}.${decimal.slice(0, maxDecimals)}` : value;
}

export function exceedsMaxDecimals(value: unknown, maxDecimals: number) {
  if (value === undefined || value === null) return true;
  const decimalPlaces = value.toString().split('.')[1];
  return decimalPlaces ? decimalPlaces.length > maxDecimals : false;
}

function truncateIfExceedsMaxDecimals(value: string, maxDecimals: number): string {
  if (exceedsMaxDecimals(value, maxDecimals)) {
    return value.slice(0, -1);
  }
  return value;
}

export function handleOnInputExceedsMaxDecimals(e: KeyboardEvent, maxDecimals: number): void {
  const target = e.target as HTMLInputElement;

  target.value = truncateIfExceedsMaxDecimals(target.value, maxDecimals);
}
