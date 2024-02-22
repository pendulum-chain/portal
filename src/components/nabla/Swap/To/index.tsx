import { ArrowPathRoundedSquareIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'preact/compat';
import { Button } from 'react-daisyui';
import { useFormContext, useWatch } from 'react-hook-form';
import pendulumIcon from '../../../../assets/pendulum-icon.svg';
import { config } from '../../../../config';
import { subtractPercentage } from '../../../../helpers/calc';
import { useTokenOutAmount } from '../../../../hooks/nabla/useTokenOutAmount';
import useBoolean from '../../../../hooks/useBoolean';
import { useDebouncedValue } from '../../../../hooks/useDebouncedValue';
import { getMessageCallValue } from '../../../../shared/helpers';
import { rawToDecimal, prettyNumbers, roundNumber } from '../../../../shared/parseNumbers';
import Erc20Balance from '../../../Erc20Balance';
import { numberLoader } from '../../../Loader';
import { Skeleton } from '../../../Skeleton';
import TokenPrice from '../../Price';
import { SwapFormValues } from '../types';
import { NablaInstanceToken } from '../../../../hooks/nabla/useNablaInstance';
import { erc20WrapperAbi } from '../../../../contracts/nabla/ERC20Wrapper';

export interface ToProps {
  tokensMap: Record<string, NablaInstanceToken>;
  onOpenSelector: () => void;
  className?: string;
}

const To = ({ tokensMap, onOpenSelector, className }: ToProps): JSX.Element | null => {
  const [isOpen, { toggle }] = useBoolean(true);
  const { setValue, setError, clearErrors, control } = useFormContext<SwapFormValues>();

  const from = useWatch({
    control,
    name: 'from',
  });

  const to = useWatch({
    control,
    name: 'to',
  });

  const fromDecimalAmount = Number(
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
      defaultValue: config.swap.defaults.slippage,
    }),
  );
  const fromToken: NablaInstanceToken | undefined = tokensMap?.[from];
  const toToken: NablaInstanceToken | undefined = tokensMap?.[to];

  const debouncedFromDecimalAmount = useDebouncedValue(fromDecimalAmount, 800);
  const { isLoading, fetchStatus, data, refetch } = useTokenOutAmount({
    fromDecimalAmount: debouncedFromDecimalAmount,
    from,
    to,
    fromTokenDecimals: fromToken?.decimals,
    onSuccess: (response) => {
      if (toToken === undefined) return;

      const val = getMessageCallValue(response);
      const toAmount = val ? rawToDecimal(val, toToken.decimals).toNumber() : 0;
      setValue('toAmount', toAmount, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
  });

  useEffect(() => {
    if (data && data.result.type !== 'success') {
      let errorMessage;
      switch (data.result.type) {
        case 'error':
          errorMessage = 'Something went wrong';
          break;
        case 'panic':
          errorMessage = data.result.errorCode === 0x11 ? 'The input amount is too large' : 'Something went wrong';
          break;
        case 'reverted':
          errorMessage =
            data.result.description === 'SwapPool: EXCEEDS_MAX_COVERAGE_RATIO'
              ? 'The input amount is too large'
              : 'Something went wrong';
      }

      console.log('ToAmount Error', errorMessage);
      setError('fromAmount', { type: 'manual', message: errorMessage });
    } else {
      clearErrors('fromAmount');
    }
  }, [data, setError, clearErrors]);

  const loading =
    (isLoading && isLoading && fetchStatus !== 'idle') || fromDecimalAmount !== debouncedFromDecimalAmount;
  const outValue = getMessageCallValue(data);
  const value =
    outValue && toToken !== undefined ? prettyNumbers(rawToDecimal(outValue, toToken.decimals).toNumber()) : 0;

  console.log(
    'roundNumber(Number(value) / fromDecimalAmount, 6)',
    roundNumber(Number(value) / fromDecimalAmount, 6),
    value,
    fromDecimalAmount,
  );
  return (
    <>
      <div className={`rounded-lg bg-base-300 px-4 py-3 ${className}`}>
        <div className="w-full flex justify-between">
          <div className="flex-grow text-4xl text-[inherit] font-2">
            {loading ? (
              numberLoader
            ) : value ? (
              `${value}`
            ) : fromDecimalAmount > 0 ? (
              <button type="button" onClick={() => refetch()} className="hover:opacity-80" title="Refresh">
                <ArrowPathRoundedSquareIcon className="w-7 h-7" />
              </button>
            ) : (
              <>0</>
            )}
          </div>
          <Button
            size="xs"
            className="rounded-full h-7 min-h-none border-0 bg-neutral-200 dark:bg-neutral-700 pl-0 pr-1 flex items-center mt-0.5 text-sm font-medium"
            onClick={onOpenSelector}
            type="button"
          >
            <span className="rounded-full bg-[rgba(0,0,0,0.15)] h-full p-px mr-1">
              <img src={pendulumIcon} alt="Pendulum" className="h-full w-auto" />
            </span>
            <strong className="font-bold">{toToken?.symbol || 'Select'}</strong>
            <ChevronDownIcon className="w-4 h-4 inline ml-px" />
          </Button>
        </div>
        <div className="flex justify-between items-center mt-1 dark:text-neutral-300 text-neutral-500">
          <div className="text-sm mt-px">{toToken ? <TokenPrice address={toToken.id} fallback="$ -" /> : '$ -'}</div>
          <div className="flex gap-1 text-sm">
            Balance: <Erc20Balance address={toToken?.id} decimals={toToken?.decimals} abi={erc20WrapperAbi} />
          </div>
        </div>
        <div className="mt-4 h-px -mx-4 bg-[rgba(0,0,0,0.15)]" />
        <div
          className={`collapse overflow-visible dark:text-neutral-300 text-neutral-500 -mx-4 text-sm${
            isOpen ? ' collapse-open' : ''
          }`}
        >
          <div className="collapse-title cursor-pointer flex justify-between px-4 pt-3 pb-0" onClick={toggle}>
            <div className="flex items-center">
              {fromToken && toToken && value && fromDecimalAmount ? (
                <>
                  <div className="tooltip" data-tip="! TODO" title="! TODO">
                    <InformationCircleIcon className="w-5 h-5 mr-1" />
                  </div>
                  {`1 ${fromToken.symbol} = ${roundNumber(Number(value) / fromDecimalAmount, 6)} ${toToken.symbol}`}
                </>
              ) : (
                `- ${toToken?.symbol || ''}`
              )}
            </div>
            <div>
              <div
                title="More info"
                className="w-6 h-6 ml-1 flex items-center justify-center rounded-full bg-blackAlpha-200 dark:bg-whiteAlpha-200 hover:opacity-80"
              >
                <ChevronDownIcon className="w-5 h-5 inline" />
              </div>
            </div>
          </div>
          <div className="collapse-content flex flex-col gap-5">
            <div className="flex justify-between pt-6">
              <div>Expected Output:</div>
              <div>
                <Skeleton isLoading={loading}>
                  {value} {toToken?.symbol || ''}
                </Skeleton>
              </div>
            </div>
            <div className="flex justify-between">
              <div>Minimum received after slippage ({slippage}%)</div>
              <div>
                <Skeleton isLoading={loading}>
                  {subtractPercentage(Number(value), slippage)} {toToken?.symbol || ''}
                </Skeleton>
              </div>
            </div>
            <div className="flex justify-between">
              <div>Swap fee:</div>
              <div>-</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default To;
