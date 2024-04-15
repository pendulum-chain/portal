import { Skeleton } from '../../components/Skeleton';

export const GasSkeleton = () => (
  <div className="w-full h-full flex justify-center items-center">
    <div className="w-3/5">
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton className="w-full h-8 mb-2" isLoading={true} key={index} />
      ))}
    </div>
  </div>
);
