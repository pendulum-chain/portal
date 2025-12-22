import { UseFormRegisterReturn } from 'react-hook-form';
import { NumoraInput, ThousandStyle } from 'numora-react';
import { ChangeEvent, ClipboardEvent } from 'react';

import { USER_INPUT_MAX_DECIMALS } from '../../../../shared/parseNumbers/maxDecimals';

interface NumericInputProps {
  register: UseFormRegisterReturn;
  readOnly?: boolean;
  additionalStyle?: string;
  maxDecimals?: number;
  defaultValue?: string;
  value?: string;
  autoFocus?: boolean;
}

export const NumericInput = ({
  register,
  readOnly = false,
  additionalStyle,
  maxDecimals = USER_INPUT_MAX_DECIMALS.PENDULUM,
  defaultValue,
  value,
  autoFocus,
}: NumericInputProps) => {
  function handleOnChange(e: ChangeEvent<HTMLInputElement> | ClipboardEvent<HTMLInputElement>): void {
    register.onChange(e as ChangeEvent<HTMLInputElement>);
  }

  return (
    <div className="flex justify-between w-full">
      <div className="flex-grow text-4xl text-black font-outfit">
        <NumoraInput
          {...register}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          className={
            'font-outfit input-ghost w-full pl-0 text-4xl text-accent-content focus:text-accent-content focus:outline-none ' +
            (additionalStyle || '')
          }
          placeholder="0.0"
          readOnly={readOnly}
          spellCheck="false"
          maxDecimals={maxDecimals}
          {...(value !== undefined ? { value } : { defaultValue })}
          autoFocus={autoFocus}
          onChange={handleOnChange}
          enableLeadingZeros={true}
          thousandStyle={ThousandStyle.None}
        />
      </div>
    </div>
  );
};
