import { matchSorter } from 'match-sorter';
import { useMemo, useState } from 'preact/compat';

export interface TokenSelectorProps {
  tokens?: any[];
  onSelect: (token: string) => void;
  selected?: string;
}

// TODO: complete
const TokenSelector = ({
  tokens,
  onSelect,
  selected,
}: TokenSelectorProps): JSX.Element | null => {
  const [filter, setFilter] = useState<string>();

  const filteredTokens = useMemo(
    () => (filter && tokens ? matchSorter(tokens, filter) : tokens),
    [tokens, filter],
  );

  return (
    <>
      <input
        className="input input-bordered w-full mb-8"
        onChange={(ev) => setFilter(ev.currentTarget.value)}
        placeholder="Find by name or address"
      />
      <div>
        {filteredTokens?.map((token) => (
          <div
            key={String(token)}
            onClick={() => onSelect(token)}
            className={`${selected === token ? 'bg-gray-100' : ''}`}
          >
            {String(token)}
          </div>
        ))}
      </div>
    </>
  );
};
export default TokenSelector;
