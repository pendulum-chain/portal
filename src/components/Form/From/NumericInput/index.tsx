import { Input } from 'react-daisyui';
import { UseFormRegisterReturn } from 'react-hook-form';

import {
  alreadyHasDecimal,
  handleOnInputExceedsMaxDecimals,
  USER_INPUT_MAX_DECIMALS,
} from '../../../../shared/parseNumbers/maxDecimals';

interface NumericInputProps {
  register: UseFormRegisterReturn;
  readOnly?: boolean;
  additionalStyle?: string;
  maxDecimals?: number;
  defaultValue?: string;
  autoFocus?: boolean;
}

const isValidNumericInput = (value: string): boolean => /^[0-9.,]*$/.test(value);

function handleOnKeyPressNumericInput(e: KeyboardEvent): void {
  if (!isValidNumericInput(e.key) || alreadyHasDecimal(e)) {
    e.preventDefault();
  }
}

export const NumericInput = ({
  register,
  readOnly = false,
  additionalStyle,
  maxDecimals = USER_INPUT_MAX_DECIMALS.PENDULUM,
  defaultValue,
  autoFocus,
}: NumericInputProps) => {
  function handleOnInput(e: KeyboardEvent): void {
    const target = e.target as HTMLInputElement;
    target.value = target.value.replace(/,/g, '.');

    handleOnInputExceedsMaxDecimals(e, maxDecimals);
  }

  return (
    <div className="flex justify-between w-full">
      <div className="flex-grow text-4xl text-black font-outfit">
        <Input
          autocomplete="off"
          autocorrect="off"
          autocapitalize="none"
          className={
            'input-ghost w-full text-4xl font-outfit pl-0 focus:outline-none focus:text-accent-content text-accent-content ' +
            additionalStyle
          }
          onKeyPress={handleOnKeyPressNumericInput}
          minlength="1"
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
};
