import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'preact/compat';
import { useForm, useWatch } from 'react-hook-form';
import { config } from '../../../../../config';
import { cacheKeys } from '../../../../../constants/cache';
import { storageKeys } from '../../../../../constants/localStorage';
import { backstopPoolAbi } from '../../../../../contracts/nabla/BackstopPool';
import { subtractPercentage } from '../../../../../helpers/calc';
import { debounce } from '../../../../../helpers/function';
import { getValidSlippage } from '../../../../../helpers/transaction';
import { useGetAppDataByTenant } from '../../../../../hooks/useGetAppDataByTenant';
import { TransactionSettings } from '../../../../../models/Transaction';
import { useModalToggle } from '../../../../../services/modal';
import { storageService } from '../../../../../services/storage/local';
import { decimalToNative, FixedU128Decimals } from '../../../../../shared/parseNumbers/metric';
import { useContractBalance } from '../../../../../shared/useContractBalance';
import { useContractWrite } from '../../../../../shared/useContractWrite';
import { SwapPoolColumn } from '../columns';
import schema from './schema';
import { RedeemLiquidityValues } from './types';

export const setValueProps = {
  shouldDirty: true,
  shouldTouch: false,
};

const defaultValues = config.swap.defaults;
const getInitialValues = (): Partial<RedeemLiquidityValues> => {
  const storageValues = storageService.getParsed<TransactionSettings>(storageKeys.POOL_SETTINGS);
  return {
    ...defaultValues,
    amount: 0,
    slippage: getValidSlippage(storageValues?.slippage),
  };
};
const storageSet = debounce(storageService.set, 1000);

export const useRedeem = (swapPoolData: SwapPoolColumn) => {
  const queryClient = useQueryClient();
  const { indexerUrl } = useGetAppDataByTenant('nabla').data || {};
  const toggle = useModalToggle();

  const poolAddress = swapPoolData.id;
  const tokenAddress = swapPoolData.token.id;
  const backstopPoolAddress = swapPoolData.backstop?.id;
  const balanceQuery = useContractBalance({ contractAddress: tokenAddress, decimals: FixedU128Decimals });
  const depositQuery = useContractBalance({ contractAddress: poolAddress, decimals: FixedU128Decimals });

  const form = useForm<RedeemLiquidityValues>({
    resolver: yupResolver(schema),
    defaultValues: getInitialValues(),
  });
  const { handleSubmit, getValues, control } = form;

  const mutation = useContractWrite({
    abi: backstopPoolAbi,
    address: backstopPoolAddress,
    method: 'redeemSwapPoolShares',
    onError: () => {
      // ? log error - alert not needed as the transaction modal displays the error
    },
    onSuccess: () => {
      balanceQuery.refetch();
      depositQuery.refetch();
      queryClient.refetchQueries([cacheKeys.swapPools, indexerUrl]);
    },
  });
  const { mutate } = mutation;

  const onSubmit = useCallback(
    () =>
      handleSubmit((variables) => {
        if (!variables.amount) return;
        const vSlippage = getValidSlippage(variables.slippage || config.backstop.defaults.slippage);
        return mutate([
          poolAddress,
          decimalToNative(variables.amount, FixedU128Decimals).toString(),
          decimalToNative(subtractPercentage(variables.amount, vSlippage), FixedU128Decimals).toString(),
        ]);
      }),
    [handleSubmit, poolAddress, mutate],
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

  const amount =
    Number(
      useWatch({
        control: control,
        name: 'amount',
        defaultValue: 0,
      }),
    ) || 0;

  return {
    toggle,
    onSubmit,
    updateStorage,
    form,
    mutation,
    balanceQuery,
    depositQuery,
    amount,
  };
};
