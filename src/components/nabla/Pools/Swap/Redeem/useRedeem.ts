import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'preact/compat';
import { useForm, useWatch } from 'react-hook-form';
import * as Yup from 'yup';

import { config } from '../../../../../config';
import { storageKeys } from '../../../../../constants/localStorage';
import { backstopPoolAbi } from '../../../../../contracts/nabla/BackstopPool';
import { subtractBigDecimalPercentage } from '../../../../../helpers/calc';
import { debounce } from '../../../../../helpers/function';
import { getValidSlippage } from '../../../../../helpers/transaction';
import { TransactionSettings } from '../../../../../models/Transaction';
import { useModalToggle } from '../../../../../services/modal';
import { storageService } from '../../../../../services/storage/local';
import { decimalToRaw } from '../../../../../shared/parseNumbers/metric';
import { SwapPoolColumn } from '../columns';
import { erc20WrapperAbi } from '../../../../../contracts/nabla/ERC20Wrapper';
import { swapPoolAbi } from '../../../../../contracts/nabla/SwapPool';
import { useErc20ContractBalance } from '../../../../../hooks/nabla/useErc20ContractBalance';
import { useContractWrite } from '../../../../../hooks/nabla/useContractWrite';
import { transformNumber } from '../../../../../helpers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { cacheKeys } from '../../../../../constants/cache';
import { useQuoteSwapPoolRedeem } from '../../../../../hooks/nabla/useQuoteSwapPoolRedeem';

interface RedeemLiquidityValues {
  amount: string;
  slippage?: number | null;
}

const schema = Yup.object<RedeemLiquidityValues>().shape({
  amount: Yup.string().required(),
  slippage: Yup.number().transform(transformNumber).nullable(),
});

const defaultValues = config.swap.defaults;
const getInitialValues = (): Partial<RedeemLiquidityValues> => {
  const storageValues = storageService.getParsed<TransactionSettings>(storageKeys.POOL_SETTINGS);
  return {
    ...defaultValues,
    amount: undefined,
    slippage: getValidSlippage(storageValues?.slippage),
  };
};
const storageSet = debounce(storageService.set, 1000);

export const useRedeem = (swapPoolData: SwapPoolColumn) => {
  const queryClient = useQueryClient();
  const toggle = useModalToggle();

  const swapPoolAddress = swapPoolData.id;
  const backstopTokenAddress = swapPoolData.backstopPool.token.id;
  const backstopPoolAddress = swapPoolData.backstopPool.id;

  const backstopBalanceQuery = useErc20ContractBalance(erc20WrapperAbi, {
    contractAddress: backstopTokenAddress,
    decimals: swapPoolData.backstopPool.token.decimals,
  });

  const swapPoolDepositQuery = useErc20ContractBalance(swapPoolAbi, {
    contractAddress: swapPoolAddress,
    decimals: swapPoolData.lpTokenDecimals,
  });

  const form = useForm<RedeemLiquidityValues>({
    resolver: yupResolver(schema),
    defaultValues: getInitialValues(),
  });
  const { getValues } = form;

  const mutation = useContractWrite({
    abi: backstopPoolAbi,
    address: backstopPoolAddress,
    method: 'redeemSwapPoolShares',
    mutateOptions: {
      onError: () => {
        // ? log error - alert not needed as the transaction modal displays the error
      },
      onSuccess: () => {
        form.reset();
        backstopBalanceQuery.refetch();
        swapPoolDepositQuery.refetch();
        queryClient.refetchQueries([cacheKeys.nablaInstance]);
      },
    },
  });

  const amountString = useWatch({
    control: form.control,
    name: 'amount',
    defaultValue: '0',
  });

  const withdrawalQuote = useQuoteSwapPoolRedeem({
    swapPoolLpTokenAmountString: amountString,
    swapPoolLpTokenDecimals: swapPoolData.lpTokenDecimals,
    maximumSwapPoolLpTokenAmount: swapPoolDepositQuery.data?.preciseBigDecimal,
    backstopPoolTokenDecimals: swapPoolData.backstopPool.token.decimals,
    backstopPoolAddress,
    swapPoolAddress,
    form,
  });

  const { mutate } = mutation;
  const onSubmit = useCallback(
    (variables: RedeemLiquidityValues) => {
      console.log('Submit');
      if (!variables.amount || withdrawalQuote.data === undefined) return;
      const vSlippage = getValidSlippage(variables.slippage ?? config.backstop.defaults.slippage);

      return mutate([
        swapPoolAddress,
        decimalToRaw(variables.amount, swapPoolData.lpTokenDecimals).round(0, 0).toString(),
        decimalToRaw(
          subtractBigDecimalPercentage(withdrawalQuote.data.preciseBigDecimal, vSlippage ?? 100),
          swapPoolData.backstopPool.token.decimals,
        )
          .round(0, 0)
          .toString(),
      ]);
    },
    [
      withdrawalQuote.data,
      mutate,
      swapPoolAddress,
      swapPoolData.lpTokenDecimals,
      swapPoolData.backstopPool.token.decimals,
    ],
  );

  const updateStorage = useCallback(
    (newValues: Partial<TransactionSettings>) => {
      const prev = getValues();
      const updated = {
        slippage: prev.slippage || defaultValues.slippage,
        ...newValues,
      };
      storageSet(storageKeys.POOL_SETTINGS, updated);
      return updated;
    },
    [getValues],
  );

  return {
    form,
    amountString,
    mutation,
    toggle,
    onSubmit: form.handleSubmit(onSubmit),
    updateStorage,
    balanceQuery: backstopBalanceQuery,
    depositQuery: swapPoolDepositQuery,
    withdrawalQuote,
  };
};
