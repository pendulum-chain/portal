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
import { useSecurityPallet } from '../../hooks/spacewalk/security';
import { VoidFn } from '@polkadot/api-base/types';
import { CompletedTransferDialog } from './TransferDialog';

export function Transfers(): JSX.Element {
  const { getIssueRequests } = useIssuePallet();
  const { getRedeemRequests } = useRedeemPallet();
  const { subscribeActiveBlockNumber } = useSecurityPallet();
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
          amount: nativeStellarToDecimal(e.request.amount.toString()).toString(),
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
          amount: nativeStellarToDecimal(e.request.amount.toString()).toString(),
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
    return [updatedColumn, amountColumn, transactionIdColumn, typeColumn, statusColumn];
  }, []);

  return (
    <div className="overflow-x-auto mt-10">
      {data && data[0] && <CompletedTransferDialog transfer={data[0]} />}
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
