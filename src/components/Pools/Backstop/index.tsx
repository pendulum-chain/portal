import { useQuery } from '@tanstack/react-query';
import { useState } from 'preact/compat';
import { Button, Card } from 'react-daisyui';
import { cacheKeys } from '../../../constants/cache';
import { BackstopPool as IBackstopPool } from '../../../models/BackstopPool';
import { assetsApi } from '../../../services/api/assets';
import AssetBadge from '../../Asset/Badge';
import { Skeleton } from '../../Skeleton';
import BackstopPoolModal from './Modal';
import { useGlobalState } from '../../../GlobalStateProvider';
import { useNodeInfoState } from '../../../NodeInfoProvider';
import { isApiConnected } from '../../../services/api/helpers';

const BackstopPools = (): JSX.Element | null => {
  const [selected, setSelected] = useState<[boolean, 'deposit' | 'withdraw']>();
  const { walletAccount } = useGlobalState();
  const { api } = useNodeInfoState().state;
  const isConnected = isApiConnected(api);

  const enabled = !!api && !!walletAccount;
  const { data: pool, isLoading } = useQuery<IBackstopPool | undefined>(
    [cacheKeys.backstopPools],
    isConnected ? () => assetsApi.getBackstopPool(api, 'foucoco', walletAccount!.address) : () => undefined,
    {
      enabled,
    },
  );

  if (isLoading) return <Skeleton className="bg-gray-200 h-48 w-full" />;
  return (
    <>
      <div className="center gap-4 w-full">
        <Card bordered className="w-full max-w-xl bg-base-100 shadow-md">
          <div className="card-body p-4 md:p-6 text-gray-800">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">{pool?.myAmount || '0'}</div>
              <div className="flex items-center flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelected([true, 'deposit'])}>
                  Deposit
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelected([true, 'withdraw'])}>
                  Withdraw
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <BackstopPoolModal pool={selected?.[0]} type={selected?.[1]} onClose={() => setSelected(undefined)} />
    </>
  );
};

export default BackstopPools;
