import { hexToU8a } from '@polkadot/util';
import { useEffect, useMemo, useState } from 'react';
import { Divider } from 'react-daisyui';

import { useGlobalState } from '../../../../GlobalStateProvider';
import { deriveShortenedRequestId } from '../../../../helpers/spacewalk';
import { convertRawHexKeyToPublicKey } from '../../../../helpers/stellar';
import { toTitle } from '../../../../helpers/string';
import { useVaultRegistryPallet } from '../../../../hooks/spacewalk/useVaultRegistryPallet';
import { Dialog } from '../../../../components/Dialog';
import { TTransfer } from '../TransactionsColumns';
import { BridgeFeeCollapse } from './BridgeFeeCollapse';

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
        <BridgeFeeCollapse
          transfer={transfer}
          showMemo={showMemo}
          destinationStellarAddress={destinationStellarAddress}
          tenantName={tenantNameCapitalized}
          vaultStellarPublicKey={vaultStellarPublicKey}
          expectedStellarMemo={expectedStellarMemo}
        />
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
