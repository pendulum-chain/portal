import { Button, Card } from 'react-daisyui';
import ModalProvider, { useModalToggle } from '../../../../services/modal';
import { Skeleton } from '../../../Skeleton';
import { useNablaInstance } from '../../../../hooks/nabla/useNablaInstance';
import { backstopPoolAbi } from '../../../../contracts/nabla/BackstopPool';
import { Erc20Balance } from '../../common/Erc20Balance';
import { BackstopPoolModals, LiquidityModalProps, ModalTypes } from './BackstopPoolModals';

const BackstopPoolsBody = (): JSX.Element | null => {
  const toggle = useModalToggle<LiquidityModalProps>();
  const { nabla, isLoading } = useNablaInstance();

  if (isLoading) return <Skeleton className="bg-neutral-200 h-48 w-full" />;
  const pool = nabla?.backstopPool;
  if (!pool) return <h3 className="text-center">No backstop pools</h3>;

  // TODO Torsten: also show the complete share and the percentage here
  return (
    <>
      <div className="text-[initial] dark:text-neutral-200 center gap-4 w-full">
        <Card bordered className="w-full max-w-xl bg-base-200">
          <div className="card-body p-4 md:p-6">
            <div className="flex items-center justify-between gap-2 text-3xl">
              <h2>My pool balance</h2>
              <div>
                <Erc20Balance
                  abi={backstopPoolAbi}
                  erc20ContractDefinition={{
                    contractAddress: pool.id,
                    decimals: pool.lpTokenDecimals,
                    symbol: pool.symbol,
                  }}
                />
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
                color="secondary"
                onClick={() =>
                  toggle({
                    type: ModalTypes.WithdrawLiquidity,
                  })
                }
              >
                Withdraw
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <BackstopPoolModals />
    </>
  );
};

const BackstopPools = (): JSX.Element | null => {
  return (
    <ModalProvider>
      <BackstopPoolsBody />
    </ModalProvider>
  );
};

export default BackstopPools;
