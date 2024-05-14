import { Big } from 'big.js';

import { activeOptions } from '../../constants/cache';
import { multiplyByPowerOfTen } from '../../shared/parseNumbers/metric';
import { MessageCallErrorResult, useContractRead } from './useContractRead';
import { useDebouncedValue } from '../useDebouncedValue';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { useEffect, useMemo } from 'preact/hooks';
import { ContractBalance, parseContractBalanceResponse } from '../../helpers/contracts';
import { useCallback } from 'react';

interface UseQuoteProps<FormFieldValues extends FieldValues> {
  lpTokenAmountString: string | undefined;
  lpTokenDecimals: number;
  maximumLpTokenAmount: Big | undefined;
  poolTokenDecimals: number;
  contractAddress: string;
  contractAbi: Dict;
  messageName: string;
  primaryCacheKey: string;
  constructArgs: (amountIn: string | undefined) => string[];
  parseError: string | ((errorResult: MessageCallErrorResult) => string);
  form: UseFormReturn<FormFieldValues>;
  pickFromReturnArray?: number;
}

export interface UseQuoteResult {
  isLoading: boolean;
  enabled: boolean;
  data: ContractBalance | undefined;
  error: string | null;
}

export function useQuote<FormFieldValues extends FieldValues>({
  lpTokenAmountString,
  lpTokenDecimals,
  maximumLpTokenAmount,
  poolTokenDecimals,
  contractAddress,
  contractAbi,
  messageName,
  primaryCacheKey,
  constructArgs,
  parseError,
  form,
  pickFromReturnArray,
}: UseQuoteProps<FormFieldValues>): UseQuoteResult {
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

  const amountIn =
    debouncedAmountBigDecimal !== undefined
      ? multiplyByPowerOfTen(debouncedAmountBigDecimal, lpTokenDecimals).round(0, 0).toString()
      : undefined;

  const { cacheKey, args } = useMemo(() => {
    const args = constructArgs(amountIn);
    return { cacheKey: [primaryCacheKey, contractAddress, ...args], args };
  }, [primaryCacheKey, contractAddress, constructArgs, amountIn]);

  const parseSuccessOutput = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (result: any): ContractBalance | undefined => {
      if (pickFromReturnArray !== undefined) result = result[pickFromReturnArray];
      return parseContractBalanceResponse(poolTokenDecimals, result);
    },
    [poolTokenDecimals, pickFromReturnArray],
  );

  const { isLoading, fetchStatus, data, error } = useContractRead<ContractBalance | undefined>(cacheKey, {
    abi: contractAbi,
    address: contractAddress,
    method: messageName,
    args,
    queryOptions: {
      ...activeOptions['15s'],
      enabled,
    },
    parseSuccessOutput,
    parseError,
  });

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
