import { useCallback } from 'react';
import { config } from '../../../../../config';
import { backstopPoolAbi } from '../../../../../contracts/nabla/BackstopPool';
import { subtractBigDecimalPercentage } from '../../../../../helpers/calc';
import { getValidSlippage } from '../../../../../helpers/transaction';
import { decimalToRaw } from '../../../../../shared/parseNumbers/metric';
import { NablaInstanceBackstopPool, NablaInstanceSwapPool } from '../../../../../hooks/nabla/useNablaInstance';
import { useContractWrite } from '../../../../../hooks/nabla/useContractWrite';
import { WithdrawLiquidityValues } from './useWithdrawLiquidity';
import { UseQuoteResult } from '../../../../../hooks/nabla/useQuote';

export type UseBackstopDrainProps = {
  backstopPool: NablaInstanceBackstopPool;
  selectedSwapPool: NablaInstanceSwapPool | undefined;
  onSuccess: () => void;
  withdrawalQuote: UseQuoteResult;
};

export const useBackstopDrain = ({
  backstopPool,
  selectedSwapPool,
  onSuccess,
  withdrawalQuote,
}: UseBackstopDrainProps) => {
  const swapPoolAddress = selectedSwapPool?.id;

  const mutation = useContractWrite({
    abi: backstopPoolAbi,
    address: backstopPool.id,
    method: 'withdrawExcessSwapLiquidity',
    mutateOptions: {
      onSuccess,
    },
  });
  const { mutate } = mutation;

  const lpTokenDecimals = backstopPool.lpTokenDecimals;
  const poolTokenDecimals = selectedSwapPool?.token.decimals;

  const onSubmit = useCallback(
    async (variables: WithdrawLiquidityValues) => {
      if (
        !variables.amount ||
        swapPoolAddress === undefined ||
        poolTokenDecimals === undefined ||
        withdrawalQuote.data === undefined
      )
        return;
      const vSlippage = getValidSlippage(variables.slippage ?? config.pools.defaults.slippage);
      const minimumAmount = subtractBigDecimalPercentage(withdrawalQuote.data.preciseBigDecimal, vSlippage);

      mutate([
        swapPoolAddress,
        decimalToRaw(variables.amount, lpTokenDecimals).toString(),
        decimalToRaw(minimumAmount, poolTokenDecimals).toString(),
      ]);
    },
    [poolTokenDecimals, withdrawalQuote.data, mutate, swapPoolAddress, lpTokenDecimals],
  );

  // TODO Torsten: check whether this calculation makes any sense
  /*const sharesQuery = useSharesTargetWorth(
    {
      address: swapPoolAddress,
      lpTokenDecimalAmount: depositedBackstopLpTokenDecimalAmount,
      lpTokenDecimals: backstopPool.lpTokenDecimals,
      poolTokenDecimals: backstopPool.token.decimals,
      abi: backstopPoolAbi,
    },
    enabled,
  );*/

  return {
    onSubmit,
    mutation,
    //isLoading: sharesQuery.isLoading,
  };
};
