import { getMessageCallValue } from '../../../shared/helpers';
import { rawToDecimal, prettyNumbers } from '../../../shared/parseNumbers/metric';
import { numberLoader } from '../../Loader';
import { useNablaTokenPrice } from '../../../hooks/nabla/useNablaTokenPrice';

export type TokenPriceProps = {
  address: string;
  prefix?: ReactNode;
  fallback?: ReactNode;
};

const TOKEN_PRICE_DECIMALS = 12;

export function NablaTokenPrice({ address, prefix = null, fallback = null }: TokenPriceProps): JSX.Element | null {
  const { data, isLoading } = useNablaTokenPrice(address);
  if (isLoading) return numberLoader;

  const price = getMessageCallValue(data);
  if (price === undefined) return <>{fallback}</>;

  return (
    <span>
      {prefix}${prettyNumbers(rawToDecimal(price, TOKEN_PRICE_DECIMALS).toNumber())}
    </span>
  );
}
