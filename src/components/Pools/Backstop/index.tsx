import { useQuery } from '@tanstack/react-query';
import { Card } from 'react-daisyui';
import { cacheKeys } from '../../../constants/cache';
import { BackstopPool } from '../../../models/BackstopPool';
import { Skeleton } from '../../Skeleton';
import BackstopPoolForm from './Form';

const BackstopPool = (): JSX.Element | null => {
  // ! TODO: get backstop pool and info
  const { data, isLoading } = useQuery<BackstopPool | undefined>(
    [cacheKeys.backstopPool],
    () => undefined,
  );

  return (
    <Card bordered className="w-full max-w-xl bg-base-100 shadow-xl">
      <div className="card-body text-gray-800">
        <h2 className="text-3xl font-normal mb-6">Backstop pool</h2>
        {isLoading ? (
          <Skeleton className="bg-gray-200 h-48 w-full" />
        ) : data ? (
          <BackstopPoolForm pool={data} />
        ) : null}
      </div>
    </Card>
  );
};

export default BackstopPool;
