import { useQuery } from '@tanstack/react-query';
import { Button, Card } from 'react-daisyui';
import { useGlobalState } from '../../../GlobalStateProvider';
import { cacheKeys } from '../../../constants/cache';
import { BackstopPool } from '../../../models/BackstopPool';
import { backstopPool } from '../../../services/mocks';
import ModalProvider, { useModalToggle } from '../../../services/modal';
import Balance from '../../Balance';
import { Skeleton } from '../../Skeleton';
import Modals from './Modals';
import { LiquidityModalProps, ModalTypes } from './Modals/types';

const BackstopPoolsBody = (): JSX.Element | null => {
  const toggle = useModalToggle<LiquidityModalProps>();
  const { tenantName } = useGlobalState();
  const { data, isLoading } = useQuery<BackstopPool[] | undefined>([cacheKeys.backstopPools, tenantName], () => {
    return backstopPool;
  });

  if (isLoading) return <Skeleton className="bg-neutral-200 h-48 w-full" />;
  const pool = data?.[0];
  if (!pool) return null; // TODO: empty state UI
  return (
    <>
      <div className="center gap-4 w-full">
        <Card bordered className="w-full max-w-xl bg-base-200">
          <div className="card-body p-4 md:p-6 text-neutral-800">
            <div className="flex items-center justify-between gap-2 text-3xl">
              <h2>My pool balance</h2>
              <div>
                <Balance address={pool.address} />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 mt-4">
              <Button
                className="w-full"
                color="primary"
                onClick={() =>
                  toggle({
                    type: ModalTypes.AddLiquidity,
                    props: { data: pool },
                  })
                }
              >
                Add Liquidity
              </Button>
              <Button
                className="w-full"
                onClick={() =>
                  toggle({
                    type: ModalTypes.WithdrawLiquidity,
                    props: { data: pool },
                  })
                }
              >
                Withdraw
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <Modals />
    </>
  );
};

const BactopPools = (): JSX.Element | null => {
  return (
    <ModalProvider>
      <BackstopPoolsBody />
    </ModalProvider>
  );
};

export default BactopPools;
