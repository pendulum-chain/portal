import { UseQueryResult } from '@tanstack/react-query';
import { Card } from 'react-daisyui';
import { BackstopPool as IBackstopPool } from '../../../models/BackstopPool';
import { Skeleton } from '../../Skeleton';
import BackstopPoolForm from './Form';

export type BackstopPoolProps = Pick<
  UseQueryResult<IBackstopPool>,
  'data' | 'isLoading'
>;

const BackstopPool = ({
  data,
  isLoading,
}: BackstopPoolProps): JSX.Element | null => {
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
