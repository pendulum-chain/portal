import { Input } from 'react-daisyui';
import { UseFormRegisterReturn } from 'react-hook-form';
import { USER_INPUT_MAX_DECIMALS, exceedsMaxDecimals } from '../../../../shared/parseNumbers/decimal';

interface NumericInputProps {
  register: UseFormRegisterReturn;
  readOnly?: boolean;
  additionalStyle?: string;
  maxDecimals?: number;
  defaultValue?: string;
  autoFocus?: boolean;
}

function isValidNumericInput(value: string): boolean {
  return /^[0-9.,]*$/.test(value);
}

function alreadyHasDecimal(e: KeyboardEvent) {
  const decimalChars = ['.', ','];

  // In the onInput event, "," is replaced by ".", so we check if the e.target.value already contains a "."
  return decimalChars.some((char) => e.key === char && e.target && (e.target as HTMLInputElement).value.includes('.'));
}

function handleOnInput(e: KeyboardEvent): void {
  const target = e.target as HTMLInputElement;
  target.value = target.value.replace(/,/g, '.');
}

function handleOnKeyPress(e: KeyboardEvent, maxDecimals: number): void {
  if (!isValidNumericInput(e.key) || alreadyHasDecimal(e)) {
    e.preventDefault();
  }
  const target = e.target as HTMLInputElement;
  if (exceedsMaxDecimals(target.value, maxDecimals - 1)) {
    target.value = target.value.slice(0, -1);
  }
}

export const NumericInput = ({
  register,
  readOnly = false,
  additionalStyle,
  maxDecimals = USER_INPUT_MAX_DECIMALS.PENDULUM,
  defaultValue,
  autoFocus,
}: NumericInputProps) => (
  <div className="w-full flex justify-between">
    <div className="flex-grow text-4xl text-black font-outfit">
      <Input
        autocomplete="off"
        autocorrect="off"
        autocapitalize="none"
        className={
          'input-ghost w-full text-4xl font-outfit pl-0 focus:outline-none focus:text-accent-content text-accent-content ' +
          additionalStyle
        }
        minlength="1"
        onKeyPress={(e: KeyboardEvent) => handleOnKeyPress(e, maxDecimals)}
        onInput={handleOnInput}
        pattern="^[0-9]*[.,]?[0-9]*$"
        placeholder="0.0"
        readOnly={readOnly}
        spellcheck="false"
        step="any"
        type="text"
        inputmode="decimal"
        value={defaultValue}
        autoFocus={autoFocus}
        {...register}
      />
    </div>
  </div>
);
