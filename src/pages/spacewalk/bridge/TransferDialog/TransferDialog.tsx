import { hexToU8a } from '@polkadot/util';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Divider } from 'react-daisyui';

import { useGlobalState } from '../../../../GlobalStateProvider';
import { CopyablePublicKey } from '../../../../components/PublicKey/CopyablePublicKey';
import { deriveShortenedRequestId } from '../../../../helpers/spacewalk';
import { convertRawHexKeyToPublicKey } from '../../../../helpers/stellar';
import { toTitle } from '../../../../helpers/string';
import { useVaultRegistryPallet } from '../../../../hooks/spacewalk/useVaultRegistryPallet';
import { nativeToDecimal } from '../../../../shared/parseNumbers/metric';
import { TTransfer } from '../../transactions/TransactionsColumns';
import { Dialog } from '../../../../components/Dialog';

export interface BaseTransferDialogProps {
  id: string;
  visible: boolean;
  showMemo?: boolean;
  transfer: TTransfer;
  title?: string;
  content: JSX.Element;
  footer?: JSX.Element;
  statusIcon: JSX.Element;
  actions?: (onConfirm: (() => void) | undefined) => JSX.Element;
  onClose?: () => void;
  onConfirm?: () => void;
}

export function BaseTransferDialog(props: BaseTransferDialogProps) {
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
        <h1 className="mb-1 text-2xl font-semibold transfer-dialog-contrast-text">{title}</h1>
        {content}
        <Divider className="mx-5 mt-1 mb-2" />
        <div
          id="details"
          tabIndex={0}
          onClick={toggle}
          className={`transfer-dialog-text collapse collapse-arrow flex w-11/12 flex-col rounded-lg bg-black bg-opacity-3 ${collapseVisibility}`}
        >
          <div className="flex flex-row justify-between collapse-title">
            <div className="text-sm">Bridge fee</div>
            <div className="text-sm">{nativeToDecimal(transfer.original.fee.toNumber()).toString()}</div>
          </div>
          <div className="space-y-4 collapse-content">
            <div className="flex flex-row justify-between">
              <div className="text-sm">Destination Address (Stellar)</div>
              <CopyablePublicKey
                inline={true}
                className="text-sm p0"
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
          </div>
        </div>
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

export interface TransferDialogProps {
  transfer: TTransfer;
  visible: boolean;
  onClose?: () => void;
}
