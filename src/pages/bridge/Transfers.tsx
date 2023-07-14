import { VoidFn } from '@polkadot/api-base/types';
import { SpacewalkPrimitivesIssueIssueRequest, SpacewalkPrimitivesRedeemRedeemRequest } from '@polkadot/types/lookup';
import { DateTime } from 'luxon';
import { useEffect, useMemo, useState } from 'preact/compat';
import { useGlobalState } from '../../GlobalStateProvider';
import Table from '../../components/Table';
import { nativeToDecimal } from '../../helpers/parseNumbers';
import { calculateDeadline, convertCurrencyToStellarAsset, estimateRequestCreationTime } from '../../helpers/spacewalk';
import { useIssuePallet } from '../../hooks/spacewalk/issue';
import { useRedeemPallet } from '../../hooks/spacewalk/redeem';
import { useSecurityPallet } from '../../hooks/spacewalk/security';
import {
  CancelledTransferDialog,
  CompletedTransferDialog,
  FailedTransferDialog,
  PendingTransferDialog,
  ReimbursedTransferDialog,
} from './TransferDialog';
import {
  TTransfer,
  TransferType,
  amountColumn,
  assetColumn,
  detailsColumnCreator,
  statusColumn,
  transactionIdColumn,
  typeColumnCreator,
  updatedColumn,
} from './TransfersColumns';
import './styles.css';

function Transfers(): JSX.Element {
  const { getIssueRequests } = useIssuePallet();
  const { getRedeemRequests } = useRedeemPallet();
  const { subscribeActiveBlockNumber } = useSecurityPallet();
  const { tenantName } = useGlobalState();
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
      const entries: TTransfer[] = [];

      const hasExpired = (r: SpacewalkPrimitivesIssueIssueRequest | SpacewalkPrimitivesRedeemRedeemRequest) => {
        const deadline = calculateDeadline(activeBlockNumber as number, r.opentime.toNumber(), r.period.toNumber());
        return deadline < DateTime.now() && r.status.type === 'Pending';
      };

      issueEntries.forEach((e) => {
        entries.push({
          updated: estimateRequestCreationTime(activeBlockNumber as number, e.request.opentime.toNumber()),
          amount: nativeToDecimal(e.request.amount.toString()).toString(),
          asset: convertCurrencyToStellarAsset(e.request.asset)?.code,
          transactionId: e.id.toString(),
          type: TransferType.issue,
          status: hasExpired(e.request) ? 'Cancelled' : e.request.status.type,
          original: e.request,
        });
      });

      redeemEntries.forEach((e) => {
        entries.push({
          updated: estimateRequestCreationTime(activeBlockNumber as number, e.request.opentime.toNumber()),
          amount: nativeToDecimal(e.request.amount.toString()).toString(),
          asset: convertCurrencyToStellarAsset(e.request.asset)?.code,
          transactionId: e.id.toString(),
          type: TransferType.redeem,
          status: hasExpired(e.request) ? 'Cancelled' : e.request.status.type,
          original: e.request,
        });
      });

      return entries;
    };
    fetchAllEntries().then((res) => setData(res));
  }, [activeBlockNumber, getIssueRequests, getRedeemRequests]);

  const columns = useMemo(() => {
    const detailsColumn = detailsColumnCreator(setCurrentTransfer);
    const typeColumn = typeColumnCreator(tenantName);
    return [updatedColumn, amountColumn, assetColumn, transactionIdColumn, typeColumn, statusColumn, detailsColumn];
  }, [tenantName, setCurrentTransfer]);

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
      {currentTransfer && (
        <CancelledTransferDialog
          transfer={currentTransfer}
          visible={currentTransfer.status === 'Cancelled'}
          onClose={() => setCurrentTransfer(undefined)}
        />
      )}
      {currentTransfer && (
        <FailedTransferDialog
          transfer={currentTransfer}
          visible={currentTransfer.status === 'Failed'}
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
export default Transfers;
