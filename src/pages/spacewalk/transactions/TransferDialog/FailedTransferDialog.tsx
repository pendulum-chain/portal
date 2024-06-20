import { Link } from 'react-daisyui';

import { useGlobalState } from '../../../../GlobalStateProvider';
import WarningDialogIcon from '../../../../assets/dialog-status-warning';
import { convertCurrencyToStellarAsset } from '../../../../helpers/spacewalk';
import { toTitle } from '../../../../helpers/string';
import { nativeToDecimal } from '../../../../shared/parseNumbers/metric';
import { TransferType } from '../TransactionsColumns';
import { TransferDialogProps, BaseTransferDialog } from './TransferDialog';

export function FailedTransferDialog(props: TransferDialogProps) {
  const { transfer, visible, onClose } = props;
  const { tenantName } = useGlobalState();
  const stellarAsset = convertCurrencyToStellarAsset(transfer.original.asset)?.getCode();
  const amountToSend = nativeToDecimal(transfer.original.amount.add(transfer.original.fee).toNumber()).toNumber();
  const compensation = 0.05;
  const content = (
    <>
      <div className="text-xl">{`${amountToSend} ${stellarAsset}`}</div>
      <label className="transfer-dialog-label rounded-lg px-4 py-2 my-4 text font-semibold ">
        {transfer.type === TransferType.issue ? `To ${toTitle(tenantName)}` : `To Stellar`}
      </label>
    </>
  );
  const footer = (
    <div className="px-6 py-2">
      <div className="text-sm">
        The vault did not send PEN to you on time. Don`t worry - your funds are safe! You`ll get {compensation} PEN
        compensation.
      </div>
      <div className="mt-4" />
      <div className="text-md font-bold pb-1">
        To redeem your {stellarAsset}, you must now pick one of the two options:
      </div>
      <div className="text-md pl-2 pb-1">
        1. Receive compensation of {compensation} {stellarAsset} and retry with another vault.{' '}
        <Link className="font-semibold underline">Compensate</Link>
      </div>
      <div className="text-md pl-2">
        2. Burn {stellarAsset} and get {amountToSend} {stellarAsset} with added {compensation} {stellarAsset} as
        compensation. <Link className="font-semibold underline">Reimburse</Link>
      </div>
    </div>
  );
  return (
    <BaseTransferDialog
      id="completed-transfer-modal"
      transfer={transfer}
      title="Your bridge request to Stellar has Failed"
      visible={visible}
      content={content}
      footer={footer}
      statusIcon={<WarningDialogIcon />}
      onClose={onClose}
      onConfirm={onClose}
    />
  );
}
