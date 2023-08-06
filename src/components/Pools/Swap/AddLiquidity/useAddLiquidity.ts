import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { swapPoolAbi } from '../../../../contracts/nabla/SwapPool';
import { decimalToNative } from '../../../../helpers/parseNumbers';
import { useBalance } from '../../../../hooks/useBalance';
import { useContractWrite } from '../../../../hooks/useContractWrite';
import { createOptions } from '../../../../services/api/helpers';
import { useModalToggle } from '../../../../services/modal';
import schema from './schema';
import { AddLiquidityValues } from './types';

export const useAddLiquidity = (poolAddress: string, tokenAddress: string) => {
  const toggle = useModalToggle();

  const balanceQuery = useBalance(tokenAddress);
  const depositQuery = useBalance(poolAddress);

  const form = useForm<AddLiquidityValues>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const mutation = useContractWrite({
    abi: swapPoolAbi,
    address: poolAddress,
    fn: ({ contract, api }, variables: AddLiquidityValues) =>
      contract.tx.deposit(createOptions(api), decimalToNative(variables.amount).toString()),
    onSuccess: () => {
      balanceQuery.refetch();
      depositQuery.refetch();
    },
  });

  return { form, mutation, toggle, balanceQuery, depositQuery };
};
