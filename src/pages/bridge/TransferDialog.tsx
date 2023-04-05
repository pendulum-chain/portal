import { Button, Divider, Modal } from 'react-daisyui';
import { h } from 'preact';
import { CloseButton } from '../../components/CloseButton';
import SuccessDialogIcon from '../../assets/dialog-status-success';
import PendingDialogIcon from '../../assets/dialog-status-pending';
import { JSXInternal } from 'preact/src/jsx';
import { CopyableAddress } from '../../components/PublicKey';
import { TTransfer } from './TransfersColumns';
import { format, nativeToDecimal, nativeToFormat } from '../../helpers/parseNumbers';
import { useNodeInfoState } from '../../NodeInfoProvider';
import { convertRawHexKeyToPublicKey } from '../../helpers/stellar';
import { useGlobalState } from '../../GlobalStateProvider';
import { useSecurityPallet } from '../../hooks/spacewalk/security';
import { calculateDeadline } from '../../helpers/spacewalk';
import { useEffect, useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import CancelledDialogIcon from '../../assets/dialog-status-cancelled';
import WarningDialogIcon from '../../assets/dialog-status-warning';

interface BaseTransferDialogProps {
  id: string;
  visible: boolean;
  transfer: TTransfer;
  title?: string;
  content: JSXInternal.Element;
  footer?: JSXInternal.Element;
  statusIcon: JSXInternal.Element;
  actions?: (onConfirm: (() => void) | undefined) => JSXInternal.Element;
  onClose?: () => void;
  onConfirm?: () => void;
}

const defaultActions = (onConfirm: (() => void) | undefined) => (
  <Button className="px-6" color="primary" onClick={onConfirm}>
    OK
  </Button>
);

function BaseTransferDialog(props: BaseTransferDialogProps) {
  const { id, statusIcon, transfer, visible, title, content, footer, actions, onClose, onConfirm } = props;
  const { tenantName, tenantRPC } = useGlobalState().state;
  const chainName = tenantName ? tenantName.slice(0, 1).toUpperCase() + tenantName.slice(1) : '';
  const polkadotJSBlockPage = useMemo(() => {
    return `https://polkadot.js.org/apps/?rpc=${tenantRPC}#/explorer/query/${transfer.original.opentime}`;
  }, [tenantRPC, transfer.original.opentime]);
  const vaultStellarAddress = convertRawHexKeyToPublicKey(transfer.original.vault.accountId.toHex()).publicKey();
  return (
    <Modal id={id} open={visible} className="bg-base-200">
      <CloseButton onClick={onClose} />
      <Modal.Body>
        <div className="flex flex-col items-center justify-between">
          {statusIcon}
          <div className="mt-4" />
          <h1 className="text-xl mb-5">{title}</h1>
          {content}
          <div id="details" className="rounded flex flex-col p-5 mt-1 w-11/12">
            <div className="flex flex-row justify-between">
              <div className="text-sm">Bridge fee</div>
              <div className="text-sm">{nativeToDecimal(transfer.original.fee.toNumber()).toString()}</div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-sm">Destination Address</div>
              <CopyableAddress
                inline={true}
                className="text-sm p0"
                variant="short"
                publicKey={convertRawHexKeyToPublicKey(transfer.original.stellarAddress.toString()).publicKey()}
              />
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-sm">{chainName} opentime block</div>
              <a target="_blank" href={polkadotJSBlockPage}>
                <div className="text-sm">{transfer.original.opentime.toString()}</div>
              </a>
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-sm">Vault Address</div>
              <CopyableAddress
                inline={true}
                className="text-sm p-0"
                variant="short"
                publicKey={transfer.original.vault.accountId.toString()}
              />
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-sm">Vault Stellar Address</div>
              <CopyableAddress inline={true} className="text-sm p-0" variant="short" publicKey={vaultStellarAddress} />
            </div>
          </div>
        </div>
        {footer}
      </Modal.Body>
      <Modal.Actions className="justify-center">
        {actions ? actions(onConfirm) : defaultActions(onConfirm)}
      </Modal.Actions>
    </Modal>
  );
}

interface TransferDialogProps {
  transfer: TTransfer;
  visible: boolean;
  onClose?: () => void;
}

export function CompletedTransferDialog(props: TransferDialogProps) {
  const { transfer, visible, onClose } = props;
  const stellarAsset = transfer.original.asset.asStellar.asAlphaNum4.code.toHuman()?.toString();
  const content = (
    <>
      <div className="text-md">{'You have received ' + nativeToFormat(transfer.amount, stellarAsset)}</div>
      <div className="mt-4" />
      <div className="flex flex-row justify-between w-11/12">
        <div className="text-sm">Spacewalk transaction</div>
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

export function CancelledTransferDialog(props: TransferDialogProps) {
  const { transfer, visible, onClose } = props;
  const stellarAsset = transfer.original.asset.asStellar.asAlphaNum4.code.toHuman()?.toString();
  const amountToSend = nativeToDecimal(transfer.original.amount.add(transfer.original.fee).toNumber()).toNumber();
  const content = (
    <>
      <div className="text-sm">
        {`You did not send me a Stellar transaction in time, or the transferred amount did not meet the requested amount of ${format(
          amountToSend,
          stellarAsset,
        )}`}
      </div>
      <div className="mt-4" />
      <div className="text-sm text-accent ">Contact the team for debugging if you think this is an error.</div>
      <Divider />
      <div className="mt-5" />
      <div className="flex flex-row justify-between w-11/12">
        <div className="text-xs">Spacewalk transaction</div>
        <CopyableAddress inline={true} className="text-xs" variant="hexa" publicKey={transfer.transactionId} />
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

export function ReimbursedTransferDialog(props: TransferDialogProps) {
  const { transfer, visible, onClose } = props;
  const { tokenSymbol } = useNodeInfoState().state;
  const content = (
    <>
      <div className="text-md">
        {'Your redeem request failed. You decided to burn ' + tokenSymbol + ' in return for ' + tokenSymbol}
      </div>
      <h1>{nativeToFormat(transfer.amount, tokenSymbol)}</h1>
      <div className="mt-4" />
    </>
  );
  return (
    <BaseTransferDialog
      id="reimbursed-transfer-modal"
      transfer={transfer}
      title="Reimbursed Successful!"
      visible={visible}
      content={content}
      statusIcon={<SuccessDialogIcon />}
      onClose={onClose}
    />
  );
}

export function PendingTransferDialog(props: TransferDialogProps) {
  const { transfer, visible, onClose } = props;
  const { getActiveBlockNumber } = useSecurityPallet();
  const [deadline, setDeadline] = useState<DateTime>();
  useEffect(() => {
    getActiveBlockNumber().then((active) => {
      setDeadline(
        calculateDeadline(active as number, transfer.original.opentime.toNumber(), transfer.original.period.toNumber()),
      );
    });
  }, [setDeadline]);

  const stellarAsset = transfer.original.asset.asStellar.asAlphaNum4.code.toHuman()?.toString();
  const vaultStellarAddress = convertRawHexKeyToPublicKey(transfer.original.vault.accountId.toHex());
  const amountToSend = nativeToDecimal(transfer.original.amount.add(transfer.original.fee).toNumber());
  const timedout = useMemo(() => deadline && deadline < DateTime.now(), [deadline]);
  const content = (
    <>
      {timedout && (
        <>
          <div className="mt-2" />
          <div className="text-sm">{`We didn't register a transfer of ${format(
            amountToSend.toNumber(),
            stellarAsset,
          )} to `}</div>
          <div className="mt-2" />
          <CopyableAddress
            inline={true}
            className="text-sm p-0"
            variant="short"
            publicKey={vaultStellarAddress.publicKey()}
          />
          <div className="mt-2" />
          <div className="text-sm">before {deadline?.toLocaleString(DateTime.DATETIME_SHORT)}</div>
        </>
      )}
      {!timedout && (
        <>
          <div className="text-xl" title={amountToSend.toString()}>{`Send ${format(
            amountToSend.toNumber(),
            stellarAsset,
          )}`}</div>
          <div className="mt-1" />
          <div className="text-md">In a single transaction to</div>
          <div className="mt-2" />
          <CopyableAddress
            inline={true}
            className="text-sm p-0"
            variant="short"
            publicKey={vaultStellarAddress.publicKey()}
          />
          <div className="mt-2" />
          <div className="text-sm">before {deadline?.toLocaleString(DateTime.DATETIME_SHORT)}</div>
        </>
      )}
      <div className="mt-4" />
      <div className="mt-4" />
      <div className="text-sm">
        Note: If you already made the payment, please wait for a few minutes for it to be confirmed.
      </div>
      <div className="mt-4" />
    </>
  );
  return (
    <BaseTransferDialog
      id="pending-transfer-modal"
      transfer={transfer}
      title={timedout ? 'Transaction timed out' : 'Pending'}
      visible={visible}
      content={content}
      statusIcon={timedout ? <WarningDialogIcon /> : <PendingDialogIcon />}
      onClose={onClose}
      onConfirm={onClose}
    />
  );
}

export default BaseTransferDialog;
