import { HTMLAttributes, useCallback } from 'react';

export interface NumberInputPropse {
  attributes: HTMLAttributes<HTMLInputElement>;
}

/*
// Hack required for Preact compatibility with react-hook-form
export default function NumberInput(attributes: HTMLAttributes<HTMLInputElement>) {
  const { onChange } = attributes;
  const attributesWithoutOnChange = { ...attributes };
  //  delete attributesWithoutOnChange.onChange;

  const onInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let number = e.currentTarget.value.replace(/[^0-9.]/g, '');
      const periodIndex = number.indexOf('.');
      if (periodIndex > -1) {
        number = number.slice(0, periodIndex + 1) + number.slice(periodIndex + 1).replace(/\./g, '');
      }

      e.currentTarget.value = number;
      e.target.value = number;
      onChange?.(e);
    },
    [onChange],
  );

  return <input inputMode="numeric" type="text" {...attributesWithoutOnChange} onInput={onChange} />;
} */
