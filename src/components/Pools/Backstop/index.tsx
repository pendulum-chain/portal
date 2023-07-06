import { useQuery } from '@tanstack/react-query';
import { useState } from 'preact/compat';
import { Button, Card } from 'react-daisyui';
import { cacheKeys } from '../../../constants/cache';
import { BackstopPool as IBackstopPool } from '../../../models/BackstopPool';
import { Skeleton } from '../../Skeleton';
import BackstopPoolModal from './Modal';

const BackstopPools = (): JSX.Element | null => {
  const [selected, setSelected] = useState<[IBackstopPool, 'deposit' | 'withdraw']>();
  // ! TODO: get backstop pool and info
  const { data, isLoading } = useQuery<IBackstopPool[] | undefined>([cacheKeys.backstopPools], () => []);

  if (isLoading) return <Skeleton className="bg-gray-200 h-48 w-full" />;
  const pool = data?.[0];
  if (!pool) return null;
  return (
    <>
      <div className="center gap-4 w-full">
        <Card bordered className="w-full max-w-xl bg-base-200">
          <div className="card-body p-4 md:p-6 text-gray-800">
            <div className="flex items-center justify-between gap-2 text-3xl">
              <h2>My pool balance</h2>
              <div>$0.78</div>
            </div>
            <div className="flex flex-col items-center gap-2 mt-4">
              <Button className="w-full" color="primary" onClick={() => setSelected([pool, 'deposit'])}>
                Add Liquidity
              </Button>
              <Button className="w-full" onClick={() => setSelected([pool, 'withdraw'])}>
                Withdraw
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <BackstopPoolModal pool={selected?.[0]} type={selected?.[1]} onClose={() => setSelected(undefined)} />
    </>
  );
};

export default BackstopPools;
