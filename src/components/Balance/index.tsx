import { useContractBalance } from '../../shared/useContractBalance';
import { numberLoader } from '../Loader';

export type BalanceProps = {
  address: string | undefined;
  decimals: number | undefined;
  abi: Dict;
};

const Balance = ({ address, decimals, abi }: BalanceProps): JSX.Element | null => {
  const { isLoading, formatted, enabled } = useContractBalance({ contractAddress: address, decimals, abi });

  if (address === undefined || decimals === undefined || !enabled) return <>{0}</>;

  if (isLoading) return numberLoader;

  return <span title={formatted}>{formatted ?? 0}</span>;
};
export default Balance;
