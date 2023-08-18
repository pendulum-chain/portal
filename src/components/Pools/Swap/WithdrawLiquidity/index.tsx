import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ChangeEvent } from 'preact/compat';
import { Button, Range } from 'react-daisyui';
import { PoolProgress } from '../..';
import { calcSharePercentage } from '../../../../helpers/calc';
import { nativeToDecimal } from '../../../../shared/parseNumbers';
import { numberLoader } from '../../../Loader';
import TransactionProgress from '../../../Transaction/Progress';
import { SwapPoolColumn } from '../columns';
import { useWithdrawLiquidity } from './useWithdrawLiquidity';

export interface WithdrawLiquidityProps {
  data: SwapPoolColumn;
}

const WithdrawLiquidity = ({ data }: WithdrawLiquidityProps): JSX.Element | null => {
  const {
    toggle,
    mutation,
    balanceQuery,
    depositQuery,
    form: { register, handleSubmit, setValue, watch },
  } = useWithdrawLiquidity(data.id, data.token.id);
  const amount = Number(watch('amount') || 0);
  const balance = balanceQuery.balance || 0;
  const deposit = depositQuery.balance || 0;

  const hideCss = !mutation.isIdle ? 'hidden' : '';
  return (
    <div className="text-[initial] dark:text-neutral-200">
      <TransactionProgress mutation={mutation} onClose={mutation.reset}>
        <PoolProgress symbol={data.token.symbol} amount={amount} />
      </TransactionProgress>
      <div className={hideCss}>
        <div className="flex items-center gap-2 mt-2 mb-8">
          <Button size="sm" color="ghost" className="px-2" type="button" onClick={() => toggle(undefined)}>
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <h3 className="text-3xl font-normal">Withdraw {data.token?.symbol}</h3>
        </div>
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
          <div className="flex justify-between align-end text-sm text-initial my-3">
            <p>
              Deposited: {depositQuery.isLoading ? numberLoader : `${depositQuery.formatted || 0} ${data.token.symbol}`}
            </p>
            <p className="text-neutral-500 text-right">
              Balance: {balanceQuery.isLoading ? numberLoader : `${balanceQuery.formatted || 0} ${data.token.symbol}`}
            </p>
          </div>
          <div className="relative rounded-lg bg-neutral-100 dark:bg-neutral-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <input
                type="text"
                autoFocus
                className="input-ghost w-full text-4xl font-2"
                placeholder="0.0"
                max={depositQuery.balance || 0}
                {...register('amount')}
              />
              <Button
                className="bg-neutral-200 dark:bg-neutral-800 px-4 rounded-2xl"
                size="sm"
                type="button"
                onClick={() =>
                  setValue('amount', balance, {
                    shouldDirty: true,
                    shouldTouch: true,
                  })
                }
              >
                MAX
              </Button>
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
              <div>Fee</div>
              <div>{'! TODO'}</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Remaining deposit</div>
              <div>{deposit - amount || 0}</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Remaining pool share</div>
              <div>
                {calcSharePercentage(nativeToDecimal(data.totalSupply || 0).toNumber() - amount, deposit - amount)}%
              </div>
            </div>
          </div>
          <Button color="primary" className="mt-8 w-full" type="submit">
            Withdraw
          </Button>
          <Button
            color="secondary"
            className="mt-2 w-full"
            type="button"
            disable={mutation.isLoading}
            onClick={() => toggle()}
          >
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
};
export default WithdrawLiquidity;
