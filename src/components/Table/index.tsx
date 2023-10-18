import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'preact/compat';
import { repeat } from '../../helpers/general';
import Pagination from '../Pagination';
import { Skeleton } from '../Skeleton';
import { GlobalFilter } from './GlobalFilter';
import './styles.css';

export enum SortingOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export type MultiSort = {
  [key: string]: SortingOrder;
};

export type TableProps<T> = {
  /** data */
  data?: T[];
  /** momoized columns */
  columns: ColumnDef<T>[];
  /** number of items per page */
  pageSize?: number;
  /** show global search */
  search?: boolean;
  /** show loader */
  isLoading?: boolean;
  /** table className */
  className?: string;
  /** The default sorting of the table.
   * Consist in a { key: value } object, the key is the name of the column to be sorted, the value is the order (see SortingOrder).
   * Multiple key/value allows for multisorting (but you might want to make sure that multisort is enabled in the column definition, see https://tanstack.com/table/v8/docs/api/features/sorting#enablemultisort)
   * Example: {age: SortingOrder.ASC, name: SortingOrder.ASC}
   *
   */
  sortBy?: MultiSort;
  /** Gives a className to even rows (2,4,6,8,...), to help table rows readability. */
  evenRowsClassname?: string;
  /** Gives a className to odd rows (1,3,5,7,...), to help table rows readability. */
  oddRowsClassname?: string;
  title?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultData: any[] = [];
const loading = <>{repeat(<Skeleton className="h-8 mb-2" />, 6)}</>;

const Table = <T,>({
  data = defaultData,
  columns,
  pageSize: ps = 25,
  search = true,
  isLoading,
  className,
  sortBy,
  evenRowsClassname,
  oddRowsClassname,
  title,
}: TableProps<T>): JSX.Element | null => {
  const totalCount = data.length;

  const initialSort = useMemo(() => {
    return sortBy
      ? Object.keys(sortBy).map((columnName) => ({ id: columnName, desc: sortBy[columnName] === SortingOrder.DESC }))
      : undefined;
  }, [sortBy]);

  const { getHeaderGroups, getRowModel, getPageCount, nextPage, previousPage, setGlobalFilter, getState } =
    useReactTable({
      columns,
      data,
      initialState: {
        pagination: {
          pageSize: ps,
        },
        sorting: initialSort,
      },
      autoResetAll: false,
      enableMultiSort: true,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });
  const {
    pagination: { pageSize, pageIndex },
    globalFilter,
  } = getState();

  if (isLoading) return loading;
  return (
    <>
      {search ? (
        <div className="flex flex-wrap flex-row gap-2 mb-2">
          <div className="ml-auto">
            <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
          </div>
        </div>
      ) : null}
      <div className="table-border rounded-lg overflow-x-auto border border-base-300">
        {title && <div className="bg-base-200 px-4 py-6 text-lg">{title}</div>}
        <table className={`table w-full ${className}`}>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b table-border">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={`${header.column.getCanSort() ? ' cursor-pointer' : ''}`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex flex-row items-center font-normal text-sm normal-case table-header">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() ? (
                        <div className={`sort ${header.column.getIsSorted()} ml-2 mb-0.5`}>
                          {header.column.getIsSorted() === 'desc' ? (
                            <ChevronDownIcon className="w-3 h-3" stroke-width="2" />
                          ) : (
                            <ChevronUpIcon className="w-3 h-3" stroke-width="2" />
                          )}
                        </div>
                      ) : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row, index) => {
              const even = index % 2;
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className={(even ? evenRowsClassname : oddRowsClassname) || 'bg-base-200'}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          className="justify-end text-neutral-400 normal-case font-normal text-sm mt-2 mb-2"
          currentIndex={pageIndex}
          pageSize={pageSize}
          totalCount={totalCount}
          pageCount={getPageCount()}
          onPrev={previousPage}
          onNext={nextPage}
        />
      </div>
    </>
  );
};
export default Table;
