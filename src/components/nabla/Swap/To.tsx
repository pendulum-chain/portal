import { ArrowPathRoundedSquareIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { useEffect } from 'preact/compat';
import { Button } from 'react-daisyui';
import { useFormContext } from 'react-hook-form';
import Big from 'big.js';

import { UseTokenOutAmountResult } from '../../../hooks/nabla/useTokenOutAmount';
import { NablaInstanceToken } from '../../../hooks/nabla/useNablaInstance';
import useBoolean from '../../../hooks/useBoolean';
import { erc20WrapperAbi } from '../../../contracts/nabla/ERC20Wrapper';
import { NablaTokenPrice } from '../common/NablaTokenPrice';
import { Erc20Balance } from '../common/Erc20Balance';
import { getIcon } from '../../../shared/AssetIcons';
import { useGlobalState } from '../../../GlobalStateProvider';
import { NumberLoader } from '../../Loader';
import { Skeleton } from '../../Skeleton';
import { SwapFormValues } from './schema';

export interface ToProps {
  fromToken?: NablaInstanceToken;
  fromAmount?: Big;
  toToken?: NablaInstanceToken;
  toAmountQuote: UseTokenOutAmountResult;
  slippage: number;
  onOpenSelector: () => void;
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
    <div className="rounded-lg border border-transparent bg-base-300 px-4 py-3">
      <div className="flex w-full justify-between">
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
            <img src={getIcon(toToken?.symbol)} alt={toToken?.name} className="h-full w-auto" />
          </span>
          <strong className="font-bold">{toToken?.symbol || 'Select'}</strong>
          <ChevronDownIcon className="ml-px inline h-4 w-4" />
        </Button>
      </div>
      <div className="mt-1 flex items-center justify-between text-neutral-500 dark:text-neutral-300">
        <div className="mt-px text-sm">
          {toToken ? (
            <NablaTokenPrice
              formatByAmount={true}
              currentTokenAmount={Big(toAmountQuote.data?.amountOut.approximateStrings.atLeast4Decimals ?? 0)}
              address={toToken.id}
              fallback="$ -"
            />
          ) : (
            '$ -'
          )}
        </div>
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
        <div className="collapse-title flex cursor-pointer justify-between px-4 pb-0 pt-3" onClick={toggle}>
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
              className="ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-blackAlpha-200 hover:opacity-80 dark:bg-whiteAlpha-200"
            >
              <ChevronDownIcon className="inline h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="collapse-content flex flex-col gap-5">
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
