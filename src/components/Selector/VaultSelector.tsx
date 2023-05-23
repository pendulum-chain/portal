import { ExtendedRegistryVault } from '../../hooks/spacewalk/vaultRegistry';
import LabelledSelector from './LabelledSelector';
import { h } from 'preact';

interface VaultSelectorProps {
  vaults: ExtendedRegistryVault[];
  selectedVault?: ExtendedRegistryVault;
  onChange: (vault: ExtendedRegistryVault) => void;
}

function VaultSelector(props: VaultSelectorProps): JSX.Element {
  const { vaults, selectedVault } = props;

  const items = vaults.map((vault) => {
    return {
      displayName: vault.id.accountId.toString(),
      id: vault.id,
    };
  });

  const selectedVaultItem = selectedVault
    ? {
        displayName: selectedVault.id.accountId.toString(),
        id: selectedVault.id,
      }
    : undefined;

  return (
    <LabelledSelector
      items={items}
      label="Select Vault"
      onChange={(newItem) => {
        const newVault = vaults.find((vault) => {
          return vault.id === newItem.id;
        });
        newVault && props.onChange(newVault);
      }}
      value={selectedVaultItem}
      style={{ marginTop: '8px' }}
      selectStyle={{ width: '100%' }}
    />
  );
}

export default VaultSelector;
