import { useQuery } from '@tanstack/react-query';
import { Card } from 'react-daisyui';
import { cacheKeys, inactiveOptions } from '../../../constants/cache';
import { BackstopPool as IBackstopPool } from '../../../models/BackstopPool';
import { Skeleton } from '../../Skeleton';
import BackstopPoolForm from './Form';

const mockData: IBackstopPool = {
  assets: [
    {
      address: '1',
      symbol: 'ETH',
      decimals: 2,
      name: 'Ethereum',
    },
    {
      address: '2',
      symbol: 'USDC',
      decimals: 2,
      name: 'USDC',
    },
    {
      address: '3',
      symbol: 'BTC',
      decimals: 2,
      name: 'Bitcoin',
    },
  ],
};

const BackstopPool = (): JSX.Element | null => {
  const { data, isLoading } = useQuery<IBackstopPool | null>(
    [cacheKeys.backstopPool],
    () => mockData,
    inactiveOptions[0],
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
