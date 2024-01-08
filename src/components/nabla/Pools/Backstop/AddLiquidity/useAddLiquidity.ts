import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import { defaultDecimals } from '../../../../../config/apps/nabla';
import { cacheKeys } from '../../../../../constants/cache';
import { backstopPoolAbi } from '../../../../../contracts/nabla/BackstopPool';
import { useGetAppDataByTenant } from '../../../../../hooks/useGetAppDataByTenant';
import { useModalToggle } from '../../../../../services/modal';
import { decimalToNative } from '../../../../../shared/parseNumbers';
import { useContractBalance } from '../../../../../shared/useContractBalance';
import { useContractWrite } from '../../../../../shared/useContractWrite';
import schema from './schema';
import { AddLiquidityValues } from './types';

export const useAddLiquidity = (poolAddress: string, tokenAddress: string) => {
  const queryClient = useQueryClient();
  const { indexerUrl } = useGetAppDataByTenant('nabla').data || {};
  const toggle = useModalToggle();

  const balanceQuery = useContractBalance({ contractAddress: tokenAddress, decimals: defaultDecimals });
  const depositQuery = useContractBalance({ contractAddress: poolAddress, decimals: defaultDecimals });

  const form = useForm<AddLiquidityValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: undefined,
    },
  });

  const mutation = useContractWrite({
    abi: backstopPoolAbi,
    address: poolAddress,
    method: 'deposit',
    onError: () => {
      // ? log error - alert not needed as the transaction modal displays the error
    },
    onSuccess: () => {
      form.reset();
      balanceQuery.refetch();
      depositQuery.refetch();
      queryClient.refetchQueries([cacheKeys.backstopPools, indexerUrl]);
    },
  });

  const onSubmit = form.handleSubmit((variables) =>
    mutation.mutate([decimalToNative(variables.amount, defaultDecimals).toString()]),
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
