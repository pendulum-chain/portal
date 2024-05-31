import Big from 'big.js';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { activeOptions, cacheKeys } from '../../constants/cache';
import { routerAbi } from '../../contracts/nabla/Router';
import { ContractBalance, parseContractBalanceResponse } from '../../helpers/contracts';
import { multiplyByPowerOfTen, stringifyBigWithSignificantDecimals } from '../../shared/parseNumbers/metric';
import { useGetAppDataByTenant } from '../useGetAppDataByTenant';
import { useContractRead } from './useContractRead';
import { NablaInstanceToken } from './useNablaInstance';
import { useDebouncedValue } from '../useDebouncedValue';
import { useEffect } from 'preact/hooks';
import { UseQueryResult } from '@tanstack/react-query';
import { subtractBigDecimalPercentage } from '../../helpers/calc';

export type UseTokenOutAmountProps<FormFieldValues extends FieldValues> = {
  fromAmountString: string | undefined;
  fromToken: NablaInstanceToken | undefined;
  toToken: NablaInstanceToken | undefined;
  maximumFromAmount: Big | undefined;
  form: UseFormReturn<FormFieldValues>;
  slippage: number;
};

export interface TokenOutData {
  amountOut: ContractBalance;
  swapFee: ContractBalance;
  effectiveExchangeRate: string;
  minAmountOut: string;
}

export interface UseTokenOutAmountResult {
  isLoading: boolean;
  enabled: boolean;
  data: TokenOutData | undefined;
  error: string | null;
  refetch?: UseQueryResult<TokenOutData | undefined, string>['refetch'];
}

export function useTokenOutAmount<FormFieldValues extends FieldValues>({
  fromAmountString,
  fromToken,
  toToken,
  maximumFromAmount,
  form,
  slippage,
}: UseTokenOutAmountProps<FormFieldValues>): UseTokenOutAmountResult {
  const { router } = useGetAppDataByTenant('nabla').data || {};
  const { setError, clearErrors } = form;

  const debouncedAmountString = useDebouncedValue(fromAmountString, 800);

  let debouncedAmountBigDecimal: Big | undefined;
  try {
    debouncedAmountBigDecimal = debouncedAmountString !== undefined ? new Big(debouncedAmountString) : undefined;
  } catch {
    debouncedAmountBigDecimal = undefined;
  }

  const enabled =
    router !== undefined &&
    fromToken !== undefined &&
    toToken !== undefined &&
    debouncedAmountBigDecimal !== undefined &&
    debouncedAmountBigDecimal?.gt(new Big(0)) &&
    (maximumFromAmount === undefined || debouncedAmountBigDecimal.lte(maximumFromAmount));

  const fromTokenDecimals = fromToken?.decimals;
  const amountIn =
    fromTokenDecimals !== undefined && debouncedAmountBigDecimal !== undefined
      ? multiplyByPowerOfTen(debouncedAmountBigDecimal, fromTokenDecimals).round(0, 0).toString()
      : undefined;

  const { isLoading, fetchStatus, data, error, refetch } = useContractRead<TokenOutData | undefined>(
    [cacheKeys.tokenOutAmount, fromToken?.id, toToken?.id, amountIn],
    {
      abi: routerAbi,
      address: router,
      method: 'getAmountOut',
      args: [amountIn, [fromToken?.id, toToken?.id]],
      noWalletAddressRequired: true,
      queryOptions: {
        ...activeOptions['30s'],
        enabled,
        onError: (err) => {
          console.error(err);
        },
      },
      parseSuccessOutput: (data) => {
        if (toToken === undefined || fromToken === undefined || debouncedAmountBigDecimal === undefined)
          return undefined;
        const amountOut = parseContractBalanceResponse(toToken.decimals, data[0]);
        const effectiveExchangeRate = debouncedAmountBigDecimal.gt(0)
          ? stringifyBigWithSignificantDecimals(amountOut.preciseBigDecimal.div(debouncedAmountBigDecimal), 6)
          : '0';
        const minAmountOut = subtractBigDecimalPercentage(amountOut.preciseBigDecimal, slippage);

        return {
          amountOut,
          effectiveExchangeRate,
          swapFee: parseContractBalanceResponse(toToken.decimals, data[1]),
          minAmountOut: stringifyBigWithSignificantDecimals(minAmountOut, 2),
        };
      },
      parseError: (error) => {
        switch (error.type) {
          case 'error':
            return 'Something went wrong';
          case 'panic':
            return error.errorCode === 0x11 ? 'The input amount is too large.' : 'Something went wrong';
          case 'reverted':
            return error.description === 'SwapPool: EXCEEDS_MAX_COVERAGE_RATIO'
              ? 'The input amount is too large. The resulting coverage ratio of the pools must not exceed 200%.'
              : 'Something went wrong';
        }
      },
    },
  );

  const pending = (isLoading && fetchStatus !== 'idle') || debouncedAmountString !== fromAmountString;
  useEffect(() => {
    if (pending) return;
    if (error === null) {
      clearErrors('root');
    } else {
      setError('root', { type: 'custom', message: error });
    }
  }, [error, pending, clearErrors, setError]);

  return { isLoading: pending, enabled, data, error, refetch };
}
