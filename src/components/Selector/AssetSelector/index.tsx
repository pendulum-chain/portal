import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { CSSProperties, useEffect, useState } from 'preact/compat';
import { Button } from 'react-daisyui';

import DropdownSelector from '../DropdownSelector';
import {
  BlockchainAsset,
  AssetSelectorOnChange,
  isStellarAsset,
  generateAssetSelectorItem,
  getAssetIcon,
  onOrmlAssetOnChange,
  onStellarAssetOnChange,
} from './helpers';

interface AssetSelectorProps {
  assets?: BlockchainAsset[];
  selectedAsset?: BlockchainAsset;
  onChange?: AssetSelectorOnChange;
  style?: CSSProperties;
  assetPrefix?: string;
  assetSuffix?: string;
}

function AssetSelector(props: AssetSelectorProps): JSX.Element {
  const { assets, selectedAsset, assetPrefix, assetSuffix } = props;

  const [items, setItems] = useState<{ displayName: string; id: string }[]>([]);
  const [selectedItem, setSelectedItem] = useState<{ displayName: string; id: string } | undefined>(undefined);

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
        size="xs"
        className="btn rounded-full h-4 min-h-none border-0 bg-neutral-200 dark:bg-neutral-700 pl-0 pr-1 flex items-center mt-0.5"
        type="button"
      >
        <span className="rounded-full bg-[rgba(0,0,0,0.15)] h-full mr-1 ">
          <img src={getAssetIcon(selectedAsset)} alt="Pendulum" className="h-full w-auto " />
        </span>
        <strong className="font-bold">{selectedItem?.displayName}</strong>
        <ChevronDownIcon className="w-4 h-4 inline ml-px" />
      </Button>
    </DropdownSelector>
  );
}

export default AssetSelector;
