import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'preact/compat';
import { toast } from 'react-toastify';
import { config } from '../../config';
import { cacheKeys, inactiveOptions } from '../../constants/cache';
import { storageKeys } from '../../constants/localStorage';
import { useGlobalState } from '../../GlobalStateProvider';
import { emptyFn } from '../../helpers/general';
import useBoolean from '../../hooks/useBoolean';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { SwapSettings } from '../../models/Swap';
import { useNodeInfoState } from '../../NodeInfoProvider';
import { isApiConnected } from '../../services/api/helpers';
import { getSwapTokens } from '../../services/api/tokens';
import { getWalletBalances } from '../../services/api/wallet';

export interface UseSwapComponentProps {
  from?: string;
  to?: string;
  onChange?: (from: string, to: string) => void;
}

export const defaults: SwapSettings = {
  slippage: 0.5,
  deadline: 30,
  ...config.swap.defaults,
};

export const useSwapComponent = ({
  from,
  to,
  onChange,
}: UseSwapComponentProps) => {
  const {
    state: { walletAccount },
  } = useGlobalState();
  const {
    state: { api },
  } = useNodeInfoState();

  const modalState = useState<undefined | 'from' | 'to'>();
  const dropdown = useBoolean();
  const storage = useLocalStorage<SwapSettings>({
    key: storageKeys.SWAP_SETTINGS,
    defaultValue: defaults,
    parse: true,
    debounce: 1000,
  });
  const { merge } = storage;
  const isConnected = isApiConnected(api);

  // TODO: fetch tokens
  // TODO: fetch wallet token balances
  // TODO: fetch swap rates and other info, update everytime token changes, refetch interval

  const balancesQuery = useQuery(
    walletAccount?.address && isConnected
      ? [cacheKeys.swapData, walletAccount.address]
      : [],
    walletAccount?.address && isConnected
      ? () => getWalletBalances(api, walletAccount.address)
      : emptyFn,
    {
      ...inactiveOptions[0],
      //refetchInterval: 10000,
      enabled: !!walletAccount?.address && isConnected,
      onError: (err) => {
        toast(err || 'Error fetching wallet balances', { type: 'error' });
      },
    },
  );
  const swapQuery = useQuery(
    [cacheKeys.swapData, storage.state?.from, storage.state?.to],
    emptyFn,
    {
      ...inactiveOptions[0],
      //refetchInterval: 10000,
      enabled: false,
      onError: (err) => {
        toast(err || 'Error fetching swap rates', { type: 'error' });
      },
    },
  );
  const tokensQuery = useQuery(
    isConnected ? [cacheKeys.tokens] : [],
    isConnected ? () => getSwapTokens(api) : emptyFn,
    {
      ...inactiveOptions[0],
      enabled: !!api && api.isConnected,
      onError: (err) => {
        toast(err || 'Error fetching tokens', { type: 'error' });
      },
    },
  );

  const onFromChange = useCallback(
    (f: string) => {
      merge((prev) => {
        const updated = {
          ...defaults,
          ...prev,
          from: f,
          to: (prev?.to === f ? prev?.from : prev?.to) || defaults.to,
        };
        if (onChange) onChange(updated.from, updated.to);
        return updated;
      });
      // TODO: update queries, rates
    },
    [merge, onChange],
  );

  const onToChange = useCallback(
    (t: string) => {
      merge((prev) => {
        const updated = {
          ...defaults,
          ...prev,
          to: t,
          from: (prev?.from === t ? prev?.to : prev?.from) || defaults.from,
        };
        if (onChange) onChange(updated.from, updated.to);
        return updated;
      });
      // TODO: update queries, rates
    },
    [merge, onChange],
  );

  // when props change (url updated)
  useEffect(() => {
    if (from) onFromChange(from);
    if (to) onToChange(to);
  }, [from, to, onFromChange, onToChange]);

  return {
    walletAccount,
    swapQuery,
    tokensQuery,
    balancesQuery,
    dropdown,
    storage,
    modalState,
    onFromChange,
    onToChange,
  };
};
