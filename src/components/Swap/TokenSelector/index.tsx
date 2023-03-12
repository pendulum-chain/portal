import { matchSorter } from 'match-sorter';
import { ChangeEvent, useMemo, useState } from 'preact/compat';
import { Avatar, Button, Input, Modal, ModalProps } from 'react-daisyui';
import { repeat } from '../../../helpers/general';
import { Asset } from '../../../models/Asset';
import { Skeleton } from '../../Skeleton';

export interface TokenSelectorProps {
  tokens?: Asset[];
  onSelect: (token: string) => void;
  selected?: string;
}

// ! TODO: complete
const TokenSelector = ({
  tokens,
  onSelect,
  selected,
}: TokenSelectorProps): JSX.Element | null => {
  const [filter, setFilter] = useState<string>();

  const filteredTokens = useMemo(
    () =>
      filter && tokens
        ? matchSorter(tokens, filter, { keys: ['name', 'address', 'symbol'] })
        : tokens,
    [tokens, filter],
  );

  return (
    <>
      <Input
        bordered
        className="w-full mb-8"
        onChange={(ev: ChangeEvent<HTMLInputElement>) =>
          setFilter(ev.currentTarget.value)
        }
        placeholder="Find by name or address"
      />
      <div className="flex flex-col gap-1">
        {filteredTokens?.map((token) => (
          <Button
            type="button"
            size="md"
            variant="ghost"
            key={token.address}
            onClick={() => onSelect(token.address)}
            className={`items-center w-full gap-4 text-base${
              selected === token.address ? ' bg-gray-100' : ''
            }`}
          >
            <div>
              <Avatar
                size="xs"
                letters={token.symbol}
                shape="circle"
                className="text-xs"
              />
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

export type TokenSelectorModalProps = {
  isLoading?: boolean;
  onClose: () => void;
} & TokenSelectorProps &
  Omit<ModalProps, 'onSelect' | 'selected'>;

export const TokenSelectorModal = ({
  tokens,
  onSelect,
  selected,
  isLoading,
  onClose,
  ...rest
}: TokenSelectorModalProps) => (
  <Modal {...rest}>
    <Modal.Header className="mb-0">
      <Button
        size="sm"
        shape="circle"
        className="absolute right-2 top-2"
        onClick={onClose}
        type="button"
      >
        ✕
      </Button>
      <h3 className="text-lg font-bold">Select a token</h3>
    </Modal.Header>
    <Modal.Body>
      <div className="py-4">
        {isLoading ? (
          repeat(<Skeleton className="w-full h-10 mb-2" />)
        ) : (
          <TokenSelector
            tokens={tokens}
            onSelect={onSelect}
            selected={selected}
          />
        )}
      </div>
    </Modal.Body>
  </Modal>
);

export default TokenSelector;
