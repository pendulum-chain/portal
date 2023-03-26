import { useQuery } from '@tanstack/react-query';
import { useState } from 'preact/compat';
import { Button, Card } from 'react-daisyui';
import { cacheKeys } from '../../../constants/cache';
import { BackstopPool as IBackstopPool } from '../../../models/BackstopPool';
import { assetsApi } from '../../../services/api/assets';
import AssetBadge from '../../Asset/Badge';
import { Skeleton } from '../../Skeleton';
import BackstopPoolModal from './Modal';

const BackstopPools = (): JSX.Element | null => {
  const [selected, setSelected] = useState<[IBackstopPool, 'deposit' | 'withdraw']>();
  // ! TODO: get backstop pool and info
  const { data, isLoading } = useQuery<IBackstopPool[] | undefined>(
    [cacheKeys.backstopPools],
    assetsApi.getBackstopPools,
  );

  if (isLoading) return <Skeleton className="bg-gray-200 h-48 w-full" />;
  return (
    <>
      <div className="center gap-4 w-full">
        {data?.map((pool, i) => (
          <Card key={i} bordered className="w-full max-w-xl bg-base-100 shadow-md">
            <div className="card-body text-gray-800">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {pool.assets.map((asset, i) => (
                    <AssetBadge size="lg" key={i}>
                      {asset.symbol}
                    </AssetBadge>
                  ))}
                </div>
                <div className="flex items-center flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSelected([pool, 'deposit'])}>
                    Deposit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setSelected([pool, 'withdraw'])}>
                    Withdraw
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <BackstopPoolModal pool={selected?.[0]} type={selected?.[1]} onClose={() => setSelected(undefined)} />
    </>
  );
};

export default BackstopPools;
