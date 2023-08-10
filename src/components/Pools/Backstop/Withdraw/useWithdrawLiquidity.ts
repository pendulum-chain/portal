import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { backstopPoolAbi } from '../../../../contracts/nabla/BackstopPool';
import { calcPercentage } from '../../../../helpers/calc';
import { createWriteOptions } from '../../../../services/api/helpers';
import { useModalToggle } from '../../../../services/modal';
import { decimalToNative } from '../../../../shared/parseNumbers';
import { useContractBalance } from '../../../../shared/useContractBalance';
import { useContractWrite } from '../../../../shared/useContractWrite';
import schema from './schema';
import { WithdrawLiquidityValues } from './types';

export const useWithdrawLiquidity = (poolAddress: string, tokenAddress: string) => {
  const toggle = useModalToggle();

  const balanceQuery = useContractBalance({ contractAddress: tokenAddress });
  const depositQuery = useContractBalance({ contractAddress: poolAddress });

  const form = useForm<WithdrawLiquidityValues>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const mutation = useContractWrite({
    abi: backstopPoolAbi,
    address: poolAddress,
    fn: ({ contract, api }, variables: WithdrawLiquidityValues) =>
      contract.tx.withdraw(
        createWriteOptions(api),
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
