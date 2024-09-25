import { trimToMaxDecimals } from '../../../../shared/parseNumbers/maxDecimals';

const removeNonNumericCharacters = (value: string): string => value.replace(/[^0-9.]/g, '');

const removeExtraDots = (value: string): string => value.replace(/(\..*?)\./g, '$1');

function sanitizeNumericInput(value: string): string {
  return removeExtraDots(removeNonNumericCharacters(value));
}

const replaceCommasWithDots = (value: string): string => value.replace(/,/g, '.');

/**
 * Handles the input change event to ensure the value does not exceed the maximum number of decimal places,
 * replaces commas with dots, and removes invalid non-numeric characters.
 *
 * @param e - The keyboard event triggered by the input.
 * @param maxDecimals - The maximum number of decimal places allowed.
 */
export function handleOnChangeNumericInput(e: KeyboardEvent, maxDecimals: number): void {
  const target = e.target as HTMLInputElement;

  target.value = replaceCommasWithDots(target.value);

  target.value = sanitizeNumericInput(target.value);

  target.value = trimToMaxDecimals(target.value, maxDecimals);
}

function alreadyHasDecimal(e: KeyboardEvent) {
  const decimalChars = ['.', ','];
  return decimalChars.some((char) => e.key === char && e.target && (e.target as HTMLInputElement).value.includes('.'));
}

export function handleOnKeyPressNumericInput(e: KeyboardEvent): void {
  if (alreadyHasDecimal(e)) {
    e.preventDefault();
  }
}

export function handleOnPasteNumericInput(e: ClipboardEvent, maxDecimals: number): string {
  const inputElement = e.target as HTMLInputElement;
  const targetValue = inputElement.value;

  const clipboardData = sanitizeNumericInput(e.clipboardData?.getData('text/plain') || '');
  const combinedValue = targetValue + clipboardData;

  const [integerPart, ...decimalParts] = combinedValue.split('.');
  const sanitizedValue = integerPart + (decimalParts.length > 0 ? '.' + decimalParts.join('') : '');

  e.preventDefault();
  inputElement.value = trimToMaxDecimals(sanitizedValue, maxDecimals);
  return trimToMaxDecimals(sanitizedValue, maxDecimals);
}
