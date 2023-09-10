import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { swapPoolAbi } from '../../../../contracts/nabla/SwapPool';
import { useModalToggle } from '../../../../services/modal';
import { decimalToNative, FixedU128Decimals } from '../../../../shared/parseNumbers';
import { useContractBalance } from '../../../../shared/useContractBalance';
import { useContractWrite } from '../../../../shared/useContractWrite';
import schema from './schema';
import { AddLiquidityValues } from './types';

export const useAddLiquidity = (poolAddress: string, tokenAddress: string) => {
  const toggle = useModalToggle();

  const balanceQuery = useContractBalance({ contractAddress: tokenAddress, decimals: FixedU128Decimals });
  const depositQuery = useContractBalance({
    contractAddress: poolAddress,
    abi: swapPoolAbi,
    decimals: FixedU128Decimals,
  });

  const form = useForm<AddLiquidityValues>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const mutation = useContractWrite({
    abi: swapPoolAbi,
    address: poolAddress,
    method: 'deposit',
    onError: () => {
      // ? log error - alert not needed as the transaction modal displays the error
    },
    onSuccess: () => {
      form.reset();
      balanceQuery.refetch();
      depositQuery.refetch();
    },
  });

  const onSubmit = form.handleSubmit((variables: AddLiquidityValues) =>
    mutation.mutate([decimalToNative(variables.amount, FixedU128Decimals).toString()]),
  );

  return { form, mutation, onSubmit, toggle, balanceQuery, depositQuery };
};
