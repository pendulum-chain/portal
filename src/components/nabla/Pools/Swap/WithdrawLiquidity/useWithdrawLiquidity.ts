import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'preact/compat';
import { useForm, useWatch } from 'react-hook-form';
import { cacheKeys } from '../../../../../constants/cache';
import { swapPoolAbi } from '../../../../../contracts/nabla/SwapPool';
import { subtractPercentage } from '../../../../../helpers/calc';
import { useGetAppDataByTenant } from '../../../../../hooks/useGetAppDataByTenant';
import { useModalToggle } from '../../../../../services/modal';
import { decimalToRaw } from '../../../../../shared/parseNumbers/metric';
import schema from './schema';
import { WithdrawLiquidityValues } from './types';
import { erc20WrapperAbi } from '../../../../../contracts/nabla/ERC20Wrapper';
import { useErc20ContractBalance } from '../../../../../hooks/nabla/useErc20ContractBalance';
import { useContractWrite } from '../../../../../hooks/nabla/useContractWrite';

export const useSwapPoolWithdrawLiquidity = (
  poolAddress: string,
  tokenAddress: string,
  poolTokenDecimals: number,
  lpTokenDecimals: number,
) => {
  const queryClient = useQueryClient();
  const { indexerUrl } = useGetAppDataByTenant('nabla').data || {};
  const toggle = useModalToggle();

  const balanceQuery = useErc20ContractBalance(erc20WrapperAbi, {
    contractAddress: tokenAddress,
    decimals: poolTokenDecimals,
  });

  const depositQuery = useErc20ContractBalance(swapPoolAbi, {
    contractAddress: poolAddress,
    decimals: lpTokenDecimals,
  });

  const form = useForm<WithdrawLiquidityValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: undefined,
    },
  });
  const { handleSubmit, reset } = form;

  const mutation = useContractWrite({
    abi: swapPoolAbi,
    address: poolAddress,
    method: 'withdraw',
    mutateOptions: {
      onError: () => {
        // ? log error - alert not needed as the transaction modal displays the error
      },
      onSuccess: () => {
        reset();
        balanceQuery.refetch();
        depositQuery.refetch();
        queryClient.refetchQueries([cacheKeys.swapPools, indexerUrl]);
      },
    },
  });
  const { mutate } = mutation;

  const onSubmit = useCallback(
    (variables: WithdrawLiquidityValues) => {
      if (!variables.amount) return;
      return mutate([
        decimalToRaw(variables.amount, lpTokenDecimals).toString(),
        decimalToRaw(subtractPercentage(variables.amount, 0.5), poolTokenDecimals).toString(),
      ]);
    },
    [mutate, lpTokenDecimals, poolTokenDecimals],
  );

  const amount =
    Number(
      useWatch({
        control: form.control,
        name: 'amount',
        defaultValue: 0,
      }),
    ) || 0;

  return { form, amount, mutation, onSubmit: handleSubmit(onSubmit), toggle, balanceQuery, depositQuery };
};
