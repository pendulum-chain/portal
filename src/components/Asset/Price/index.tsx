import { UseQueryOptions } from '@tanstack/react-query';
import { memo, useEffect, useState } from 'preact/compat';
import { usePriceFetcher } from '../../../hooks/usePriceFetcher';
import { Skeleton } from '../../Skeleton';

export type TokenPriceProps = {
  address: string;
  symbol: string;
  //amount?: number;
  prefix?: ReactNode;
  options?: UseQueryOptions;
  loader?: ReactNode;
  fallback?: ReactNode;
};

const TokenPrice = memo(
  ({ address, symbol, prefix = '', loader, fallback = null }: TokenPriceProps): JSX.Element | null => {
    const { pricesCache } = usePriceFetcher();
    const [price, setPrice] = useState<number | undefined | null>(null);
    useEffect(() => {
      const run = async () => {
        const p = (await pricesCache)[symbol];
        setPrice(p);
      };
      run();
    }, [pricesCache, symbol]);

    const isLoading = price === null;
    if (isLoading) return <>{loader}</> || <Skeleton className="inline-flex">10000</Skeleton>;
    if (!price) return <>{fallback}</>;
    return (
      <span>
        {prefix}${price}
      </span>
    );
  },
);
export default TokenPrice;
