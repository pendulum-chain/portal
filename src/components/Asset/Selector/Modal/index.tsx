import { CheckIcon } from '@heroicons/react/20/solid';
import { matchSorter } from 'match-sorter';
import { ChangeEvent, useMemo, useState } from 'preact/compat';
import { Avatar, AvatarProps, Button, Input, Modal, ModalProps } from 'react-daisyui';
import { repeat } from '../../../../helpers/general';
import ModalCloseButton from '../../../Button/ModalClose';
import { Skeleton } from '../../../Skeleton';

export type SelectorToken = {
  decimals: number;
  id: string;
  name: string;
  symbol: string;
};
export type SelectorValue = SelectorToken | Dict;

export interface AssetListProps<T extends SelectorValue> {
  assets?: T[];
  map?: (value: T) => SelectorToken | undefined;
  onSelect: (asset: T) => void;
  selected?: string;
}

const AssetList = <T extends SelectorValue>({
  assets,
  onSelect,
  selected,
  map,
}: AssetListProps<T>): JSX.Element | null => {
  const [filter, setFilter] = useState<string>();

  const filteredTokens = useMemo(
    () =>
      filter && assets
        ? matchSorter(assets, filter, {
            keys: ['name', 'address', 'symbol', 'token.name', 'token.address', 'token.symbol'],
          })
        : assets,
    [assets, filter],
  );

  return (
    <div className="relative">
      <Input
        bordered
        className="sticky top-0 w-full mb-8 z-10"
        onChange={(ev: ChangeEvent<HTMLInputElement>) => setFilter(ev.currentTarget.value)}
        placeholder="Find by name or address"
      />
      <div className="flex flex-col gap-1">
        {filteredTokens?.map((value) => {
          const token = (map ? map(value) : value) as SelectorToken | undefined;
          if (!token || !('symbol' in token)) return null;
          return (
            <Button
              type="button"
              size="md"
              color="secondary"
              key={token.id}
              onClick={() => onSelect(value)}
              className="w-full items-center justify-start gap-4 px-3 py-2 h-auto border-0 bg-blackAlpha-200 text-left hover:opacity-80 dark:bg-whiteAlpha-200"
            >
              <span className="relative">
                <Avatar
                  size={'xs' as AvatarProps['size']}
                  letters={token.symbol}
                  /* src={token.logoURI} */
                  shape="circle"
                  className="text-xs"
                />
                {selected == token.id && (
                  <CheckIcon className="absolute -right-1 -top-1 w-5 h-5 p-[3px] text-white bg-green-600 rounded-full" />
                )}
              </span>
              <span className="flex flex-col">
                <span className="text-lg dark:text-white leading-5">
                  <strong>{token.symbol}</strong>
                </span>
                <span className="text-sm text-neutral-500 leading-5">{token.name}</span>
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export type AssetSelectorModalProps<T extends SelectorValue> = {
  isLoading?: boolean;
  onClose: () => void;
} & AssetListProps<T> &
  Omit<ModalProps, 'onSelect' | 'selected'>;

export const AssetSelectorModal = <T extends SelectorValue>({
  assets,
  selected,
  isLoading,
  onSelect,
  onClose,
  map,
  ...rest
}: AssetSelectorModalProps<T>) => {
  return (
    <Modal className="bg-[--bg-modal]" {...rest}>
      <Modal.Header className="mb-0">
        <ModalCloseButton onClick={onClose} />
        <h3 className="text-2xl font-normal">Select a token</h3>
      </Modal.Header>
      <Modal.Body>
        <div className="py-4">
          {isLoading ? (
            repeat(<Skeleton className="w-full h-10 mb-2" />)
          ) : (
            <AssetList assets={assets || []} onSelect={onSelect} selected={selected} map={map} />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AssetList;
