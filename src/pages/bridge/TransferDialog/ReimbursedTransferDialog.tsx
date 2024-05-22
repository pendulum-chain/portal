import SuccessDialogIcon from '../../../assets/dialog-status-success';
import { convertCurrencyToStellarAsset } from '../../../helpers/spacewalk';
import { TransferDialogProps, BaseTransferDialog } from './TransferDialog';

export function ReimbursedTransferDialog(props: TransferDialogProps) {
  const { transfer, visible, onClose } = props;

  const stellarAsset = convertCurrencyToStellarAsset(transfer.original.asset)?.getCode();
  const collateralAsset = transfer.original.vault.currencies.collateral;

  const content = (
    <>
      <div className="text-md">
        {'Your redeem request failed but you decided to burn ' +
          stellarAsset +
          ' in return for ' +
          convertCurrencyToStellarAsset(collateralAsset)?.getCode()}
      </div>
      <h1 className="text-xl">
        {transfer.amount} {stellarAsset}
      </h1>
      <div className="mt-4" />
    </>
  );
  return (
    <BaseTransferDialog
      id="reimbursed-transfer-modal"
      transfer={transfer}
      title="Reimburse Successful!"
      visible={visible}
      content={content}
      statusIcon={<SuccessDialogIcon />}
      onClose={onClose}
      onConfirm={onClose}
    />
  );
}
