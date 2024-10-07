import { NumberLoader } from '../../Loader';
import { useNablaTokenPrice } from '../../../hooks/nabla/useNablaTokenPrice';

export type TokenPriceProps = {
  address: string;
  prefix?: ReactNode;
  fallback?: ReactNode;
  currentTokenAmount?: number;
  formatByAmount?: boolean;
};

export function NablaTokenPrice({
  currentTokenAmount,
  address,
  prefix = null,
  fallback = null,
  formatByAmount = false,
}: TokenPriceProps): JSX.Element | null {
  const { data, isLoading } = useNablaTokenPrice(address);
  if (isLoading) return <NumberLoader />;

  if (data === undefined) return fallback;

  if (formatByAmount) {
    const currentAmountPrice = (Number(data.approximateStrings.atLeast2Decimals) * (currentTokenAmount || 0)).toFixed(
      2,
    );
    return (
      <span>
        {prefix}${currentAmountPrice}
      </span>
    );
  }

  return (
    <span>
      {prefix}${data.approximateStrings.atLeast2Decimals}
    </span>
  );
}
