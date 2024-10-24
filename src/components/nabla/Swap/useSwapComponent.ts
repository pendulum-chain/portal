import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/compat';
import { Resolver, useForm, useWatch } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import Big from 'big.js';

import { config } from '../../../config';
import { storageKeys } from '../../../constants/localStorage';
import { routerAbi } from '../../../contracts/nabla/Router';
import { useGlobalState } from '../../../GlobalStateProvider';
import { debounce } from '../../../helpers/function';
import { getValidDeadline, getValidSlippage } from '../../../helpers/transaction';
import { useGetAppDataByTenant } from '../../../hooks/useGetAppDataByTenant';
import { SwapSettings } from '../../../models/Swap';
import { storageService } from '../../../services/storage/local';
import { calcDeadline, decimalToRaw } from '../../../shared/parseNumbers/metric';
import schema from './schema';
import { SwapFormValues } from './schema';
import { useNablaInstance } from '../../../hooks/nabla/useNablaInstance';
import { useContractWrite } from '../../../hooks/nabla/useContractWrite';
import { PoolEntry } from '../common/PoolSelectorModal';
import { useErc20ContractBalance } from '../../../hooks/nabla/useErc20ContractBalance';
import { erc20WrapperAbi } from '../../../contracts/nabla/ERC20Wrapper';
import { useTokenOutAmount } from '../../../hooks/nabla/useTokenOutAmount';
import { cacheKeys } from '../../../constants/cache';

export interface UseSwapComponentProps {
  from?: string;
  to?: string;
  onChange?: (from: string, to: string) => void;
}

const defaultValues = config.swap.defaults;
const storageSet = debounce(storageService.set, 1000);

export const useSwapComponent = (props: UseSwapComponentProps) => {
  const queryClient = useQueryClient();
  const { onChange } = props;
  const { nabla, isLoading: nablaInstanceIsLoading } = useNablaInstance();
  const tokens = nabla?.swapPools.map((p) => p.token) ?? [];
  const tokensMap = nabla?.tokens ?? {};

  const { address } = useGlobalState().walletAccount || {};
  const hadMountedRef = useRef(false);
  const { router } = useGetAppDataByTenant('nabla').data || {};
  const tokensModal = useState<undefined | 'from' | 'to'>();
  const setTokenModal = tokensModal[1];

  const initialState = useMemo(() => {
    const storageValues = storageService.getParsed<SwapSettings>(storageKeys.SWAP_SETTINGS);
    return {
      from: props.from ?? storageValues?.from ?? '',
      to: props.to ?? storageValues?.to ?? '',
      slippage: getValidSlippage(storageValues?.slippage),
      deadline: getValidDeadline(storageValues?.deadline ?? defaultValues.deadline),
    };
  }, [props.from, props.to]);

  const form = useForm<SwapFormValues>({
    resolver: yupResolver(schema) as Resolver<SwapFormValues>,
    defaultValues: initialState,
  });

  const { setValue, getValues, control } = form;
  const from = useWatch({ control, name: 'from' });
  const to = useWatch({ control, name: 'to' });

  const fromToken = tokensMap[from];
  const toToken = tokensMap[to];

  const fromTokenBalance = useErc20ContractBalance(
    erc20WrapperAbi,
    fromToken !== undefined ? { contractAddress: fromToken.id, decimals: fromToken.decimals } : undefined,
  );
  const toTokenBalance = useErc20ContractBalance(
    erc20WrapperAbi,
    toToken !== undefined ? { contractAddress: toToken.id, decimals: toToken.decimals } : undefined,
  );

  const fromAmountString = useWatch({
    control,
    name: 'fromAmount',
    defaultValue: '0',
  });

  let fromAmount: Big | undefined;
  try {
    fromAmount = new Big(fromAmountString);
  } catch {
    fromAmount = undefined;
  }

  const slippage = getValidSlippage(
    Number(
      useWatch({
        control,
        name: 'slippage',
        defaultValue: config.swap.defaults.slippage,
      }),
    ),
  );

  const toAmountQuote = useTokenOutAmount({
    fromAmountString,
    fromToken,
    toToken,
    maximumFromAmount: fromTokenBalance.data?.preciseBigDecimal,
    form,
    slippage,
  });

  const swapMutation = useContractWrite({
    abi: routerAbi,
    address: router,
    method: 'swapExactTokensForTokens',
    mutateOptions: {
      onSuccess: () => {
        // update token balances
        fromTokenBalance.refetch();
        toTokenBalance.refetch();
        setValue('fromAmount', '0');
        setValue('toAmount', '0');

        // Reset token approval after successful swap
        queryClient.invalidateQueries({ queryKey: [cacheKeys.tokenAllowance] });
      },
    },
  });

  const onSubmit = form.handleSubmit((variables: SwapFormValues) => {
    if (toAmountQuote.data === undefined) return;
    const fromToken = tokens.find((token) => token.id === variables.from)!;
    const toToken = tokens.find((token) => token.id === variables.to)!;

    const vDeadline = getValidDeadline(variables.deadline ?? defaultValues.deadline);
    const deadline = calcDeadline(vDeadline).toString();
    const fromAmount = decimalToRaw(variables.fromAmount, fromToken?.decimals).round(0, 0).toString();
    const toMinAmount = decimalToRaw(toAmountQuote.data.minAmountOut, toToken.decimals).round(0, 0).toString();

    return swapMutation.mutate([fromAmount, toMinAmount, [variables.from, variables.to], address, deadline]);
  });

  const updateStorage = useCallback(
    (newValues: Partial<SwapSettings>) => {
      const prev = getValues();
      const updated = {
        slippage: prev.slippage || defaultValues.slippage,
        deadline: prev.deadline || defaultValues.deadline,
        ...newValues,
      };
      storageSet(storageKeys.SWAP_SETTINGS, updated);
      return updated;
    },
    [getValues],
  );

  const onFromChange = useCallback(
    (a: string | PoolEntry, event = true) => {
      const f = typeof a === 'string' ? a : a.pool.token.id;
      const prev = getValues();
      const updated = {
        from: f,
        to: prev?.to === f ? prev?.from : prev?.to,
      };
      updateStorage(updated);

      if (prev.to === f) {
        const prevToAmount = toAmountQuote.data?.amountOut.approximateStrings.atLeast4Decimals;
        setValue('fromAmount', prevToAmount || '0');
      } else {
        setValue('from', updated.from);
      }

      if (onChange && event) onChange(updated.from, updated.to);
      setTokenModal(undefined);
    },
    [
      getValues,
      onChange,
      setTokenModal,
      setValue,
      toAmountQuote.data?.amountOut.approximateStrings.atLeast4Decimals,
      updateStorage,
    ],
  );

  const onToChange = useCallback(
    (a: string | PoolEntry, event = true) => {
      const t = typeof a === 'string' ? a : a.pool.token.id;
      const prev = getValues();
      const updated = {
        to: t,
        from: prev?.from === t ? prev?.to : prev?.from,
      };
      updateStorage(updated);

      if (prev.from === t) {
        const prevToAmount = toAmountQuote.data?.amountOut.approximateStrings.atLeast4Decimals;
        setValue('fromAmount', prevToAmount || '0');
      }

      if (updated.from && prev?.from !== updated.from) setValue('from', updated.from);
      setValue('to', updated.to);

      if (onChange && event) onChange(updated.from, updated.to);
      setTokenModal(undefined);
    },
    [
      getValues,
      onChange,
      setTokenModal,
      setValue,
      toAmountQuote.data?.amountOut.approximateStrings.atLeast4Decimals,
      updateStorage,
    ],
  );

  // when props change (url updated)
  useEffect(() => {
    if (hadMountedRef.current) {
      if (props.from !== undefined) onFromChange(props.from, false);
      if (props.to !== undefined) onToChange(props.to, false);
    }
    hadMountedRef.current = true;
  }, [props.from, props.to, onFromChange, onToChange]);

  return {
    form,
    swapPools: nabla?.swapPools ?? [],
    swapMutation,
    onSubmit,
    tokensModal,
    onFromChange,
    onToChange,
    updateStorage,
    nablaInstanceIsLoading,
    progressClose: () => {
      swapMutation.reset();
    },
    fromTokenBalance,
    fromAmountString,
    fromAmount,
    toAmountQuote,
    fromToken,
    toToken,
    slippage,
  };
};
