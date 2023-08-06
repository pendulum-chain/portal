import { useGlobalState } from '../GlobalStateProvider';
import { cacheKeys, inactiveOptions } from '../constants/cache';
import { mockERC20 } from '../contracts/nabla/MockERC20';
import { nativeToDecimal } from '../helpers/parseNumbers';
import { createOptions } from '../services/api/helpers';
import { useContract } from './useContract';

export type UseTokenAllowance = {
  token?: string;
  spender: string | undefined;
  owner: string | undefined;
  enabled?: boolean;
};

export const useTokenAllowance = ({ token, owner, spender, enabled = true }: UseTokenAllowance) => {
  const { tenantName } = useGlobalState();
  const isEnabled = Boolean(token && owner && spender && enabled);
  return useContract([cacheKeys.tokenAllowance, tenantName, token, owner], {
    abi: mockERC20,
    address: token,
    fn:
      ({ contract, api }) =>
      async () => {
        const data = await contract.query.allowance(owner, createOptions(api), owner, spender);
        if (!data?.result?.isOk || data?.output === undefined) throw new Error(data);
        return nativeToDecimal(parseFloat(data.output.toString()) || 0);
      },
    ...inactiveOptions['3m'],
    enabled: isEnabled,
  });
};
