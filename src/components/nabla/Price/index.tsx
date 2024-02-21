import { UseQueryOptions } from '@tanstack/react-query';
import { useTokenPrice } from '../../../hooks/nabla/useTokenPrice';
import { getMessageCallValue } from '../../../shared/helpers';
import { rawToDecimal, prettyNumbers } from '../../../shared/parseNumbers';
import { numberLoader } from '../../Loader';

export type TokenPriceProps = {
  address: string;
  amount?: number;
  prefix?: ReactNode;
  options?: UseQueryOptions;
  loader?: ReactNode;
  fallback?: ReactNode;
};

const TOKEN_PRICE_DECIMALS = 12;

const TokenPrice = ({
  address,
  prefix = null,
  loader,
  fallback = null,
  amount = 1,
  options,
}: TokenPriceProps): JSX.Element | null => {
  const { data, isLoading } = useTokenPrice(address, options);
  if (isLoading) return loader ? <>{loader}</> : numberLoader;

  const price = getMessageCallValue(data);
  if (price === undefined) return <>{fallback}</>;

  return (
    <span>
      {prefix}${prettyNumbers(amount * rawToDecimal(price, TOKEN_PRICE_DECIMALS).toNumber())}
    </span>
  );
};
export default TokenPrice;
