import { UseQueryOptions } from '@tanstack/react-query';
import { useGlobalState } from '../../../GlobalStateProvider';
import { useTokenPrice } from '../../../hooks/nabla/useTokenPrice';
import { nativeToDecimal, prettyNumbers } from '../../../shared/parseNumbers/metric';
import { numberLoader } from '../../Loader';

export type TokenPriceProps = {
  address: string;
  amount?: number;
  prefix?: ReactNode;
  options?: UseQueryOptions;
  loader?: ReactNode;
  fallback?: ReactNode;
};

const TokenPrice = ({
  address,
  prefix = null,
  loader,
  fallback = null,
  amount = 1,
  options,
}: TokenPriceProps): JSX.Element | null => {
  const { address: owner } = useGlobalState().walletAccount || {};
  const { data, isLoading } = useTokenPrice(address, owner, options);
  if (isLoading) return loader ? <>{loader}</> : numberLoader;
  if (!data) return <>{fallback}</>;
  return (
    <span>
      {prefix}${prettyNumbers(amount * nativeToDecimal(data).toNumber())}
    </span>
  );
};
export default TokenPrice;
