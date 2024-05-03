import { Big } from 'big.js';
import { useMemo } from 'preact/compat';

import { cacheKeys } from '../../shared/constants';
import { getMessageCallValue } from '../../shared/helpers';
import { multiplyByPowerOfTen, roundDownToSignificantDecimals } from '../../shared/parseNumbers/metric';
import { useSharedState } from '../../shared/Provider';
import { UseContractResult, useContractRead } from './useContractRead';

export interface UseBalanceResponse {
  balance: ContractBalance | undefined;
  refetch: UseContractResult['refetch'];
  isLoading: UseContractResult['isLoading'];
}

export interface ContractBalance {
  rawBalance: bigint;
  decimals: number;
  preciseBigDecimal: Big;
  preciseString: string;
  approximateStrings: {
    atLeast2Decimals: string;
    atLeast4Decimals: string;
  };
  approximateNumber: number;
}

export const useErc20ContractBalance = (
  abi: Dict,
  erc20ContractDefinition: { contractAddress: string; decimals: number } | undefined,
): UseBalanceResponse => {
  const { api, address } = useSharedState();

  const contractAddress = erc20ContractDefinition?.contractAddress;

  const enabled = !!api && !!address;
  const query = useContractRead([cacheKeys.balance, contractAddress, address], {
    abi,
    address: contractAddress,
    method: 'balanceOf',
    args: [address],
    queryOptions: {
      cacheTime: 10000,
      staleTime: 10000,
      retry: 2,
      refetchInterval: 10000,
      onError: console.error,
      enabled,
    },
  });

  const decimals = erc20ContractDefinition?.decimals;

  const { data } = query;
  const balanceResponse = getMessageCallValue(data);
  const rawBalanceBigInt = balanceResponse?.toBigInt();

  const balance: ContractBalance | undefined = useMemo(() => {
    if (rawBalanceBigInt === undefined || decimals === undefined) return undefined;

    const rawBalanceString = rawBalanceBigInt.toString();
    const preciseBigDecimal = multiplyByPowerOfTen(new Big(rawBalanceString), -decimals);

    const roundedTo2SignificantDecimals = roundDownToSignificantDecimals(preciseBigDecimal, 2);
    const roundedTo4SignificantDecimals = roundDownToSignificantDecimals(preciseBigDecimal, 4);

    return {
      rawBalance: rawBalanceBigInt,
      decimals,
      preciseBigDecimal,
      preciseString: preciseBigDecimal.toFixed(),
      approximateStrings: {
        atLeast2Decimals: roundedTo2SignificantDecimals.toFixed(),
        atLeast4Decimals: roundedTo4SignificantDecimals.toFixed(),
      },
      approximateNumber: preciseBigDecimal.toNumber(),
    };
  }, [rawBalanceBigInt, decimals]);

  return {
    isLoading: query.isLoading,
    refetch: query.refetch,
    balance,
  };
};
