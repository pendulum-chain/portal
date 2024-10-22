import { Asset } from '@stellar/stellar-sdk';
import { StateUpdater, Dispatch } from 'preact/hooks';
import { getIcon } from '../../../shared/AssetIcons';
import { OrmlTraitsAssetRegistryAssetMetadata } from '../../../hooks/useBuyout/types';
import { assetDisplayName } from '../../../helpers/spacewalk';
import { stringifyStellarAsset } from '../../../helpers/stellar';

/* Types */
export type BlockchainAsset = Asset | OrmlTraitsAssetRegistryAssetMetadata;
export type AssetSelectorOnChange = Dispatch<StateUpdater<BlockchainAsset | undefined>>;

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

function getAssetIcon(asset?: BlockchainAsset): string {
  if (!asset) return '';
  return isStellarAsset(asset) ? getIcon(asset?.code, asset?.issuer) : getIcon(asset.metadata.symbol);
}

function getAssetName(asset?: BlockchainAsset): string {
  if (!asset) return '';
  return isStellarAsset(asset) ? asset?.code : asset.metadata.symbol;
}

const findAsset = (
  compare: (asset: BlockchainAsset) => boolean,
  assets: BlockchainAsset[],
  onChange: AssetSelectorOnChange,
) => {
  const newAsset = assets.find(compare);
  if (typeof onChange === 'function') {
    newAsset && onChange(newAsset);
  }
};

function compareAsset(newItem: { id: string }) {
  return (asset: Asset) => stringifyStellarAsset(asset) === newItem.id;
}

function compareOrmlAsset(newItem: { id: string }) {
  return (asset: OrmlTraitsAssetRegistryAssetMetadata) => asset.metadata.symbol === newItem.id;
}

export function onStellarAssetOnChange(
  newItem: { id: string },
  assets: BlockchainAsset[],
  onChange: AssetSelectorOnChange,
) {
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
  if (areStellarAssets(assets)) {
    const formatAsset = (asset: Asset) => assetDisplayName(asset, assetPrefix, assetSuffix);
    const getId = (asset: Asset) => stringifyStellarAsset(asset);

    return generateAssetItems(
      assets,
      formatAsset as (asset: BlockchainAsset) => string,
      getId as (asset: BlockchainAsset) => string,
      selectedAsset,
    );
  } else if (areOrmlAssets(assets)) {
    const formatAsset = (asset: OrmlTraitsAssetRegistryAssetMetadata) => asset.metadata.symbol;
    const getId = (asset: OrmlTraitsAssetRegistryAssetMetadata) => asset.metadata.symbol;

    return generateAssetItems(
      assets,
      formatAsset as (asset: BlockchainAsset) => string,
      getId as (asset: BlockchainAsset) => string,
      selectedAsset,
    );
  }

  return { formattedAssets: [], selectedAssetItem: undefined };
}

export interface AssetItem {
  displayName: string;
  id: string;
  name: string;
  icon?: string;
}

function generateAssetItems(
  assets: BlockchainAsset[],
  formatAssets: (asset: BlockchainAsset) => string,
  getId: (asset: BlockchainAsset) => string,
  selectedAsset?: BlockchainAsset,
) {
  const formattedAssets = assets.map((asset) => ({
    displayName: formatAssets(asset),
    id: getId(asset),
    icon: getAssetIcon(asset),
    name: getAssetName(asset),
  }));

  const selectedAssetItem = selectedAsset
    ? {
        displayName: formatAssets(selectedAsset),
        id: getId(selectedAsset),
        icon: getAssetIcon(selectedAsset),
        name: getAssetName(selectedAsset),
      }
    : undefined;

  return { formattedAssets, selectedAssetItem };
}
