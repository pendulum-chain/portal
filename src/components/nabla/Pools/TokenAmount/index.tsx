import { Abi } from '@polkadot/api-contract';
import { useSharesTargetWorth } from '../../../../hooks/nabla/useSharesTargetWorth';
import { useDebouncedValue } from '../../../../hooks/useDebouncedValue';
import { FixedU128Decimals, nativeToDecimal, prettyNumbers } from '../../../../shared/parseNumbers';
import { Skeleton } from '../../../Skeleton';

export interface TokenAmountProps {
  address: string;
  abi?: Abi;
  amount?: number;
  debounce?: number;
  loader?: boolean;
  symbol?: ReactNode;
  fallback?: string | number;
}

const TokenAmount = ({
  symbol,
  abi,
  fallback,
  address,
  amount = 0,
  loader = true,
  debounce = 800,
}: TokenAmountProps): JSX.Element | null => {
  const debouncedAmount = useDebouncedValue(amount, debounce);
  const arg = debounce ? debouncedAmount : amount;
  const { isLoading, data } = useSharesTargetWorth({
    address,
    abi,
    amount: arg,
  });
  if (isLoading || (!!debounce && amount !== debouncedAmount)) {
    return loader ? <Skeleton className="inline-flex">10000</Skeleton> : null;
  }

  return (
    <span title={data?.toString()}>
      {data ? prettyNumbers(nativeToDecimal(data || '0', FixedU128Decimals).toNumber()) : fallback ?? null}
      {symbol ? symbol : null}
    </span>
  );
};
export default TokenAmount;
