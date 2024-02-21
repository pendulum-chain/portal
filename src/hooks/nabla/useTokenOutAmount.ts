import { MessageCallResult } from '@pendulum-chain/api-solang';
import { activeOptions, cacheKeys } from '../../constants/cache';
import { routerAbi } from '../../contracts/nabla/Router';
import { decimalToRaw } from '../../shared/parseNumbers';
import { useContract } from '../../shared/useContract';
import { useGetAppDataByTenant } from '../useGetAppDataByTenant';

export type UseTokenOutAmountProps = {
  fromDecimalAmount: number;
  from?: string;
  to?: string;
  fromTokenDecimals: number;
  onSuccess?: (val: MessageCallResult) => void;
  onError?: (err: Error | MessageCallResult) => void;
};

export const useTokenOutAmount = ({
  fromDecimalAmount: decimalAmount,
  from,
  to,
  fromTokenDecimals,
  onSuccess,
  onError,
}: UseTokenOutAmountProps) => {
  const { router } = useGetAppDataByTenant('nabla').data || {};

  const enabled = fromTokenDecimals !== undefined && !!decimalAmount && !!from && !!to;
  const amountIn =
    fromTokenDecimals !== undefined ? decimalToRaw(decimalAmount, fromTokenDecimals).toString() : undefined;

  return useContract([cacheKeys.tokenOutAmount, from, to, amountIn], {
    ...activeOptions['30s'],
    abi: routerAbi,
    address: router,
    method: 'getAmountOut',
    args: [amountIn, [from, to]],
    enabled,
    noWalletAddressRequired: true,
    onSuccess,
    onError: (err) => {
      if (onError) onError(err);
      console.error(err);
    },
  });
};
