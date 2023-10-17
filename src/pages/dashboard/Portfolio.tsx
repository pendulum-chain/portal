import { useMemo } from 'react';
import { useGlobalState } from '../../GlobalStateProvider';
import Table, { SortingOrder } from '../../components/Table';
import useBalances from '../../hooks/useBalances';
import { amountColumn, priceColumn, tokenColumn, usdValueColumn } from './PortfolioColumns';

function Portfolio() {
  const { walletAccount } = useGlobalState();
  const { balances, accountTotalBalance } = useBalances();

  const columns = useMemo(() => {
    return [tokenColumn, priceColumn, amountColumn, usdValueColumn];
  }, []);

  return (
    <div className="card portfolio rounded-md bg-base-200 mr-20">
      <div className="p-4 flex flex-row justify-between">
        <div className="font-bold text-xl">Wallet</div>
        <div className="text-xl" title={accountTotalBalance.toString()}>
          $ {accountTotalBalance.toFixed(2)}
        </div>
      </div>
      {walletAccount && (
        <Table
          className="bg-base-100 text-md"
          data={balances}
          columns={columns}
          isLoading={!balances}
          sortBy={{ amount: SortingOrder.DESC, token: SortingOrder.ASC }}
          search={false}
          pageSize={5}
          oddRowsClassname="bg-table-row"
        />
      )}
      {!walletAccount && <div className="p-5"> You need to connect a wallet in order to see your Portfolio. </div>}
    </div>
  );
}

export default Portfolio;
