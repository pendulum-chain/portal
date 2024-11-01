import { Input } from 'react-daisyui';
import { UseFormRegisterReturn } from 'react-hook-form';

import { USER_INPUT_MAX_DECIMALS } from '../../../../shared/parseNumbers/maxDecimals';
import { handleOnChangeNumericInput, handleOnKeyDownNumericInput, handleOnPasteNumericInput } from './helpers';
import { ChangeEvent, ClipboardEvent } from 'react';

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
  function handleOnChange(e: ChangeEvent): void {
    handleOnChangeNumericInput(e, maxDecimals);
    register.onChange(e);
  }

  function handleOnPaste(e: ClipboardEvent): void {
    handleOnPasteNumericInput(e, maxDecimals);
    register.onChange(e);
  }

  return (
    <div className="flex justify-between w-full">
      <div className="flex-grow text-4xl text-black font-outfit">
        <Input
          {...register}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          className={
            'font-outfit input-ghost w-full pl-0 text-4xl text-accent-content focus:text-accent-content focus:outline-none ' +
            additionalStyle
          }
          minLength={1}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDownNumericInput}
          onPaste={handleOnPaste}
          pattern="^[0-9]*[.,]?[0-9]*$"
          placeholder="0.0"
          readOnly={readOnly}
          spellCheck="false"
          step="any"
          type="text"
          inputMode="decimal"
          value={defaultValue}
          autoFocus={autoFocus}
        />
      </div>
    </div>
  );
};
