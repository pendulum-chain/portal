import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { backstopPoolAbi } from '../../../../contracts/nabla/BackstopPool';
import { calcPercentage } from '../../../../helpers/calc';
import { decimalToNative } from '../../../../helpers/parseNumbers';
import { useBalance } from '../../../../hooks/useBalance';
import { useContractWrite } from '../../../../hooks/useContractWrite';
import { createOptions } from '../../../../services/api/helpers';
import { useModalToggle } from '../../../../services/modal';
import schema from './schema';
import { WithdrawLiquidityValues } from './types';

export const useWithdrawLiquidity = (poolAddress: string, tokenAddress: string) => {
  const toggle = useModalToggle();

  const balanceQuery = useBalance(tokenAddress);
  const depositQuery = useBalance(poolAddress);

  const form = useForm<WithdrawLiquidityValues>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const mutation = useContractWrite({
    abi: backstopPoolAbi,
    address: poolAddress,
    fn: ({ contract, api }, variables: WithdrawLiquidityValues) =>
      contract.tx.withdraw(
        createOptions(api, false),
        decimalToNative(calcPercentage(variables.amount, 0.01)).toString(),
        decimalToNative(variables.amount).toString(),
      ),
    onError: () => {
      // TODO: handle error
    },
    onSuccess: () => {
      // TODO: wait for transaction to complete
      balanceQuery.refetch();
      depositQuery.refetch();
    },
  });

  return { form, mutation, toggle, balanceQuery, depositQuery };
};
