import { ArrowPathRoundedSquareIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from 'react-daisyui';
import { useFormContext, useWatch } from 'react-hook-form';
import pendulumIcon from '../../../assets/pendulum-icon.svg';
import useBoolean from '../../../hooks/useBoolean';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import TokenPrice from '../../Asset/Price';
import Balance from '../../Balance';
import { Skeleton } from '../../Skeleton';
import { SwapFormValues } from '../types';

export interface ToProps {
  onOpenSelector: () => void;
  className?: string;
}

const To = ({ onOpenSelector, className }: ToProps): JSX.Element | null => {
  const [isOpen, { toggle }] = useBoolean();
  const { setValue, control } = useFormContext<SwapFormValues>();
  const from = useWatch({
    control,
    name: 'from',
  });
  const to = useWatch({
    control,
    name: 'to',
  });
  const fromAmount = Number(
    useWatch({
      control,
      name: 'fromAmount',
      defaultValue: 0,
    }),
  );
  const slippage = Number(
    useWatch({
      control,
      name: 'slippage',
    }),
  );
  const token = { symbol: 'ETH', address: '6jceNg9gHuob4LBURVto44LtTsWBNpL2vHoUSa184FVcu57t' };
  const fromToken = { symbol: 'USDC', address: '6jceNg9gHuob4LBURVto44LtTsWBNpL2vHoUSa184FVcu57t' };
  const debouncedFromAmount = useDebouncedValue(fromAmount, 800);
  const { isLoading, data, refetch } = {
    data: 154.432,
    isLoading: false,
    refetch: () => undefined,
  }; /* useTokenOutAmount({
    chainId,
    amount: debouncedFromAmount,
    from,
    to,
    enabled: debouncedFromAmount > 0 && !!from && !!to,
    onSuccess: (val) => {
      setValue('toAmount', Number(BigInt(val)));
    },
  }); */
  const loading = isLoading || fromAmount !== debouncedFromAmount;
  const value = data;

  return (
    <>
      <div className={`rounded-lg bg-base-300 px-4 py-3 ${className}`}>
        <div className="w-full flex justify-between">
          <div className="flex-grow text-4xl text-[inherit] font-2">
            {isLoading ? (
              <Skeleton className="inline-flex">10000</Skeleton>
            ) : value ? (
              `${value}`
            ) : (
              <button type="button" onClick={() => refetch()} className="text-2xl hover:opacity-80" title="Refresh">
                <ArrowPathRoundedSquareIcon className="w-4 h-4" />
              </button>
            )}
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
            <strong className="font-bold">{token.symbol}</strong>
            <ChevronDownIcon className="w-4 h-4 inline ml-px" />
          </Button>
        </div>
        <div className="flex justify-between items-center mt-1 dark:text-neutral-300 text-neutral-500">
          <div className="text-sm mt-px">{!!token && <TokenPrice address={token.address} />}</div>
          <div className="flex gap-1 text-sm">
            Balance: <Balance address={token.address} />
          </div>
        </div>
        <div className="mt-4 h-px -mx-4 bg-[rgba(0,0,0,0.15)]" />
        <div
          className={`collapse dark:text-neutral-300 text-neutral-500 -mx-4 text-sm${isOpen ? ' collapse-open' : ''}`}
        >
          <div className="collapse-title cursor-pointer flex justify-between px-4 pt-3 pb-0" onClick={toggle}>
            <div className="flex items-center">
              <div className="tooltip" data-tip="! TODO" title="! TODO">
                <InformationCircleIcon className="w-5 h-5 mr-1" />
              </div>
              1 USDC = 0.00 ETH ($1.00)
            </div>
            <div>
              {'! TODO'}
              <ChevronDownIcon className="w-3 h-3 inline ml-1 -mt-px" />
            </div>
          </div>
          <div className="collapse-content flex flex-col gap-4">
            <div className="mt-3 h-px -mx-4 bg-[rgba(0,0,0,0.15)]" />
            <div className="flex justify-between px-4">
              <div>Expected Output:</div>
              <div>
                <Skeleton isLoading={loading}>
                  {value} {token.symbol}
                </Skeleton>
              </div>
            </div>
            <div className="flex justify-between px-4">
              <div>Price Impact:</div>
              <div>{'! TODO'}%</div>
            </div>
            <div className="flex justify-between px-4">
              <div>Minimum received after slippage (0.56%):</div>
              <div>{'! TODO'} USDC</div>
            </div>
            <div className="flex justify-between px-4">
              <div>Network Fee:</div>
              <div>{'! TODO'}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default To;
