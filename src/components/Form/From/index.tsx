import { Fragment } from 'preact';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Asset } from 'stellar-sdk';
import AssetSelector from '../../Selector/AssetSelector';

export interface FromProps {
  balance?: number;
  className?: string;
  max?: number;
  min?: number;
  inputProps: UseFormRegisterReturn;
  setValue: (n: number) => void;
  error?: string;
  assets?: Asset[];
  selectedAsset?: Asset;
  setSelectedAsset: (a: Asset) => void;
}

const From = ({
  setSelectedAsset,
  className,
  inputProps,
  max,
  setValue,
  error,
  balance,
  assets,
  selectedAsset,
}: FromProps): JSX.Element | null => {
  return (
    <>
      <div className={`rounded-lg bg-base-300 px-4 py-3 ${className}`}>
        {error && <div>{error}</div>}
        <div className="w-full flex justify-between">
          <div className="flex-grow text-4xl text-black font-2">
            <input
              autoFocus
              className="input-ghost w-full text-4xl font-2"
              type="number"
              placeholder="0.0"
              {...inputProps}
            />
          </div>
          {assets && (
            <AssetSelector
              selectedAsset={selectedAsset}
              assets={assets}
              onChange={setSelectedAsset}
              style={{ flexGrow: 1 }}
            />
          )}
        </div>
        <div className="flex justify-between items-center mt-1 dark:text-neutral-400 text-neutral-500">
          <div className="text-sm mt-px text-secondary-content">From Stellar</div>
          <div className="flex gap-1 text-sm">
            {balance !== undefined && (
              <Fragment>
                <span className="mr-1">Available: {balance}</span>
                <button className="text-primary hover:underline" onClick={() => setValue(Number(max))} type="button">
                  MAX
                </button>
                <button
                  className="text-primary hover:underline"
                  onClick={() => setValue(Number(max) * 0.5)}
                  type="button"
                >
                  50%
                </button>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default From;
