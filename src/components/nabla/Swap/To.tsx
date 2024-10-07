import { ArrowPathRoundedSquareIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { useEffect } from 'preact/compat';
import { Button } from 'react-daisyui';
import { useFormContext } from 'react-hook-form';
import Big from 'big.js';

import { UseTokenOutAmountResult } from '../../../hooks/nabla/useTokenOutAmount';
import useBoolean from '../../../hooks/useBoolean';
import { NumberLoader } from '../../Loader';
import { Skeleton } from '../../Skeleton';
import { SwapFormValues } from './schema';
import { NablaInstanceToken } from '../../../hooks/nabla/useNablaInstance';
import { erc20WrapperAbi } from '../../../contracts/nabla/ERC20Wrapper';
import { NablaTokenPrice } from '../common/NablaTokenPrice';
import { Erc20Balance } from '../common/Erc20Balance';
import { getIcon } from '../../../shared/AssetIcons';
import { useGlobalState } from '../../../GlobalStateProvider';

export interface ToProps {
  onOpenSelector: () => void;
  fromToken: NablaInstanceToken | undefined;
  toToken: NablaInstanceToken | undefined;
  toAmountQuote: UseTokenOutAmountResult;
  fromAmount: Big | undefined;
  slippage: number;
}

export function To({
  fromToken,
  toToken,
  onOpenSelector,
  toAmountQuote,
  fromAmount,
  slippage,
}: ToProps): JSX.Element | null {
  const [isOpen, { toggle }] = useBoolean(true);
  const { setValue } = useFormContext<SwapFormValues>();

  const { walletAccount } = useGlobalState();

  useEffect(() => {
    setValue('toAmount', toAmountQuote.data?.amountOut.preciseString ?? '0', {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [toAmountQuote.data?.amountOut.preciseString, setValue]);

  return (
    <div className="px-4 py-3 border border-transparent rounded-lg bg-base-300">
      <div className="flex justify-between w-full">
        <div className="font-outfit mr-2 flex-grow overflow-x-auto overflow-y-hidden text-4xl text-[inherit]">
          {toAmountQuote.isLoading ? (
            <NumberLoader />
          ) : toAmountQuote.data !== undefined ? (
            `${toAmountQuote.data.amountOut.approximateStrings.atLeast4Decimals}`
          ) : fromAmount !== undefined && fromAmount.gt(new Big(0)) ? (
            <button
              type="button"
              onClick={() => toAmountQuote.refetch?.()}
              className="hover:opacity-80"
              title="Refresh"
            >
              <ArrowPathRoundedSquareIcon className="h-7 w-7" />
            </button>
          ) : (
            <>0</>
          )}
        </div>
        <Button
          size="xs"
          className="min-h-none mt-0.5 flex h-7 items-center rounded-full border-0 bg-neutral-200 pl-0 pr-1 text-sm font-medium dark:bg-neutral-700"
          onClick={onOpenSelector}
          type="button"
        >
          <span className="mr-1 h-full rounded-full bg-[rgba(0,0,0,0.15)] p-px">
            <img src={getIcon(toToken?.symbol)} alt={toToken?.name} className="w-auto h-full" />
          </span>
          <strong className="font-bold">{toToken?.symbol || 'Select'}</strong>
          <ChevronDownIcon className="inline w-4 h-4 ml-px" />
        </Button>
      </div>
      <div className="flex items-center justify-between mt-1 text-neutral-500 dark:text-neutral-300">
        <div className="mt-px text-sm">{toToken ? <NablaTokenPrice address={toToken.id} fallback="$ -" /> : '$ -'}</div>
        {walletAccount && (
          <div className="flex gap-1 text-sm">
            Balance:{' '}
            <Erc20Balance
              abi={erc20WrapperAbi}
              erc20ContractDefinition={
                toToken ? { contractAddress: toToken.id, decimals: toToken.decimals } : undefined
              }
            />
          </div>
        )}
      </div>
      <div className="-mx-4 mt-4 h-px bg-[rgba(0,0,0,0.15)]" />
      <div
        className={`collapse -mx-4 overflow-visible text-sm text-neutral-500 dark:text-neutral-300 ${
          isOpen ? 'collapse-open' : ''
        }`}
      >
        <div className="flex justify-between px-4 pt-3 pb-0 cursor-pointer collapse-title" onClick={toggle}>
          <div className="flex items-center">
            {fromToken !== undefined &&
            toToken !== undefined &&
            !toAmountQuote.isLoading &&
            toAmountQuote.data !== undefined ? (
              <>{`1 ${fromToken.symbol} = ${toAmountQuote.data.effectiveExchangeRate} ${toToken.symbol}`}</>
            ) : (
              `-`
            )}
          </div>
          <div>
            <div
              title="More info"
              className="flex items-center justify-center w-6 h-6 ml-1 rounded-full bg-blackAlpha-200 hover:opacity-80 dark:bg-whiteAlpha-200"
            >
              <ChevronDownIcon className="inline w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 collapse-content">
          <div className="flex justify-between pt-6">
            <div>Expected Output:</div>
            {toAmountQuote.data !== undefined ? (
              <div>
                <Skeleton isLoading={toAmountQuote.isLoading}>
                  {toAmountQuote.data?.amountOut.approximateStrings.atLeast4Decimals} {toToken?.symbol || ''}
                </Skeleton>
              </div>
            ) : (
              <div>N/A</div>
            )}
          </div>
          <div className="flex justify-between">
            <div>Minimum received after slippage ({slippage}%)</div>
            {toAmountQuote.data !== undefined ? (
              <div>
                <Skeleton isLoading={toAmountQuote.isLoading || toAmountQuote.data === undefined}>
                  {toAmountQuote.data !== undefined ? toAmountQuote.data.minAmountOut : ''} {toToken?.symbol || ''}
                </Skeleton>
              </div>
            ) : (
              <div>N/A</div>
            )}
          </div>
          <div className="flex justify-between">
            <div>Swap fee:</div>
            <div>
              {toAmountQuote.data !== undefined ? toAmountQuote.data.swapFee.approximateStrings.atLeast2Decimals : ''}{' '}
              {toToken?.symbol || ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
