import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Button } from 'react-daisyui';
import { BridgeDirection } from '../../pages/spacewalk/bridge';
import { convertCurrencyToStellarAsset } from '../../helpers/spacewalk';
import { ExtendedRegistryVault } from '../../hooks/spacewalk/useVaultRegistryPallet';
import { nativeToDecimal } from '../../shared/parseNumbers/metric';
import { PublicKey } from '../PublicKey';
import { DropdownSelector } from './DropdownSelector';
import { AssetItem } from './AssetSelector/helpers';

interface VaultSelectorProps {
  vaults: ExtendedRegistryVault[];
  selectedVault?: ExtendedRegistryVault;
  bridgeDirection?: BridgeDirection;
  onChange: (vault: ExtendedRegistryVault) => void;
}

function getMaxTokensForVault(vault: ExtendedRegistryVault, type: 'issue' | 'redeem') {
  const maxTokens = type === 'issue' ? vault.issuableTokens : vault.redeemableTokens;
  if (!maxTokens) return '0';

  try {
    return nativeToDecimal(maxTokens).toFixed(2);
  } catch (error) {
    console.error('Error parsing max tokens', error);
    return '0';
  }
}

interface VaultItem extends AssetItem {
  vault: ExtendedRegistryVault;
}

export function VaultSelector(props: VaultSelectorProps): JSX.Element {
  const { vaults, selectedVault, bridgeDirection, onChange } = props;

  const items: VaultItem[] = vaults.map((vault) => {
    const displayContent = (
      <div className="flex w-full items-center justify-between">
        <PublicKey publicKey={vault.id.accountId.toString()} variant="short" />
        {bridgeDirection && (
          <div className="content-end">
            {getMaxTokensForVault(vault, bridgeDirection)}
            {convertCurrencyToStellarAsset(vault.id.currencies.wrapped)?.getCode()}
          </div>
        )}
      </div>
    );

    return {
      id: vault.id.accountId.toString(),
      name: vault.id.accountId.toString(),
      displayName: displayContent,
      vault,
    };
  });

  const selectedItem = selectedVault
    ? {
        id: selectedVault.id.accountId.toString(),
        name: selectedVault.id.accountId.toString(),
        displayName: selectedVault.id.accountId.toString(),
        vault: selectedVault,
      }
    : undefined;

  return (
    <div className="mt-3 w-full">
      <DropdownSelector<AssetItem & { vault: ExtendedRegistryVault }>
        dropdownMenuClassName="w-full"
        items={items}
        value={selectedItem}
        onChange={(item) => onChange(item.vault)}
      >
        <Button
          tabIndex={0}
          type="button"
          color="ghost"
          className="no-animation flex w-full place-content-between content-center rounded-md border-base-200 bg-base-300"
        >
          <PublicKey
            className="hidden sm:block"
            publicKey={selectedVault ? selectedVault.id.accountId.toString() : ''}
            variant="full"
          />
          <PublicKey
            className="block sm:hidden"
            publicKey={selectedVault ? selectedVault.id.accountId.toString() : ''}
            variant="short"
          />
          <ChevronDownIcon className="h-3 w-3" strokeWidth="2" />
        </Button>
      </DropdownSelector>
    </div>
  );
}
