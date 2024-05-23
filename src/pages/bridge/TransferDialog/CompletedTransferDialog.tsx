import { useGlobalState } from '../../../GlobalStateProvider';
import SuccessDialogIcon from '../../../assets/dialog-status-success';
import { CopyableAddress } from '../../../components/PublicKey';
import { addSuffix, convertCurrencyToStellarAsset } from '../../../helpers/spacewalk';
import { toTitle } from '../../../helpers/string';
import { TransferType } from '../TransactionsColumns';
import { TransferDialogProps, BaseTransferDialog } from './TransferDialog';

export function CompletedTransferDialog(props: TransferDialogProps) {
  const { transfer, visible, onClose } = props;
  const { tenantName } = useGlobalState();
  let stellarAsset = convertCurrencyToStellarAsset(transfer.original.asset)?.getCode();
  if (stellarAsset && transfer.type === TransferType.issue) {
    stellarAsset = addSuffix(stellarAsset);
  }
  const content = (
    <>
      <div className="text-sm transfer-dialog-text">{`You have received  ${transfer.amount} ${stellarAsset}`}</div>
      <label className="transfer-dialog-label rounded-lg px-4 py-2 my-4 text font-semibold ">
        {transfer.type === TransferType.issue ? `To ${toTitle(tenantName)}` : `To Stellar`}
      </label>
      <div className="mt-4" />
      <div className="flex flex-row justify-between w-11/12">
        <div className="text-sm transfer-dialog-text">Spacewalk transaction</div>
        <CopyableAddress inline={true} className="text-sm" variant="hexa" publicKey={transfer.transactionId} />
      </div>
    </>
  );
  return (
    <BaseTransferDialog
      id="completed-transfer-modal"
      transfer={transfer}
      title="Completed!"
      visible={visible}
      content={content}
      statusIcon={<SuccessDialogIcon />}
      onClose={onClose}
      onConfirm={onClose}
    />
  );
}
