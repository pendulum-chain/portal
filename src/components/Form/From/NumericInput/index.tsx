import { Input } from 'react-daisyui';
import { UseFormRegisterReturn } from 'react-hook-form';

import { USER_INPUT_MAX_DECIMALS } from '../../../../shared/parseNumbers/maxDecimals';
import { handleOnChangeNumericInput, handleOnKeyPressNumericInput, handleOnPasteNumericInput } from './helpers';

interface NumericInputProps {
  register: UseFormRegisterReturn;
  readOnly?: boolean;
  additionalStyle?: string;
  maxDecimals?: number;
  defaultValue?: string;
  autoFocus?: boolean;
}

export const NumericInput = ({
  register,
  readOnly = false,
  additionalStyle,
  maxDecimals = USER_INPUT_MAX_DECIMALS.PENDULUM,
  defaultValue,
  autoFocus,
}: NumericInputProps) => {
  function handleOnChange(e: KeyboardEvent): void {
    handleOnChangeNumericInput(e, maxDecimals);
    register.onChange(e);
  }

  return (
    <div className="flex w-full justify-between">
      <div className="font-outfit flex-grow text-4xl text-black">
        <Input
          {...register}
          autocomplete="off"
          autocorrect="off"
          autocapitalize="none"
          className={
            'font-outfit input-ghost w-full pl-0 text-4xl text-accent-content focus:text-accent-content focus:outline-none ' +
            additionalStyle
          }
          minlength="1"
          onChange={handleOnChange}
          onKeyPress={handleOnKeyPressNumericInput}
          onPaste={(e: ClipboardEvent) => handleOnPasteNumericInput(e, maxDecimals)}
          pattern="^[0-9]*[.,]?[0-9]*$"
          placeholder="0.0"
          readOnly={readOnly}
          spellcheck="false"
          step="any"
          type="text"
          inputmode="decimal"
          value={defaultValue}
          autoFocus={autoFocus}
        />
      </div>
    </div>
  );
};
