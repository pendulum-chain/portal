import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Button, Dropdown } from 'react-daisyui';
import { convertCurrencyToStellarAsset } from '../../helpers/spacewalk';
import { ExtendedRegistryVault } from '../../hooks/spacewalk/useVaultRegistryPallet';
import { nativeToDecimal } from '../../shared/parseNumbers/metric';
import { PublicKey } from '../PublicKey';

interface VaultSelectorProps {
  vaults: ExtendedRegistryVault[];
  selectedVault?: ExtendedRegistryVault;
  bridgeDirection?: 'issue' | 'redeem';
  onChange: (vault: ExtendedRegistryVault) => void;
}

function getMaxTokensForVault(vault: ExtendedRegistryVault, type: 'issue' | 'redeem') {
  const maxTokens = type === 'issue' ? vault.issuableTokens : vault.redeemableTokens;
  if (!maxTokens) return '0';

  try {
    const balance: { amount: string } = maxTokens.toJSON();

    return nativeToDecimal(balance.amount.toString()).toFixed(2);
  } catch (error) {
    console.error('Error parsing max tokens', error);
    return '0';
  }
}

function VaultSelector(props: VaultSelectorProps): JSX.Element {
  const { vaults, selectedVault, bridgeDirection, onChange } = props;

  return (
    <div className="dropdown w-full mt-3">
      <Button
        type="button"
        color="ghost"
        className="flex content-center place-content-between w-full border-base-200 bg-base-300 rounded-md no-animation"
      >
        <PublicKey publicKey={selectedVault ? selectedVault.id.accountId.toString() : ''} variant="full" />
        <ChevronDownIcon className="w-3 h-3" stroke-width="2" />
      </Button>
      <Dropdown.Menu className="dropdown-content w-full mt-1.5 p-1 border border-base-200 bg-base-300 rounded-md shadow-none">
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
            className="w-full rounded-md flex"
          >
            <span className="w-full flex place-content-between">
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
