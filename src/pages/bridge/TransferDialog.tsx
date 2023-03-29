import { Button, Divider, Modal } from 'react-daisyui';
import { h } from 'preact';
import { CloseButton } from '../../components/CloseButton';
import SuccessDialogIcon from '../../assets/dialog-status-success';
import CancelledDialogIcon from '../../assets/dialog-status-cancelled';
import WarningDialogIcon from '../../assets/dialog-status-warning';
import PendingDialogIcon from '../../assets/dialog-status-pending';
import { JSXInternal } from 'preact/src/jsx';
import { CopyableAddress } from '../../components/PublicKey';
import { TTransfer } from './TransfersColumns';
import { format, nativeToFormat } from '../../helpers/parseNumbers';
import { useNodeInfoState } from '../../NodeInfoProvider';
import { convertRawHexKeyToPublicKey } from '../../helpers/stellar';
import { useGlobalState } from '../../GlobalStateProvider';
import { useSecurityPallet } from '../../hooks/spacewalk/security';
import { calculateDeadline } from '../../helpers/spacewalk';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

interface BaseTransferDialogProps {
  visible: boolean;
  transfer: TTransfer;
  title?: string;
  statusIcon: () => JSXInternal.Element;
  content: () => JSXInternal.Element;
  footer?: () => JSXInternal.Element;
  onClose?: () => void;
  onConfirm?: () => void;
}

function BaseTransferDialog(props: BaseTransferDialogProps) {
  const { statusIcon, transfer, visible, title, content, footer, onClose, onConfirm } = props;
  const { tenantName } = useGlobalState().state;
  const { tokenSymbol } = useNodeInfoState().state;
  const chainName = tenantName ? tenantName.slice(0, 1).toUpperCase() + tenantName.slice(1) : '';
  console.log(transfer.original);
  return (
    <Modal open={visible} className="bg-base-200">
      <CloseButton onClick={onClose} />
      <Modal.Body>
        <div className="flex flex-col items-center justify-between">
          {statusIcon()}
          <div className="mt-4" />
          <h1 className="text-xl mb-5">{title}</h1>
          {content()}
          <div id="details" className="rounded flex flex-col p-5 mt-1 w-11/12">
            <div className="flex flex-row justify-between">
              <div className="text-sm">Bridge fee</div>
              <div className="text-sm">{format(transfer.original.fee.toNumber(), tokenSymbol)}</div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-sm">Address</div>
              <CopyableAddress
                inline={true}
                className="text-sm p0"
                variant="short"
                publicKey={convertRawHexKeyToPublicKey(transfer.original.stellarAddress.toString()).publicKey()}
              />
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-sm">{chainName} opentime block</div>
              <div className="text-sm">{transfer.original.opentime.toString()}</div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-sm">Vault Account</div>
              <CopyableAddress
                inline={true}
                className="text-sm p-0"
                variant="short"
                publicKey={transfer.original.vault.accountId.toString()}
              />
            </div>
          </div>
        </div>
        <Divider />
        {footer && footer()}
      </Modal.Body>
      <Modal.Actions className="justify-center">
        <Button className="px-6" color="primary" onClick={onConfirm}>
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

interface TransferDialogProps {
  transfer: TTransfer;
}

export function CompletedTransferDialog(props: TransferDialogProps) {
  const { transfer } = props;
  const { tokenSymbol } = useNodeInfoState().state;
  const completedContent = () => {
    return (
      <>
        <div className="text-md">{'You have received ' + nativeToFormat(transfer.amount, tokenSymbol)}</div>
        <div className="mt-4" />
        <div className="flex flex-row justify-between w-11/12">
          <div className="text-sm">Spacewalk transaction</div>
          <CopyableAddress inline={true} className="text-sm" variant="hexa" publicKey={transfer.transactionId} />
        </div>
      </>
    );
  };
  return (
    <BaseTransferDialog
      transfer={transfer}
      title="Completed!"
      visible={true}
      content={completedContent}
      statusIcon={SuccessDialogIcon}
    />
  );
}

export function ReimbursedTransferDialog(props: TransferDialogProps) {
  const { transfer } = props;
  const { tokenSymbol } = useNodeInfoState().state;
  const reimbursedContent = () => {
    return (
      <>
        <div className="text-md">
          {'Your redeem request failed. You decided to burn ' + tokenSymbol + ' in return for ' + tokenSymbol}
        </div>
        <h1>{nativeToFormat(transfer.amount, tokenSymbol)}</h1>
        <div className="mt-4" />
      </>
    );
  };
  return (
    <BaseTransferDialog
      transfer={transfer}
      title="Reimbursed Successful!"
      visible={true}
      content={reimbursedContent}
      statusIcon={SuccessDialogIcon}
    />
  );
}

export function PendingTransferDialog(props: TransferDialogProps) {
  const { transfer } = props;
  const { tokenSymbol } = useNodeInfoState().state;
  const { getActiveBlockNumber } = useSecurityPallet();
  const [deadline, setDeadline] = useState<string>();

  useEffect(() => {
    getActiveBlockNumber().then((active) => {
      setDeadline(
        calculateDeadline(
          active as number,
          transfer.original.opentime.toNumber(),
          transfer.original.period.toNumber(),
        ).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
      );
    });
  }, [setDeadline]);

  const completedContent = () => {
    return (
      <>
        <div className="text-xl">Send {nativeToFormat(transfer.amount, tokenSymbol)}</div>
        <div className="mt-2" />
        <div className="text-md">In a single transaction to</div>
        <CopyableAddress
          inline={true}
          className="text-sm p-0"
          variant="short"
          publicKey={transfer.original.vault.accountId.toString()}
        />
        <div className="text-md">Withing 24 hours from the request creation (which means before {deadline})</div>
        <div className="mt-4" />
        <div className="text-md">
          {'Warning: Some wallets display values in ' +
            { tokenSymbol } +
            '. Please ensure you send the correct amount: ' +
            nativeToFormat(transfer.amount, tokenSymbol)}
        </div>
        <h1>{nativeToFormat(transfer.amount, tokenSymbol)}</h1>
        <div className="mt-4" />
      </>
    );
  };
  return (
    <BaseTransferDialog
      transfer={transfer}
      title="Pending"
      visible={true}
      content={completedContent}
      statusIcon={PendingDialogIcon}
    />
  );
}

export default BaseTransferDialog;
