import { Button, Card } from 'react-daisyui';
import ModalProvider, { useModalToggle } from '../../../../services/modal';
import { Skeleton } from '../../../Skeleton';
import { useNablaInstance } from '../../../../hooks/nabla/useNablaInstance';
import { backstopPoolAbi } from '../../../../contracts/nabla/BackstopPool';
import { Erc20Balance } from '../../common/Erc20Balance';
import { BackstopPoolModals, LiquidityModalProps } from './BackstopPoolModals';
import { NablaFootnote } from '../../common/NablaFootnote';
import { useGlobalState } from '../../../../GlobalStateProvider';

const BackstopPoolsBody = (): JSX.Element | null => {
  const toggle = useModalToggle<LiquidityModalProps>();
  const { nabla, isLoading } = useNablaInstance();

  const { walletAccount } = useGlobalState();

  if (isLoading) return <Skeleton className="bg-neutral-200 h-48 w-full" />;
  const pool = nabla?.backstopPool;
  if (!pool) return <h3 className="text-center">No backstop pools</h3>;

  return (
    <>
      <div className="text-[initial] dark:text-neutral-200 center w-full">
        <Card bordered className="w-full max-w-xl bg-base-200">
          <div className="card-body p-4 md:p-6">
            <div className="flex items-center justify-between gap-2 text-3xl">
              <h2>My pool balance</h2>
              {walletAccount ? (
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
              ) : (
                <span>0</span>
              )}
            </div>
            <div className="flex flex-col items-center gap-2 mt-4">
              <Button
                className="w-full"
                color="primary"
                onClick={() =>
                  toggle({
                    type: 'AddLiquidity',
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
                    type: 'WithdrawLiquidity',
                  })
                }
              >
                Withdraw
              </Button>
            </div>
          </div>
        </Card>
        <NablaFootnote />
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
