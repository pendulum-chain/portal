import { useErc20ContractBalance } from '../../../hooks/nabla/useErc20ContractBalance';
import { NumberLoader } from '../../Loader';

export type Erc20BalanceProps = {
  abi: Dict;
  erc20ContractDefinition: { contractAddress: string; decimals: number; symbol?: string } | undefined;
};

export function Erc20Balance({ erc20ContractDefinition, abi }: Erc20BalanceProps): JSX.Element | null {
  const { isLoading, data: balance } = useErc20ContractBalance(abi, erc20ContractDefinition);
  if (balance === undefined || erc20ContractDefinition === undefined || isLoading) return <NumberLoader />;

  const { symbol } = erc20ContractDefinition;
  const {
    preciseString,
    approximateStrings: { atLeast2Decimals },
  } = balance;

  return <span title={preciseString}>{`${atLeast2Decimals}${symbol ? ` ${symbol}` : ''}`}</span>;
}
