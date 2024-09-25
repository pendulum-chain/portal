import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Button, Dropdown } from 'react-daisyui';
import { BridgeDirection } from '../../pages/spacewalk/bridge';
import { convertCurrencyToStellarAsset } from '../../helpers/spacewalk';
import { ExtendedRegistryVault } from '../../hooks/spacewalk/useVaultRegistryPallet';
import { nativeToDecimal } from '../../shared/parseNumbers/metric';
import { PublicKey } from '../PublicKey';

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

function VaultSelector(props: VaultSelectorProps): JSX.Element {
  const { vaults, selectedVault, bridgeDirection, onChange } = props;

  return (
    <div className="dropdown mt-3 w-full">
      <Button
        type="button"
        color="ghost"
        className="no-animation flex w-full place-content-between content-center rounded-md border-base-200 bg-base-300"
      >
        <PublicKey publicKey={selectedVault ? selectedVault.id.accountId.toString() : ''} variant="full" />
        <ChevronDownIcon className="h-3 w-3" stroke-width="2" />
      </Button>
      <Dropdown.Menu className="dropdown-content mt-1.5 w-full rounded-md border border-base-200 bg-base-300 p-1 shadow-none">
        {vaults.map((vault) => (
          <Dropdown.Item
            key={vault.id.accountId.toString()}
            onClick={() => {
              const elem = document.activeElement;
              if (elem && elem instanceof HTMLElement) {
                elem.blur();
              }
              onChange(vault);
            }}
            className="flex w-full rounded-md"
          >
            <span className="flex w-full place-content-between">
              <span className="flex">
                <PublicKey publicKey={vault.id.accountId.toString()} variant="short" />
              </span>
              {bridgeDirection && (
                <span className="content-end">
                  {getMaxTokensForVault(vault, bridgeDirection)}{' '}
                  {convertCurrencyToStellarAsset(vault.id.currencies.wrapped)?.getCode()}
                </span>
              )}
            </span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </div>
  );
}

export default VaultSelector;
