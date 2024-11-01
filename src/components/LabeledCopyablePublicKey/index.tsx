import { CopyablePublicKey } from '../PublicKey/CopyablePublicKey';

interface AddressDisplayProps {
  label: string;
  publicKey: string;
  tenantName?: string;
  showMemo?: boolean;
  expectedStellarMemo?: string;
}

export const AddressDisplay: React.FC<AddressDisplayProps> = ({ label, publicKey }) => (
  <div className="flex flex-row justify-between">
    <div className="text-sm">{label}</div>
    <CopyablePublicKey inline={true} className="p-0 text-sm" variant="short" publicKey={publicKey} />
  </div>
);
