import { Input } from 'react-daisyui';
import { UseFormRegisterReturn } from 'react-hook-form';
import { roundNumber } from '../../../shared/parseNumbers/metric';

export interface AmountProps {
  className?: string;
  max?: number;
  min?: number;
  register: UseFormRegisterReturn;
  setValue: (n: number) => void;
  assetSuffix?: string;
  error?: string;
  fullMax?: boolean;
}

const BALANCE_LEFT_FOR_TX_APPROVAL = 0.5;

function calculateMaxAmount(max: number, fullMax: boolean) {
  if (fullMax) return max;
  const maxAmount = roundNumber(max - BALANCE_LEFT_FOR_TX_APPROVAL);
  return Math.max(0, maxAmount);
}

const Amount = ({ className, register, max, setValue, error, fullMax = false }: AmountProps): JSX.Element | null => {
  return (
    <>
      <div
        className={`rounded-lg bg-base-300 px-4 py-3 ${className || ''} ${
          error ? 'border border-solid border-red-400' : ''
        }`}
      >
        <div className="w-full flex justify-between">
          <div className="flex-grow text-4xl text-accent-content font-2">
            <Input
              className="input-ghost w-full text-4xl font-2 pl-0 focus:outline-none"
              type="number"
              step="any"
              onKeyPress={(e: KeyboardEvent) => {
                if (e.code === 'Minus' || e.code === 'KeyE') {
                  e.preventDefault();
                }
              }}
              placeholder="0.0"
              {...register}
            />
          </div>
          <div className="flex">
            <button
              className="text-accent-content underline hover:opacity-70 mx-1 font-semibold"
              onClick={() => setValue(roundNumber(Number(max) * 0.5))}
              type="button"
            >
              50%
            </button>
            <button
              className="text-accent-content underline hover:opacity-70 mx-1 font-semibold"
              onClick={() => setValue(calculateMaxAmount(Number(max), fullMax))}
              type="button"
            >
              MAX
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center dark:text-neutral-400 text-neutral-500">
          <div className="text-sm mt-px">Amount</div>
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
};
export default Amount;
