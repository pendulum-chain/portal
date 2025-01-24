import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export interface PaginationProps {
  className?: string;
  currentIndex: number;
  pageSize: number;
  totalCount: number;
  pageCount?: number;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination = ({
  currentIndex,
  pageSize,
  totalCount,
  pageCount,
  onPrev,
  onNext,
  className,
}: PaginationProps): JSX.Element | null => {
  const totalPages = pageCount !== undefined ? pageCount : Math.ceil(totalCount / pageSize);
  return (
    <div className={`flex items-center ${className}`}>
      <span className="mr-2">
        {currentIndex * pageSize || 1} - {Math.min((currentIndex + 1) * pageSize, totalCount)} of {totalCount}
      </span>
      <button className="btn btn-circle btn-ghost btn-sm px-2" onClick={onPrev} disabled={currentIndex === 0}>
        <ChevronLeftIcon className="h-4 w-4" strokeWidth="2.6" />
      </button>
      <button
        className="btn btn-circle btn-ghost btn-sm px-2"
        onClick={onNext}
        disabled={currentIndex + 1 >= totalPages}
      >
        <ChevronRightIcon className="h-4 w-4" strokeWidth="2.6" />
      </button>
    </div>
  );
};
export default Pagination;
