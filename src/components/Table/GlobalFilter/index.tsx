import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { FormEvent, useCallback, useRef } from 'react';
import { Button, Input, Join } from 'react-daisyui';

export interface GlobalFilterProps {
  globalFilter?: string;
  setGlobalFilter: (val: string) => void;
}
export const GlobalFilter = ({ globalFilter, setGlobalFilter }: GlobalFilterProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onSearch = useCallback(
    (event: FormEvent) => {
      if (event) event.preventDefault();
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
          <Button size="sm" color="secondary" className="dark:border-neutral-700 dark:bg-neutral-700" type="submit">
            <MagnifyingGlassIcon className="w-3 h-3" />
          </Button>
        </Join>
      </div>
    </form>
  );
};
