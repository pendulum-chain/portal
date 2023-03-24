import { useQuery } from '@tanstack/react-query';
import { Card, Divider } from 'react-daisyui';
import { cacheKeys } from '../../../constants/cache';
import { BackstopPool as IBackstopPool } from '../../../models/BackstopPool';
import { assetsApi } from '../../../services/api/assets';
import { Skeleton } from '../../Skeleton';
import BackstopPoolForm from './Form';

const BackstopPools = (): JSX.Element | null => {
  // ! TODO: get backstop pool and info
  const { data, isLoading } = useQuery<IBackstopPool[] | undefined>(
    [cacheKeys.backstopPool],
    assetsApi.getBackstopPools,
  );

  return (
    <Card bordered className="w-full max-w-xl bg-base-100 shadow-xl">
      <div className="card-body text-gray-800">
        <h2 className="text-3xl font-normal mb-6">Backstop pools</h2>
        {isLoading ? (
          <Skeleton className="bg-gray-200 h-48 w-full" />
        ) : data ? (
          <>
            {data.map((pool, i) => (
              <div key={i}>
                <BackstopPoolForm pool={pool} />
                {i < data.length - 1 && <Divider className="my-8" />}
              </div>
            ))}
          </>
        ) : null}
      </div>
    </Card>
  );
};

export default BackstopPools;
