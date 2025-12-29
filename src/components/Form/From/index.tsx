import { Control, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';
import { Dispatch } from 'react';
import { Asset } from '@stellar/stellar-sdk';

import { BlockchainAsset } from '../../Selector/AssetSelector/helpers';

import { SwapFrom } from './variants/SwapFrom';
import { StandardFrom } from './variants/StandardFrom';
import { BadgeProps } from './Badges';

export interface FromProps<FormFieldValues extends FieldValues = FieldValues> {
  className?: string;
  formControl: {
    max?: number;
    min?: number;
    control: Control<FormFieldValues>;
    name: FieldPath<FormFieldValues>;
    error?: string;
    readOnly?: boolean;
    disabled?: boolean;
    setValue?: (n: string) => void;
    maxDecimals?: number;
    rules?: RegisterOptions<FormFieldValues>;
    onChange?: (value: string) => void;
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

export type FromPropsWithVariant<FormFieldValues extends FieldValues = FieldValues> = FromProps<FormFieldValues> & {
  variant?: FromVariants;
};

const From = <FormFieldValues extends FieldValues = FieldValues>(
  props: FromPropsWithVariant<FormFieldValues>,
): JSX.Element | null => {
  const { variant } = props;

  if (variant === FromVariants.SWAP) {
    return <SwapFrom {...props} />;
  }

  return <StandardFrom {...props} />;
};

export default From;
