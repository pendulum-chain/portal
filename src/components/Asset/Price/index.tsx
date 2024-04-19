import { UseQueryOptions } from '@tanstack/react-query';
import { memo, useEffect, useState } from 'preact/compat';
import { usePriceFetcher } from '../../../hooks/usePriceFetcher';
import { numberLoader } from '../../Loader';

export type TokenPriceProps = {
  address?: string;
  symbol: string;
  //amount?: number;
  prefix?: ReactNode;
  options?: UseQueryOptions;
  loader?: ReactNode;
  fallback?: ReactNode;
};

const TokenPrice = memo(({ symbol, prefix = null, loader, fallback = null }: TokenPriceProps): JSX.Element | null => {
  const { getTokenPrice } = usePriceFetcher();
  const [price, setPrice] = useState<number | undefined | null>(null);
  useEffect(() => {
    const run = async () => {
      const p = await getTokenPrice(symbol);
      setPrice(p);
    };
    run();
  }, [getTokenPrice, symbol]);

  const isLoading = price === null;
  if (isLoading) return <>{loader}</> || numberLoader;
  if (!price) return <>{fallback}</>;
  return (
    <span>
      {prefix}${price}
    </span>
  );
});
export default TokenPrice;
