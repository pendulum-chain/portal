import { useCallback } from 'preact/hooks';

import { config } from '../../../../../config';
import { backstopPoolAbi } from '../../../../../contracts/nabla/BackstopPool';
import { subtractBigDecimalPercentage } from '../../../../../helpers/calc';
import { getValidSlippage } from '../../../../../helpers/transaction';
import { decimalToRaw } from '../../../../../shared/parseNumbers/metric';
import { useContractWrite } from '../../../../../hooks/nabla/useContractWrite';
import { WithdrawLiquidityValues } from './useWithdrawLiquidity';
import { UseQuoteResult } from '../../../../../hooks/nabla/useQuote';
import { NablaInstanceBackstopPool } from '../../../../../hooks/nabla/useNablaInstance';

interface UseBackstopWithdrawProps {
  backstopPool: NablaInstanceBackstopPool;
  onSuccess: () => void;
  withdrawalQuote: UseQuoteResult;
}

export function useBackstopWithdraw({ backstopPool, onSuccess, withdrawalQuote }: UseBackstopWithdrawProps) {
  const mutation = useContractWrite({
    abi: backstopPoolAbi,
    address: backstopPool.id,
    method: 'withdraw',
    mutateOptions: {
      onSuccess,
    },
  });
  const { mutate } = mutation;

  const lpTokenDecimals = backstopPool.lpTokenDecimals;
  const poolTokenDecimals = backstopPool.token.decimals;

  const onSubmit = useCallback(
    async (variables: WithdrawLiquidityValues) => {
      if (!variables.amount || withdrawalQuote.data === undefined) return;
      const vSlippage = getValidSlippage(variables.slippage ?? config.pools.defaults.slippage);
      const minimumAmount = subtractBigDecimalPercentage(withdrawalQuote.data.preciseBigDecimal, vSlippage);

      mutate([
        decimalToRaw(variables.amount, lpTokenDecimals).round(0, 0).toString(),
        decimalToRaw(minimumAmount, poolTokenDecimals).round(0, 0).toString(),
      ]);
    },
    [withdrawalQuote.data, mutate, lpTokenDecimals, poolTokenDecimals],
  );

  return {
    onSubmit,
    mutation,
  };
}
