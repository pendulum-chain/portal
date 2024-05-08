import { UseQueryResult } from '@tanstack/react-query';
import { NumberLoader } from '../../Loader';
import { ContractBalance } from '../../../helpers/contracts';

export interface TokenBalancProps {
  query: Pick<UseQueryResult<ContractBalance | undefined, string>, 'error' | 'data' | 'isLoading'>;
  symbol: string | undefined;
}

export function TokenBalance({ query: { data, error, isLoading }, symbol }: TokenBalancProps): JSX.Element | null {
  if (isLoading) {
    return <NumberLoader />;
  }

  if (error || !data) {
    return <span>N/A</span>;
  }

  return (
    <span title={data.preciseString}>
      {data.approximateStrings.atLeast2Decimals} {symbol ? symbol : null}
    </span>
  );
}
