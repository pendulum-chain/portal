import { activeOptions, cacheKeys } from '../constants/cache';
import { routerAbi } from '../contracts/nabla/Router';
import { useGlobalState } from '../GlobalStateProvider';
import { decimalToNative } from '../shared/parseNumbers';
import { useContract } from '../shared/useContract';
import { useGetAppDataByTenant } from './useGetAppDataByTenant';

export type UseTokenOutAmountProps = {
  amount?: number;
  from?: string;
  to?: string;
  decimals?: number;
  onSuccess?: (val: bigint) => void;
  onError?: (err: Error) => void;
  enabled?: boolean;
};

export const useTokenOutAmount = ({
  amount,
  from,
  to,
  decimals,
  onSuccess,
  onError,
  enabled,
}: UseTokenOutAmountProps) => {
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
    enabled: !!amount && !!from && !!to && enabled !== false,
    onSuccess,
    onError: (err) => {
      if (onError) onError(err);
      console.error(err);
    },
  });
};
