import { useCallback, useMemo } from 'react';
import { config } from '../../../../../config';
import { backstopPoolAbi } from '../../../../../contracts/nabla/BackstopPool';
import { calcAvailablePoolWithdraw, subtractPercentage } from '../../../../../helpers/calc';
import { getValidSlippage } from '../../../../../helpers/transaction';
import { useSharesTargetWorth } from '../../../../../hooks/nabla/useSharesTargetWorth';
import { getMessageCallValue } from '../../../../../shared/helpers';
import { decimalToRaw } from '../../../../../shared/parseNumbers/metric';
import { WithdrawLiquidityValues } from './types';
import { NablaInstanceBackstopPool, NablaInstanceSwapPool } from '../../../../../hooks/nabla/useNablaInstance';
import { useContractWrite } from '../../../../../hooks/nabla/useContractWrite';
import { useNablaTokenPrice } from '../../../../../hooks/nabla/useNablaTokenPrice';

export type UseSwapPoolWithdrawProps = {
  backstopPool: NablaInstanceBackstopPool;
  selectedSwapPool: NablaInstanceSwapPool;
  depositedBackstopLpTokenDecimalAmount: number;
  onSuccess: () => void;
  enabled: boolean;
};

export const useSwapPoolWithdraw = ({
  backstopPool,
  selectedSwapPool,
  depositedBackstopLpTokenDecimalAmount,
  onSuccess,
  enabled,
}: UseSwapPoolWithdrawProps) => {
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

  const onSubmit = useCallback(
    async (variables: WithdrawLiquidityValues) => {
      if (!variables.amount || !swapPoolAddress) return;
      const vSlippage = getValidSlippage(variables.slippage || config.backstop.defaults.slippage);

      mutate([
        swapPoolAddress,
        decimalToRaw(variables.amount, backstopPool.token.decimals).toString(),
        // TODO (Torsten): this next line does not make sense, there is no proper way to convert
        // backstop pool shares to swap pool tokens
        decimalToRaw(subtractPercentage(variables.amount, vSlippage), selectedSwapPool?.token.decimals).toString(),
      ]);
    },
    [mutate, swapPoolAddress, backstopPool.token.decimals, selectedSwapPool?.token.decimals],
  );

  // TODO Torsten: check whether this calculation makes any sense
  const sharesQuery = useSharesTargetWorth(
    {
      address: swapPoolAddress,
      lpTokenDecimalAmount: depositedBackstopLpTokenDecimalAmount,
      abi: backstopPoolAbi,
      lpTokenDecimals: backstopPool.lpTokenDecimals,
    },
    enabled,
  );
  const sharesWorthNativeAmount = getMessageCallValue(sharesQuery.data);
  const bpPriceQuery = useNablaTokenPrice(backstopPool.token.id, enabled);
  const spPriceQuery = useNablaTokenPrice(selectedSwapPool?.token.id, enabled);
  const bpPrice = getMessageCallValue(bpPriceQuery.data);
  const spPrice = getMessageCallValue(spPriceQuery.data);

  const withdrawLimitDecimalAmount = useMemo(
    () =>
      selectedSwapPool
        ? calcAvailablePoolWithdraw({
            selectedSwapPool,
            backstopLpDecimalAmount: depositedBackstopLpTokenDecimalAmount,
            sharesWorthNativeAmount,
            bpPrice: bpPrice ? BigInt(bpPrice) : undefined,
            spPrice: spPrice ? BigInt(spPrice) : undefined,
            backstopPoolTokenDecimals: backstopPool.token.decimals,
            swapPoolTokenDecimals: selectedSwapPool.token.decimals,
          })
        : 0,
    [selectedSwapPool, backstopPool, depositedBackstopLpTokenDecimalAmount, sharesWorthNativeAmount, bpPrice, spPrice],
  );

  return {
    onSubmit,
    mutation,
    isLoading: bpPriceQuery.isLoading || spPriceQuery.isLoading || sharesQuery.isLoading,
    withdrawLimitDecimalAmount,
  };
};
