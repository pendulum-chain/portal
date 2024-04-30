import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import { cacheKeys } from '../../../../../constants/cache';
import { backstopPoolAbi } from '../../../../../contracts/nabla/BackstopPool';
import { useGetAppDataByTenant } from '../../../../../hooks/useGetAppDataByTenant';
import { useModalToggle } from '../../../../../services/modal';
import { decimalToRaw } from '../../../../../shared/parseNumbers';
import schema from './schema';
import { AddLiquidityValues } from './types';
import { erc20WrapperAbi } from '../../../../../contracts/nabla/ERC20Wrapper';
import { useContractBalance } from '../../../../../hooks/nabla/useContractBalance';
import { useContractWrite } from '../../../../../hooks/nabla/useContractWrite';

export const useAddLiquidity = (
  poolAddress: string,
  tokenAddress: string,
  poolTokenDecimals: number,
  lpTokenDecimals: number,
) => {
  const queryClient = useQueryClient();
  const { indexerUrl } = useGetAppDataByTenant('nabla').data || {};
  const toggle = useModalToggle();

  const balanceQuery = useContractBalance({
    contractAddress: tokenAddress,
    decimals: poolTokenDecimals,
    abi: erc20WrapperAbi,
  });

  const depositQuery = useContractBalance({
    contractAddress: poolAddress,
    decimals: lpTokenDecimals,
    abi: backstopPoolAbi,
  });

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
    mutateOptions: {
      onError: () => {
        // ? log error - alert not needed as the transaction modal displays the error
      },
      onSuccess: () => {
        form.reset();
        balanceQuery.refetch();
        depositQuery.refetch();
        queryClient.refetchQueries([cacheKeys.backstopPools, indexerUrl]);
      },
    },
  });

  const onSubmit = form.handleSubmit((variables) =>
    mutation.mutate([decimalToRaw(variables.amount, poolTokenDecimals).toString()]),
  );

  const decimalAmount =
    Number(
      useWatch({
        control: form.control,
        name: 'amount',
        defaultValue: 0,
      }),
    ) || 0;

  return { form, decimalAmount, mutation, onSubmit, toggle, balanceQuery, depositQuery };
};
