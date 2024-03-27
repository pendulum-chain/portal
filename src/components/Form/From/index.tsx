import { Fragment } from 'preact';
import { UseFormRegisterReturn } from 'react-hook-form';
import { InputField } from './InputField';
import { AvailableActions } from './AvailableActions';
import { BlockchainAsset } from '../../Selector/AssetSelector/helpers';

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

const From = ({
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
}: FromProps): JSX.Element | null => (
  <>
    <div
      className={`rounded-lg bg-base-300 px-4 py-3 ${className || ''} ${
        error ? 'border border-solid border-red-400' : ''
      }`}
    >
      <InputField
        register={register}
        assets={assets}
        selectedAsset={selectedAsset}
        setSelectedAsset={setSelectedAsset}
        assetSuffix={assetSuffix}
        minBadge={minBadge}
        maxBadge={maxBadge}
        readOnly={readOnly}
      />
      <div className="flex justify-between items-center mt-1 dark:text-neutral-400 text-neutral-500">
        <FromDescription network={network} customText={customText} />
        <AvailableActions max={max} setValue={setValue} />
      </div>
    </div>
    <label className="label">{error && <span className="label-text text-red-400">{error}</span>}</label>
  </>
);

export default From;
