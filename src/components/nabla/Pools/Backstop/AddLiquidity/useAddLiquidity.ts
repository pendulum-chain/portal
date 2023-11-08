import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import { cacheKeys } from '../../../../../constants/cache';
import { backstopPoolAbi } from '../../../../../contracts/nabla/BackstopPool';
import { useGetAppDataByTenant } from '../../../../../hooks/useGetAppDataByTenant';
import { useModalToggle } from '../../../../../services/modal';
import { decimalToNative, FixedU128Decimals } from '../../../../../shared/parseNumbers';
import { useContractBalance } from '../../../../../shared/useContractBalance';
import { useContractWrite } from '../../../../../shared/useContractWrite';
import schema from './schema';
import { AddLiquidityValues } from './types';

export const useAddLiquidity = (poolAddress: string, tokenAddress: string) => {
  const queryClient = useQueryClient();
  const { indexerUrl } = useGetAppDataByTenant('nabla').data || {};
  const toggle = useModalToggle();

  const balanceQuery = useContractBalance({ contractAddress: tokenAddress, decimals: FixedU128Decimals });
  const depositQuery = useContractBalance({ contractAddress: poolAddress, decimals: FixedU128Decimals });

  const form = useForm<AddLiquidityValues>({
    resolver: yupResolver(schema),
    defaultValues: {},
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

  const onSubmit = form.handleSubmit((variables: AddLiquidityValues) =>
    mutation.mutate([decimalToNative(variables.amount, FixedU128Decimals).toString()]),
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
