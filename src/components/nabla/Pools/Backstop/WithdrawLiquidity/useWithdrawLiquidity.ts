import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'preact/compat';
import { useForm, useWatch } from 'react-hook-form';
import * as Yup from 'yup';

import { cacheKeys } from '../../../../../constants/cache';
import { storageKeys } from '../../../../../constants/localStorage';
import { debounce } from '../../../../../helpers/function';
import { TransactionSettings } from '../../../../../models/Transaction';
import { useModalToggle } from '../../../../../services/modal';
import { storageService } from '../../../../../services/storage/local';
import { useBackstopWithdraw } from './useBackstopWithdraw';
import { useBackstopDrain } from './useBackstopDrain';
import { NablaInstance, NablaInstanceSwapPool } from '../../../../../hooks/nabla/useNablaInstance';
import { erc20WrapperAbi } from '../../../../../contracts/nabla/ERC20Wrapper';
import { backstopPoolAbi } from '../../../../../contracts/nabla/BackstopPool';
import { useErc20ContractBalance } from '../../../../../hooks/nabla/useErc20ContractBalance';
import { transformNumber } from '../../../../../helpers/yup';
import { config } from '../../../../../config';
import { getValidSlippage } from '../../../../../helpers/transaction';
import { useQuote } from '../../../../../hooks/nabla/useQuote';
import { MessageCallErrorResult } from '../../../../../hooks/nabla/useContractRead';

export type WithdrawLiquidityValues = {
  amount: string;
  address?: string | null;
  slippage?: number | null;
};

const schema = Yup.object<WithdrawLiquidityValues>().shape({
  amount: Yup.string().required(),
  address: Yup.string().nullable().min(5),
  slippage: Yup.number().nullable().transform(transformNumber),
});

const defaultValues = config.pools.defaults;
const getInitialValues = (): Partial<WithdrawLiquidityValues> => {
  const storageValues = storageService.getParsed<TransactionSettings>(storageKeys.POOL_SETTINGS);
  return {
    ...defaultValues,
    amount: undefined,
    address: null,
    slippage: getValidSlippage(storageValues?.slippage),
  };
};

function parseError(error: MessageCallErrorResult): string {
  switch (error.type) {
    case 'error':
      return 'Cannot determine value of shares';
    case 'panic':
      return 'Cannot determine value of shares';
    case 'reverted':
      switch (error.description) {
        case 'withdraw():MINIMUM_AMOUNT':
        case 'withdrawExcessSwapLiquidity():MIN_AMOUNT':
          return 'The returned amount of tokens is below your desired minimum amount.';
        case 'sharesTargetWorth():POOLWORTH_NEGATIVE':
          return 'It is not possible to withdraw from the backstop pool at the moment.';
        case 'withdraw: INSUFFICIENT_BALANCE':
        case 'withdrawExcessSwapLiquidity():BALANCE':
          return "You don't have enough LP tokens to redeem.";
        case 'SwapPool#backstopDrain():INSUFFICIENT_COVERAGE':
          return 'The input amount is too large. The resulting coverage ratio of the pool must not drop below 100%.';
      }
      return 'Cannot determine value of shares';
  }
}

const storageSet = debounce(storageService.set, 1000);

export const useWithdrawLiquidity = (nabla: NablaInstance) => {
  const queryClient = useQueryClient();
  const toggle = useModalToggle();

  const backstopPoolAddress = nabla.backstopPool.id;

  const swapPools = nabla.swapPools;

  const form = useForm<WithdrawLiquidityValues>({
    resolver: yupResolver(schema),
    defaultValues: getInitialValues(),
  });

  const address = useWatch({
    control: form.control,
    name: 'address',
  });

  const selectedPool = useMemo<NablaInstanceSwapPool | undefined>(
    () => swapPools.find((t) => t.id === address),
    [address, swapPools],
  );

  const tokenToReceive = selectedPool?.token ?? nabla.backstopPool.token;

  const balanceQuery = useErc20ContractBalance(erc20WrapperAbi, {
    contractAddress: tokenToReceive.id,
    decimals: tokenToReceive.decimals,
  });

  const depositQuery = useErc20ContractBalance(backstopPoolAbi, {
    contractAddress: backstopPoolAddress,
    decimals: nabla.backstopPool.lpTokenDecimals,
  });

  const { reset, getValues } = form;
  const amountString = useWatch({
    control: form.control,
    name: 'amount',
    defaultValue: '0',
  });

  const { refetch: balanceRefetch } = balanceQuery;
  const { refetch: depositRefetch } = depositQuery;
  const { refetchQueries } = queryClient;
  const onWithdrawSuccess = useCallback(() => {
    reset();
    balanceRefetch();
    depositRefetch();
    setTimeout(() => {
      refetchQueries([cacheKeys.nablaInstance]);
    }, 2000);
  }, [refetchQueries, balanceRefetch, depositRefetch, reset]);

  const withdrawalQuote = useQuote({
    lpTokenAmountString: amountString,
    lpTokenDecimals: nabla.backstopPool.lpTokenDecimals,
    maximumLpTokenAmount: depositQuery.data?.preciseBigDecimal,
    poolTokenDecimals: tokenToReceive.decimals,
    contractAddress: backstopPoolAddress,
    contractAbi: backstopPoolAbi,
    messageName: selectedPool !== undefined ? 'withdrawExcessSwapLiquidity' : 'withdraw',
    primaryCacheKey:
      selectedPool !== undefined ? cacheKeys.quoteBackstopPoolDrain : cacheKeys.quoteBackstopPoolWithdraw,
    constructArgs: useCallback(
      (amountIn: string | undefined) =>
        amountIn === undefined ? [] : selectedPool !== undefined ? [selectedPool.id, amountIn, '0'] : [amountIn, '0'],
      [selectedPool],
    ),
    parseError,
    form,
    pickFromReturnArray: selectedPool !== undefined ? undefined : 0,
  });

  const backstopWithdraw = useBackstopWithdraw({
    backstopPool: nabla.backstopPool,
    onSuccess: onWithdrawSuccess,
    withdrawalQuote,
  });

  const backstopDrain = useBackstopDrain({
    backstopPool: nabla.backstopPool,
    selectedSwapPool: selectedPool,
    onSuccess: onWithdrawSuccess,
    withdrawalQuote,
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
    form,
    amountString,
    backstopWithdraw,
    backstopDrain,
    balanceQuery,
    depositQuery,
    selectedPool,
    tokenToReceive,
    withdrawalQuote,
    toggle,
    onSubmit: form.handleSubmit(selectedPool !== undefined ? backstopDrain.onSubmit : backstopWithdraw.onSubmit),
    updateStorage,
  };
};
