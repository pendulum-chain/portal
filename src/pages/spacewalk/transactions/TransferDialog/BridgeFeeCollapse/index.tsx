import { nativeToDecimal } from '../../../../../shared/parseNumbers/metric';
import { Collapse } from '../../../../../components/Collapse';
import { AddressDisplay } from '../../../../../components/LabeledCopyablePublicKey';
import { TTransfer } from '../../TransactionsColumns';

interface BridgeFeeCollapseProps {
  transfer: TTransfer;
  showMemo?: boolean;
  destinationStellarAddress: string;
  tenantName: string;
  vaultStellarPublicKey?: string;
  expectedStellarMemo: string;
}

export function BridgeFeeCollapse({
  transfer,
  showMemo,
  destinationStellarAddress,
  tenantName,
  vaultStellarPublicKey,
  expectedStellarMemo,
}: BridgeFeeCollapseProps) {
  const title = (
    <>
      <div className="text-sm">Bridge fee</div>
      <div className="text-sm">{nativeToDecimal(transfer.original.fee.toNumber()).toString()}</div>
    </>
  );
  return (
    <Collapse
      id="details"
      className="w-11/12 transfer-dialog-text"
      title={title}
      titleClassName="flex flex-row justify-between"
      contentClassName="space-y-4"
    >
      <>
        <AddressDisplay label="Destination Address (Stellar)" publicKey={destinationStellarAddress} />
        <AddressDisplay
          label={`Vault Address (${tenantName})`}
          publicKey={transfer.original.vault.accountId.toString()}
        />
        {vaultStellarPublicKey && <AddressDisplay label="Vault Address (Stellar)" publicKey={vaultStellarPublicKey} />}
        {showMemo && <AddressDisplay label="Memo" publicKey={expectedStellarMemo!} />}
      </>
    </Collapse>
  );
}
