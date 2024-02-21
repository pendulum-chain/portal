import { useCallback } from 'react';
import { config } from '../../../../../config';
import { backstopPoolAbi } from '../../../../../contracts/nabla/BackstopPool';
import { subtractPercentage } from '../../../../../helpers/calc';
import { getValidSlippage } from '../../../../../helpers/transaction';
import { decimalToRaw } from '../../../../../shared/parseNumbers';
import { useContractWrite } from '../../../../../shared/useContractWrite';
import { WithdrawLiquidityValues } from './types';

export type UseBackstopWithdrawProps = {
  address: string;
  poolTokenDecimals: number;
  lpTokenDecimals: number;
  onSuccess: () => void;
};

export const useBackstopWithdraw = ({
  address,
  poolTokenDecimals,
  lpTokenDecimals,
  onSuccess,
}: UseBackstopWithdrawProps) => {
  const mutation = useContractWrite({
    abi: backstopPoolAbi,
    address,
    method: 'withdraw',
    onSuccess,
  });
  const { mutate } = mutation;

  const onSubmit = useCallback(
    async (variables: WithdrawLiquidityValues) => {
      if (!variables.amount) return;
      const vSlippage = getValidSlippage(variables.slippage || config.backstop.defaults.slippage);
      mutate([
        decimalToRaw(variables.amount, lpTokenDecimals).toString(),
        decimalToRaw(subtractPercentage(variables.amount, vSlippage), poolTokenDecimals).toString(),
      ]);
    },
    [mutate, poolTokenDecimals, lpTokenDecimals],
  );

  return {
    onSubmit,
    mutation,
  };
};
