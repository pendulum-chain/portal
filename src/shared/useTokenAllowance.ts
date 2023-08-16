import { mockERC20 } from '../contracts/nabla/MockERC20';
import { cacheKeys } from './constants';
import { QueryOptions } from './helpers';
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
    owner: owner,
    method: 'allowance',
    args: [owner, spender],
    enabled: isEnabled,
  });
};
