import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'preact/compat';
import { useForm, useWatch } from 'react-hook-form';
import { cacheKeys } from '../../../../../constants/cache';
import { storageKeys } from '../../../../../constants/localStorage';
import { debounce } from '../../../../../helpers/function';
import useBoolean from '../../../../../hooks/useBoolean';
import { useGetAppDataByTenant } from '../../../../../hooks/useGetAppDataByTenant';
import { TransactionSettings } from '../../../../../models/Transaction';
import { useModalToggle } from '../../../../../services/modal';
import { storageService } from '../../../../../services/storage/local';
import { defaultValues } from '../../../Swap/useSwapComponent';
import schema from './schema';
import { WithdrawLiquidityValues } from './types';
import { useBackstopWithdraw } from './useBackstopWithdraw';
import { useSwapPoolWithdraw } from './useSwapPoolWithdraw';
import { NablaInstance, NablaInstanceSwapPool } from '../../../../../hooks/nabla/useNablaInstance';
import { erc20WrapperAbi } from '../../../../../contracts/nabla/ERC20Wrapper';
import { backstopPoolAbi } from '../../../../../contracts/nabla/BackstopPool';
import { useContractBalance } from '../../../../../hooks/nabla/useContractBalance';

const storageSet = debounce(storageService.set, 1000);
export const useWithdrawLiquidity = (nabla: NablaInstance) => {
  const poolAddress = nabla.backstopPool.id;
  const token = nabla.backstopPool.token;

  const tokenAddress = token.id;
  const swapPools = nabla.swapPools;
  const { indexerUrl } = useGetAppDataByTenant('nabla').data || {};
  const queryClient = useQueryClient();
  const toggle = useModalToggle();
  const tokenModal = useBoolean();

  const balanceQuery = useContractBalance({
    contractAddress: tokenAddress,
    decimals: nabla.backstopPool.token.decimals,
    abi: erc20WrapperAbi,
  });

  const depositQuery = useContractBalance({
    contractAddress: poolAddress,
    decimals: nabla.backstopPool.lpTokenDecimals,
    abi: backstopPoolAbi,
  });

  const { refetch: balanceRefetch } = balanceQuery;
  const { refetch: depositRefetch } = depositQuery;

  const form = useForm<WithdrawLiquidityValues>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });
  const { reset, getValues, handleSubmit } = form;
  const backstopLpTokenDecimalAmountToRedeem =
    Number(
      useWatch({
        control: form.control,
        name: 'amount',
        defaultValue: 0,
      }),
    ) || 0;

  const address = useWatch({
    control: form.control,
    name: 'address',
  });

  const selectedPool: NablaInstanceSwapPool | undefined = useMemo(
    () => swapPools.find((t) => t.id === address)!,
    [address, swapPools],
  );

  const onWithdrawSuccess = useCallback(() => {
    reset();
    balanceRefetch();
    depositRefetch();
    queryClient.refetchQueries([cacheKeys.backstopPools, indexerUrl]);
  }, [balanceRefetch, depositRefetch, indexerUrl, queryClient, reset]);

  const backstopWithdraw = useBackstopWithdraw({
    address: poolAddress,
    poolTokenDecimals: nabla.backstopPool.token.decimals,
    lpTokenDecimals: nabla.backstopPool.lpTokenDecimals,
    onSuccess: onWithdrawSuccess,
  });

  const isSwapPoolWithdraw = !!address && address.length > 5;
  const swapPoolWithdraw = useSwapPoolWithdraw({
    backstopPool: nabla.backstopPool,
    depositedBackstopLpTokenDecimalAmount: depositQuery.balance || 0,
    selectedSwapPool: selectedPool,
    enabled: isSwapPoolWithdraw,
    onSuccess: onWithdrawSuccess,
  });

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
    backstopLpTokenDecimalAmountToRedeem,
    backstopWithdraw,
    balanceQuery,
    depositQuery,
    form,
    isSwapPoolWithdraw,
    pools: swapPools,
    selectedPool,
    swapPoolWithdraw,
    tokenModal,
    toggle,
    updateStorage,
    onSubmit: handleSubmit(isSwapPoolWithdraw ? swapPoolWithdraw.onSubmit : backstopWithdraw.onSubmit),
  };
};
