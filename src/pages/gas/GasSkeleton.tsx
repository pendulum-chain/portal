import { Skeleton } from '../../components/Skeleton';

export const GasSkeleton = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="w-3/5">
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton className="mb-2 h-8 w-full" isLoading={true} key={index} />
      ))}
    </div>
  </div>
);
