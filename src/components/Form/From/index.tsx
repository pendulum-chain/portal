import { Fragment } from 'preact';
import { Input } from 'react-daisyui';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Asset } from 'stellar-sdk';
import AssetSelector from '../../Selector/AssetSelector';

export interface FromProps {
  className?: string;
  max?: number;
  min?: number;
  register: UseFormRegisterReturn;
  setValue: (n: number) => void;
  assets?: Asset[];
  selectedAsset?: Asset;
  setSelectedAsset?: (a: Asset) => void;
  network?: string;
  assetSuffix?: string;
  error?: string;
}

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
}: FromProps): JSX.Element | null => {
  return (
    <>
      <div
        className={`rounded-lg bg-base-300 px-4 py-3 ${className || ''} ${
          error ? 'border border-solid border-red-400' : ''
        }`}
      >
        <div className="w-full flex justify-between">
          <div className="flex-grow text-4xl text-black font-2">
            <Input
              className="input-ghost w-full text-4xl font-2 pl-0 focus:outline-none"
              type="number"
              step="any"
              onKeyPress={(e: KeyboardEvent) => {
                if (e.code === 'Minus' || e.code === 'KeyE') {
                  e.preventDefault();
                }
              }}
              placeholder="0.0"
              {...register}
            />
          </div>
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
          {network && <div className="text-sm mt-px text-secondary-content">From {network}</div>}
          <div className="flex gap-1 text-sm">
            {max !== undefined && (
              <Fragment>
                <span className="mr-1">Available: {max.toFixed(2)}</span>
                <button
                  className="text-primary hover:underline"
                  onClick={() => setValue(Number(max) * 0.5)}
                  type="button"
                >
                  50%
                </button>
                <button className="text-primary hover:underline" onClick={() => setValue(Number(max))} type="button">
                  MAX
                </button>
              </Fragment>
            )}
          </div>
        </div>
      </div>
      <label className="label">{error && <span className="label-text text-red-400">{error}</span>}</label>
    </>
  );
};
export default From;
