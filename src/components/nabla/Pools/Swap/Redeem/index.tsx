import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ChangeEvent } from 'preact/compat';
import { Button, Range } from 'react-daisyui';
import { PoolProgress } from '../..';
import { config } from '../../../../../config';
import { calcSharePercentage, minMax } from '../../../../../helpers/calc';
import { rawToDecimal, roundNumber } from '../../../../../shared/parseNumbers';
import Validation from '../../../../Form/Validation';
import { numberLoader } from '../../../../Loader';
import { TransactionSettingsDropdown } from '../../../../Transaction/Settings';
import { SwapPoolColumn } from '../columns';
import { useRedeem } from './useRedeem';
import { TransactionProgress } from '../../../common/TransactionProgress';
import { NablaTokenPrice } from '../../../common/NablaTokenPrice';

export interface RedeemProps {
  data: SwapPoolColumn;
}

const Redeem = ({ data }: RedeemProps): JSX.Element | null => {
  const {
    toggle,
    mutation,
    onSubmit,
    balanceQuery,
    depositQuery,
    lpTokensDecimalAmount,
    updateStorage,
    form: {
      register,
      setValue,
      formState: { errors },
    },
  } = useRedeem(data);
  const deposit = depositQuery.balance || 0;

  const hideCss = !mutation.isIdle ? 'hidden' : '';
  return (
    <div className="text-[initial] dark:text-neutral-200">
      <TransactionProgress mutation={mutation} onClose={mutation.reset}>
        <PoolProgress symbol={data.token.symbol} amount={lpTokensDecimalAmount} />
      </TransactionProgress>
      <div className={hideCss}>
        <div className="flex items-center gap-2 mt-2 mb-8">
          <Button size="sm" color="ghost" className="px-2" type="button" onClick={() => toggle(undefined)}>
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <h3 className="text-3xl font-normal">Redeem {data.token?.symbol}</h3>
        </div>
        <form onSubmit={onSubmit}>
          <div className="flex justify-between align-end text-sm text-initial my-3">
            <p>Deposited: {depositQuery.isLoading ? numberLoader : `${depositQuery.formatted || 0} LP`}</p>
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
                max={deposit}
                {...register('amount')}
              />
              <Button
                className="bg-neutral-200 dark:bg-neutral-800 px-4 rounded-2xl"
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
            <Range
              color="primary"
              min={0}
              max={100}
              size="sm"
              value={lpTokensDecimalAmount ? (lpTokensDecimalAmount / deposit) * 100 : 0}
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
              <div>Security fee</div>
              <div>{config.backstop.securityFee * 100}%</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Price</div>
              <div>
                <NablaTokenPrice address={data.token.id} prefix={`1 ${data.token.symbol} = `} fallback="-" />
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
                  calcSharePercentage(rawToDecimal(data.totalSupply || 0, data.lpTokenDecimals).toNumber(), deposit),
                )}
                %
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Validation className="text-center mb-2" errors={errors} />
            <Button color="primary" className="w-full" type="submit">
              Redeem
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
export default Redeem;
