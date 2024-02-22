import { useCallback } from 'react';
import { config } from '../../../../../config';
import { backstopPoolAbi } from '../../../../../contracts/nabla/BackstopPool';
import { subtractPercentage } from '../../../../../helpers/calc';
import { getValidSlippage } from '../../../../../helpers/transaction';
import { decimalToNative, FixedU128Decimals } from '../../../../../shared/parseNumbers/metric';
import { useContractWrite } from '../../../../../shared/useContractWrite';
import { WithdrawLiquidityValues } from './types';

export type UseBackstopWithdrawProps = {
  address: string;
  onSuccess: () => void;
};

export const useBackstopWithdraw = ({ address, onSuccess }: UseBackstopWithdrawProps) => {
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
        decimalToNative(variables.amount, FixedU128Decimals).toString(),
        decimalToNative(subtractPercentage(variables.amount, vSlippage), FixedU128Decimals).toString(),
      ]);
    },
    [mutate],
  );

  return {
    onSubmit,
    mutation,
  };
};
