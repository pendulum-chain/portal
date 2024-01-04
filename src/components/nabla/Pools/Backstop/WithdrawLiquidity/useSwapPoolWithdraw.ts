import { useCallback, useMemo } from 'react';
import { BackstopPool, SwapPool } from '../../../../../../gql/graphql';
import { config } from '../../../../../config';
import { defaultDecimals } from '../../../../../config/apps/nabla';
import { backstopPoolAbi } from '../../../../../contracts/nabla/BackstopPool';
import { useGlobalState } from '../../../../../GlobalStateProvider';
import { calcAvailablePoolWithdraw, subtractPercentage } from '../../../../../helpers/calc';
import { getValidSlippage } from '../../../../../helpers/transaction';
import { useSharesTargetWorth } from '../../../../../hooks/nabla/useSharesTargetWorth';
import { useTokenPrice } from '../../../../../hooks/nabla/useTokenPrice';
import { decimalToNative } from '../../../../../shared/parseNumbers';
import { useContractWrite } from '../../../../../shared/useContractWrite';
import { WithdrawLiquidityValues } from './types';

export type UseSwapPoolWithdrawProps = {
  pool: BackstopPool;
  selectedPool: SwapPool;
  deposit: number | undefined;
  onSuccess: () => void;
  enabled: boolean;
};

export const useSwapPoolWithdraw = ({ pool, selectedPool, deposit, onSuccess, enabled }: UseSwapPoolWithdrawProps) => {
  const swapPoolAddress = selectedPool.id;
  const { address: owner } = useGlobalState().walletAccount || {};

  const mutation = useContractWrite({
    abi: backstopPoolAbi,
    address: pool.id,
    method: 'withdrawExcessSwapLiquidity',
    onSuccess,
  });
  const { mutate } = mutation;

  const onSubmit = useCallback(
    async (variables: WithdrawLiquidityValues) => {
      if (!variables.amount || !swapPoolAddress) return;
      const vSlippage = getValidSlippage(variables.slippage || config.backstop.defaults.slippage);
      mutate([
        swapPoolAddress,
        decimalToNative(variables.amount, defaultDecimals).toString(),
        decimalToNative(subtractPercentage(variables.amount, vSlippage), defaultDecimals).toString(),
      ]);
    },
    [mutate, swapPoolAddress],
  );

  const sharesQuery = useSharesTargetWorth(
    {
      address: swapPoolAddress,
      amount: deposit,
      abi: backstopPoolAbi,
    },
    { enabled },
  );
  const shares = sharesQuery.data;
  const bpPriceQuery = useTokenPrice(pool.token.id, owner, { enabled });
  const spPriceQuery = useTokenPrice(selectedPool.token.id, owner, { enabled });
  const bpPrice = bpPriceQuery.data;
  const spPrice = spPriceQuery.data;

  const withdrawLimit = useMemo(
    () =>
      calcAvailablePoolWithdraw({
        selectedPool,
        deposit: BigInt(decimalToNative(deposit || 0).toString()),
        shares,
        bpPrice: bpPrice ? BigInt(bpPrice) : undefined,
        spPrice: spPrice ? BigInt(spPrice) : undefined,
        decimals: defaultDecimals,
      }),
    [selectedPool, deposit, shares, bpPrice, spPrice],
  );

  return {
    onSubmit,
    mutation,
    isLoading: bpPriceQuery.isLoading || spPriceQuery.isLoading || sharesQuery.isLoading,
    bpPriceQuery,
    spPriceQuery,
    withdrawLimit,
  };
};
