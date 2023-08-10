import { mockERC20 } from '../contracts/nabla/MockERC20';
import { cacheKeys } from './constants';
import { QueryOptions } from './helpers';
import { nativeToDecimal } from './parseNumbers';
import { useContract } from './useContract';

export type UseTokenAllowance = {
  token?: string;
  spender: string | undefined;
  owner: string | undefined;
};

export const useTokenAllowance = ({ token, owner, spender }: UseTokenAllowance, options?: QueryOptions) => {
  const isEnabled = Boolean(token && owner && spender && options?.enabled);
  return useContract([cacheKeys.tokenAllowance, spender, token, owner], {
    cacheTime: 180000,
    staleTime: 180000,
    retry: 2,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    ...options,
    abi: mockERC20,
    address: token,
    fn:
      ({ contract, api }) =>
      async () => {
        const data = await contract.query.allowance(
          owner,
          {
            gasLimit: api.createType('WeightV2', {
              refTime: '100000000000',
              proofSize: '1000000',
            }),
            storageDepositLimit: null,
          },
          owner,
          spender,
        );
        if (!data?.result?.isOk || data?.output === undefined) throw new Error(data);
        return nativeToDecimal(parseFloat(data.output.toString()) || 0);
      },
    enabled: isEnabled,
  });
};
