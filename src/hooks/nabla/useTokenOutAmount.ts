import Big from 'big.js';
import { activeOptions, cacheKeys } from '../../constants/cache';
import { routerAbi } from '../../contracts/nabla/Router';
import { ContractBalance, parseContractBalanceResponse } from '../../helpers/contracts';
import { decimalToRaw } from '../../shared/parseNumbers/metric';
import { useGetAppDataByTenant } from '../useGetAppDataByTenant';
import { useContractRead } from './useContractRead';

export type UseTokenOutAmountProps = {
  fromDecimalAmount: Big | undefined;
  from?: string;
  to?: string;
  fromTokenDecimals: number | undefined;
  toTokenDecimals: number | undefined;
};

export function useTokenOutAmount({
  fromDecimalAmount: decimalAmount,
  from,
  to,
  fromTokenDecimals,
  toTokenDecimals,
}: UseTokenOutAmountProps) {
  const { router } = useGetAppDataByTenant('nabla').data || {};

  const enabled = fromTokenDecimals !== undefined && decimalAmount && !!from && !!to;
  const amountIn =
    fromTokenDecimals !== undefined && decimalAmount !== undefined
      ? decimalToRaw(decimalAmount, fromTokenDecimals).round(0, 0).toString()
      : undefined;

  console.log('useTokenOutAmount', enabled, fromTokenDecimals, decimalAmount, from, to);
  return useContractRead<{ amountOut: ContractBalance; swapFee: ContractBalance } | undefined>(
    [cacheKeys.tokenOutAmount, from, to, amountIn],
    {
      abi: routerAbi,
      address: router,
      method: 'getAmountOut',
      args: [amountIn, [from, to]],
      noWalletAddressRequired: true,
      queryOptions: {
        ...activeOptions['30s'],
        enabled,
        onError: (err) => {
          console.error(err);
        },
      },
      parseSuccessOutput: (data) =>
        toTokenDecimals === undefined
          ? undefined
          : {
              amountOut: parseContractBalanceResponse(toTokenDecimals, data[0]),
              swapFee: parseContractBalanceResponse(toTokenDecimals, data[1]),
            },
      parseError: (error) => {
        switch (error.type) {
          case 'error':
            return 'Something went wrong';
          case 'panic':
            return error.errorCode === 0x11 ? 'The input amount is too large' : 'Something went wrong';
          case 'reverted':
            return error.description === 'SwapPool: EXCEEDS_MAX_COVERAGE_RATIO'
              ? 'The input amount is too large'
              : 'Something went wrong';
        }
      },
    },
  );
}
