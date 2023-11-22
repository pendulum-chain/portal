import { Abi } from '@polkadot/api-contract';
import { cacheKeys, inactiveOptions } from '../../constants/cache';
import { swapPoolAbi } from '../../contracts/nabla/SwapPool';
import { QueryOptions } from '../../shared/helpers';
import { useContract } from '../../shared/useContract';

export type UseSharesTargetWorthProps = {
  address: string | undefined;
  amount: number | undefined;
  abi?: Abi | Dict;
};

export const useSharesTargetWorth = (
  { address, amount, abi = swapPoolAbi }: UseSharesTargetWorthProps,
  options?: QueryOptions,
) => {
  return useContract([cacheKeys.sharesTargetWorth], {
    ...inactiveOptions['1m'],
    ...options,
    address,
    abi,
    method: 'sharesTargetWorth',
    args: [amount],
    enabled: Boolean(address && amount && options?.enabled !== false),
  });
};
