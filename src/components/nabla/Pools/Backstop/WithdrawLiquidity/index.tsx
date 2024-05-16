import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useMemo, useState } from 'preact/compat';
import { Button } from 'react-daisyui';
import { PoolProgress } from '../..';
import { calcSharePercentage, getPoolSurplusNativeAmount } from '../../../../../helpers/calc';
import { rawToDecimal, stringifyBigWithSignificantDecimals } from '../../../../../shared/parseNumbers/metric';
import Validation from '../../../../Form/Validation';
import { NumberLoader } from '../../../../Loader';
import FormLoader from '../../../../Loader/Form';
import { useWithdrawLiquidity } from './useWithdrawLiquidity';
import { NablaInstance, NablaInstanceSwapPool, useNablaInstance } from '../../../../../hooks/nabla/useNablaInstance';
import { TransactionProgress } from '../../../common/TransactionProgress';
import { FormProvider } from 'react-hook-form';
import { TransactionSettingsDropdown } from '../../../common/TransactionSettingsDropdown';
import { PoolSelectorModal } from '../../../common/PoolSelectorModal';
import { TokenBalance } from '../../../common/TokenBalance';
import { AmountSelector } from '../../../common/AmountSelector';

const WithdrawLiquidityBody = ({ nabla }: { nabla: NablaInstance }): JSX.Element | null => {
  const [showTokenModal, setShowTokenModal] = useState(false);
  const {
    form,
    amountString,
    backstopWithdraw,
    backstopDrain,
    balanceQuery,
    depositQuery,
    selectedPool,
    tokenToReceive,
    withdrawalQuote,
    toggle,
    onSubmit,
    updateStorage,
  } = useWithdrawLiquidity(nabla);

  const {
    register,
    setValue,
    formState: { errors },
  } = form;

  const isIdle = backstopWithdraw.mutation.isIdle && backstopDrain.mutation.isIdle;

  const hideCss = !isIdle ? 'hidden' : '';

  const backstopPool = nabla.backstopPool;
  const totalSupplyOfLpTokens = rawToDecimal(backstopPool.totalSupply, backstopPool.token.decimals);
  const poolToWithdraw = selectedPool ?? backstopPool;

  const submitEnabled = !withdrawalQuote.isLoading && withdrawalQuote.enabled && Object.keys(errors).length === 0;

  return (
    <div className="text-[initial] dark:text-neutral-200">
      <TransactionProgress
        mutation={!backstopWithdraw.mutation.isIdle ? backstopWithdraw.mutation : backstopDrain.mutation}
        onClose={() => {
          backstopWithdraw.mutation.reset();
          backstopDrain.mutation.reset();
        }}
      >
        <PoolProgress symbol={backstopPool.symbol} amount={amountString} />
      </TransactionProgress>
      <h3 className={`flex items-center gap-2 mb-8 mt-2 ${hideCss}`}>
        <Button size="sm" color="ghost" className="px-2" type="button" onClick={() => toggle()}>
          <ArrowLeftIcon className="w-4 h-4 dark:text-neutral-400" />
        </Button>
        <span className="text-3xl font-normal ">Withdraw from</span>
        <Button
          className="bg-neutral-200 dark:bg-neutral-800 px-2 rounded-2xl"
          size="sm"
          type="button"
          onClick={() => setShowTokenModal(true)}
        >
          <strong className="font-bold">
            {selectedPool === undefined ? 'Backstop Pool' : `Swap Pool ${selectedPool.token.symbol}`}
          </strong>
          <ChevronDownIcon className="w-4 h-4 inline" />
        </Button>
      </h3>
      <div className={hideCss}>
        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
            <div className="flex justify-between align-end text-sm text-initial my-3">
              <p>
                Deposited: <TokenBalance query={depositQuery} symbol={backstopPool.symbol}></TokenBalance>
              </p>
              <p className="text-neutral-500 dark:text-neutral-400 text-right">
                Balance: <TokenBalance query={balanceQuery} symbol={tokenToReceive.symbol}></TokenBalance>
              </p>
            </div>
            <AmountSelector maxBalance={depositQuery.data} formFieldName="amount" form={form}>
              <div className="flex items-start justify-start pt-2">
                <div className="flex-grow">
                  <div className="flex items-center justify-between flex-grow mr-2">
                    <div>You will withdraw</div>
                    <TokenBalance
                      query={withdrawalQuote}
                      symbol={poolToWithdraw.token.symbol}
                      significantDecimals={2}
                    ></TokenBalance>
                  </div>
                  <div className="text-neutral-500 text-sm dark:text-neutral-400 flex items-center justify-between flex-grow mr-2">
                    <div>Your current balance</div>
                    <TokenBalance query={balanceQuery} symbol={tokenToReceive.symbol}></TokenBalance>
                  </div>
                </div>
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
            </AmountSelector>
            <Validation className="text-center mt-2" errors={errors} />
            <div className="relative flex w-full flex-col gap-4 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-300 p-4 mt-4">
              <div className="flex items-center justify-between">
                <div>Total backstop pool LP tokens</div>
                <div>
                  {stringifyBigWithSignificantDecimals(totalSupplyOfLpTokens, 2)} {backstopPool.symbol}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>Your backstop pool share</div>
                <div>
                  {depositQuery.data === undefined ? (
                    <NumberLoader />
                  ) : (
                    calcSharePercentage(totalSupplyOfLpTokens, depositQuery.data.preciseBigDecimal)
                  )}
                  %
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button color="primary" className="w-full" type="submit" disabled={!submitEnabled}>
                Withdraw
              </Button>
              <Button color="secondary" className="mt-2 w-full" type="button" onClick={() => toggle()}>
                Cancel
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
      <PoolSelectorModal
        swapPools={nabla?.swapPools ?? []}
        backstopPool={backstopPool}
        open={showTokenModal}
        onSelect={({ type, pool }) => {
          setValue('address', type === 'backstopPool' ? undefined : pool.id);
          setShowTokenModal(false);
        }}
        selected={selectedPool ? { type: 'swapPool', poolAddress: selectedPool.id } : { type: 'backstopPool' }}
        onClose={() => setShowTokenModal(false)}
      />
    </div>
  );
};

function filter(swapPools: NablaInstanceSwapPool[]): NablaInstanceSwapPool[] {
  return swapPools?.filter((pool) => getPoolSurplusNativeAmount(pool) > 0n);
}

function WithdrawLiquidity() {
  const { nabla, isLoading } = useNablaInstance();

  const filteredNabla = useMemo(
    () =>
      nabla
        ? {
            ...nabla,
            swapPools: filter(nabla.swapPools),
          }
        : undefined,
    [nabla],
  );

  if (isLoading) return <FormLoader inputs={2} className="mt-8" />;

  if (!filteredNabla) return <>Nothing found</>;

  return <WithdrawLiquidityBody nabla={filteredNabla} />;
}

export default WithdrawLiquidity;
