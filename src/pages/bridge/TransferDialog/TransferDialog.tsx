import { hexToU8a } from '@polkadot/util';
import { useCallback, useEffect, useMemo, useState } from 'preact/compat';
import { JSXInternal } from 'preact/src/jsx';
import { Divider } from 'react-daisyui';

import { useGlobalState } from '../../../GlobalStateProvider';
import { CopyableAddress } from '../../../components/PublicKey';
import { deriveShortenedRequestId } from '../../../helpers/spacewalk';
import { convertRawHexKeyToPublicKey } from '../../../helpers/stellar';
import { toTitle } from '../../../helpers/string';
import { useVaultRegistryPallet } from '../../../hooks/spacewalk/useVaultRegistryPallet';
import { nativeToDecimal } from '../../../shared/parseNumbers/metric';
import { TTransfer } from '../TransactionsColumns';
import { Dialog } from '../../collators/dialogs/Dialog';

export interface BaseTransferDialogProps {
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
