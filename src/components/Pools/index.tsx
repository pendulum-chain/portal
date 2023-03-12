import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columns, SwapPoolColumn } from './columns';
import { GlobalFilter } from './GlobalFilter';

export type PoolsProps = {
  data?: SwapPoolColumn[];
  pageSize?: number;
  search?: boolean;
};

const mockData = [
  {
    address: 1,
    name: 'TEST',
    apr: 20,
    coverage: 5,
  },
  {
    address: 2,
    name: 'TEST 2',
    apr: 17,
  },
];

const Pools = ({
  data = mockData,
  pageSize: ps = 25,
  search = true,
}: PoolsProps): JSX.Element | null => {
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

  return (
    <>
      <div className="flex flex-wrap flex-row gap-2 mb-2">
        <div className="ml-auto">
          {search ? (
            <GlobalFilter
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          ) : null}
        </div>
      </div>
      <div className="border rounded-lg overflow-x-auto">
        <table className="table w-full">
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
                    <div className="flex flex-row font-sm text-gray-400 normal-case font-semibold">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {header.column.getCanSort() ? (
                        <div
                          className={`sort ${header.column.getIsSorted()} ml-2 text-gray-400 mt-0.5`}
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
                <div className="flex items-center justify-end text-gray-400 normal-case font-normal">
                  <span className="mr-2">
                    {pageIndex * pageSize || 1} -{' '}
                    {Math.min((pageIndex + 1) * pageSize, totalCount)} of{' '}
                    {totalCount}
                  </span>
                  <button
                    className="btn btn-sm btn-circle btn-ghost px-2"
                    onClick={previousPage}
                    disabled={pageIndex === 0}
                  >
                    <ChevronLeftIcon className="w-4 h-4" stroke-width="2.6" />
                  </button>
                  <button
                    className="btn btn-sm btn-circle btn-ghost px-2"
                    onClick={nextPage}
                    disabled={pageIndex + 1 >= getPageCount()}
                  >
                    <ChevronRightIcon className="w-4 h-4" stroke-width="2.6" />
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};
export default Pools;
