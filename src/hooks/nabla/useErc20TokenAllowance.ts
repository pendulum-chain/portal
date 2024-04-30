import { erc20WrapperAbi } from '../../contracts/nabla/ERC20Wrapper';
import { cacheKeys } from '../../shared/constants';
import { QueryOptions } from '../../shared/helpers';
import { activeOptions } from '../../constants/cache';
import { useContractRead } from './useContractRead';

export type UseTokenAllowance = {
  /** contract/token address */
  token: string;
  /** spender address */
  spender: string | undefined;
  /** owner address */
  owner: string | undefined;
};

export function useErc20TokenAllowance({ token, owner, spender }: UseTokenAllowance, options?: QueryOptions) {
  const isEnabled = Boolean(owner && spender && options?.enabled);

  return useContractRead([cacheKeys.tokenAllowance, spender, token, owner], {
    ...activeOptions['3m'],
    retry: 2,
    ...options,
    abi: erc20WrapperAbi,
    address: token,
    method: 'allowance',
    args: [owner, spender],
    enabled: isEnabled,
  });
}
