import { ChangeEvent } from 'react';
import { Input } from 'react-daisyui';

export interface GlobalFilterProps {
  globalFilter?: string;
  setGlobalFilter: (val: string) => void;
}
export const GlobalFilter = ({ globalFilter, setGlobalFilter }: GlobalFilterProps): JSX.Element => {
  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(event.target.value);
  };

  return (
    <div className="form-control">
        <Input
          className="bg-base-200"
          size="sm"
          bordered
          type="text"
          maxLength={128}
          value={globalFilter || ''}
          onChange={handleFilterChange}
          placeholder="Search..."
        />
    </div>
  );
};
