import { h } from 'preact';
import Table from '../../components/Table';
import './styles.css';
import {
  TransferStatus,
  updatedColumn,
  amountColumn,
  transactionIdColumn,
  typeColumn,
  statusColumn,
  TTransfer,
  TransferType,
} from './TransfersColumns';
import { useEffect, useMemo, useState } from 'react';
import { useIssuePallet } from '../../hooks/spacewalk/issue';
import { useRedeemPallet } from '../../hooks/spacewalk/redeem';
import { nativeStellarToDecimal } from '../../helpers/parseNumbers';
import { estimateRequestCreationTime } from '../../helpers/spacewalk';
import { DateTime } from 'luxon';

export function Transfers(): JSX.Element {
  const { getIssueRequests } = useIssuePallet();
  const { getRedeemRequests } = useRedeemPallet();
  const [data, setData] = useState<TTransfer[] | undefined>(undefined);

  useEffect(() => {
    const fetchAllEntries = async () => {
      const issueEntries = await getIssueRequests();
      const redeemEntries = await getRedeemRequests();
      let entries: TTransfer[] = [];

      issueEntries.forEach((e) => {
        entries.push({
          updated: estimateRequestCreationTime(e.request.opentime.toNumber()).toLocaleString(DateTime.DATETIME_SHORT),
          amount: nativeStellarToDecimal(e.request.amount.toString()).toString(),
          transactionId: e.id.toString(),
          type: TransferType.issue,
          status: e.request.status.type,
        });
      });

      redeemEntries.forEach((e) => {
        entries.push({
          updated: estimateRequestCreationTime(e.request.opentime.toNumber()).toLocaleString(DateTime.DATETIME_SHORT),
          amount: nativeStellarToDecimal(e.request.amount.toString()).toString(),
          transactionId: e.id.toString(),
          type: TransferType.redeem,
          status: e.request.status.type,
        });
      });

      return entries;
    };
    fetchAllEntries().then((res) => setData(res));
  }, [getIssueRequests, getRedeemRequests]);

  const columns = useMemo(() => {
    return [updatedColumn, amountColumn, transactionIdColumn, typeColumn, statusColumn];
  }, []);

  return (
    <div className="overflow-x-auto mt-10">
      <Table
        className="transfer-list-table bg-base-100 text-md"
        data={data}
        columns={columns}
        isLoading={false}
        search={false}
        pageSize={8}
      />
    </div>
  );
}
