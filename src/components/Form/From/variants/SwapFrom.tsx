import { FromProps } from '..';
import { Badges } from '../Badges';
import { FromDescription } from '../Description';
import { NumericInput } from '../NumericInput';
import { AssetSelector } from '../../../Selector';
import { AssetSelectorOnChange } from '../../../Selector/AssetSelector/helpers';

export const SwapFrom = ({
  className,
  formControl: { register, readOnly = false, error, disabled = false, maxDecimals },
  asset: { assetSuffix, assets, selectedAsset, setSelectedAsset },
  description: { customText, network },
  badges: { minBadge, maxBadge },
}: FromProps) => (
  <div
    className={`rounded-lg ${disabled ? 'bg-base-100' : 'bg-base-300'} mb-3 px-4 py-3 ${className || ''} ${
      error ? 'border border-solid border-red-400' : ''
    }`}
  >
    <div className="mt-1 flex items-center justify-between text-neutral-500 dark:text-neutral-400">
      <div className="flex items-center">
        <FromDescription network={network} customText={customText} />
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

      <div>
        <Badges minBadge={minBadge} maxBadge={maxBadge} disabled={disabled} />
      </div>
    </div>

    <NumericInput
      additionalStyle={disabled ? 'text-gray-400 focus:text-gray-400' : ''}
      maxDecimals={maxDecimals}
      register={register}
      readOnly={readOnly}
    />

    {error ? (
      <label className="label">{error && <span className="label-text text-red-400">{error}</span>}</label>
    ) : null}
  </div>
);
