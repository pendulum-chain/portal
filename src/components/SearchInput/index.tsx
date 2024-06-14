import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { StateUpdater } from 'preact/hooks';

interface SearchInputProps {
  set: Dispatch<StateUpdater<string>>;
}

export const SearchInput = ({ set, ...p }: SearchInputProps) => (
  <label className="input input-bordered flex items-center" htmlFor="search">
    <MagnifyingGlassIcon className="size-5 text-neutral-400 mr-1" />
    <input
      type="text"
      placeholder="Search"
      name="search"
      onChange={(e) => set((e.target as HTMLInputElement).value)}
      role="presentation"
      autoComplete="off"
      {...p}
    />
  </label>
);
