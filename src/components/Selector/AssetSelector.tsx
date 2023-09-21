import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { CSSProperties } from 'preact/compat';
import { Button } from 'react-daisyui';
import { Asset } from 'stellar-sdk';
import { getIcon } from '../../shared/AssetIcons';
import DropdownSelector from './DropdownSelector';

interface AssetSelectorProps {
  selectedAsset?: Asset;
  onChange: (asset: Asset) => void;
  assets: Asset[];
  style?: CSSProperties;
  assetPrefix?: string;
  assetSuffix?: string;
}

function getDisplayName(asset: Asset, assetPrefix?: string, assetSuffix?: string): string {
  return `${assetPrefix || ''}${asset.getCode()}${assetSuffix || ''}`;
}

function AssetSelector(props: AssetSelectorProps): JSX.Element {
  const { assets, selectedAsset, assetPrefix, assetSuffix } = props;

  const items = assets.map((asset) => {
    return {
      displayName: getDisplayName(asset, assetPrefix, assetSuffix),
      id: asset.getCode(),
    };
  });

  const selectedAssetItem = selectedAsset
    ? {
        displayName: getDisplayName(selectedAsset, assetPrefix, assetSuffix),
        id: selectedAsset.getCode(),
      }
    : undefined;

  return (
    <DropdownSelector
      items={items}
      onChange={(newItem) => {
        const newAsset = assets.find((asset) => {
          return asset.getCode() === newItem.id;
        });
        console.log(newAsset);
        newAsset && props.onChange(newAsset);
      }}
      buttonComponent={
        <Button
          size="xs"
          className="btn rounded-full h-4 min-h-none border-0 bg-neutral-200 dark:bg-neutral-700 pl-0 pr-1 flex items-center mt-0.5"
          type="button"
        >
          <span className="rounded-full bg-[rgba(0,0,0,0.15)] h-full mr-1 ">
            <img src={getIcon(selectedAsset?.code)} alt="Pendulum" className="h-full w-auto " />
          </span>
          <strong className="font-bold">{selectedAsset?.getCode()}</strong>
          <ChevronDownIcon className="w-4 h-4 inline ml-px" />
        </Button>
      }
      value={selectedAssetItem}
    />
  );
}

export default AssetSelector;
