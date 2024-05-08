import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Button } from 'react-daisyui';
import { Big } from 'big.js';

import { PoolProgress } from '../..';
import { rawToDecimal, stringifyBigWithSignificantDecimals } from '../../../../../shared/parseNumbers/metric';
import Validation from '../../../../Form/Validation';
import { NumberLoader } from '../../../../Loader';
import { useAddLiquidity } from './useAddLiquidity';
import { NablaInstanceBackstopPool } from '../../../../../hooks/nabla/useNablaInstance';
import { TransactionProgress } from '../../../common/TransactionProgress';
import { TokenApproval } from '../../../common/TokenApproval';
import { FormProvider } from 'react-hook-form';
import { AmountSelector } from '../../../common/AmountSelector';
import { calcSharePercentage } from '../../../../../helpers/calc';

interface AddLiquidityProps {
  data: NablaInstanceBackstopPool;
}

const AddLiquidity = ({ data }: AddLiquidityProps): JSX.Element | null => {
  const { toggle, onSubmit, mutation, poolTokenBalance, lpTokenBalance, amountString, amountBigDecimal, form } =
    useAddLiquidity(data.id, data.token.id, data.token.decimals, data.lpTokenDecimals);

  const {
    formState: { errors },
  } = form;

  const totalSupplyOfLpTokens = rawToDecimal(data.totalSupply, data.token.decimals);

  const hideCss = !mutation.isIdle ? 'hidden' : '';
  return (
    <div className="text-[initial] dark:text-neutral-200">
      <TransactionProgress mutation={mutation} onClose={mutation.reset}>
        <PoolProgress symbol={data.token.symbol} amount={amountString} />
      </TransactionProgress>
      <div className={`flex items-center gap-2 mb-8 mt-2 ${hideCss}`}>
        <Button size="sm" color="ghost" className="px-2" type="button" onClick={() => toggle(undefined)}>
          <ArrowLeftIcon className="w-4 h-4 dark:text-neutral-400" />
        </Button>
        <h3 className="text-3xl font-normal">Deposit {data.token.symbol}</h3>
      </div>
      <div className={hideCss}>
        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
            <div className="flex justify-between align-end text-sm text-initial my-3">
              <p>
                Deposited:{' '}
                <span title={lpTokenBalance?.preciseString}>
                  {lpTokenBalance === undefined ? (
                    <NumberLoader />
                  ) : (
                    `${lpTokenBalance.approximateStrings.atLeast2Decimals} ${data.symbol}`
                  )}
                </span>
              </p>
              <p className="text-neutral-500 dark:text-neutral-400 text-right">
                Balance:{' '}
                <span title={poolTokenBalance?.preciseString}>
                  {poolTokenBalance === undefined ? (
                    <NumberLoader />
                  ) : (
                    `${poolTokenBalance.approximateStrings.atLeast2Decimals} ${data.token.symbol}`
                  )}
                </span>
              </p>
            </div>
            <AmountSelector maxBalance={poolTokenBalance} formFieldName="amount" form={form} />
            {/*<div className="relative rounded-lg bg-neutral-100 dark:bg-neutral-700 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <NumberInput
                    autoFocus
                    className="input-ghost w-full flex-grow text-4xl font-outfit px-0 py-3"
                    placeholder="Amount"
                    registerName="amount"
                  />
                  <Button
                    className="bg-neutral-200 dark:bg-neutral-800 px-3 rounded-2xl"
                    size="sm"
                    type="button"
                    onClick={() => {
                      if (poolTokenBalance !== undefined) {
                        setValue('amount', poolTokenBalance.preciseBigDecimal.div(new Big('2')).toFixed(2), {
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                      }
                    }}
                  >
                    50%
                  </Button>
                  <Button
                    className="bg-neutral-200 dark:bg-neutral-800 px-3 rounded-2xl"
                    size="sm"
                    type="button"
                    onClick={() => {
                      if (poolTokenBalance !== undefined) {
                        setValue('amount', poolTokenBalance.approximateStrings.atLeast2Decimals, {
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                      }
                    }}
                  >
                    MAX
                  </Button>
                </div>
              </div>
              <Range
                color="primary"
                min={0}
                max={100}
                size="sm"
                value={
                  amountBigDecimal && poolTokenBalance
                    ? amountBigDecimal.div(poolTokenBalance.preciseBigDecimal).toNumber() * 100
                    : 0
                }
                onChange={(ev: ChangeEvent<HTMLInputElement>) => {
                  if (poolTokenBalance === undefined) return;
                  setValue(
                    'amount',
                    new Big(ev.currentTarget.value)
                      .div(new Big('100'))
                      .mul(poolTokenBalance.preciseBigDecimal)
                      .toFixed(2, 0),
                    {
                      shouldDirty: true,
                      shouldTouch: false,
                    },
                  );
                }}
              />
              </div>*/}
            <div className="relative flex w-full flex-col gap-4 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-300 p-4 mt-4">
              <div className="flex items-center justify-between">
                <div>Total deposit</div>
                <div>
                  {stringifyBigWithSignificantDecimals(totalSupplyOfLpTokens, 2)} {data.symbol}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>Pool Share</div>
                <div>
                  {lpTokenBalance === undefined ? (
                    <NumberLoader />
                  ) : (
                    calcSharePercentage(totalSupplyOfLpTokens, lpTokenBalance.preciseBigDecimal)
                  )}
                  %
                </div>
              </div>
            </div>
            <Validation className="text-center mt-2" errors={errors} />
            <div className="mt-8">
              <TokenApproval
                className="w-full"
                spender={data.id}
                token={data.token.id}
                decimals={data.token.decimals}
                decimalAmount={amountBigDecimal}
                enabled={amountBigDecimal?.gt(new Big(0)) && Object.keys(errors).length === 0}
              >
                <Button
                  color="primary"
                  className="w-full"
                  type="submit"
                  disabled={!amountBigDecimal?.gt(new Big(0)) || Object.keys(errors).length > 0}
                >
                  Deposit
                </Button>
              </TokenApproval>
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
        </FormProvider>
      </div>
    </div>
  );
};
export default AddLiquidity;
