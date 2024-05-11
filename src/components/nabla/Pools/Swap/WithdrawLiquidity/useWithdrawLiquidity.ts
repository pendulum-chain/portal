import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useCallback } from 'preact/compat';
import { useForm, useWatch } from 'react-hook-form';

import { swapPoolAbi } from '../../../../../contracts/nabla/SwapPool';
import { subtractBigDecimalPercentage } from '../../../../../helpers/calc';
import { useModalToggle } from '../../../../../services/modal';
import { decimalToRaw } from '../../../../../shared/parseNumbers/metric';
import { erc20WrapperAbi } from '../../../../../contracts/nabla/ERC20Wrapper';
import { useErc20ContractBalance } from '../../../../../hooks/nabla/useErc20ContractBalance';
import { useContractWrite } from '../../../../../hooks/nabla/useContractWrite';
import { useQuoteSwapPoolWithdraw } from '../../../../../hooks/nabla/useQuoteSwapPoolWithdraw';
import { useQueryClient } from '@tanstack/react-query';
import { cacheKeys } from '../../../../../constants/cache';
import { useQuote } from '../../../../../hooks/nabla/useQuote';
import { MessageCallErrorResult } from '../../../../../hooks/nabla/useContractRead';

interface WithdrawLiquidityValues {
  amount: string;
}

const schema = Yup.object<WithdrawLiquidityValues>().shape({
  amount: Yup.string().required(),
});

function parseQuoteError(error: MessageCallErrorResult): string {
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
}

export const useSwapPoolWithdrawLiquidity = (
  swapPoolAddress: string,
  tokenAddress: string,
  poolTokenDecimals: number,
  lpTokenDecimals: number,
) => {
  const queryClient = useQueryClient();
  const toggle = useModalToggle();

  const balanceQuery = useErc20ContractBalance(erc20WrapperAbi, {
    contractAddress: tokenAddress,
    decimals: poolTokenDecimals,
  });

  const depositQuery = useErc20ContractBalance(swapPoolAbi, {
    contractAddress: swapPoolAddress,
    decimals: lpTokenDecimals,
  });

  const form = useForm<WithdrawLiquidityValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: undefined,
    },
  });

  const mutation = useContractWrite({
    abi: swapPoolAbi,
    address: swapPoolAddress,
    method: 'withdraw',
    mutateOptions: {
      onError: () => {
        // ? log error - alert not needed as the transaction modal displays the error
      },
      onSuccess: () => {
        form.reset();
        balanceQuery.refetch();
        depositQuery.refetch();
        setTimeout(() => {
          queryClient.refetchQueries([cacheKeys.nablaInstance]);
        }, 2000);
      },
    },
  });

  const amountString = useWatch({
    control: form.control,
    name: 'amount',
    defaultValue: '0',
  });

  const withdrawalQuote = useQuote({
    lpTokenAmountString: amountString,
    lpTokenDecimals,
    maximumLpTokenAmount: depositQuery.data?.preciseBigDecimal,
    poolTokenDecimals,
    contractAddress: swapPoolAddress,
    contractAbi: swapPoolAbi,
    messageName: 'quoteWithdraw',
    primaryCacheKey: cacheKeys.quoteSwapPoolWithdraw,
    constructArgs: useCallback((amountIn: string | undefined) => (amountIn !== undefined ? [amountIn] : []), []),
    parseError: parseQuoteError,
    form,
  });

  // TODO Torsten: check how values are determined in the other mutation functions
  // TODO Torsten: also make slippage here configurable
  const { mutate } = mutation;
  const onSubmit = useCallback(
    (variables: WithdrawLiquidityValues) => {
      if (!variables.amount || withdrawalQuote.data === undefined) return;
      const minimumAmount = subtractBigDecimalPercentage(withdrawalQuote.data.preciseBigDecimal, 0.5);

      mutate([
        decimalToRaw(variables.amount, lpTokenDecimals).round(0, 0).toString(),
        decimalToRaw(minimumAmount, poolTokenDecimals).round(0, 0).toString(),
      ]);
    },
    [withdrawalQuote.data, mutate, lpTokenDecimals, poolTokenDecimals],
  );

  return {
    form,
    amountString,
    mutation,
    onSubmit: form.handleSubmit(onSubmit),
    toggle,
    balanceQuery,
    depositQuery,
    withdrawalQuote,
  };
};
