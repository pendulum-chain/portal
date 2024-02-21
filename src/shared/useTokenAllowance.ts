import { activeOptions } from '../constants/cache';
import { erc20WrapperAbi } from '../contracts/nabla/ERC20Wrapper';
import { cacheKeys } from './constants';
import { QueryOptions } from './helpers';
import { useContract } from './useContract';

export type UseTokenAllowance = {
  /** contract/token address */
  token: string;
  /** spender address */
  spender: string | undefined;
  /** owner address */
  owner: string | undefined;
};

export const useTokenAllowance = ({ token, owner, spender }: UseTokenAllowance, options?: QueryOptions) => {
  const isEnabled = Boolean(owner && spender && options?.enabled);

  return useContract([cacheKeys.tokenAllowance, spender, token, owner], {
    ...activeOptions['3m'],
    retry: 2,
    ...options,
    abi: erc20WrapperAbi,
    address: token,
    method: 'allowance',
    args: [owner, spender],
    enabled: isEnabled,
  });
};
