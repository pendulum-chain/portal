export enum USER_INPUT_MAX_DECIMALS {
    PENDULUM = 12,
    STELLAR = 7,
}

export function exceedsMaxDecimals(value: unknown, maxDecimals: number) {
    if (value === undefined || value === null) return true;
    const decimalPlaces = value.toString().split('.')[1];
    return decimalPlaces ? decimalPlaces.length > maxDecimals : false;
}

function isValidNumericInput(value: string): boolean {
    return /^[0-9.,]*$/.test(value);
}

function alreadyHasDecimal(e: KeyboardEvent) {
    const decimalChars = ['.', ','];

    // In the onInput event, "," is replaced by ".", so we check if the e.target.value already contains a "."
    return decimalChars.some((char) => e.key === char && e.target && (e.target as HTMLInputElement).value.includes('.'));
}

export function truncateIfExceedsMaxDecimals(value: string, maxDecimals: number): string {
    if (exceedsMaxDecimals(value, maxDecimals)) {
        return value.slice(0, -1);
    }
    return value;
}

export function handleOnKeyPressExceedsMaxDecimals(e: KeyboardEvent, maxDecimals: number): void {
    if (!isValidNumericInput(e.key) || alreadyHasDecimal(e)) {
        e.preventDefault();
    }
    const target = (e.target as HTMLInputElement);
      if (exceedsMaxDecimals(target.value, maxDecimals - 1)) {
        target.value = target.value.slice(0, -1);
    }
}