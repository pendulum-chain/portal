import { h } from 'preact';
import Table from '../../components/Table';
import './styles.css';
import {
  assetColumn,
  updatedColumn,
  amountColumn,
  transactionIdColumn,
  typeColumn,
  statusColumn,
  detailsColumnCreator,
  TTransfer,
  TransferType,
} from './TransfersColumns';
import { useEffect, useMemo, useState } from 'react';
import { useIssuePallet } from '../../hooks/spacewalk/issue';
import { useRedeemPallet } from '../../hooks/spacewalk/redeem';
import { nativeToDecimal } from '../../helpers/parseNumbers';
import { estimateRequestCreationTime } from '../../helpers/spacewalk';
import { DateTime } from 'luxon';
import { useSecurityPallet } from '../../hooks/spacewalk/security';
import { VoidFn } from '@polkadot/api-base/types';
import { CompletedTransferDialog, PendingTransferDialog, ReimbursedTransferDialog } from './TransferDialog';

export function Transfers(): JSX.Element {
  const { getIssueRequests } = useIssuePallet();
  const { getRedeemRequests } = useRedeemPallet();
  const { subscribeActiveBlockNumber } = useSecurityPallet();
  const [currentTransfer, setCurrentTransfer] = useState<TTransfer | undefined>();
  const [activeBlockNumber, setActiveBlockNumber] = useState<number>(0);
  const [data, setData] = useState<TTransfer[] | undefined>(undefined);

  useEffect(() => {
    let unsub: VoidFn = () => undefined;
    subscribeActiveBlockNumber((blockNumber) => {
      setActiveBlockNumber(blockNumber);
    }).then((u) => (unsub = u));

    return unsub;
  }, [subscribeActiveBlockNumber]);

  useEffect(() => {
    const fetchAllEntries = async () => {
      const issueEntries = await getIssueRequests();
      const redeemEntries = await getRedeemRequests();
      let entries: TTransfer[] = [];
      issueEntries.forEach((e) => {
        entries.push({
          updated: estimateRequestCreationTime(
            activeBlockNumber as number,
            e.request.opentime.toNumber(),
          ).toLocaleString(DateTime.DATETIME_SHORT),
          amount: nativeToDecimal(e.request.amount.toString()).toString(),
          asset: e.request.asset.asStellar.asAlphaNum4.code.toHuman()?.toString(),
          transactionId: e.id.toString(),
          type: TransferType.issue,
          status: e.request.status.type,
          original: e.request,
        });
      });

      redeemEntries.forEach((e) => {
        entries.push({
          updated: estimateRequestCreationTime(
            activeBlockNumber as number,
            e.request.opentime.toNumber(),
          ).toLocaleString(DateTime.DATETIME_SHORT),
          amount: nativeToDecimal(e.request.amount.toString()).toString(),
          asset: e.request.asset.asStellar.asAlphaNum4.code.toHuman()?.toString(),
          transactionId: e.id.toString(),
          type: TransferType.redeem,
          status: e.request.status.type,
          original: e.request,
        });
      });

      return entries;
    };
    fetchAllEntries().then((res) => setData(res));
  }, [getIssueRequests, getRedeemRequests]);

  const columns = useMemo(() => {
    const detailsColumn = detailsColumnCreator(setCurrentTransfer);
    return [updatedColumn, amountColumn, assetColumn, transactionIdColumn, typeColumn, statusColumn, detailsColumn];
  }, []);

  return (
    <div className="overflow-x-auto mt-10">
      {currentTransfer && (
        <PendingTransferDialog
          transfer={currentTransfer}
          visible={currentTransfer.status === 'Pending'}
          onClose={() => setCurrentTransfer(undefined)}
        />
      )}
      {currentTransfer && (
        <CompletedTransferDialog
          transfer={currentTransfer}
          visible={currentTransfer.status === 'Completed'}
          onClose={() => setCurrentTransfer(undefined)}
        />
      )}
      {currentTransfer && (
        <ReimbursedTransferDialog
          transfer={currentTransfer}
          visible={currentTransfer.status === 'Reimbursed'}
          onClose={() => setCurrentTransfer(undefined)}
        />
      )}
      <Table
        className="transfer-list-table bg-base-100 text-md"
        data={data}
        columns={columns}
        isLoading={false}
        search={false}
        pageSize={8}
        sortBy="updated"
        sortDesc={true}
      />
    </div>
  );
}
