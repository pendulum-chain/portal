import { UseFormRegisterReturn } from 'react-hook-form';
import { Dispatch } from 'react';
import { Asset } from '@stellar/stellar-sdk';

import { BlockchainAsset } from '../../Selector/AssetSelector/helpers';

import { SwapFrom } from './variants/SwapFrom';
import { StandardFrom } from './variants/StandardFrom';
import { BadgeProps } from './Badges';

export interface FromProps {
  className?: string;
  formControl: {
    max?: number;
    min?: number;
    register: UseFormRegisterReturn;
    error?: string;
    readOnly?: boolean;
    disabled?: boolean;
    setValue?: (n: string) => void;
    maxDecimals?: number;
  };
  asset: {
    assets?: BlockchainAsset[];
    selectedAsset?: BlockchainAsset;
    setSelectedAsset?: Dispatch<BlockchainAsset | undefined> | Dispatch<Asset | undefined>;
    assetSuffix?: string;
  };
  description: {
    customText?: string;
    network?: string;
  };
  badges: {
    minBadge?: BadgeProps;
    maxBadge?: BadgeProps;
  };
}

export enum FromVariants {
  STANDARD = 'STANDARD',
  SWAP = 'SWAP',
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
