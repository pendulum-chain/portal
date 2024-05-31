import { NumberLoader } from '../../Loader';
import { useNablaTokenPrice } from '../../../hooks/nabla/useNablaTokenPrice';

export type TokenPriceProps = {
  address: string;
  prefix?: ReactNode;
  fallback?: ReactNode;
};

export function NablaTokenPrice({ address, prefix = null, fallback = null }: TokenPriceProps): JSX.Element | null {
  const { data, isLoading } = useNablaTokenPrice(address);
  if (isLoading) return <NumberLoader />;

  if (data === undefined) return fallback;

  return (
    <span>
      {prefix}${data.approximateStrings.atLeast2Decimals}
    </span>
  );
}
