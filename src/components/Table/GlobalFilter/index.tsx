import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { TargetedEvent, useCallback, useRef } from 'preact/compat';
import { Button, Input, Join } from 'react-daisyui';

export interface GlobalFilterProps {
  globalFilter?: string;
  setGlobalFilter: (val: string) => void;
}
export const GlobalFilter = ({ globalFilter, setGlobalFilter }: GlobalFilterProps): JSX.Element | null => {
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
        <Join>
          <Input
            ref={inputRef}
            size="sm"
            bordered
            type="text"
            maxLength={128}
            defaultValue={globalFilter}
            placeholder="Search..."
          />
          <Button
            size="sm"
            color="secondary"
            className="dark:border-neutral-700 dark:bg-neutral-700"
            bordered
            type="submit"
          >
            <MagnifyingGlassIcon className="h-3 w-3" />
          </Button>
        </Join>
      </div>
    </form>
  );
};
