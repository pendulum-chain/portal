import { hexToU8a } from '@polkadot/util';
import { DateTime } from 'luxon';
import { useCallback, useEffect, useMemo, useState } from 'preact/compat';
import { JSXInternal } from 'preact/src/jsx';
import { Divider, Link, Modal } from 'react-daisyui';
import { useGlobalState } from '../../GlobalStateProvider';
import CancelledDialogIcon from '../../assets/dialog-status-cancelled';
import PendingDialogIcon from '../../assets/dialog-status-pending';
import SuccessDialogIcon from '../../assets/dialog-status-success';
import WarningDialogIcon from '../../assets/dialog-status-warning';
import { CloseButton } from '../../components/CloseButton';
import { CopyableAddress } from '../../components/PublicKey';
import TransferCountdown from '../../components/TransferCountdown';
import { calculateDeadline, convertCurrencyToStellarAsset, deriveShortenedRequestId } from '../../helpers/spacewalk';
import { convertRawHexKeyToPublicKey } from '../../helpers/stellar';
import { toTitle } from '../../helpers/string';
import { useSecurityPallet } from '../../hooks/spacewalk/security';
import { useVaultRegistryPallet } from '../../hooks/spacewalk/vaultRegistry';
import { nativeToDecimal } from '../../shared/parseNumbers';
import { TTransfer, TransferType } from './TransfersColumns';

interface BaseTransferDialogProps {
  id: string;
  visible: boolean;
  showMemo?: boolean;
  transfer: TTransfer;
  title?: string;
  content: JSXInternal.Element;
  footer?: JSXInternal.Element;
  statusIcon: JSXInternal.Element;
  actions?: (onConfirm: (() => void) | undefined) => JSXInternal.Element;
  onClose?: () => void;
  onConfirm?: () => void;
}

function BaseTransferDialog(props: BaseTransferDialogProps) {
  const { id, statusIcon, showMemo, transfer, visible, title, content, footer, actions, onClose, onConfirm } = props;

  const { tenantName } = useGlobalState();
  const tenantNameCapitalized = tenantName ? toTitle(tenantName) : 'Pendulum';

  const [vaultStellarPublicKey, setVaultStellarPublicKey] = useState<string | undefined>(undefined);
  const [collapseVisibility, setCollapseVisibility] = useState('');

  const toggle = useCallback(() => {
    if (collapseVisibility === '') {
      setCollapseVisibility('collapse-open');
    } else {
      setCollapseVisibility('');
      const elem = document.activeElement;
      if (elem && elem instanceof HTMLElement) {
        elem.blur();
      }
    }
  }, [collapseVisibility, setCollapseVisibility]);

  // The `stellarAddress` contained in the request will either be the user's Stellar address or the vault's Stellar address (i.e. equal to `vaultStellarPublicKey`).
  const destinationStellarAddress = convertRawHexKeyToPublicKey(transfer.original.stellarAddress.toHex()).publicKey();
  const { getVaultStellarPublicKey } = useVaultRegistryPallet();

  useEffect(() => {
    getVaultStellarPublicKey(transfer.original.vault.accountId)
      .then((publicKey) => {
        if (publicKey) {
          setVaultStellarPublicKey(publicKey.publicKey());
        }
      })
      .catch((e) => {
        setVaultStellarPublicKey(undefined);
        console.error(e);
      });
  }, [getVaultStellarPublicKey, transfer.original.vault.accountId]);

  const expectedStellarMemo = useMemo(() => {
    return deriveShortenedRequestId(hexToU8a(transfer.transactionId));
  }, [transfer]);

  return (
    <Modal id={id} open={visible} className="transfer-dialog rounded-md px-2">
      <CloseButton onClick={onClose} />
      <Modal.Body>
        <div className="flex flex-col items-center justify-between">
          {statusIcon}
          <div className="mt-5" />
          <h1 className="text-2xl transfer-dialog-contrast-text font-semibold mb-1">{title}</h1>
          {content}
          <Divider className="mx-5 mb-2 mt-1" />
          <div
            id="details"
            tabIndex={0}
            onClick={toggle}
            className={`collapse collapse-arrow rounded-lg bg-black bg-opacity-3 transfer-dialog-text flex flex-col w-11/12 ${collapseVisibility}`}
          >
            <div className="collapse-title flex flex-row justify-between">
              <div className="text-sm">Bridge fee</div>
              <div className="text-sm">{nativeToDecimal(transfer.original.fee.toNumber()).toString()}</div>
            </div>
            <div className="collapse-content space-y-4">
              <div className="flex flex-row justify-between">
                <div className="text-sm">Destination Address (Stellar)</div>
                <CopyableAddress
                  inline={true}
                  className="text-sm p0"
                  variant="short"
                  publicKey={destinationStellarAddress}
                />
              </div>
              <div className="flex flex-row justify-between">
                <div className="text-sm">Vault Address ({tenantNameCapitalized})</div>
                <CopyableAddress
                  inline={true}
                  className="text-sm p-0"
                  variant="short"
                  publicKey={transfer.original.vault.accountId.toString()}
                />
              </div>
              {vaultStellarPublicKey && (
                <div className="flex flex-row justify-between">
                  <div className="text-sm">Vault Address (Stellar)</div>
                  <CopyableAddress
                    inline={true}
                    className="text-sm p-0"
                    variant="short"
                    publicKey={vaultStellarPublicKey}
                  />
                </div>
              )}
              {showMemo && (
                <div className="flex flex-row justify-between">
                  <div className="text-sm">Memo</div>
                  <CopyableAddress
                    inline={true}
                    className="text-sm p-0"
                    variant="short"
                    publicKey={expectedStellarMemo}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {footer}
      </Modal.Body>
      <Modal.Actions className="justify-center">{actions && actions(onConfirm)}</Modal.Actions>
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
  const { tenantName } = useGlobalState();
  const stellarAsset = convertCurrencyToStellarAsset(transfer.original.asset)?.getCode();
  const content = (
    <>
      <div className="text-sm transfer-dialog-text">{`You have received  ${transfer.amount} ${stellarAsset}`}</div>
      <label className="transfer-dialog-label rounded-lg px-4 py-2 my-4 text font-semibold ">
        {transfer.type === TransferType.issue ? `To ${toTitle(tenantName)}` : `Back to Stellar`}
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

export function CancelledTransferDialog(props: TransferDialogProps) {
  const { transfer, visible, onClose } = props;
  const { tenantName } = useGlobalState();
  const stellarAsset = convertCurrencyToStellarAsset(transfer.original.asset)?.getCode();
  const amountToSend = nativeToDecimal(transfer.original.amount.add(transfer.original.fee).toNumber()).toNumber();
  const content = (
    <>
      <div className="text-md p-5 transfer-dialog-text align-middle text-center">
        {`You did not send a Stellar transaction in time, or the transferred amount did not meet the requested amount of ${amountToSend} 
          ${stellarAsset}.`}
      </div>
      <div className="transfer-dialog-colored-text text-md ">
        Contact the team for debugging if you think this is an error.
      </div>
      <label className="transfer-dialog-label rounded px-4 py-2 my-4 text font-semibold ">
        {transfer.type === TransferType.issue ? `To ${toTitle(tenantName)}` : `Back to Stellar`}
      </label>
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

export function PendingTransferDialog(props: TransferDialogProps) {
  const { transfer, visible, onClose } = props;
  const stellarAsset = convertCurrencyToStellarAsset(transfer.original.asset)?.getCode();
  const destinationStellarAddress = convertRawHexKeyToPublicKey(transfer.original.stellarAddress.toHex()).publicKey();
  const amountToSend = nativeToDecimal(transfer.original.amount.add(transfer.original.fee).toNumber());
  const { tenantName } = useGlobalState();
  const { getActiveBlockNumber } = useSecurityPallet();
  const [, setDeadline] = useState<DateTime>();

  useEffect(() => {
    getActiveBlockNumber().then((active) => {
      setDeadline(
        calculateDeadline(active as number, transfer.original.opentime.toNumber(), transfer.original.period.toNumber()),
      );
    });
  }, [getActiveBlockNumber, setDeadline, transfer.original.opentime, transfer.original.period]);

  const expectedStellarMemo = useMemo(() => {
    // For issue requests we use a shorter identifier for the memo
    return deriveShortenedRequestId(hexToU8a(transfer.transactionId));
  }, [transfer]);

  const issueContent = (
    <>
      <>
        <div
          className="text-xl transfer-dialog-contrast-text text-semibold"
          title={amountToSend.toString()}
        >{`Send ${amountToSend.toNumber()} ${stellarAsset}`}</div>
        <div className="mt-2" />
        <div className="transfer-dialog-text flex justify'center text ">
          <div className="mr-2">With the text memo</div>
          <CopyableAddress
            inline={true}
            variant="short"
            publicKey={expectedStellarMemo}
            className="transfer-dialog-text"
          />
        </div>
        <div className="flex justify-center text-md transfer-dialog-text">
          <div className="mr-2">In a single transaction to</div>
          <CopyableAddress
            inline={true}
            className="text-sm p-0 transfer-dialog-text"
            variant="short"
            publicKey={destinationStellarAddress}
          />
        </div>
        <div className="transfer-dialog-text text-md mt-2">
          Within <TransferCountdown request={transfer.original} />
        </div>
      </>
      <label className="transfer-dialog-label rounded px-4 py-2 my-4 text font-semibold ">
        {transfer.type === TransferType.issue ? `To ${toTitle(tenantName)}` : `Back to Stellar`}
      </label>
      <div className="mt-4" />
      <div className="text-sm px-5 transfer-dialog-text">
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
      showMemo={transfer.type === TransferType.issue}
      content={transfer.type === TransferType.issue ? issueContent : redeemContent}
      statusIcon={<PendingDialogIcon />}
      onClose={onClose}
      onConfirm={onClose}
    />
  );
}

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
        {transfer.type === TransferType.issue ? `To ${toTitle(tenantName)}` : `Back to Stellar`}
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
      title="Your Back to Stellar Request has Failed"
      visible={visible}
      content={content}
      footer={footer}
      statusIcon={<WarningDialogIcon />}
      onClose={onClose}
      onConfirm={onClose}
    />
  );
}

export default BaseTransferDialog;
