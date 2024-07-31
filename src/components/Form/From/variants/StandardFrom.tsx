import { FromProps } from '..';
import { NumericInput } from '../NumericInput';
import { AssetSelector } from '../../../Selector';
import { AssetSelectorOnChange } from '../../../Selector/AssetSelector/helpers';
import { FromDescription } from '../Description';
import { AvailableActions } from '../AvailableActions';

export const StandardFrom = ({
  className,
  formControl: { max, register, readOnly, error, setValue, maxDecimals, disabled },
  asset: { assetSuffix, assets, selectedAsset, setSelectedAsset },
  description: { customText, network },
}: FromProps) => (
  <>
    <div
      className={`rounded-lg ${disabled ? 'bg-base-100' : 'bg-base-300'} px-4 py-3 ${className || ''} ${
        error ? 'border border-solid border-red-400' : ''
      }`}
    >
      <div className="w-full flex justify-between">
        <NumericInput
          additionalStyle={disabled ? 'text-gray-400 focus:text-gray-400' : ''}
          maxDecimals={maxDecimals}
          register={register}
          readOnly={readOnly}
        />
        {assets && setSelectedAsset && (
          <AssetSelector
            disabled={disabled}
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
        <AvailableActions max={max} setValue={setValue} maxDecimals={maxDecimals} />
      </div>
    </div>
    <label className="label">{error && <span className="label-text text-red-400">{error}</span>}</label>
  </>
);
