import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';
import { NumoraInput, ThousandStyle } from 'numora-react';

import { USER_INPUT_MAX_DECIMALS } from '../../../../shared/parseNumbers/maxDecimals';

interface NumericInputProps<FormFieldValues extends FieldValues = FieldValues> {
  control: Control<FormFieldValues>;
  name: FieldPath<FormFieldValues>;
  readOnly?: boolean;
  additionalStyle?: string;
  maxDecimals?: number;
  defaultValue?: string;
  autoFocus?: boolean;
  rules?: RegisterOptions<FormFieldValues>;
  onChange?: (value: string) => void;
}

export const NumericInput = <FormFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  readOnly = false,
  additionalStyle,
  maxDecimals = USER_INPUT_MAX_DECIMALS.PENDULUM,
  autoFocus,
  rules,
  onChange: customOnChange,
}: NumericInputProps<FormFieldValues>) =>  (
    <div className="flex justify-between w-full">
      <div className="flex-grow text-4xl text-black font-outfit">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <NumoraInput
              {...field}
              onChange={(e) => {
                field.onChange(e);
                if (customOnChange) {
                  const value = typeof e === 'string' ? e : (e.target as HTMLInputElement).value;
                  customOnChange(value);
                }
              }}
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
              autoFocus={autoFocus}
              thousandStyle={ThousandStyle.None}
            />
          )}
        />
      </div>
    </div>
);
