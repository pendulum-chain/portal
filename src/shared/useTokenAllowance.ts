import { activeOptions } from '../constants/cache';
import { erc20WrapperAbi } from '../contracts/nabla/ERC20Wrapper';
import { cacheKeys } from './constants';
import { QueryOptions } from './helpers';
import { useContract } from './useContract';

export type UseTokenAllowance<TAbi extends Record<string, unknown>> = {
  /** contract/token address */
  token?: string;
  /** spender address */
  spender: string | undefined;
  /** owner address */
  owner: string | undefined;
  /** contract abi */
  abi?: TAbi;
};

export const useTokenAllowance = <TAbi extends Record<string, unknown>>(
  { token, owner, spender, abi }: UseTokenAllowance<TAbi>,
  options?: QueryOptions,
) => {
  const isEnabled = Boolean(token && owner && spender && options?.enabled);
  return useContract([cacheKeys.tokenAllowance, spender, token, owner], {
    ...activeOptions['3m'],
    retry: 2,
    ...options,
    abi: abi || erc20WrapperAbi,
    address: token,
    owner,
    method: 'allowance',
    args: [owner, spender],
    enabled: isEnabled,
  });
};
