import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'preact/compat';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useGlobalState } from '../../GlobalStateProvider';
import { useNodeInfoState } from '../../NodeInfoProvider';
import { config } from '../../config';
import { cacheKeys, inactiveOptions } from '../../constants/cache';
import { storageKeys } from '../../constants/localStorage';
import { emptyFn } from '../../helpers/general';
import useBoolean from '../../hooks/useBoolean';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Asset } from '../../models/Asset';
import { SwapSettings, SwapTransaction } from '../../models/Swap';
import { assetsApi } from '../../services/api/assets';
import { isApiConnected } from '../../services/api/helpers';
import { getWalletBalances } from '../../services/api/wallet';
import schema from './schema';
import { SwapFormValues } from './types';

export interface UseSwapComponentProps {
  from?: string;
  to?: string;
  onChange?: (from: string, to: string) => void;
}

export const defaults = config.swap.defaults;

export const useSwapComponent = ({ from, to, onChange }: UseSwapComponentProps) => {
  const { walletAccount } = useGlobalState();
  const {
    state: { api },
  } = useNodeInfoState();

  const modalState = useState<undefined | 'from' | 'to'>();
  const progress = useState<SwapTransaction>();
  const dropdown = useBoolean();
  const storage = useLocalStorage<SwapSettings>({
    key: storageKeys.SWAP_SETTINGS,
    defaultValue: defaults,
    parse: true,
    debounce: 1000,
  });
  const { merge, state: storageState } = storage;
  const isConnected = isApiConnected(api);

  const form = useForm<SwapFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      fromAmount: 0,
      ...storageState,
      from: storageState?.from,
      to: to || storageState?.to,
    },
  });
  const { setValue, reset } = form;

  // ! TODO: submit transaction
  const submitMutation = useMutation<unknown, unknown, SwapTransaction>(
    async (data) => new Promise((r) => setTimeout(() => r(data), 6500)),
    {
      onMutate: (values) => {
        progress[1](values);
      },
      onError: () => {
        // ! TODO: display error to user
      },
      onSuccess: () => {
        reset();
        // ! TODO: display response and update balances
      },
    },
  );

  const onSubmit = form.handleSubmit((data) => {
    const slippage = data.slippage ?? defaults.slippage;
    const toAmount = data.fromAmount; /** * rate */ // ! TODO: this should be calculated before already for showing in UI
    // ! TODO: create transaction
    const transaction: SwapTransaction = {
      ...data,
      slippage,
      toAmount,
      toMinAmount: toAmount, // ! TODO: calculate from slippage
    };
    submitMutation.mutate(transaction);
  });

  // ! TODO: fetch tokens
  const tokensQuery = useQuery(
    isConnected ? [cacheKeys.tokens] : [],
    isConnected ? () => assetsApi.getSwapTokens() : emptyFn,
    {
      ...inactiveOptions[0],
      enabled: !!api && api.isConnected,
      onError: (err) => {
        toast(err || 'Error fetching tokens', { type: 'error' });
      },
    },
  );

  const balancesEnabled = !!walletAccount?.address && isConnected;
  // ! TODO: fetch wallet token balances
  // ? might make sense to move queries into custom hooks that can be reused
  const balancesQuery = useQuery(
    balancesEnabled ? [cacheKeys.swapData, walletAccount.address] : [],
    balancesEnabled ? () => getWalletBalances(api, walletAccount.address) : emptyFn,
    {
      ...inactiveOptions[0],
      //refetchInterval: 10000,
      enabled: balancesEnabled,
      onError: (err) => {
        toast(err || 'Error fetching wallet balances', { type: 'error' });
      },
    },
  );

  // ! TODO: fetch swap rates and other info, update everytime token changes, refetch interval
  const swapQuery = useQuery([cacheKeys.swapData, storage.state?.from, storage.state?.to], () => undefined, {
    ...inactiveOptions[0],
    refetchInterval: 15000, // 15s
    enabled: false,
    onError: (err) => {
      toast(err || 'Error fetching swap rates', { type: 'error' });
    },
  });

  const onFromChange = useCallback(
    (a: string | Asset) => {
      const f = typeof a === 'string' ? a : a.address;
      merge((prev) => {
        const updated = {
          ...defaults,
          ...prev,
          from: f,
          to: (prev?.to === f ? prev?.from : prev?.to) || defaults.to,
        };
        setValue('from', updated.from);
        setValue('to', updated.to);
        if (onChange) onChange(updated.from, updated.to);
        return updated;
      });
      // ! TODO: update queries, rates
    },
    [merge, onChange, setValue],
  );

  const onToChange = useCallback(
    (a: string | Asset) => {
      const t = typeof a === 'string' ? a : a.address;
      merge((prev) => {
        const updated = {
          ...defaults,
          ...prev,
          to: t,
          from: (prev?.from === t ? prev?.to : prev?.from) || defaults.from,
        };
        setValue('from', updated.from);
        setValue('to', updated.to);
        if (onChange) onChange(updated.from, updated.to);
        return updated;
      });
      // ! TODO: update queries, rates
    },
    [merge, onChange, setValue],
  );

  // when props change (url updated)
  useEffect(() => {
    if (from) onFromChange(from);
    if (to) onToChange(to);
  }, [from, to, onFromChange, onToChange]);

  return {
    form,
    walletAccount,
    swapQuery,
    tokensQuery,
    balancesQuery,
    submitMutation,
    dropdown,
    progress,
    storage,
    modalState,
    onFromChange,
    onToChange,
    onSubmit,
  };
};
