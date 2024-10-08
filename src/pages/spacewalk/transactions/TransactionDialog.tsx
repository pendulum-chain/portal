import { hexToU8a } from '@polkadot/util';
import { DateTime } from 'luxon';
import { useCallback, useEffect, useMemo, useState } from 'preact/compat';
import { JSXInternal } from 'preact/src/jsx';
import { Divider, Link, Collapse } from 'react-daisyui';
import { useGlobalState } from '../../../GlobalStateProvider';
import CancelledDialogIcon from '../../../assets/dialog-status-cancelled';
import PendingDialogIcon from '../../../assets/dialog-status-pending';
import SuccessDialogIcon from '../../../assets/dialog-status-success';
import WarningDialogIcon from '../../../assets/dialog-status-warning';
import { CopyablePublicKey } from '../../../components/PublicKey/CopyablePublicKey';
import TransferCountdown from '../../../components/TransferCountdown';
import {
  addSuffix,
  calculateDeadline,
  convertCurrencyToStellarAsset,
  deriveShortenedRequestId,
} from '../../../helpers/spacewalk';
import { convertRawHexKeyToPublicKey } from '../../../helpers/stellar';
import { toTitle } from '../../../helpers/string';
import { useSecurityPallet } from '../../../hooks/spacewalk/useSecurityPallet';
import { useVaultRegistryPallet } from '../../../hooks/spacewalk/useVaultRegistryPallet';
import { nativeToDecimal } from '../../..//shared/parseNumbers/metric';
import { Dialog } from '../../../components/Dialog';
import { TTransfer, TransferType } from './TransactionsColumns';
import { PENDULUM_SUPPORT_CHAT_URL } from '../../../shared/constants';

interface BaseTransactionDialogProps {
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

function BaseTransactionDialog(props: BaseTransactionDialogProps) {
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

  const body = (
    <>
      <div className="flex flex-col items-center justify-between">
        {statusIcon}
        <div className="mt-5" />
        <h1 className="transfer-dialog-contrast-text mb-1 text-2xl font-semibold">{title}</h1>
        {content}
        <Divider className="mx-5 mb-2 mt-1" />
        <Collapse
          id="details"
          tabIndex={0}
          onClick={toggle}
          className={`transfer-dialog-text collapse-arrow flex w-11/12 flex-col rounded-lg bg-black bg-opacity-3 ${collapseVisibility}`}
        >
          <Collapse.Title className="flex flex-row justify-between">
            <div className="text-sm">Bridge fee</div>
            <div className="text-sm">{nativeToDecimal(transfer.original.fee.toNumber()).toString()}</div>
          </Collapse.Title>
          <Collapse.Content className="space-y-4">
            <div className="flex flex-row justify-between">
              <div className="text-sm">Destination Address (Stellar)</div>
              <CopyablePublicKey
                inline={true}
                className="p0 text-sm"
                variant="short"
                publicKey={destinationStellarAddress}
              />
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-sm">Vault Address ({tenantNameCapitalized})</div>
              <CopyablePublicKey
                inline={true}
                className="p-0 text-sm"
                variant="short"
                publicKey={transfer.original.vault.accountId.toString()}
              />
            </div>
            {vaultStellarPublicKey && (
              <div className="flex flex-row justify-between">
                <div className="text-sm">Vault Address (Stellar)</div>
                <CopyablePublicKey
                  inline={true}
                  className="p-0 text-sm"
                  variant="short"
                  publicKey={vaultStellarPublicKey}
                />
              </div>
            )}
            {showMemo && (
              <div className="flex flex-row justify-between">
                <div className="text-sm">Memo</div>
                <CopyablePublicKey
                  inline={true}
                  className="p-0 text-sm"
                  variant="short"
                  publicKey={expectedStellarMemo}
                />
              </div>
            )}
          </Collapse.Content>
        </Collapse>
      </div>
      {footer}
    </>
  );

  const onCloseMock = () => {
    return undefined;
  };

  return (
    <Dialog
      id={id}
      onClose={onClose || onCloseMock}
      content={body}
      actions={<>{actions && actions(onConfirm)}</>}
      visible={visible}
    />
  );
}

interface TransactionDialogProps {
  transfer: TTransfer;
  visible: boolean;
  onClose?: () => void;
}

export function CompletedTransactionDialog(props: TransactionDialogProps) {
  const { transfer, visible, onClose } = props;
  const { tenantName } = useGlobalState();
  let stellarAsset = convertCurrencyToStellarAsset(transfer.original.asset)?.getCode();
  if (stellarAsset && transfer.type === TransferType.issue) {
    stellarAsset = addSuffix(stellarAsset);
  }
  const content = (
    <>
      <div className="transfer-dialog-text text-sm">{`You have received  ${transfer.amount} ${stellarAsset}`}</div>
      <label className="transfer-dialog-label text my-4 rounded-lg px-4 py-2 font-semibold">
        {transfer.type === TransferType.issue ? `To ${toTitle(tenantName)}` : `To Stellar`}
      </label>
      <div className="mt-4" />
      <div className="flex w-11/12 flex-row justify-between">
        <div className="transfer-dialog-text text-sm">Spacewalk transaction</div>
        <CopyablePublicKey inline={true} className="text-sm" variant="hexa" publicKey={transfer.transactionId} />
      </div>
    </>
  );
  return (
    <BaseTransactionDialog
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

export function CancelledTransactionDialog(props: TransactionDialogProps) {
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
    <BaseTransactionDialog
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

export function ReimbursedTransactionDialog(props: TransactionDialogProps) {
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
    <BaseTransactionDialog
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

export function PendingTransactionDialog(props: TransactionDialogProps) {
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
          className="transfer-dialog-contrast-text text-semibold text-xl"
          title={amountToSend.toString()}
        >{`Send ${amountToSend.toNumber()} ${stellarAsset}`}</div>
        <div className="mt-2" />
        <div className="transfer-dialog-text justify'center text flex">
          <div className="mr-2">With the text memo</div>
          <CopyablePublicKey
            inline={true}
            variant="short"
            publicKey={expectedStellarMemo}
            className="transfer-dialog-text"
          />
        </div>
        <div className="text-md transfer-dialog-text flex justify-center">
          <div className="mr-2">In a single transaction to</div>
          <CopyablePublicKey
            inline={true}
            className="transfer-dialog-text p-0 text-sm"
            variant="short"
            publicKey={destinationStellarAddress}
          />
        </div>
        <div className="transfer-dialog-text text-md mt-2">
          Within <TransferCountdown request={transfer.original} />
        </div>
      </>
      <label className="transfer-dialog-label text my-4 rounded px-4 py-2 font-semibold">
        {transfer.type === TransferType.issue ? `To ${toTitle(tenantName)}` : `To Stellar`}
      </label>
      <div className="mt-4" />
      <div className="px-5 text-sm">
        Note: Estimated time for issuing is in a minute after submitting the Stellar payment to the vault, contact
        <a href={PENDULUM_SUPPORT_CHAT_URL} target="_blank" rel="noreferrer" className="mx-1 text-primary">
          support
        </a>
        if your transaction is still pending after 10 minutes.
      </div>
      <div className="mt-4" />
    </>
  );
  const redeemContent = (
    <>
      <div className="mb-2 text-xl">{`${amountToSend} ${stellarAsset}`}</div>
      <div className="text-md">The vault has to complete the transaction in:</div>
      <TransferCountdown request={transfer.original} />
      <div className="mt-2" />

      <div className="mt-2" />
    </>
  );
  return (
    <BaseTransactionDialog
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

export function FailedTransactionDialog(props: TransactionDialogProps) {
  const { transfer, visible, onClose } = props;
  const { tenantName } = useGlobalState();
  const stellarAsset = convertCurrencyToStellarAsset(transfer.original.asset)?.getCode();
  const amountToSend = nativeToDecimal(transfer.original.amount.add(transfer.original.fee).toNumber()).toNumber();
  const compensation = 0.05;
  const content = (
    <>
      <div className="text-xl">{`${amountToSend} ${stellarAsset}`}</div>
      <label className="transfer-dialog-label text my-4 rounded-lg px-4 py-2 font-semibold">
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
      <div className="text-md pb-1 font-bold">
        To redeem your {stellarAsset}, you must now pick one of the two options:
      </div>
      <div className="text-md pb-1 pl-2">
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
    <BaseTransactionDialog
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

export default BaseTransactionDialog;
