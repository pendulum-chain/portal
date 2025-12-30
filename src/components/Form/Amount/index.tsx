import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { roundNumber } from '../../../shared/parseNumbers/metric';
import { NumericInput } from '../From/NumericInput';

export interface AmountProps<FormFieldValues extends FieldValues = FieldValues> {
  className?: string;
  max?: number;
  min?: number;
  control: Control<FormFieldValues>;
  name: FieldPath<FormFieldValues>;
  setValue: (n: number) => void;
  assetSuffix?: string;
  error?: string;
  fullMax?: boolean;
  hideHalfButton?: boolean;
  hideMaxButton?: boolean;
  readOnly?: boolean;
  defaultValue?: string;
}

const BALANCE_LEFT_FOR_TX_APPROVAL = 0.5;

function calculateMaxAmount(max: number, fullMax: boolean) {
  if (fullMax) return max;
  const maxAmount = roundNumber(max - BALANCE_LEFT_FOR_TX_APPROVAL);
  return Math.max(0, maxAmount);
}

const Amount = <FormFieldValues extends FieldValues = FieldValues>({
  className,
  control,
  name,
  max,
  setValue,
  error,
  fullMax = true,
  hideHalfButton = false,
  hideMaxButton = false,
  readOnly = false,
  defaultValue,
}: AmountProps<FormFieldValues>): JSX.Element | null => (
  <>
    <div
      className={`rounded-lg bg-base-300 px-4 py-3 ${className || ''} ${
        error ? 'border border-solid border-red-400' : ''
      }`}
    >
      <div className="flex w-full justify-between">
        <div className="font-outfit flex-grow text-4xl text-accent-content">
          <NumericInput
            control={control}
            name={name}
            readOnly={readOnly}
            additionalStyle="input-ghost w-full text-4xl font-outfit pl-0 focus:outline-none"
            defaultValue={defaultValue}
          />
        </div>
        <div className="flex">
          {hideHalfButton ? null : (
            <button
              className="mx-1 font-semibold text-accent-content underline hover:opacity-70"
              onClick={() => setValue(roundNumber(Number(max) * 0.5))}
              type="button"
            >
              50%
            </button>
          )}
          {hideMaxButton ? null : (
            <button
              className="mx-1 font-semibold text-accent-content underline hover:opacity-70"
              onClick={() => setValue(calculateMaxAmount(Number(max), fullMax))}
              type="button"
            >
              MAX
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
        <div className="mt-px text-sm">Amount</div>
        <div className="flex gap-1 text-sm">
          {max !== undefined && <span className="mr-1">Available: {max.toFixed(2)}</span>}
        </div>
      </div>
    </div>
    {error ? (
      <label className="label">{error && <span className="label-text text-red-400">{error}</span>}</label>
    ) : null}
  </>
);

export default Amount;
