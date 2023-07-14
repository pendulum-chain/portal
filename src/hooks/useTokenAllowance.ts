import { useGlobalState } from '../GlobalStateProvider';
import { useNodeInfoState } from '../NodeInfoProvider';
import { cacheKeys, inactiveOptions } from '../constants/cache';
import { mockERC20 } from '../contracts/MockERC20';
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
  const {
    state: { api },
  } = useNodeInfoState();
  const { tenantName } = useGlobalState();
  const isEnabled = Boolean(token && owner && spender && enabled);
  const response = useContract([cacheKeys.tokenAllowance, tenantName, token, owner], {
    abi: mockERC20,
    address: token,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fn: (contract: any) => async () => {
      const data = await contract.query.allowance(owner, api ? createOptions(api) : {}, owner, spender);
      console.log(data?.result);
      if (!data?.result?.isOk || data.output === undefined) throw new Error(data);
      return nativeToDecimal(parseFloat(data.output.toString()) || 0);
    },
    ...inactiveOptions['3s'],
    enabled: isEnabled,
  });
  return response;
};
