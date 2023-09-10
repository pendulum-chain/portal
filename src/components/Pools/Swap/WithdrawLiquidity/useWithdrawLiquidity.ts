import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { swapPoolAbi } from '../../../../contracts/nabla/SwapPool';
import { subtractPercentage } from '../../../../helpers/calc';
import { useModalToggle } from '../../../../services/modal';
import { decimalToNative, FixedU128Decimals } from '../../../../shared/parseNumbers';
import { useContractBalance } from '../../../../shared/useContractBalance';
import { useContractWrite } from '../../../../shared/useContractWrite';
import schema from './schema';
import { WithdrawLiquidityValues } from './types';

export const useWithdrawLiquidity = (poolAddress: string, tokenAddress: string) => {
  const toggle = useModalToggle();
  const balanceQuery = useContractBalance({ contractAddress: tokenAddress, decimals: FixedU128Decimals });
  const depositQuery = useContractBalance({ contractAddress: poolAddress, decimals: FixedU128Decimals });

  const form = useForm<WithdrawLiquidityValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: 0,
    },
  });

  const mutation = useContractWrite({
    abi: swapPoolAbi,
    address: poolAddress,
    method: 'withdraw',
    onError: () => {
      // ? log error - alert not needed as the transaction modal displays the error
    },
    onSuccess: () => {
      form.reset();
      balanceQuery.refetch();
      depositQuery.refetch();
    },
  });

  const onSubmit = form.handleSubmit((variables: WithdrawLiquidityValues) =>
    mutation.mutate([
      decimalToNative(variables.amount, FixedU128Decimals).toString(),
      decimalToNative(subtractPercentage(variables.amount, 0.1), FixedU128Decimals).toString(),
    ]),
  );

  return { form, mutation, onSubmit, toggle, balanceQuery, depositQuery };
};
