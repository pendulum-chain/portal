import { UseQueryOptions } from '@tanstack/react-query';
import { SpacewalkPrimitivesCurrencyId } from '@polkadot/types/lookup';
import { memo, useEffect, useState } from 'preact/compat';
import { usePriceFetcher } from '../../../hooks/usePriceFetcher';
import { NumberLoader } from '../../Loader';

export type TokenPriceProps = {
  address?: string;
  currency: SpacewalkPrimitivesCurrencyId;
  prefix?: ReactNode;
  options?: UseQueryOptions;
  loader?: ReactNode;
  fallback?: ReactNode;
};

const TokenPrice = memo(({ currency, prefix = null, loader, fallback = null }: TokenPriceProps): JSX.Element | null => {
  const { getTokenPriceForCurrency } = usePriceFetcher();
  const [price, setPrice] = useState<number | undefined | null>(null);

  useEffect(() => {
    const run = async () => {
      const p = await getTokenPriceForCurrency(currency);
      setPrice(p);
    };

    run().catch(console.error);
  }, [getTokenPriceForCurrency, currency]);

  const isLoading = price === null;

  if (isLoading) return <>{loader}</> || NumberLoader;
  if (!price) return <>{fallback}</>;
  return (
    <span>
      {prefix}${price}
    </span>
  );
});

export default TokenPrice;
