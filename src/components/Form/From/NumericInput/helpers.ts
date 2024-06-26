import { trimToMaxDecimals } from '../../../../shared/parseNumbers/maxDecimals';

const removeNonNumericCharacters = (value: string): string => value.replace(/[^0-9.]/g, '');

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

  target.value = removeNonNumericCharacters(target.value);

  target.value = trimToMaxDecimals(target.value, maxDecimals);
}
