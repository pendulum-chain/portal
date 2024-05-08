import { useSharesTargetWorth } from '../../../hooks/nabla/useSharesTargetWorth';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import { NumberLoader } from '../../Loader';

export interface TokenAmountProps {
  address: string;
  abi: Dict;
  lpTokenDecimalAmount: number;
  symbol: ReactNode;
  fallback: number;
  poolTokenDecimals: number;
  lpTokenDecimals: number;
  debounce?: number;
}

// TODO Torsten: remove this component
export function TokenAmount({
  address,
  abi,
  lpTokenDecimalAmount,
  symbol,
  fallback,
  poolTokenDecimals,
  lpTokenDecimals,
  debounce = 800,
}: TokenAmountProps): JSX.Element | null {
  const debouncedAmount = useDebouncedValue(lpTokenDecimalAmount, debounce);
  const { isLoading, data } = useSharesTargetWorth({
    address,
    abi,
    lpTokenDecimalAmount: debounce ? debouncedAmount : lpTokenDecimalAmount,
    lpTokenDecimals,
    poolTokenDecimals,
  });

  if (lpTokenDecimalAmount && (isLoading || (!!debounce && lpTokenDecimalAmount !== debouncedAmount))) {
    return <NumberLoader />;
  }

  // TODO Torsten: show explicit error if an error is returned
  return (
    <span title={data?.preciseString}>
      {data ? data.approximateStrings.atLeast2Decimals : fallback ?? null}
      {symbol ? symbol : null}
    </span>
  );
}
