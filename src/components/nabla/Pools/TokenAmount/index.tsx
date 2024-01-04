import { Abi } from '@polkadot/api-contract';
import { defaultDecimals } from '../../../../config/apps/nabla';
import { useSharesTargetWorth } from '../../../../hooks/nabla/useSharesTargetWorth';
import { useDebouncedValue } from '../../../../hooks/useDebouncedValue';
import { nativeToDecimal, prettyNumbers } from '../../../../shared/parseNumbers';
import { numberLoader } from '../../../Loader';

export interface TokenAmountProps {
  address: string;
  abi?: Abi | Record<string, unknown>;
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

  if (amount && (isLoading || (!!debounce && amount !== debouncedAmount))) {
    return loader ? numberLoader : null;
  }
  return (
    <span title={data?.toString()}>
      {data ? prettyNumbers(nativeToDecimal(data || '0', defaultDecimals).toNumber()) : fallback ?? null}
      {symbol ? symbol : null}
    </span>
  );
};
export default TokenAmount;
