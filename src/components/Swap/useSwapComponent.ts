import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'preact/compat';
import { toast } from 'react-toastify';
import { config } from '../../config';
import { cacheKeys, inactiveOptions } from '../../constants/cache';
import { storageKeys } from '../../constants/localStorage';
import { emptyFn } from '../../helpers/general';
import useBoolean from '../../hooks/useBoolean';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { SwapSettings } from '../../models/Swap';
import { useNodeInfoState } from '../../NodeInfoProvider';
import { getSwapTokens } from '../../services/api/tokens';

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

  // TODO: fetch tokens
  // TODO: fetch wallet token balances
  // TODO: fetch swap rates and other info, update everytime token changes, refetch interval

  const swapQuery = useQuery([cacheKeys.swapData], emptyFn, {
    ...inactiveOptions[0],
    //refetchInterval: 10000,
    onError: (err) => {
      toast(err || 'Error fetching swap rates', { type: 'error' });
    },
  });
  const tokensQuery = useQuery(
    api ? [cacheKeys.tokens] : [],
    getSwapTokens(api),
    {
      ...inactiveOptions[0],
      enabled: !!api,
      onError: (err) => {
        toast(err || 'Error fetching swap rates', { type: 'error' });
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
    swapQuery,
    tokensQuery,
    dropdown,
    storage,
    modalState,
    onFromChange,
    onToChange,
  };
};
