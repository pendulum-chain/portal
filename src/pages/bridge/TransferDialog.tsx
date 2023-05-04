import { Button, Divider, Modal } from 'react-daisyui';
import { h } from 'preact';
import { CloseButton } from '../../components/CloseButton';
import SuccessDialogIcon from '../../assets/dialog-status-success';
import PendingDialogIcon from '../../assets/dialog-status-pending';
import { JSXInternal } from 'preact/src/jsx';
import { CopyableAddress } from '../../components/PublicKey';
import { TransferType, TTransfer } from './TransfersColumns';
import { nativeToDecimal } from '../../helpers/parseNumbers';
import { convertRawHexKeyToPublicKey } from '../../helpers/stellar';
import { useGlobalState } from '../../GlobalStateProvider';
import { useSecurityPallet } from '../../hooks/spacewalk/security';
import { calculateDeadline, currencyToString } from '../../helpers/spacewalk';
import { useEffect, useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import CancelledDialogIcon from '../../assets/dialog-status-cancelled';
import WarningDialogIcon from '../../assets/dialog-status-warning';
import TransferCountdown from '../../components/TransferCountdown';

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
      <div className="text-md">{`You have received  ${transfer.amount} ${stellarAsset}`}</div>
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
        {`You did not send a Stellar transaction in time, or the transferred amount did not meet the requested amount of ${amountToSend} 
          ${stellarAsset}.`}
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
  const tenant = useGlobalState().state.tenantName;

  const stellarAsset = transfer.original.asset.asStellar.asAlphaNum4.code.toHuman()?.toString();
  const collateralAsset = transfer.original.vault.currencies.collateral;

  const content = (
    <>
      <div className="text-md">
        {'Your redeem request failed but you decided to burn ' +
          stellarAsset +
          ' in return for ' +
          currencyToString(collateralAsset, tenant)}
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

export function PendingTransferDialog(props: TransferDialogProps) {
  const { transfer, visible, onClose } = props;
  const stellarAsset = transfer.original.asset.asStellar.asAlphaNum4.code.toHuman()?.toString();
  const vaultStellarAddress = convertRawHexKeyToPublicKey(transfer.original.vault.accountId.toHex());
  const amountToSend = nativeToDecimal(transfer.original.amount.add(transfer.original.fee).toNumber());
  const { getActiveBlockNumber } = useSecurityPallet();
  const [, setDeadline] = useState<DateTime>();
  useEffect(() => {
    getActiveBlockNumber().then((active) => {
      setDeadline(
        calculateDeadline(active as number, transfer.original.opentime.toNumber(), transfer.original.period.toNumber()),
      );
    });
  }, [setDeadline]);
  const issueContent = (
    <>
      <>
        <div
          className="text-xl"
          title={amountToSend.toString()}
        >{`Send ${amountToSend.toNumber()} ${stellarAsset}`}</div>
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
        <div className="text-sm">
          Within <TransferCountdown request={transfer.original} />
        </div>
      </>
      <div className="mt-4" />
      <div className="mt-4" />
      <div className="text-sm">
        Note: If you already made the payment, please wait for a few minutes for it to be confirmed.
      </div>
      <div className="mt-4" />
    </>
  );
  const redeemContent = (
    <>
      <div className="text-xl mb-2">{`${amountToSend} ${stellarAsset}`}</div>
      <div className="text-md">The vault has to complete the transaction in:</div>
      <TransferCountdown request={transfer.original} />
      <div className="mt-2" />

      <div className="mt-2" />
    </>
  );
  return (
    <BaseTransferDialog
      id="pending-transfer-modal"
      transfer={transfer}
      title={'Pending'}
      visible={visible}
      content={transfer.type === TransferType.issue ? issueContent : redeemContent}
      statusIcon={<PendingDialogIcon />}
      onClose={onClose}
      onConfirm={onClose}
    />
  );
}

export function FailedTransferDialog(props: TransferDialogProps) {
  const { transfer, visible, onClose } = props;
  const stellarAsset = transfer.original.asset.asStellar.asAlphaNum4.code.toHuman()?.toString();
  const amountToSend = nativeToDecimal(transfer.original.amount.add(transfer.original.fee).toNumber()).toNumber();
  const compensation = 0.05;
  const content = (
    <>
      <div className="text-xl">{`${amountToSend} ${stellarAsset}`}</div>
      <div className="mt-4" />
    </>
  );
  const footer = (
    <div className="px-5 py-2">
      <div className="text-sm">
        The vault did not send PEN to you on time. Don`t worry - your funds are safe! You`ll get {compensation} PEN
        compensation.
      </div>
      <div className="mt-4" />
      <div className="text-md font-bold pb-1">
        To redeem your {stellarAsset}, you must now pick one of the two options:
      </div>
      <div className="text-md pl-2 pb-1">
        1. Receive compensation of {compensation} {stellarAsset} and retry with another vault.
      </div>
      <div className="text-md pl-2">
        2. Burn {stellarAsset} and get {amountToSend} {stellarAsset} with added {compensation} {stellarAsset} as
        compensation.
      </div>
    </div>
  );
  const actions = () => (
    <>
      <Button className="px-6" variant="outline" color="primary" onClick={() => {}}>
        1. Compensate
      </Button>
      <Button className="px-6" variant="outline" color="primary" onClick={() => {}}>
        2. Remburse
      </Button>
    </>
  );
  return (
    <BaseTransferDialog
      id="completed-transfer-modal"
      transfer={transfer}
      title="Your Back to Stellar Request has Failed"
      visible={visible}
      content={content}
      footer={footer}
      statusIcon={<WarningDialogIcon />}
      onClose={onClose}
      onConfirm={onClose}
      actions={actions}
    />
  );
}

export default BaseTransferDialog;
