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

interface WithdrawLiquidityValues {
  amount: string;
}

const schema = Yup.object<WithdrawLiquidityValues>().shape({
  amount: Yup.string().required(),
});

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
        queryClient.refetchQueries([cacheKeys.nablaInstance]);
      },
    },
  });

  const amountString = useWatch({
    control: form.control,
    name: 'amount',
    defaultValue: '0',
  });

  const withdrawalQuote = useQuoteSwapPoolWithdraw({
    lpTokenAmountString: amountString,
    lpTokenDecimals,
    poolTokenDecimals,
    swapPoolAddress,
    maximumLpTokenAmount: depositQuery.data?.preciseBigDecimal,
    form,
  });

  // TODO Torsten: check how values are determined in the other mutation functions
  const { mutate } = mutation;
  const onSubmit = useCallback(
    (variables: WithdrawLiquidityValues) => {
      if (!variables.amount || withdrawalQuote.data === undefined) return;
      return mutate([
        decimalToRaw(variables.amount, lpTokenDecimals).round(0, 0).toString(),
        decimalToRaw(subtractBigDecimalPercentage(withdrawalQuote.data.preciseBigDecimal, 0.5), poolTokenDecimals)
          .round(0, 0)
          .toString(),
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
