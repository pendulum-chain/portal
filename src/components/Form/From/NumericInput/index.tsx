import { Input } from 'react-daisyui';
import { UseFormRegisterReturn } from 'react-hook-form';

import { USER_INPUT_MAX_DECIMALS } from '../../../../shared/parseNumbers/maxDecimals';
import { handleOnChangeNumericInput } from './helpers';

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
    <div className="flex justify-between w-full">
      <div className="flex-grow text-4xl text-black font-outfit">
        <Input
          {...register}
          autocomplete="off"
          autocorrect="off"
          autocapitalize="none"
          className={
            'input-ghost w-full text-4xl font-outfit pl-0 focus:outline-none focus:text-accent-content text-accent-content ' +
            additionalStyle
          }
          minlength="1"
          onChange={handleOnChange}
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
