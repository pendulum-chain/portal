import { Asset } from 'stellar-sdk';
import { StateUpdater } from 'preact/hooks';
import { getIcon } from '../../../shared/AssetIcons';
import { OrmlTraitsAssetRegistryAssetMetadata } from '../../../hooks/useBuyout/types';
import { assetDisplayName } from '../../../helpers/spacewalk';

/* Types */
export type BlockchainAsset = Asset | OrmlTraitsAssetRegistryAssetMetadata;
export type AssetSelectorOnChange = StateUpdater<BlockchainAsset | undefined>;

/* Type Guards */
export function isStellarAsset(obj?: BlockchainAsset): obj is Asset {
  return Boolean(obj && 'getCode' in obj && typeof obj.getCode === 'function');
}
export function areStellarAssets(objs?: BlockchainAsset[]): objs is Asset[] {
  return objs !== undefined && objs.every((obj) => isStellarAsset(obj));
}
export function isOrmlAsset(obj?: BlockchainAsset): obj is OrmlTraitsAssetRegistryAssetMetadata {
  return Boolean(obj && 'metadata' in obj && typeof obj.metadata === 'object' && 'symbol' in obj.metadata);
}
function areOrmlAssets(obj?: BlockchainAsset[]): obj is OrmlTraitsAssetRegistryAssetMetadata[] {
  return Array.isArray(obj) && obj.every(isOrmlAsset);
}

export function getAssetIcon(asset?: BlockchainAsset): string {
  if (!asset) return '';
  return isStellarAsset(asset) ? getIcon(asset?.code) : getIcon(asset.metadata.symbol);
}

const findAsset = (
  compare: (asset: BlockchainAsset) => boolean,
  assets: BlockchainAsset[],
  onChange: AssetSelectorOnChange,
) => {
  console.log('b');
  const newAsset = assets.find(compare);
  console.log('c');
  newAsset && onChange(newAsset);
};

function compareAsset(newItem: { id: string }) {
  console.log('d');
  return (asset: Asset) => asset.getCode() === newItem.id;
}

function compareOrmlAsset(newItem: { id: string }) {
  return (asset: OrmlTraitsAssetRegistryAssetMetadata) => asset.metadata.symbol === newItem.id;
}

export function onStellarAssetOnChange(
  newItem: { id: string },
  assets: BlockchainAsset[],
  onChange: AssetSelectorOnChange,
) {
  console.log('a');
  return findAsset(compareAsset(newItem) as (asset: BlockchainAsset) => boolean, assets, onChange);
}

export function onOrmlAssetOnChange(
  newItem: { id: string },
  assets: BlockchainAsset[],
  onChange: AssetSelectorOnChange,
) {
  return findAsset(compareOrmlAsset(newItem) as (asset: BlockchainAsset) => boolean, assets, onChange);
}

export function generateAssetSelectorItem(
  assets?: BlockchainAsset[],
  selectedAsset?: BlockchainAsset,
  assetPrefix?: string,
  assetSuffix?: string,
) {
  console.log('areStellarAssets(assets)');
  console.log(areStellarAssets(assets));
  if (areStellarAssets(assets)) {
    const formatAsset = (asset: Asset) => assetDisplayName(asset, assetPrefix, assetSuffix);
    console.log(1);
    const getCode = (asset: Asset) => asset.getCode();

    console.log(2);
    return generateAssetItems(
      assets,
      formatAsset as (asset: BlockchainAsset) => string,
      getCode as (asset: BlockchainAsset) => string,
      selectedAsset,
    );
  } else if (areOrmlAssets(assets)) {
    const formatAsset = (asset: OrmlTraitsAssetRegistryAssetMetadata) => asset.metadata.symbol;
    const getCode = (asset: OrmlTraitsAssetRegistryAssetMetadata) => asset.metadata.symbol;

    return generateAssetItems(
      assets,
      formatAsset as (asset: BlockchainAsset) => string,
      getCode as (asset: BlockchainAsset) => string,
      selectedAsset,
    );
  }

  return { formattedAssets: [], selectedAssetItem: undefined };
}

function generateAssetItems(
  assets: BlockchainAsset[],
  formatAssets: (asset: BlockchainAsset) => string,
  getCode: (asset: BlockchainAsset) => string,
  selectedAsset?: BlockchainAsset,
) {
  console.log(3);
  const formattedAssets = assets.map((asset) => ({
    displayName: formatAssets(asset),
    id: getCode(asset),
  }));

  console.log(4);
  const selectedAssetItem = selectedAsset
    ? {
        displayName: formatAssets(selectedAsset),
        id: getCode(selectedAsset),
      }
    : undefined;

  console.log(5);
  return { formattedAssets, selectedAssetItem };
}
