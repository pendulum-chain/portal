import { useSharesTargetWorth } from '../../../hooks/nabla/useSharesTargetWorth';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import { getMessageCallValue } from '../../../shared/helpers';
import { rawToDecimal, prettyNumbers } from '../../../shared/parseNumbers';
import { numberLoader } from '../../Loader';

export interface TokenAmountProps {
  address: string;
  abi: Dict;
  lpTokenDecimalAmount: number;
  symbol: ReactNode;
  fallback: number;
  poolTokenDecimals: number;
  lpTokenDecimals: number;
  debounce?: number;
  loader?: boolean;
}

export function TokenAmount({
  symbol,
  abi,
  fallback,
  address,
  poolTokenDecimals,
  lpTokenDecimals,
  lpTokenDecimalAmount,
  loader = true,
  debounce = 800,
}: TokenAmountProps): JSX.Element | null {
  const debouncedAmount = useDebouncedValue(lpTokenDecimalAmount, debounce);
  const { isLoading, data } = useSharesTargetWorth({
    address,
    abi,
    lpTokenDecimalAmount: debounce ? debouncedAmount : lpTokenDecimalAmount,
    lpTokenDecimals,
  });

  if (lpTokenDecimalAmount && (isLoading || (!!debounce && lpTokenDecimalAmount !== debouncedAmount))) {
    return loader ? numberLoader : null;
  }

  return (
    <span title={data?.toString()}>
      {data
        ? prettyNumbers(rawToDecimal(getMessageCallValue(data) ?? '0', poolTokenDecimals).toNumber())
        : fallback ?? null}
      {symbol ? symbol : null}
    </span>
  );
}
