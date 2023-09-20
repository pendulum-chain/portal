import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'preact';
import { Button } from 'react-daisyui';
import { UseFormRegisterReturn } from 'react-hook-form';
import pendulumIcon from '../../../assets/pendulum-icon.svg';

export type IssueFormValues = {
  amount: number;
  to: number;
  deadline: number;
};

export interface FromProps {
  onOpenSelector?: () => void;
  balance?: number;
  className?: string;
  max?: number;
  min?: number;
  inputProps: UseFormRegisterReturn;
  setValue: (n: number) => void;
  error?: string;
}

const From = ({
  onOpenSelector,
  className,
  inputProps,
  max,
  setValue,
  error,
  balance,
}: FromProps): JSX.Element | null => {
  return (
    <>
      <div className={`rounded-lg bg-base-300 px-4 py-3 ${className}`}>
        {error && <div>{error}</div>}
        <div className="w-full flex justify-between">
          <div className="flex-grow text-4xl text-black font-2">
            <input
              autoFocus
              className="input-ghost w-full text-4xl font-2"
              type="number"
              placeholder="0.0"
              {...inputProps}
            />
          </div>
          <Button
            size="xs"
            className="rounded-full h-4 min-h-none border-0 bg-neutral-200 dark:bg-neutral-700 pl-0 pr-1 flex items-center mt-0.5"
            onClick={onOpenSelector}
            type="button"
          >
            <span className="rounded-full bg-[rgba(0,0,0,0.15)] h-full p-px mr-1">
              <img src={pendulumIcon} alt="Pendulum" className="h-full w-auto" />
            </span>
            <strong className="font-bold">{'USDC'}</strong>
            <ChevronDownIcon className="w-4 h-4 inline ml-px" />
          </Button>
        </div>
        <div className="flex justify-between items-center mt-1 dark:text-neutral-400 text-neutral-500">
          <div className="text-sm mt-px text-secondary-content">From Stellar</div>
          <div className="flex gap-1 text-sm">
            {balance !== undefined && (
              <Fragment>
                <span className="mr-1">Available: {balance}</span>
                <button className="text-primary hover:underline" onClick={() => setValue(Number(max))} type="button">
                  MAX
                </button>
                <button
                  className="text-primary hover:underline"
                  onClick={() => setValue(Number(max) * 0.5)}
                  type="button"
                >
                  50%
                </button>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default From;
