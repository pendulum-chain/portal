import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import {
  ColumnDef,
  Row,
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
  /** Adds a title to be included in the Table header, you can indicate a text or an Element. */
  title?: string | JSX.Element;
  /** Sets the global font size for the Table. */
  fontSize?: string;
  /** Sets the global font size for the Table. */
  rowCallback?: (row: Row<T>, index: number) => void;
  /** If true, the table will have fixed columns */
  tableFixed?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultData: any[] = [];
const loading = <>{repeat(<Skeleton className="mb-2 h-8" />, 6)}</>;

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
  fontSize,
  title,
  rowCallback,
  tableFixed,
}: TableProps<T>): JSX.Element | null => {
  const totalCount = data.length;

  const initialSort = useMemo(() => {
    return sortBy
      ? Object.keys(sortBy).map((columnName) => ({ id: columnName, desc: sortBy[columnName] === SortingOrder.DESC }))
      : undefined;
  }, [sortBy]);

  const { getHeaderGroups, getRowModel, getPageCount, nextPage, previousPage, setGlobalFilter, getState, setSorting } =
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
        <div className="mb-2 flex flex-row flex-wrap gap-2">
          <div className="ml-auto">
            <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
          </div>
        </div>
      ) : null}
      <div
        className={`table-container table-border overflow-x-auto rounded-lg border border-base-300 bg-base-200 ${
          fontSize || 'text-sm'
        } font-semibold ${className})`}
      >
        {title && <div className="bg-base-200 px-4 py-6 text-lg">{title}</div>}
        <table className={`table w-full ${tableFixed ? 'table-fixed' : ''}`}>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="table-border border-b">
                {headerGroup.headers.map((header) => {
                  const isSortable = header.column.getCanSort();
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={`${isSortable ? 'cursor-pointer' : ''}`}
                      onClick={() => {
                        if (isSortable) {
                          const currentSort = header.column.getIsSorted();
                          setSorting([
                            {
                              id: header.column.id,
                              desc: currentSort === 'asc',
                            },
                          ]);
                        }
                      }}
                    >
                      <div
                        className={`flex flex-row items-center font-normal ${
                          fontSize || 'text-sm'
                        } table-header normal-case ${header.column.columnDef.meta?.className || ''}`}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {isSortable ? (
                          <div className={`sort ${header.column.getIsSorted()} mb-0.5 ml-2`}>
                            {header.column.getIsSorted() === 'desc' ? (
                              <ChevronDownIcon className="h-3 w-3" stroke-width="2" />
                            ) : (
                              <ChevronUpIcon className="h-3 w-3" stroke-width="2" />
                            )}
                          </div>
                        ) : null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                onClick={rowCallback ? () => rowCallback(row, index) : undefined}
                className={rowCallback && 'highlighted-row cursor-pointer'}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className={`${cell.column.columnDef.meta?.className || ''} ${
                        (index % 2 ? evenRowsClassname : oddRowsClassname) || 'bg-base-200'
                      } ${tableFixed ? 'table-fixed' : ''}`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          className="mb-2 mt-2 justify-end text-sm font-normal normal-case text-neutral-400"
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
