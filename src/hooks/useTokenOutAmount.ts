import { activeOptions, cacheKeys } from '../constants/cache';
import { routerAbi } from '../contracts/nabla/Router';
import { useGlobalState } from '../GlobalStateProvider';
import { decimalToNative } from '../shared/parseNumbers/metric';
import { useContract } from '../shared/useContract';
import { useGetAppDataByTenant } from './useGetAppDataByTenant';

export type UseTokenOutAmountProps = {
  amount?: number;
  from?: string;
  to?: string;
  decimals?: number;
  onSuccess?: (val: string) => void;
  onError?: (err: Error) => void;
};

export const useTokenOutAmount = ({ amount, from, to, decimals, onSuccess, onError }: UseTokenOutAmountProps) => {
  const amountIn = decimalToNative(amount || 0, decimals).toString();
  const { address } = useGlobalState().walletAccount || {};
  const { router } = useGetAppDataByTenant('nabla').data || {};
  return useContract([cacheKeys.tokenOutAmount, from, to, amountIn], {
    ...activeOptions['30s'],
    abi: routerAbi,
    address: router,
    owner: address,
    method: 'getAmountOut',
    args: [amountIn, [from, to]],
    enabled: !!amount && !!from && !!to,
    onSuccess,
    onError: (err) => {
      if (onError) onError(err);
      console.error(err);
    },
  });
};
