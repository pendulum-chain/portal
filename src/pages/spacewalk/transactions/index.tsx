import { VoidFn } from '@polkadot/api-base/types';
import { DateTime } from 'luxon';
import { ComponentType, useEffect, useMemo, useState } from 'preact/compat';

import { useGlobalState } from '../../../GlobalStateProvider';
import Table, { SortingOrder } from '../../../components/Table';
import {
  calculateDeadline,
  convertCurrencyToStellarAsset,
  estimateRequestCreationTime,
} from '../../../helpers/spacewalk';
import { RichIssueRequest, useIssuePallet } from '../../../hooks/spacewalk/useIssuePallet';
import { RichRedeemRequest, useRedeemPallet } from '../../../hooks/spacewalk/useRedeemPallet';
import { useSecurityPallet } from '../../../hooks/spacewalk/useSecurityPallet';
import { nativeToDecimal } from '../../../shared/parseNumbers/metric';

import {
  CancelledTransactionDialog,
  CompletedTransactionDialog,
  FailedTransactionDialog,
  PendingTransactionDialog,
  ReimbursedTransactionDialog,
} from './TransactionDialog';
import {
  TTransfer,
  TransferType,
  amountColumn,
  assetColumn,
  statusColumnCreator,
  transactionIdColumn,
  typeColumnCreator,
  updatedColumn,
} from './TransactionsColumns';
import '../styles.css';
import { useQuery } from '@tanstack/react-query';
import { WalletAccount } from '@talismn/connect-wallets';

const fetchAllEntries = async (
  walletAccount: WalletAccount | undefined,
  activeBlockNumber: number | undefined,
  getIssueRequests: () => Promise<RichIssueRequest[]>,
  getRedeemRequests: () => Promise<RichRedeemRequest[]>,
) => {
  const issueEntries = await getIssueRequests();
  const redeemEntries = await getRedeemRequests();
  const entries: TTransfer[] = [];

  issueEntries.forEach((e) => {
    if (!walletAccount || !e.request.requester.eq(walletAccount?.address)) {
      return;
    }

    const deadline = calculateDeadline(
      activeBlockNumber as number,
      e.request.opentime.toNumber(),
      e.request.period.toNumber(),
    );

    const timedOut = deadline < DateTime.now();
    const pending = e.request.status.type === 'Pending';
    entries.push({
      updated: estimateRequestCreationTime(activeBlockNumber as number, e.request.opentime.toNumber()),
      amount: nativeToDecimal(e.request.amount.toString()).toString(),
      asset: convertCurrencyToStellarAsset(e.request.asset)?.code,
      transactionId: e.id.toString(),
      type: TransferType.issue,
      status: timedOut && pending ? 'Cancelled' : e.request.status.type,
      original: e.request,
    });
  });

  redeemEntries.forEach((e) => {
    if (!walletAccount || !e.request.redeemer.eq(walletAccount?.address)) {
      return;
    }

    const deadline = calculateDeadline(
      activeBlockNumber as number,
      e.request.opentime.toNumber(),
      e.request.period.toNumber(),
    );

    const timedOut = deadline < DateTime.now();
    const pending = e.request.status.type === 'Pending';

    entries.push({
      updated: estimateRequestCreationTime(activeBlockNumber as number, e.request.opentime.toNumber()),
      amount: nativeToDecimal(e.request.amount.toString()).toString(),
      asset: convertCurrencyToStellarAsset(e.request.asset)?.code,
      transactionId: e.id.toString(),
      type: TransferType.redeem,
      status: timedOut && pending ? 'Failed' : e.request.status.type,
      original: e.request,
    });
  });

  return entries;
};

function Transactions(): JSX.Element {
  const { getIssueRequests } = useIssuePallet();
  const { getRedeemRequests } = useRedeemPallet();
  const { subscribeActiveBlockNumber } = useSecurityPallet();
  const { tenantName, walletAccount } = useGlobalState();
  const [currentTransfer, setCurrentTransfer] = useState<TTransfer | undefined>();
  const [activeBlockNumber, setActiveBlockNumber] = useState<number>(0);

  useEffect(() => {
    let unsub: VoidFn = () => undefined;
    subscribeActiveBlockNumber((blockNumber) => {
      setActiveBlockNumber(blockNumber);
    }).then((u) => (unsub = u));

    return unsub;
  }, [subscribeActiveBlockNumber]);

  const { data, isInitialLoading } = useQuery<TTransfer[] | undefined>(
    ['fetchAllEntries', walletAccount, activeBlockNumber],
    () => fetchAllEntries(walletAccount, activeBlockNumber, getIssueRequests, getRedeemRequests),
    {
      onError: console.error,
    },
  );

  const columns = useMemo(() => {
    const statusColumn = statusColumnCreator();
    const typeColumn = typeColumnCreator(tenantName);
    return [updatedColumn, amountColumn, assetColumn, transactionIdColumn, typeColumn, statusColumn];
  }, [tenantName]);

  const getDialog = (DialogComponent: ComponentType<{ transfer: TTransfer; visible: boolean; onClose: () => void }>) =>
    currentTransfer ? (
      <DialogComponent transfer={currentTransfer} visible={true} onClose={() => setCurrentTransfer(undefined)} />
    ) : (
      <></>
    );

  const dialogs: Record<string, JSX.Element> = {
    Pending: getDialog(PendingTransactionDialog),
    Completed: getDialog(CompletedTransactionDialog),
    Reimbursed: getDialog(ReimbursedTransactionDialog),
    Cancelled: getDialog(CancelledTransactionDialog),
    Failed: getDialog(FailedTransactionDialog),
  };

  return (
    <div className="mt-10 overflow-x-auto">
      {currentTransfer && dialogs[currentTransfer.status]}
      <Table
        data={data}
        columns={columns}
        isLoading={isInitialLoading}
        search={false}
        pageSize={8}
        rowCallback={(row) => setCurrentTransfer(row.original)}
        title="Transactions"
        sortBy={{ updated: SortingOrder.DESC }}
        oddRowsClassname="odd-rows bg-table-row border-b-base-300 table-border"
        evenRowsClassname="bg-base-200 border-b-base-300 table-border"
      />
    </div>
  );
}

export default Transactions;
