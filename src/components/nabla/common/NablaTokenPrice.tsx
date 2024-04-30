import { UseQueryOptions } from '@tanstack/react-query';
import { getMessageCallValue } from '../../../shared/helpers';
import { rawToDecimal, prettyNumbers } from '../../../shared/parseNumbers';
import { numberLoader } from '../../Loader';
import { useNablaTokenPrice } from '../../../hooks/nabla/useNablaTokenPrice';

export type TokenPriceProps = {
  address: string;
  amount?: number;
  prefix?: ReactNode;
  options?: UseQueryOptions;
  loader?: ReactNode;
  fallback?: ReactNode;
};

const TOKEN_PRICE_DECIMALS = 12;

export function NablaTokenPrice({
  address,
  prefix = null,
  loader,
  fallback = null,
  amount = 1,
  options,
}: TokenPriceProps): JSX.Element | null {
  const { data, isLoading } = useNablaTokenPrice(address, options);
  if (isLoading) return loader ? <>{loader}</> : numberLoader;

  const price = getMessageCallValue(data);
  if (price === undefined) return <>{fallback}</>;

  return (
    <span>
      {prefix}${prettyNumbers(amount * rawToDecimal(price, TOKEN_PRICE_DECIMALS).toNumber())}
    </span>
  );
}
