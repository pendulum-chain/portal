import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'preact/compat';
import { useForm, useWatch } from 'react-hook-form';
import { cacheKeys } from '../../../../../constants/cache';
import { swapPoolAbi } from '../../../../../contracts/nabla/SwapPool';
import { subtractPercentage } from '../../../../../helpers/calc';
import { useGetAppDataByTenant } from '../../../../../hooks/useGetAppDataByTenant';
import { useModalToggle } from '../../../../../services/modal';
import { decimalToNative, FixedU128Decimals } from '../../../../../shared/parseNumbers/metric';
import { useContractBalance } from '../../../../../shared/useContractBalance';
import { useContractWrite } from '../../../../../shared/useContractWrite';
import schema from './schema';
import { WithdrawLiquidityValues } from './types';

export const useWithdrawLiquidity = (poolAddress: string, tokenAddress: string) => {
  const queryClient = useQueryClient();
  const { indexerUrl } = useGetAppDataByTenant('nabla').data || {};
  const toggle = useModalToggle();

  const balanceQuery = useContractBalance({ contractAddress: tokenAddress, decimals: FixedU128Decimals });
  const depositQuery = useContractBalance({ contractAddress: poolAddress, decimals: FixedU128Decimals });

  const form = useForm<WithdrawLiquidityValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: 0,
    },
  });
  const { handleSubmit, reset } = form;

  const mutation = useContractWrite({
    abi: swapPoolAbi,
    address: poolAddress,
    method: 'withdraw',
    onError: () => {
      // ? log error - alert not needed as the transaction modal displays the error
    },
    onSuccess: () => {
      reset();
      balanceQuery.refetch();
      depositQuery.refetch();
      queryClient.refetchQueries([cacheKeys.swapPools, indexerUrl]);
    },
  });
  const { mutate } = mutation;

  const onSubmit = useCallback(
    () =>
      handleSubmit((variables) => {
        if (!variables.amount) return;
        return mutate([
          decimalToNative(variables.amount, FixedU128Decimals).toString(),
          decimalToNative(subtractPercentage(variables.amount, 0.5), FixedU128Decimals).toString(),
        ]);
      }),
    [handleSubmit, mutate],
  );

  const amount =
    Number(
      useWatch({
        control: form.control,
        name: 'amount',
        defaultValue: 0,
      }),
    ) || 0;

  return { form, amount, mutation, onSubmit, toggle, balanceQuery, depositQuery };
};
