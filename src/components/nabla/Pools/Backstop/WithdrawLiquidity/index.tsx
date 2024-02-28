import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, useMemo } from 'preact/compat';
import { Button, Range } from 'react-daisyui';
import { PoolProgress } from '../..';
import { BackstopPool } from '../../../../../../gql/graphql';
import { backstopPoolAbi } from '../../../../../contracts/nabla/BackstopPool';
import { calcSharePercentage, getPoolSurplus, minMax } from '../../../../../helpers/calc';
import { useBackstopPool } from '../../../../../hooks/nabla/useBackstopPool';
import { FixedU128Decimals, nativeToDecimal, roundNumber } from '../../../../../shared/parseNumbers/metric';
import { AssetSelectorModal } from '../../../../Asset/Selector/Modal';
import { numberLoader } from '../../../../Loader';
import FormLoader from '../../../../Loader/Form';
import TransactionProgress from '../../../../Transaction/Progress';
import { TransactionSettingsDropdown } from '../../../../Transaction/Settings';
import TokenAmount from '../../TokenAmount';
import { useWithdrawLiquidity } from './useWithdrawLiquidity';

export type WithdrawLiquidityProps = {
  data: BackstopPool;
};

const filter = (pool: BackstopPool): BackstopPool => {
  const filteredPools = pool.router.swapPools?.filter((pool) => !!getPoolSurplus(pool));
  return {
    ...pool,
    router: {
      ...pool.router,
      swapPools: filteredPools,
    },
  };
};

const WithdrawLiquidityBody = ({ data }: WithdrawLiquidityProps): JSX.Element | null => {
  const {
    toggle,
    balanceQuery,
    depositQuery,
    form: { register, setValue },
    amount,
    pools,
    selectedPool,
    tokenModal,
    backstopWithdraw: bpw,
    swapPoolWithdraw: spw,
    isSwapPoolWithdraw,
    updateStorage,
    onSubmit,
  } = useWithdrawLiquidity(data);
  const isIdle = bpw.mutation.isIdle && spw.mutation.isIdle;
  const isLoading = bpw.mutation.isLoading || spw.mutation.isLoading;
  const deposit = depositQuery.balance || 0;
  const withdrawLimit = nativeToDecimal(spw.withdrawLimit?.toString() || 0, FixedU128Decimals).toNumber();

  const hideCss = !isIdle ? 'hidden' : '';
  return (
    <div className="text-[initial] dark:text-neutral-200">
      <TransactionProgress
        mutation={bpw.mutation.isLoading ? bpw.mutation : spw.mutation}
        onClose={() => {
          bpw.mutation.reset();
          spw.mutation.reset();
        }}
      >
        <PoolProgress symbol={data.token.symbol} amount={amount} />
      </TransactionProgress>
      <div className={`flex items-center gap-2 mb-8 mt-2 ${hideCss}`}>
        <Button size="sm" color="ghost" className="px-2" type="button" onClick={() => toggle(undefined)}>
          <ArrowLeftIcon className="w-4 h-4 dark:text-neutral-400" />
        </Button>
        <h3 className="text-3xl font-normal">Withdraw {data.token.symbol}</h3>
      </div>
      <div className={hideCss}>
        <form onSubmit={onSubmit}>
          <div className="flex justify-between align-end text-sm text-initial my-3">
            <p>
              Deposited:{' '}
              {depositQuery.isLoading ? (
                numberLoader
              ) : (
                <span
                  role="button"
                  onClick={() =>
                    setValue('amount', deposit, {
                      shouldDirty: true,
                      shouldTouch: true,
                    })
                  }
                >{`${depositQuery.formatted || 0} LP`}</span>
              )}
            </p>
            <p className="text-neutral-500 dark:text-neutral-400 text-right">
              Balance: {balanceQuery.isLoading ? numberLoader : `${balanceQuery.formatted || 0} ${data.token.symbol}`}
            </p>
          </div>
          <div className="relative rounded-lg bg-neutral-100 dark:bg-neutral-700 p-4">
            {isSwapPoolWithdraw && (
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="mr-1">Withdraw limit:</span>
                  {spw.isLoading ? numberLoader : <>{withdrawLimit} LP</>}
                </div>
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                <input
                  autoFocus
                  className="input-ghost w-full text-4xl font-2 py-3 px-0"
                  placeholder="Amount"
                  max={deposit}
                  {...register('amount')}
                />
                <Button
                  className="bg-neutral-200 dark:bg-neutral-800 px-2 rounded-2xl"
                  size="sm"
                  type="button"
                  onClick={tokenModal[1].setTrue}
                >
                  <strong className="font-bold">{selectedPool.token.symbol}</strong>
                  <ChevronDownIcon className="w-4 h-4 inline" />
                </Button>
                <TransactionSettingsDropdown
                  setSlippage={(slippage) => {
                    setValue('slippage', slippage);
                    updateStorage({ slippage });
                  }}
                  slippageProps={register('slippage', {
                    valueAsNumber: true,
                    onChange: (ev) =>
                      updateStorage({
                        slippage: Number(ev.currentTarget.value),
                      }),
                  })}
                />
              </div>
            </div>
            <Range
              color="primary"
              min={0}
              max={100}
              size="sm"
              value={amount ? (amount / deposit) * 100 : 0}
              onChange={(ev: ChangeEvent<HTMLInputElement>) =>
                setValue('amount', (Number(ev.currentTarget.value) / 100) * deposit, {
                  shouldDirty: true,
                  shouldTouch: false,
                })
              }
            />
          </div>
          <div className="relative flex w-full flex-col gap-4 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-300 p-4 mt-4">
            <div className="flex items-center justify-between">
              <div>Amount</div>
              <div>
                <TokenAmount
                  address={data.id}
                  abi={backstopPoolAbi}
                  amount={amount}
                  symbol={` ${data.token.symbol}`}
                  fallback={0}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>Deposit</div>
              <div>{roundNumber(deposit || 0)} LP</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Pool share</div>
              <div>
                {minMax(
                  calcSharePercentage(nativeToDecimal(data.totalSupply || 0, FixedU128Decimals).toNumber(), deposit),
                )}
                %
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Button color="primary" className="w-full" type="submit" disable={isLoading}>
              Withdraw
            </Button>
            <Button color="secondary" className="mt-2 w-full" type="button" onClick={() => toggle()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
      <AssetSelectorModal
        assets={pools}
        open={tokenModal[0]}
        onSelect={(value) => {
          setValue('address', value.id && value.id.length > 5 ? value.id : null);
          tokenModal[1].setFalse();
        }}
        map={(pool) => pool.token}
        selected={selectedPool.token.id}
        onClose={tokenModal[1].setFalse}
      />
    </div>
  );
};

const WithdrawLiquidity = ({ data }: WithdrawLiquidityProps) => {
  const { data: pool, isLoading } = useBackstopPool(data.id);
  const filtered = useMemo(() => (pool ? filter(pool) : pool), [pool]);

  if (isLoading) return <FormLoader inputs={2} className="mt-8" />;
  if (!filtered) return <>Nothing found</>;
  return <WithdrawLiquidityBody data={filtered} />;
};

export default WithdrawLiquidity;
