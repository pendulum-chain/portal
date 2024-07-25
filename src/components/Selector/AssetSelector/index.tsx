import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { CSSProperties, useEffect, useState } from 'preact/compat';
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
        className="btn rounded-full h-4 min-h-none border-0 bg-neutral-200 dark:bg-neutral-700 pl-0 pr-1 flex items-center mt-0.5 text-neutral-content"
        type="button"
      >
        <span className="rounded-full bg-[rgba(0,0,0,0.15)] h-full mr-1 ">
          <img src={selectedItem?.icon} alt={selectedItem?.name} className="h-full w-auto " />
        </span>
        <strong className="font-bold">{selectedItem?.displayName}</strong>
        {items.length > 1 ? <ChevronDownIcon className="w-4 h-4 inline ml-px" /> : <div className="px-1" />}
      </Button>
    </DropdownSelector>
  );
}

export default AssetSelector;
