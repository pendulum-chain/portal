import { Big } from 'big.js';

import { activeOptions, cacheKeys } from '../../constants/cache';
import { multiplyByPowerOfTen } from '../../shared/parseNumbers/metric';
import { useContractRead } from './useContractRead';
import { useDebouncedValue } from '../useDebouncedValue';
import { swapPoolAbi } from '../../contracts/nabla/SwapPool';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { useEffect } from 'preact/hooks';
import { ContractBalance, parseContractBalanceResponse } from '../../helpers/contracts';

export type UseQuoteSwapPoolWithdrawProps<FormFieldValues extends FieldValues> = {
  lpTokenAmountString: string | undefined;
  lpTokenDecimals: number;
  maximumLpTokenAmount: Big | undefined;
  poolTokenDecimals: number;
  swapPoolAddress: string;
  form: UseFormReturn<FormFieldValues>;
};

// TODO Torsten: check whether the swap quote works the same

export function useQuoteSwapPoolWithdraw<FormFieldValues extends FieldValues>({
  lpTokenAmountString,
  lpTokenDecimals,
  poolTokenDecimals,
  swapPoolAddress,
  maximumLpTokenAmount,
  form,
}: UseQuoteSwapPoolWithdrawProps<FormFieldValues>) {
  const { setError, clearErrors } = form;

  const debouncedAmountString = useDebouncedValue(lpTokenAmountString, 800);

  let debouncedAmountBigDecimal;
  try {
    debouncedAmountBigDecimal = debouncedAmountString !== undefined ? new Big(debouncedAmountString) : undefined;
  } catch {
    debouncedAmountBigDecimal = undefined;
  }
  const enabled =
    debouncedAmountBigDecimal !== undefined &&
    debouncedAmountBigDecimal?.gt(new Big(0)) &&
    (maximumLpTokenAmount === undefined || debouncedAmountBigDecimal.lte(maximumLpTokenAmount));

  // TODO Torsten: check whether the other calls also round like this
  const amountIn =
    debouncedAmountBigDecimal !== undefined
      ? multiplyByPowerOfTen(debouncedAmountBigDecimal, lpTokenDecimals).round(0, 0).toString()
      : undefined;

  const { isLoading, fetchStatus, data, error } = useContractRead<ContractBalance | undefined>(
    [cacheKeys.quoteSwapPoolWithdraw, swapPoolAddress, amountIn],
    {
      abi: swapPoolAbi,
      address: swapPoolAddress,
      method: 'quoteWithdraw',
      args: [amountIn],
      noWalletAddressRequired: true,
      queryOptions: {
        ...activeOptions['15s'],
        enabled,
      },
      parseSuccessOutput: parseContractBalanceResponse.bind(null, poolTokenDecimals),
      parseError: (error) => {
        switch (error.type) {
          case 'error':
            return 'Cannot determine value of shares';
          case 'panic':
            return error.errorCode === 0x11
              ? 'The input amount is too large. You cannot directly redeem all LP tokens right now. Try to redeem from the backstop pool instead.'
              : 'Cannot determine value of shares';
          case 'reverted':
            return 'Cannot determine value of shares';
        }
      },
    },
  );

  const pending = (isLoading && fetchStatus !== 'idle') || debouncedAmountString !== lpTokenAmountString;
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
