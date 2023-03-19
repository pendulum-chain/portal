import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useCallback, useState } from 'preact/compat';
import { Button, ButtonProps } from 'react-daisyui';
import pendulumIcon from '../../../assets/pendulum-icon.svg';
import useBoolean from '../../../hooks/useBoolean';
import { Asset } from '../../../models/Asset';
import { AssetSelectorModal } from './Modal';

export type AssetSelectorProps = {
  assets: Asset[];
  onSelect: (asset: Asset) => void;
  selected?: string;
} & ButtonProps;

const iconSizes = {
  xs: 4,
  sm: 4,
  md: 5,
  lg: 5,
};

const AssetSelector = ({
  assets,
  onSelect,
  selected,
  size = 'xs',
  ...rest
}: AssetSelectorProps): JSX.Element | null => {
  const [open, { setFalse, setTrue }] = useBoolean();
  const [selectedAsset, setSelectedAsset] = useState<Asset | undefined>(
    assets.find((i) => i.address === selected),
  );

  const internalOnSelect = useCallback(
    (asset: Asset) => {
      setSelectedAsset(asset);
      onSelect(asset);
      setFalse();
    },
    [onSelect, setFalse],
  );

  const iconSz = iconSizes[size] || iconSizes.sm;
  return (
    <div>
      <Button
        size={size}
        {...rest}
        className={`rounded-full bg-gray-200 pl-0 pr-1 flex items-center justify-between min-w-[70px] ${
          rest.className || ''
        }`}
        onClick={setTrue}
        type="button"
      >
        <span className="rounded-full bg-gray-300 h-full p-px mr-1">
          <img src={pendulumIcon} alt="Pendulum" className="h-full w-auto" />
        </span>
        <strong>{selectedAsset?.symbol}</strong>
        <ChevronDownIcon className={`w-${iconSz} h-${iconSz} inline ml-1`} />
      </Button>
      <AssetSelectorModal
        open={open}
        className="modal-top"
        assets={assets}
        onSelect={internalOnSelect}
        selected={selected}
        onClose={setFalse}
      />
    </div>
  );
};

export default AssetSelector;
