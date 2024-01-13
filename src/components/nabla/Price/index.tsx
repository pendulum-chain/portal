import { UseQueryOptions } from '@tanstack/react-query';
import { useGlobalState } from '../../../GlobalStateProvider';
import { useTokenPrice } from '../../../hooks/nabla/useTokenPrice';
import { getMessageCallValue } from '../../../shared/helpers';
import { nativeToDecimal, prettyNumbers } from '../../../shared/parseNumbers';
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
  const price = getMessageCallValue(data);
  if (!price) return <>{fallback}</>;
  return (
    <span>
      {prefix}${prettyNumbers(amount * nativeToDecimal(price).toNumber())}
    </span>
  );
};
export default TokenPrice;
