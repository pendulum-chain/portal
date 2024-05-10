import { Big } from 'big.js';

import { activeOptions, cacheKeys } from '../../constants/cache';
import { multiplyByPowerOfTen } from '../../shared/parseNumbers/metric';
import { useContractRead } from './useContractRead';
import { useDebouncedValue } from '../useDebouncedValue';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { useEffect } from 'preact/hooks';
import { ContractBalance, parseContractBalanceResponse } from '../../helpers/contracts';
import { backstopPoolAbi } from '../../contracts/nabla/BackstopPool';

export type UseQuoteSwapPoolRedeemProps<FormFieldValues extends FieldValues> = {
  swapPoolLpTokenAmountString: string | undefined;
  swapPoolLpTokenDecimals: number;
  maximumSwapPoolLpTokenAmount: Big | undefined;
  backstopPoolTokenDecimals: number;
  backstopPoolAddress: string;
  swapPoolAddress: string;
  form: UseFormReturn<FormFieldValues>;
};

// TODO Torsten: check whether the swap quote works the same

export function useQuoteSwapPoolRedeem<FormFieldValues extends FieldValues>({
  swapPoolLpTokenAmountString,
  swapPoolLpTokenDecimals,
  maximumSwapPoolLpTokenAmount,
  backstopPoolTokenDecimals,
  backstopPoolAddress,
  swapPoolAddress,
  form,
}: UseQuoteSwapPoolRedeemProps<FormFieldValues>) {
  const { setError, clearErrors } = form;

  const debouncedAmountString = useDebouncedValue(swapPoolLpTokenAmountString, 800);

  let debouncedAmountBigDecimal;
  try {
    debouncedAmountBigDecimal = debouncedAmountString !== undefined ? new Big(debouncedAmountString) : undefined;
  } catch {
    debouncedAmountBigDecimal = undefined;
  }
  const enabled =
    debouncedAmountBigDecimal !== undefined &&
    debouncedAmountBigDecimal.gt(new Big(0)) &&
    (maximumSwapPoolLpTokenAmount === undefined || debouncedAmountBigDecimal.lte(maximumSwapPoolLpTokenAmount));

  // TODO Torsten: check whether the other calls also round like this
  const amountIn =
    debouncedAmountBigDecimal !== undefined
      ? multiplyByPowerOfTen(debouncedAmountBigDecimal, swapPoolLpTokenDecimals).round(0, 0).toString()
      : undefined;

  const { isLoading, fetchStatus, data, error } = useContractRead<ContractBalance | undefined>(
    [cacheKeys.quoteSwapPoolRedeem, backstopPoolAddress, swapPoolAddress, amountIn],
    {
      abi: backstopPoolAbi,
      address: backstopPoolAddress,
      method: 'redeemSwapPoolShares',
      args: [swapPoolAddress, amountIn, '0'],
      queryOptions: {
        ...activeOptions['15s'],
        enabled,
      },
      parseSuccessOutput: parseContractBalanceResponse.bind(null, backstopPoolTokenDecimals),
      parseError: (error) => {
        switch (error.type) {
          case 'error':
            return 'Cannot determine value of shares';
          case 'panic':
            return error.errorCode === 0x11
              ? 'The input amount is too large. You cannot redeem all LP tokens right now.'
              : 'Cannot determine value of shares';
          case 'reverted':
            switch (error.description) {
              case 'redeemSwapPoolShares():MIN_AMOUNT':
                return 'The returned amount of tokens is below your desired minimum amount.';
              case 'SwapPool#backstopBurn: BALANCE_TOO_LOW':
                return "You don't have enough LP tokens to redeem.";
              case 'SwapPool#backstopBurn: TIMELOCK':
                return 'You cannot redeem tokens from the backstop pool yet.';
              case 'SwapPool#backstopBurn():INSUFFICIENT_COVERAGE':
                return 'The input amount is too large.';
            }
            return 'Cannot determine value of shares';
        }
      },
    },
  );

  const pending = (isLoading && fetchStatus !== 'idle') || debouncedAmountString !== swapPoolLpTokenAmountString;
  useEffect(() => {
    if (pending) return;
    if (error === null) {
      clearErrors('root');
    } else {
      setError('root', { type: 'custom', message: error });
    }
  }, [error, pending, clearErrors, setError]);

  return { isLoading: pending, enabled, data, error };
}
