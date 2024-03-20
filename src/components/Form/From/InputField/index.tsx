import { Input } from 'react-daisyui';
import { UseFormRegisterReturn } from 'react-hook-form';
import AssetSelector from '../../../Selector/AssetSelector';
import { BlockchainAsset } from '../../../Selector/AssetSelector/helpers';

interface InputFieldProps {
  register: UseFormRegisterReturn;
  assets?: BlockchainAsset[];
  selectedAsset?: BlockchainAsset;
  setSelectedAsset?: (a: BlockchainAsset) => void;
  assetSuffix?: string;
  minBadge?: {
    value: number;
    onClick?: () => void;
  };
  maxBadge?: {
    value: number;
    onClick?: () => void;
  };
  readOnly?: boolean;
}

export const InputField = ({
  register,
  assets,
  selectedAsset,
  setSelectedAsset,
  assetSuffix,
  minBadge,
  maxBadge,
  readOnly = false,
}: InputFieldProps) => (
  <div className="w-full flex justify-between">
    <div className="flex-grow text-4xl text-black font-2">
      <Input
        className="input-ghost w-full text-4xl font-2 pl-0 focus:outline-none text-white"
        type="number"
        step="any"
        readOnly={readOnly}
        onKeyPress={(e: KeyboardEvent) => {
          if (e.code === 'Minus' || e.code === 'KeyE') {
            e.preventDefault();
          }
        }}
        placeholder="0.0"
        {...register}
      />
    </div>
    <div className="flex items-end">
      {minBadge && minBadge.value ? (
        <div className="badge badge-primary text-xs mr-2.5 cursor-pointer" onClick={minBadge.onClick}>
          Min {minBadge.value.toFixed(4)}
        </div>
      ) : (
        <></>
      )}
      {maxBadge && maxBadge.value ? (
        <div className="badge badge-ghost text-xs cursor-pointer" onClick={maxBadge.onClick}>
          Max {maxBadge.value.toFixed(4)}
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
  </div>
);
