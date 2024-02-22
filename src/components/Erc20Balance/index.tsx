import { useContractBalance } from '../../shared/useContractBalance';
import { numberLoader } from '../Loader';

export type Erc20BalanceProps = {
  address: string | undefined;
  decimals: number | undefined;
  abi: Dict;
};

const Erc20Balance = ({ address, decimals, abi }: Erc20BalanceProps): JSX.Element | null => {
  const { isLoading, formatted, enabled } = useContractBalance({ contractAddress: address, decimals, abi });

  if (address === undefined || decimals === undefined || !enabled) return numberLoader;

  if (isLoading) return numberLoader;

  return <span title={formatted}>{formatted ?? 0}</span>;
};
export default Erc20Balance;
