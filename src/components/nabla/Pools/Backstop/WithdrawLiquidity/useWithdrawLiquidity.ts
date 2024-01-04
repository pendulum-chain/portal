import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'preact/compat';
import { useForm, useWatch } from 'react-hook-form';
import { BackstopPool, SwapPool } from '../../../../../../gql/graphql';
import { defaultDecimals } from '../../../../../config/apps/nabla';
import { cacheKeys } from '../../../../../constants/cache';
import { storageKeys } from '../../../../../constants/localStorage';
import { debounce } from '../../../../../helpers/function';
import useBoolean from '../../../../../hooks/useBoolean';
import { useGetAppDataByTenant } from '../../../../../hooks/useGetAppDataByTenant';
import { TransactionSettings } from '../../../../../models/Transaction';
import { useModalToggle } from '../../../../../services/modal';
import { storageService } from '../../../../../services/storage/local';
import { useContractBalance } from '../../../../../shared/useContractBalance';
import { defaultValues } from '../../../Swap/useSwapComponent';
import schema from './schema';
import { WithdrawLiquidityValues } from './types';
import { useBackstopWithdraw } from './useBackstopWithdraw';
import { useSwapPoolWithdraw } from './useSwapPoolWithdraw';

const storageSet = debounce(storageService.set, 1000);
export const useWithdrawLiquidity = (pool: BackstopPool) => {
  const { id: poolAddress, token, router } = pool;
  const tokenAddress = token.id;
  const swapPools = router?.swapPools;
  const { indexerUrl } = useGetAppDataByTenant('nabla').data || {};
  const queryClient = useQueryClient();
  const toggle = useModalToggle();
  const tokenModal = useBoolean();

  const balanceQuery = useContractBalance({ contractAddress: tokenAddress, decimals: defaultDecimals });
  const depositQuery = useContractBalance({ contractAddress: poolAddress, decimals: defaultDecimals });
  const { refetch: balanceRefetch } = balanceQuery;
  const { refetch: depositRefetch } = depositQuery;

  const form = useForm<WithdrawLiquidityValues>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });
  const { reset, getValues, handleSubmit } = form;
  const amount =
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

  const pools = useMemo(
    () =>
      [
        {
          id: '',
          token: {
            ...token,
            id: '',
          },
        } as SwapPool,
      ].concat(swapPools || []),
    [swapPools, token],
  );
  const selectedPool = useMemo(() => pools.find((t) => t.id === address) || pools[0], [address, pools]);

  const onWithdrawSuccess = useCallback(() => {
    reset();
    balanceRefetch();
    depositRefetch();
    queryClient.refetchQueries([cacheKeys.backstopPools, indexerUrl]);
  }, [balanceRefetch, depositRefetch, indexerUrl, queryClient, reset]);

  const backstopWithdraw = useBackstopWithdraw({
    address: poolAddress,
    onSuccess: onWithdrawSuccess,
  });

  const isSwapPoolWithdraw = !!address && address.length > 5;
  const swapPoolWithdraw = useSwapPoolWithdraw({
    pool,
    deposit: depositQuery.balance || 0,
    selectedPool,
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
    address,
    amount,
    backstopWithdraw,
    balanceQuery,
    depositQuery,
    form,
    isSwapPoolWithdraw,
    pools,
    selectedPool,
    swapPoolWithdraw,
    tokenModal,
    toggle,
    updateStorage,
    onSubmit: handleSubmit(address && address.length > 5 ? swapPoolWithdraw.onSubmit : backstopWithdraw.onSubmit),
  };
};
