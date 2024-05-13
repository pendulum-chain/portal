import { ArrowPathRoundedSquareIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { useEffect, useMemo } from 'preact/compat';
import { Button } from 'react-daisyui';
import { useFormContext, useWatch } from 'react-hook-form';
import pendulumIcon from '../../../assets/pendulum-icon.svg';
import { config } from '../../../config';
import { subtractBigDecimalPercentage } from '../../../helpers/calc';
import { useTokenOutAmount } from '../../../hooks/nabla/useTokenOutAmount';
import useBoolean from '../../../hooks/useBoolean';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import { stringifyBigWithSignificantDecimals } from '../../../shared/parseNumbers/metric';
import { NumberLoader } from '../../Loader';
import { Skeleton } from '../../Skeleton';
import { SwapFormValues } from './schema';
import { NablaInstanceToken } from '../../../hooks/nabla/useNablaInstance';
import { erc20WrapperAbi } from '../../../contracts/nabla/ERC20Wrapper';
import { NablaTokenPrice } from '../common/NablaTokenPrice';
import { Erc20Balance } from '../common/Erc20Balance';
import Big from 'big.js';
import { getValidSlippage } from '../../../helpers/transaction';

export interface ToProps {
  tokensMap: Record<string, NablaInstanceToken>;
  onOpenSelector: () => void;
  inputHasError: boolean;
}

export default function To({ tokensMap, onOpenSelector, inputHasError }: ToProps): JSX.Element | null {
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

  const fromDecimalAmountString = useWatch({
    control,
    name: 'fromAmount',
    defaultValue: '0',
  });

  const fromDecimalAmount = useMemo(() => {
    try {
      return new Big(fromDecimalAmountString);
    } catch {
      return undefined;
    }
  }, [fromDecimalAmountString]);

  const slippage = getValidSlippage(
    Number(
      useWatch({
        control,
        name: 'slippage',
        defaultValue: config.swap.defaults.slippage,
      }),
    ),
  );

  const fromToken: NablaInstanceToken | undefined = tokensMap?.[from];
  const toToken: NablaInstanceToken | undefined = tokensMap?.[to];

  const debouncedFromDecimalAmount = useDebouncedValue(fromDecimalAmount, 800);

  const {
    isLoading,
    fetchStatus,
    data: tokenOutAmount,
    error,
    refetch,
  } = useTokenOutAmount({
    fromDecimalAmount: debouncedFromDecimalAmount,
    from,
    to,
    fromTokenDecimals: fromToken?.decimals,
    toTokenDecimals: toToken?.decimals,
  });

  useEffect(() => {
    if (error !== null) {
      setError('fromAmount', { type: 'manual', message: error });
    } else {
      clearErrors('fromAmount');
    }
  }, [error, setError, clearErrors]);

  const loading = (isLoading && fetchStatus !== 'idle') || fromDecimalAmount !== debouncedFromDecimalAmount;

  useEffect(() => {
    setValue('toAmount', tokenOutAmount?.amountOut.preciseString ?? '0', {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [tokenOutAmount?.amountOut.preciseString, setValue]);

  return (
    <div
      className={`rounded-lg bg-base-300 px-4 py-3 border ${inputHasError ? 'border-red-600' : 'border-transparent'}`}
    >
      <div className="w-full flex justify-between">
        <div className="flex-grow text-4xl text-[inherit] font-outfit">
          {loading ? (
            <NumberLoader />
          ) : tokenOutAmount ? (
            `${tokenOutAmount.amountOut.approximateStrings.atLeast4Decimals}`
          ) : fromDecimalAmount !== undefined && fromDecimalAmount.gt(new Big(0)) ? (
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
        <div className="text-sm mt-px">{toToken ? <NablaTokenPrice address={toToken.id} fallback="$ -" /> : '$ -'}</div>
        <div className="flex gap-1 text-sm">
          Your balance:{' '}
          <Erc20Balance
            abi={erc20WrapperAbi}
            erc20ContractDefinition={
              toToken ? { contractAddress: toToken.id, decimals: toToken.decimals, symbol: toToken.symbol } : undefined
            }
          />
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
            {fromToken && toToken && tokenOutAmount && debouncedFromDecimalAmount && !loading ? (
              <>{`1 ${fromToken.symbol} = ${stringifyBigWithSignificantDecimals(
                tokenOutAmount.amountOut.preciseBigDecimal.div(debouncedFromDecimalAmount),
                6,
              )} ${toToken.symbol}`}</>
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
              <Skeleton isLoading={loading || tokenOutAmount === undefined}>
                {tokenOutAmount?.amountOut.approximateStrings.atLeast4Decimals} {toToken?.symbol || ''}
              </Skeleton>
            </div>
          </div>
          <div className="flex justify-between">
            <div>Minimum received after slippage ({slippage}%)</div>
            <div>
              <Skeleton isLoading={loading || tokenOutAmount === undefined}>
                {tokenOutAmount !== undefined
                  ? stringifyBigWithSignificantDecimals(
                      subtractBigDecimalPercentage(tokenOutAmount.amountOut.preciseBigDecimal, slippage),
                      2,
                    )
                  : ''}{' '}
                {toToken?.symbol || ''}
              </Skeleton>
            </div>
          </div>
          <div className="flex justify-between">
            <div>Swap fee:</div>
            <div>
              {tokenOutAmount !== undefined ? tokenOutAmount.swapFee.approximateStrings.atLeast2Decimals : ''}{' '}
              {toToken?.symbol || ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
