import { FromProps } from '..';
import { InputField } from '../InputField';
import { AssetSelector } from '../../../Selector';
import { AssetSelectorOnChange } from '../../../Selector/AssetSelector/helpers';
import { FromDescription } from '../Description';
import { AvailableActions } from '../AvailableActions';

export const StandardFrom = ({
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
  readOnly = false,
}: FromProps) => (
  <>
    <div
      className={`rounded-lg bg-base-300 px-4 py-3 ${className || ''} ${
        error ? 'border border-solid border-red-400' : ''
      }`}
    >
      <div className="w-full flex justify-between">
        <InputField register={register} readOnly={readOnly} />
        {assets && setSelectedAsset && (
          <AssetSelector
            selectedAsset={selectedAsset}
            assets={assets}
            onChange={setSelectedAsset as AssetSelectorOnChange}
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
