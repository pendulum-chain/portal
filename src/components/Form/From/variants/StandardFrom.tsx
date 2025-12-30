import { FieldValues } from 'react-hook-form';
import { FromProps } from '..';
import { NumericInput } from '../NumericInput';
import { AssetSelector } from '../../../Selector';
import { AssetSelectorOnChange } from '../../../Selector/AssetSelector/helpers';
import { FromDescription } from '../Description';
import { AvailableActions } from '../AvailableActions';

export const StandardFrom = <FormFieldValues extends FieldValues = FieldValues>({
  className,
  formControl: { max, control, name, readOnly, error, setValue, maxDecimals, disabled, rules, onChange },
  asset: { assetSuffix, assets, selectedAsset, setSelectedAsset },
  description: { customText, network },
}: FromProps<FormFieldValues>) => (
  <>
    <div
      className={`rounded-lg ${disabled ? 'bg-base-100' : 'bg-base-300'} px-4 py-3 ${className || ''} ${
        error ? 'border border-solid border-red-400' : ''
      }`}
    >
      <div className="flex w-full justify-between">
        <NumericInput
          additionalStyle={disabled ? 'text-gray-400 focus:text-gray-400' : ''}
          maxDecimals={maxDecimals}
          control={control}
          name={name}
          readOnly={readOnly}
          rules={rules}
          onChange={onChange}
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
      <div className="mt-1 flex items-center justify-between text-neutral-500 dark:text-neutral-400">
        <FromDescription network={network} customText={customText} />
        <AvailableActions max={max} setValue={setValue} maxDecimals={maxDecimals} />
      </div>
    </div>
    <label className="label">{error && <span className="label-text text-red-400">{error}</span>}</label>
  </>
);
