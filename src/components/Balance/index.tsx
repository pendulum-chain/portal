import { QueryOptions } from '../../constants/cache';
import { useBalance } from '../../hooks/useBalance';
import { Skeleton } from '../Skeleton';

export type BalanceProps = {
  address: string;
  fallback?: string | number;
  loader?: boolean;
  options?: QueryOptions;
};

const Balance = ({ address, fallback = 0, loader = true, options }: BalanceProps): JSX.Element | null => {
  const { isLoading, balance } = useBalance(address, options);
  if (isLoading) {
    return loader ? <Skeleton className="inline-flex">10000</Skeleton> : null;
  }
  return <span title={balance}>{balance ?? fallback ?? null}</span>;
};
export default Balance;
