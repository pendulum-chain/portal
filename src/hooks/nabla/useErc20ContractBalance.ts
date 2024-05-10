import { cacheKeys } from '../../constants/cache';
import { ContractBalance, parseContractBalanceResponse } from '../../helpers/contracts';
import { useSharedState } from '../../shared/Provider';
import { UseContractReadResult, useContractRead } from './useContractRead';

export const useErc20ContractBalance = (
  abi: Dict,
  erc20ContractDefinition: { contractAddress: string; decimals: number } | undefined,
): UseContractReadResult<ContractBalance | undefined> => {
  const { api, address } = useSharedState();

  const contractAddress = erc20ContractDefinition?.contractAddress;
  const decimals = erc20ContractDefinition?.decimals;

  const enabled = !!api && !!address;
  return useContractRead<ContractBalance | undefined>([cacheKeys.balance, contractAddress, address], {
    abi,
    address: contractAddress,
    method: 'balanceOf',
    args: [address],
    queryOptions: {
      cacheTime: 10000,
      staleTime: 10000,
      //refetchInterval: 10000,
      onError: console.error,
      enabled,
    },
    parseSuccessOutput: parseContractBalanceResponse.bind(null, decimals),
    parseError: 'Could not load balance',
  });
};
