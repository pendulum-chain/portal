import { UseQueryResult } from '@tanstack/react-query';
import { NumberLoader } from '../../Loader';
import { ContractBalance } from '../../../helpers/contracts';

export interface TokenBalancProps {
  query: Pick<UseQueryResult<ContractBalance | undefined, string>, 'error' | 'data' | 'isLoading'>;
  symbol: string | undefined;
  significantDecimals?: 2 | 4;
}

export function TokenBalance({
  query: { data, error, isLoading },
  symbol,
  significantDecimals,
}: TokenBalancProps): JSX.Element | null {
  if (isLoading) {
    return <NumberLoader />;
  }

  if (error || !data) {
    return <span>N/A</span>;
  }

  const approximateString =
    significantDecimals === 4 ? data.approximateStrings.atLeast4Decimals : data.approximateStrings.atLeast2Decimals;
  return (
    <span title={data.preciseString}>
      {approximateString} {symbol ? symbol : null}
    </span>
  );
}
