import { useMemo } from 'react';
import { useGlobalState } from '../../GlobalStateProvider';
import Table, { SortingOrder } from '../../components/Table';
import useBalances from '../../hooks/useBalances';
import { amountColumn, priceColumn, tokenColumn, usdValueColumn } from './PortfolioColumns';
import { prettyNumbers } from '../../shared/parseNumbers/metric';

function Portfolio() {
  const { walletAccount } = useGlobalState();
  const { balances, accountTotalBalance } = useBalances();

  const columns = useMemo(() => {
    return [tokenColumn, priceColumn, amountColumn, usdValueColumn];
  }, []);

  return (
    <div className="rounded-md portfolio card bg-base-100">
      <div className="flex flex-row justify-between p-4">
        <div className="text-xl font-bold">Wallet</div>
        <div className="text-xl" title={accountTotalBalance.toString()}>
          $ {prettyNumbers(accountTotalBalance)}
        </div>
      </div>
      {walletAccount && (
        <Table
          className="text-md bg-base-100"
          data={balances}
          columns={columns}
          isLoading={!balances}
          sortBy={{ usdValue: SortingOrder.DESC }}
          search={false}
          pageSize={8}
          oddRowsClassname="odd-rows bg-table-row border-b-base-300 table-border"
          evenRowsClassname="border-b-base-300 table-border"
          tableFixed
        />
      )}
      {!walletAccount && <div className="p-5"> You need to connect a wallet in order to see your Portfolio. </div>}
    </div>
  );
}

export default Portfolio;
