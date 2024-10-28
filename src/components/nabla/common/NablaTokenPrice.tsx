import Big from 'big.js';
import { useNablaTokenPrice } from '../../../hooks/nabla/useNablaTokenPrice';
import { NumberLoader } from '../../Loader';

export type TokenPriceProps = {
  address: string;
  prefix?: React.ReactNode;
  fallback?: React.ReactNode;
  currentTokenAmount?: Big;
  formatByAmount?: boolean;
};

export function NablaTokenPrice({
  address,
  prefix = null,
  fallback = null,
  formatByAmount = false,
  currentTokenAmount = Big(0),
}: TokenPriceProps) {
  const { data, isLoading } = useNablaTokenPrice(address);
  if (isLoading) return <NumberLoader />;

  if (data === undefined) return fallback;

  if (formatByAmount) {
    const currentAmountPrice = Big(data.approximateStrings.atLeast2Decimals).mul(currentTokenAmount).toFixed(2, 0);

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
