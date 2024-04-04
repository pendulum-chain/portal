import { UseFormRegisterReturn } from 'react-hook-form';
import { StateUpdater } from 'preact/hooks';
import { Asset } from 'stellar-sdk';

import { BlockchainAsset } from '../../Selector/AssetSelector/helpers';

import { SwapFrom } from './variants/SwapFrom';
import { StandardFrom } from './variants/StandardFrom';

export interface FromProps {
  className?: string;
  max?: number;
  min?: number;
  register: UseFormRegisterReturn;
  setValue?: (n: number) => void;
  assets?: BlockchainAsset[];
  selectedAsset?: BlockchainAsset;
  setSelectedAsset?: StateUpdater<BlockchainAsset | undefined> | StateUpdater<Asset | undefined>;
  network?: string;
  assetSuffix?: string;
  error?: string;
  customText?: string;
  minBadge?: {
    value: string;
    onClick?: () => void;
  };
  maxBadge?: {
    value: string;
    onClick?: () => void;
  };
  readOnly?: boolean;
  disabled?: boolean;
}

export enum FromVariants {
  STANDARD = 'STANDARD',
  SWAP = 'swap',
}

export type FromPropsWithVariant = FromProps & { variant?: FromVariants };

const From = (props: FromPropsWithVariant): JSX.Element | null => {
  const { variant } = props;

  if (variant === FromVariants.SWAP) {
    return <SwapFrom {...props} />;
  }

  return <StandardFrom {...props} />;
};

export default From;
