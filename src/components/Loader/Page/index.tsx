import { Skeleton } from '../../Skeleton';

export const PageLoader = ({ className = '' }: { className?: string }) => (
  <div className={className}>
    <Skeleton className="mb-8 h-[300px] w-full" />
    <Skeleton className="mb-4 h-[42px] w-[50%]" />
    <Skeleton className="mb-2 h-[22px] w-[80%]" />
    <Skeleton className="mb-2 h-[22px] w-[45%]" />
    <Skeleton className="mb-2 h-[22px] w-[55%]" />
  </div>
);

export const defaultPageLoader = (
  <div className="my-8 flex justify-center">
    <PageLoader className="w-full max-w-[800px]" />
  </div>
);
