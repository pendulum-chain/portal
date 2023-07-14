import { matchSorter } from 'match-sorter';
import { ChangeEvent, useMemo, useState } from 'preact/compat';
import { Avatar, Button, Input, Modal, ModalProps } from 'react-daisyui';
import { repeat } from '../../../../helpers/general';
import { Asset } from '../../../../models/Asset';
import ModalCloseButton from '../../../Button/ModalClose';
import { Skeleton } from '../../../Skeleton';

export interface AssetListProps {
  assets?: Asset[];
  onSelect: (asset: Asset) => void;
  selected?: string;
}

const AssetList = ({ assets, onSelect, selected }: AssetListProps): JSX.Element | null => {
  const [filter, setFilter] = useState<string>();

  const filteredTokens = useMemo(
    () => (filter && assets ? matchSorter(assets, filter, { keys: ['name', 'address', 'symbol'] }) : assets),
    [assets, filter],
  );

  return (
    <>
      <Input
        bordered
        className="w-full mb-8"
        onChange={(ev: ChangeEvent<HTMLInputElement>) => setFilter(ev.currentTarget.value)}
        placeholder="Find by name or address"
      />
      <div className="flex flex-col gap-1">
        {filteredTokens?.map((token) => (
          <Button
            type="button"
            size="md"
            variant="ghost"
            key={token.address}
            onClick={() => onSelect(token)}
            className={`items-center w-full gap-4 text-base${selected === token.address ? ' bg-neutral-100' : ''}`}
          >
            <div>
              <Avatar size="xs" letters={token.symbol} shape="circle" className="text-xs" />
            </div>
            <div>
              <p>
                <strong>{token.name}</strong>
              </p>
            </div>
            <div className="ml-auto text-sm font-normal">{'Amount'}</div>
          </Button>
        ))}
      </div>
    </>
  );
};

export type AssetSelectorModalProps = {
  isLoading?: boolean;
  onClose: () => void;
} & AssetListProps &
  Omit<ModalProps, 'onSelect' | 'selected'>;

export const AssetSelectorModal = ({
  assets,
  selected,
  isLoading,
  onSelect,
  onClose,
  ...rest
}: AssetSelectorModalProps) => {
  return (
    <Modal {...rest}>
      <Modal.Header className="mb-0">
        <ModalCloseButton onClick={onClose} />
        <h3 className="text-2xl font-normal">Select a token</h3>
      </Modal.Header>
      <Modal.Body>
        <div className="py-4">
          {isLoading ? (
            repeat(<Skeleton className="w-full h-10 mb-2" />)
          ) : (
            <AssetList assets={assets || []} onSelect={onSelect} selected={selected} />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AssetList;
