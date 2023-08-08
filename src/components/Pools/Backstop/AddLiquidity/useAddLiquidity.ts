import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { backstopPoolAbi } from '../../../../contracts/nabla/BackstopPool';
import { createWriteOptions } from '../../../../services/api/helpers';
import { useModalToggle } from '../../../../services/modal';
import { decimalToNative } from '../../../../shared/parseNumbers';
import { useBalance } from '../../../../shared/useBalance';
import { useContractWrite } from '../../../../shared/useContractWrite';
import schema from './schema';
import { AddLiquidityValues } from './types';

export const useAddLiquidity = (poolAddress: string, tokenAddress: string) => {
  const toggle = useModalToggle();

  const balanceQuery = useBalance({ token: tokenAddress });
  const depositQuery = useBalance({ token: poolAddress });

  const form = useForm<AddLiquidityValues>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const mutation = useContractWrite({
    abi: backstopPoolAbi,
    address: poolAddress,
    fn: ({ contract, api }, variables: AddLiquidityValues) =>
      contract.tx.deposit(createWriteOptions(api), decimalToNative(variables.amount).toString()),
    onError: () => {
      // TODO: handle error
    },
    onSuccess: () => {
      balanceQuery.refetch();
      depositQuery.refetch();
    },
  });

  return { form, mutation, toggle, balanceQuery, depositQuery };
};
