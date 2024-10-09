import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { CSSProperties, useEffect, useState } from 'react';
import { Button } from 'react-daisyui';

import DropdownSelector from '../DropdownSelector';
import {
  BlockchainAsset,
  AssetSelectorOnChange,
  isStellarAsset,
  generateAssetSelectorItem,
  onOrmlAssetOnChange,
  onStellarAssetOnChange,
  AssetItem,
} from './helpers';

interface AssetSelectorProps {
  assets?: BlockchainAsset[];
  selectedAsset?: BlockchainAsset;
  onChange?: AssetSelectorOnChange;
  style?: CSSProperties;
  assetPrefix?: string;
  assetSuffix?: string;
  disabled?: boolean;
}

function AssetSelector(props: AssetSelectorProps): JSX.Element {
  const { assets, selectedAsset, assetPrefix, assetSuffix, disabled = false } = props;

  const [items, setItems] = useState<AssetItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<AssetItem | undefined>(undefined);

  useEffect(() => {
    const { formattedAssets, selectedAssetItem } = generateAssetSelectorItem(
      assets,
      selectedAsset,
      assetPrefix,
      assetSuffix,
    );

    setItems(formattedAssets);
    setSelectedItem(selectedAssetItem);
  }, [assetPrefix, assetSuffix, assets, selectedAsset]);

  function handleOnChange(newItem: { id: string }) {
    const onChange = props.onChange;

    if (assets && onChange)
      isStellarAsset(selectedAsset)
        ? onStellarAssetOnChange(newItem, assets, onChange)
        : onOrmlAssetOnChange(newItem, assets, onChange);
  }

  return (
    <DropdownSelector items={items} value={selectedItem} onChange={handleOnChange}>
      <Button
        disabled={disabled}
        size="xs"
        className="min-h-none btn mt-0.5 flex h-4 items-center rounded-full border-0 bg-neutral-200 pl-0 pr-1 text-neutral-content dark:bg-neutral-700"
        type="button"
      >
        <span className="mr-1 h-full rounded-full bg-[rgba(0,0,0,0.15)]">
          <img src={selectedItem?.icon} alt={selectedItem?.name} className="h-full w-auto" />
        </span>
        <strong className="font-bold">{selectedItem?.displayName}</strong>
        {items.length > 1 ? <ChevronDownIcon className="ml-px inline h-4 w-4" /> : <div className="px-1" />}
      </Button>
    </DropdownSelector>
  );
}

export default AssetSelector;
