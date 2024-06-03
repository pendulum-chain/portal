import { Button, Range } from 'react-daisyui';
import { FieldPath, FieldValues, PathValue, UseFormReturn, useWatch } from 'react-hook-form';
import { useEffect, useMemo } from 'preact/hooks';
import Big from 'big.js';

import { ChangeEvent, ReactNode } from 'preact/compat';
import { fractionOfValue } from '../../../shared/parseNumbers/metric';
import { ContractBalance } from '../../../helpers/contracts';
import { calcSharePercentageNumber } from '../../../helpers/calc';
import { NumericInput } from '../../Form/From/NumericInput';

interface AmountSelectorProps<FormFieldValues extends FieldValues, TFieldName extends FieldPath<FormFieldValues>> {
  maxBalance: ContractBalance | undefined;
  formFieldName: TFieldName;
  form: UseFormReturn<FormFieldValues>;
  children?: ReactNode;
  onlyShowNumberInput?: boolean;
}

export function AmountSelector<FormFieldValues extends FieldValues, TFieldName extends FieldPath<FormFieldValues>>({
  formFieldName,
  maxBalance,
  form,
  children,
  onlyShowNumberInput,
}: AmountSelectorProps<FormFieldValues, TFieldName>) {
  type K = PathValue<FormFieldValues, TFieldName>;

  const { setError, clearErrors, setValue } = form;

  const amountString: string = useWatch({
    control: form.control,
    name: formFieldName,
    defaultValue: '0' as K,
  });

  const amountBigDecimal = useMemo(() => {
    try {
      return new Big(amountString);
    } catch {
      return undefined;
    }
  }, [amountString]);

  useEffect(() => {
    const determineErrorMessage = (): string | undefined => {
      if (amountString.length === 0) return;
      if (amountBigDecimal === undefined) return 'Enter a proper number';
      if (maxBalance === undefined) return;
      if (amountBigDecimal.gt(maxBalance.preciseBigDecimal)) return 'Amount exceeds maximum';

      if (amountBigDecimal.c[0] !== 0) {
        if (amountBigDecimal.e + 1 + maxBalance.decimals < amountBigDecimal.c.length)
          return `The number you entered must have at most ${maxBalance.decimals} decimal places`;
      }
    };

    const errorMessage = determineErrorMessage();
    if (errorMessage) {
      setError(formFieldName, { type: 'custom', message: errorMessage });
    } else {
      clearErrors(formFieldName);
    }
  }, [amountString, amountBigDecimal, formFieldName, maxBalance, setError, clearErrors]);

  if (onlyShowNumberInput === true) {
    return (
      <NumericInput
        additionalStyle="input-ghost w-full flex-grow text-4xl font-outfit px-0 py-3"
        register={form.register(formFieldName)}
        autoFocus
        maxDecimals={maxBalance?.decimals}
      />
    );
  }

  return (
    <div className="relative rounded-lg bg-neutral-100 dark:bg-neutral-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <NumericInput
            additionalStyle="input-ghost w-full flex-grow text-4xl font-outfit px-0 py-3"
            register={form.register(formFieldName)}
            autoFocus
            maxDecimals={maxBalance?.decimals}
          />
          <Button
            className="bg-neutral-200 dark:bg-neutral-800 px-3 rounded-2xl"
            size="sm"
            type="button"
            onClick={() => {
              if (maxBalance !== undefined) {
                setValue(formFieldName, fractionOfValue(maxBalance.preciseBigDecimal, 50) as K, {
                  shouldDirty: true,
                  shouldTouch: true,
                });
              }
            }}
          >
            50%
          </Button>
          <Button
            className="bg-neutral-200 dark:bg-neutral-800 px-3 rounded-2xl"
            size="sm"
            type="button"
            onClick={() => {
              if (maxBalance !== undefined) {
                setValue(formFieldName, fractionOfValue(maxBalance.preciseBigDecimal, 100) as K, {
                  shouldDirty: true,
                  shouldTouch: true,
                });
              }
            }}
          >
            MAX
          </Button>
        </div>
      </div>
      <Range
        color={maxBalance === undefined ? 'secondary' : 'primary'}
        min={0}
        max={100}
        size="sm"
        disabled={maxBalance === undefined}
        value={
          amountBigDecimal !== undefined && maxBalance !== undefined
            ? calcSharePercentageNumber(maxBalance.preciseBigDecimal, amountBigDecimal)
            : 0
        }
        onChange={(ev: ChangeEvent<HTMLInputElement>) => {
          if (maxBalance === undefined) return;
          setValue(formFieldName, fractionOfValue(maxBalance.preciseBigDecimal, Number(ev.currentTarget.value)) as K, {
            shouldDirty: true,
            shouldTouch: false,
          });
        }}
      />
      {children}
    </div>
  );
}
