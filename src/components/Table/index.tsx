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
import { VNode } from 'preact';
import { repeat } from '../../helpers/general';
import Pagination from '../Pagination';
import { Skeleton } from '../Skeleton';
import { GlobalFilter } from './GlobalFilter';

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
}: TableProps<T>): VNode | null => {
  const totalCount = data.length;
  const {
    getHeaderGroups,
    getRowModel,
    getPageCount,
    nextPage,
    previousPage,
    setGlobalFilter,
    getState,
  } = useReactTable({
    columns,
    data,
    initialState: {
      pagination: {
        pageSize: ps,
      },
    },
    autoResetAll: false,
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
            <GlobalFilter
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </div>
        </div>
      ) : null}
      <div className="border rounded-lg overflow-x-auto">
        <table className={`table w-full ${className}`}>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={`${
                      header.column.getCanSort() ? ' cursor-pointer' : ''
                    }`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex flex-row items-center font-sm text-gray-400 normal-case font-semibold">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {header.column.getCanSort() ? (
                        <div
                          className={`sort ${header.column.getIsSorted()} ml-2 text-gray-400 mb-0.5`}
                        >
                          {header.column.getIsSorted() === 'desc' ? (
                            <ChevronDownIcon
                              className="w-3 h-3"
                              stroke-width="2"
                            />
                          ) : (
                            <ChevronUpIcon
                              className="w-3 h-3"
                              stroke-width="2"
                            />
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
            {getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="bg-white border-gray-200">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t">
              <td colSpan={columns.length}>
                <Pagination
                  className="justify-end text-gray-400 normal-case font-normal"
                  currentIndex={pageIndex}
                  pageSize={pageSize}
                  totalCount={totalCount}
                  pageCount={getPageCount()}
                  onPrev={previousPage}
                  onNext={nextPage}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};
export default Table;
