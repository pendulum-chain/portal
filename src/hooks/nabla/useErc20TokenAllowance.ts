import { erc20WrapperAbi } from '../../contracts/nabla/ERC20Wrapper';
import { cacheKeys } from '../../shared/constants';
import { activeOptions } from '../../constants/cache';
import { useContractRead } from './useContractRead';
import { ContractBalance, parseContractBalanceResponse } from '../../helpers/contracts';

export type UseTokenAllowance = {
  /** contract/token address */
  token: string;
  /** spender address */
  spender: string | undefined;
  /** owner address */
  owner: string | undefined;
  decimals: number;
};

export function useErc20TokenAllowance({ token, owner, spender, decimals }: UseTokenAllowance, enabled: boolean) {
  const isEnabled = Boolean(owner && spender && enabled);

  return useContractRead<ContractBalance | undefined>([cacheKeys.tokenAllowance, spender, token, owner], {
    abi: erc20WrapperAbi,
    address: token,
    method: 'allowance',
    args: [owner, spender],
    queryOptions: {
      ...activeOptions['3m'],
      enabled: isEnabled,
    },
    parseSuccessOutput: parseContractBalanceResponse.bind(null, decimals),
    parseError: 'Could not load token allowance',
  });
}
