import { CheckIcon } from '@heroicons/react/20/solid';
import { matchSorter } from 'match-sorter';
import { ChangeEvent, useMemo, useState } from 'preact/compat';
import { Avatar, AvatarProps, Button, Input, Modal, ModalProps } from 'react-daisyui';
import { repeat } from '../../../helpers/general';
import ModalCloseButton from '../../Button/ModalClose';
import { Skeleton } from '../../Skeleton';
import { NablaInstanceToken } from '../../../hooks/nabla/useNablaInstance';

interface AssetListProps {
  assets?: NablaInstanceToken[];
  onSelect: (asset: NablaInstanceToken) => void;
  excludedToken: string | undefined;
  selected?: string;
}

function AssetList({ assets, onSelect, selected, excludedToken }: AssetListProps) {
  const [filter, setFilter] = useState<string>();

  const filteredTokens = useMemo(
    () =>
      (filter && assets
        ? matchSorter(assets, filter, {
            keys: ['name', 'address', 'symbol'],
          })
        : assets
      )?.filter((token) => token.id !== excludedToken),
    [assets, filter, excludedToken],
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
        {filteredTokens?.map((token) => {
          return (
            <Button
              type="button"
              size="md"
              color="secondary"
              key={token.id}
              onClick={() => onSelect(token)}
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
}

type AssetSelectorModalProps = {
  isLoading?: boolean;
  onClose: () => void;
} & AssetListProps &
  Omit<ModalProps, 'onSelect' | 'selected'>;

export function AssetSelectorModal({
  assets,
  selected,
  excludedToken,
  isLoading,
  onSelect,
  onClose,
  ...rest
}: AssetSelectorModalProps) {
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
            <AssetList assets={assets || []} onSelect={onSelect} selected={selected} excludedToken={excludedToken} />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
