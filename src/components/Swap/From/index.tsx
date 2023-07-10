import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'preact';
import { Button } from 'react-daisyui';
import { useFormContext, useWatch } from 'react-hook-form';
import pendulumIcon from '../../../assets/pendulum-icon.svg';
import { useBalance } from '../../../hooks/useBalance';
import TokenPrice from '../../Asset/Price';
import { SwapFormValues } from '../types';

export interface FromProps {
  onOpenSelector: () => void;
  className?: string;
}

const From = ({ onOpenSelector, className }: FromProps): JSX.Element | null => {
  const { register, setValue, control } = useFormContext<SwapFormValues>();
  const from = useWatch({
    control,
    name: 'from',
  });
  const token = { symbol: 'ETH', address: '6jceNg9gHuob4LBURVto44LtTsWBNpL2vHoUSa184FVcu57t' }; // ! TODO: get token info
  const { balance } = useBalance(token.address);
  return (
    <>
      <div className={`rounded-lg bg-base-100 px-4 py-3 ${className}`}>
        <div className="w-full flex justify-between">
          <div className="flex-grow text-4xl text-[inherit] font-2">
            <input
              autoFocus
              className="input-ghost w-full text-4xl font-2"
              placeholder="0.0"
              {...register('fromAmount', { onChange: () => undefined })}
            />
          </div>
          <Button
            size="xs"
            className="rounded-full h-4 min-h-none bg-[rgba(0,0,0,0.08)] pl-0 pr-1 flex items-center mt-0.5"
            onClick={onOpenSelector}
            type="button"
          >
            <span className="rounded-full bg-[rgba(0,0,0,0.1)] h-full p-px mr-1">
              <img src={pendulumIcon} alt="Pendulum" className="h-full w-auto" />
            </span>
            <strong className="font-bold">{token.symbol}</strong>
            <ChevronDownIcon className="w-4 h-4 inline ml-px" />
          </Button>
        </div>
        <div className="flex justify-between items-center mt-1">
          <div className="text-sm  text-gray-500 mt-px">{!!token && <TokenPrice address={token.address} />}s</div>
          <div className="flex gap-1 text-sm text-gray-500">
            {balance !== undefined && (
              <Fragment>
                <span className="mr-1">Balance: {balance}</span>
                <button
                  className="text-primary hover:underline"
                  onClick={() => setValue('fromAmount', Number(balance))}
                  type="button"
                >
                  MAX
                </button>
                <button
                  className="text-primary hover:underline"
                  onClick={() => setValue('fromAmount', Number(balance) * 0.5)}
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
