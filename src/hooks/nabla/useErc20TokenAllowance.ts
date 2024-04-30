import { erc20WrapperAbi } from '../../contracts/nabla/ERC20Wrapper';
import { cacheKeys } from '../../shared/constants';
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

export function useErc20TokenAllowance({ token, owner, spender }: UseTokenAllowance, enabled: boolean) {
  const isEnabled = Boolean(owner && spender && enabled);

  return useContractRead([cacheKeys.tokenAllowance, spender, token, owner], {
    abi: erc20WrapperAbi,
    address: token,
    method: 'allowance',
    args: [owner, spender],
    queryOptions: {
      ...activeOptions['3m'],
      retry: 2,
      enabled: isEnabled,
    },
  });
}
