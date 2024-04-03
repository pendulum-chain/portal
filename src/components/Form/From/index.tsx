import { Fragment } from 'preact';
import { UseFormRegisterReturn } from 'react-hook-form';
import { InputField } from './InputField';
import { AvailableActions } from './AvailableActions';
import { BlockchainAsset } from '../../Selector/AssetSelector/helpers';
import { AssetSelector } from '../../Selector';

export interface FromProps {
  className?: string;
  max?: number;
  min?: number;
  register: UseFormRegisterReturn;
  setValue?: (n: number) => void;
  assets?: BlockchainAsset[];
  selectedAsset?: BlockchainAsset;
  setSelectedAsset?: (a: BlockchainAsset) => void;
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
}

interface FromDescriptionProps {
  customText?: string;
  network?: string;
}

const FromDescription = ({ customText, network }: FromDescriptionProps) => {
  let text = '';

  if (customText) {
    text = customText;
  } else if (network) {
    text = `From ${network}`;
  }

  return text ? <div className="text-sm mt-px text-secondary-content">{text}</div> : <></>;
};

export enum FromVariants {
  CLASSIC = 'classic',
  SWAP = 'swap',
}

const ClassicFrom = ({
  setSelectedAsset,
  className,
  register,
  max,
  setValue,
  assets,
  selectedAsset,
  network,
  assetSuffix,
  error,
  customText,
  minBadge,
  maxBadge,
  readOnly = false,
}: FromProps) => (
  <>
    <div
      className={`rounded-lg bg-base-300 px-4 py-3 ${className || ''} ${
        error ? 'border border-solid border-red-400' : ''
      }`}
    >
      <InputField register={register} readOnly={readOnly} />
      <div className="flex items-end">
        {minBadge && minBadge.value ? (
          <div className="badge badge-primary text-xs mr-2.5 cursor-pointer" onClick={minBadge.onClick}>
            Min {minBadge.value}
          </div>
        ) : (
          <></>
        )}
        {maxBadge && maxBadge.value ? (
          <div className="badge badge-ghost text-xs cursor-pointer" onClick={maxBadge.onClick}>
            Max {maxBadge.value}
          </div>
        ) : (
          <></>
        )}
        {assets && setSelectedAsset && (
          <AssetSelector
            selectedAsset={selectedAsset}
            assets={assets}
            onChange={setSelectedAsset}
            style={{ flexGrow: 1 }}
            assetSuffix={assetSuffix}
          />
        )}
      </div>
      <div className="flex justify-between items-center mt-1 dark:text-neutral-400 text-neutral-500">
        <FromDescription network={network} customText={customText} />
        <AvailableActions max={max} setValue={setValue} />
      </div>
    </div>
    <label className="label">{error && <span className="label-text text-red-400">{error}</span>}</label>
  </>
);

const SwapFrom = ({
  setSelectedAsset,
  className,
  register,
  assets,
  selectedAsset,
  network,
  assetSuffix,
  error,
  customText,
  minBadge,
  maxBadge,
  readOnly = false,
}: FromProps) => (
  <div
    className={`rounded-lg bg-base-300 px-4 py-3 mb-3 ${className || ''} ${
      error ? 'border border-solid border-red-400' : ''
    }`}
  >
    <div className="flex justify-between items-center mt-1 dark:text-neutral-400 text-neutral-500">
      <div className="flex items-center">
        <FromDescription network={network} customText={customText} />
        {assets && setSelectedAsset && (
          <AssetSelector
            selectedAsset={selectedAsset}
            assets={assets}
            onChange={setSelectedAsset}
            style={{ flexGrow: 1 }}
            assetSuffix={assetSuffix}
          />
        )}
      </div>

      <div>
        {minBadge && minBadge.value ? (
          <div className="badge badge-primary text-xs mr-2.5 cursor-pointer" onClick={minBadge.onClick}>
            Min {minBadge.value}
          </div>
        ) : (
          <></>
        )}
        {maxBadge && maxBadge.value ? (
          <div className="badge badge-ghost text-xs cursor-pointer" onClick={maxBadge.onClick}>
            Max {maxBadge.value}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>

    <InputField register={register} readOnly={readOnly} />

    {error ? (
      <label className="label">{error && <span className="label-text text-red-400">{error}</span>}</label>
    ) : null}
  </div>
);

export type FromPropsWithVariant = FromProps & { variant: FromVariants };

const From = (props: FromPropsWithVariant): JSX.Element | null => {
  const { variant } = props;

  if (variant === FromVariants.SWAP) {
    return <SwapFrom {...props} />;
  }

  return <ClassicFrom {...props} />;
};

export default From;
