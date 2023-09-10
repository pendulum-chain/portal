import { ComponentChildren } from 'preact';
import { QueryOptions } from '../../constants/cache';
import { useContractBalance } from '../../shared/useContractBalance';
import { numberLoader } from '../Loader';

export type BalanceProps = {
  address?: string;
  fallback?: string | number;
  loader?: boolean;
  decimals?: number;
  options?: QueryOptions;
  children?: ComponentChildren;
};

const Balance = ({
  address,
  fallback = 0,
  loader = true,
  decimals,
  options,
  children,
}: BalanceProps): JSX.Element | null => {
  const { isLoading, formatted, enabled } = useContractBalance({ contractAddress: address, decimals }, options);
  if (!address || !enabled) return <>{fallback ?? null}</>;
  if (isLoading) return loader ? numberLoader : null;
  return (
    <span title={formatted}>
      {children}
      {formatted ?? fallback ?? null}
    </span>
  );
};
export default Balance;
