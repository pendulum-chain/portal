import { VaultRegistryVault } from '@polkadot/types/lookup';
import LabelledSelector from './LabelledSelector';
import { h } from 'preact';
import { JsxElement } from 'typescript';
import { CopyableAddress, PublicKey } from '../PublicKey';
import { convertCurrencyToStellarAsset } from '../../helpers/spacewalk';
import { Button, Dropdown } from 'react-daisyui';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import VaultAvailableLogo from '../../assets/VaultAvailableLogo';
import { nativeStellarToDecimal, nativeToDecimal } from '../../helpers/parseNumbers';

interface VaultSelectorProps {
  vaults: VaultRegistryVault[];
  selectedVault?: VaultRegistryVault;
  onChange: (vault: VaultRegistryVault) => void;
}

function VaultSelector(props: VaultSelectorProps): JSX.Element {
  const { vaults, selectedVault, onChange } = props;

  return (
    <Dropdown vertical="end" className="w-full mt-3">
      <Button
        type="button"
        color="ghost"
        className="flex content-center place-content-between w-full border-gray-500 bg-base-200 rounded-md no-animation"
      >
        <PublicKey publicKey={selectedVault ? selectedVault.id.accountId.toString() : ''} variant="full" />
        <ChevronDownIcon className="w-3 h-3" stroke-width="2" />
      </Button>
      <Dropdown.Menu className="w-full mt-1.5 p-1 border border-gray-500 bg-base-200 rounded-md shadow-none">
        {vaults.map((vault) => (
          <Dropdown.Item
            key={vault.id.accountId.toString()}
            onClick={() => onChange(vault)}
            className="w-full rounded-md"
          >
            <span className="w-full flex place-content-between">
              <span className="flex">
                <CopyableAddress publicKey={vault.id.accountId.toString()} variant="short" inline />
              </span>
              <span className="content-end">
                {nativeToDecimal(vault.issuedTokens.toString()).toFixed(2)}{' '}
                {convertCurrencyToStellarAsset(vault.id.currencies.wrapped)?.getCode()}
              </span>
            </span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default VaultSelector;
