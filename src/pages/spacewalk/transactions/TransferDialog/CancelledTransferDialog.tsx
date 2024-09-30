import { useGlobalState } from '../../../../GlobalStateProvider';
import CancelledDialogIcon from '../../../../assets/dialog-status-cancelled';
import { CopyablePublicKey } from '../../../../components/PublicKey/CopyablePublicKey';
import { convertCurrencyToStellarAsset } from '../../../../helpers/spacewalk';
import { toTitle } from '../../../../helpers/string';
import { nativeToDecimal } from '../../../../shared/parseNumbers/metric';
import { TransferType } from '../TransactionsColumns';
import { TransferDialogProps, BaseTransferDialog } from './TransferDialog';

export function CancelledTransferDialog(props: TransferDialogProps) {
  const { transfer, visible, onClose } = props;
  const { tenantName } = useGlobalState();
  const stellarAsset = convertCurrencyToStellarAsset(transfer.original.asset)?.getCode();
  const amountToSend = nativeToDecimal(transfer.original.amount.add(transfer.original.fee).toNumber()).toNumber();
  const content = (
    <>
      <div className="text-md transfer-dialog-text p-5 text-center align-middle">
        {`You did not send a Stellar transaction in time, or the transferred amount did not meet the requested amount of ${amountToSend}
            ${stellarAsset}.`}
      </div>
      <div className="transfer-dialog-colored-text text-md">
        Contact the team for debugging if you think this is an error.
      </div>
      <label className="transfer-dialog-label text my-4 rounded px-4 py-2 font-semibold">
        {transfer.type === TransferType.issue ? `To ${toTitle(tenantName)}` : `To Stellar`}
      </label>
      <div className="flex w-11/12 flex-row justify-between">
        <div className="text-xs">Spacewalk transaction</div>
        <CopyablePublicKey inline={true} className="text-xs" variant="hexa" publicKey={transfer.transactionId} />
      </div>
    </>
  );
  return (
    <BaseTransferDialog
      id="completed-transfer-modal"
      transfer={transfer}
      title="Cancelled"
      visible={visible}
      content={content}
      statusIcon={<CancelledDialogIcon />}
      onClose={onClose}
      onConfirm={onClose}
    />
  );
}
