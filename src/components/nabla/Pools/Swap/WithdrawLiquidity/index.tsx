import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ChangeEvent } from 'preact/compat';
import { Button, Range } from 'react-daisyui';
import { PoolProgress } from '../..';
import { swapPoolAbi } from '../../../../../contracts/nabla/SwapPool';
import { calcSharePercentage, minMax } from '../../../../../helpers/calc';
import { FixedU128Decimals, nativeToDecimal, roundNumber } from '../../../../../shared/parseNumbers/metric';
import { numberLoader } from '../../../../Loader';
import TransactionProgress from '../../../../Transaction/Progress';
import TokenAmount from '../../TokenAmount';
import { SwapPoolColumn } from '../columns';
import { ModalTypes } from '../Modals/types';
import { useWithdrawLiquidity } from './useWithdrawLiquidity';

export interface WithdrawLiquidityProps {
  data: SwapPoolColumn;
}

const WithdrawLiquidity = ({ data }: WithdrawLiquidityProps): JSX.Element | null => {
  const {
    toggle,
    mutation,
    onSubmit,
    balanceQuery,
    depositQuery,
    amount,
    form: { register, setValue },
  } = useWithdrawLiquidity(data.id, data.token.id);
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
        <form onSubmit={onSubmit}>
          <div className="flex justify-between align-end text-sm text-initial my-3">
            <p>Deposited: {depositQuery.isLoading ? numberLoader : `${depositQuery.formatted || 0} LP`}</p>
            <p className="text-neutral-500 text-right">
              Balance: {balanceQuery.isLoading ? numberLoader : `${balanceQuery.formatted || 0} ${data.token.symbol}`}
            </p>
          </div>
          <div className="relative rounded-lg bg-neutral-100 dark:bg-neutral-700 p-4">
            <div className="flex items-center gap-1 justify-between mb-4">
              <input
                type="text"
                autoFocus
                className="input-ghost flex-grow w-full text-4xl font-outfit"
                placeholder="0.0"
                max={deposit}
                {...register('amount')}
              />
              <Button
                className="bg-neutral-200 dark:bg-neutral-800 px-3 rounded-2xl"
                size="sm"
                type="button"
                onClick={() =>
                  setValue('amount', deposit / 2, {
                    shouldDirty: true,
                    shouldTouch: true,
                  })
                }
              >
                50%
              </Button>
              <Button
                className="bg-neutral-200 dark:bg-neutral-800 px-3 rounded-2xl"
                size="sm"
                type="button"
                onClick={() =>
                  setValue('amount', deposit, {
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
              <div>Amount</div>
              <div>
                <TokenAmount
                  address={data.id}
                  abi={swapPoolAbi}
                  amount={amount}
                  symbol={` ${data.token.symbol}`}
                  fallback={0}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>Deposit</div>
              <div>{roundNumber(deposit)}</div>
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
            <div className="text-center">
              <button
                type="button"
                onClick={() =>
                  toggle({
                    type: ModalTypes.Redeem,
                    props: { data },
                  })
                }
                className="btn btn-link mb-2 text-center"
              >
                Redeem from backstop pool
              </button>
            </div>
            <Button color="primary" className="w-full" type="submit">
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
          </div>
        </form>
      </div>
    </div>
  );
};
export default WithdrawLiquidity;
