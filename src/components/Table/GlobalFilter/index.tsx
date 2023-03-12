import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { VNode } from 'preact';
import { TargetedEvent, useCallback, useRef } from 'preact/compat';

export interface GlobalFilterProps {
  globalFilter?: string;
  setGlobalFilter: (val: string) => void;
}
export const GlobalFilter = ({
  globalFilter,
  setGlobalFilter,
}: GlobalFilterProps): VNode | null => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onSearch = useCallback(
    (ev: TargetedEvent<HTMLFormElement>) => {
      if (ev) ev.preventDefault();
      if (!inputRef.current) return;
      setGlobalFilter(inputRef.current.value);
    },
    [setGlobalFilter],
  );

  return (
    <form onSubmit={onSearch}>
      <div className="form-control max-w-72">
        <label className="input-group input-group-sm">
          <input
            ref={inputRef}
            type="text"
            maxLength={128}
            defaultValue={globalFilter}
            placeholder="Search..."
            className="input input-sm input-bordered"
          />
          <button className="btn btn-sm btn-square btn-secondary" type="submit">
            <MagnifyingGlassIcon className="w-3 h-3" />
          </button>
        </label>
      </div>
    </form>
  );
};
