import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { cacheKeys, inactiveOptions } from '../../constants/cache';
import { storageKeys } from '../../constants/localStorage';
import useBoolean from '../../hooks/useBoolean';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { SwapSettings } from '../../models/Swap';
import { get, getTokens } from '../../services/api/swap';

export interface UseSwapComponentProps {
  from?: string;
  to?: string;
}

export const defaults: SwapSettings = {
  slippage: 0.5,
  deadline: 30,
  from: 'ETH',
  to: 'USDC',
};

export const useSwapComponent = (props: UseSwapComponentProps) => {
  const dropdown = useBoolean();
  const storage = useLocalStorage<SwapSettings>({
    key: storageKeys.SWAP_SETTINGS,
    defaultValue: { ...defaults, ...props },
    parse: true,
    debounce: 1000,
  });

  // TODO: fetch swap rates/info
  const swapQuery = useQuery([cacheKeys.swapData], get, {
    ...inactiveOptions[0],
    //refetchInterval: 10000,
    onError: (err) => {
      toast(err || 'Error fetching swap rates', { type: 'error' });
    },
  });
  // TODO: fetch tokens
  const tokensQuery = useQuery([cacheKeys.tokens], getTokens, {
    ...inactiveOptions[0],
    onError: (err) => {
      toast(err || 'Error fetching swap rates', { type: 'error' });
    },
  });
  return { swapQuery, tokensQuery, dropdown, storage };
};
