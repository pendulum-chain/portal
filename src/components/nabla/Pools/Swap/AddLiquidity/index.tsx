import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Button } from 'react-daisyui';
import { PoolProgress } from '../..';
import { calcSharePercentage } from '../../../../../helpers/calc';
import { rawToDecimal, roundNumber } from '../../../../../shared/parseNumbers/metric';
import Validation from '../../../../Form/Validation';
import { NumberLoader } from '../../../../Loader';
import { SwapPoolColumn } from '../columns';
import { useAddLiquidity } from './useAddLiquidity';
import { TransactionProgress } from '../../../common/TransactionProgress';
import { TokenApproval } from '../../../common/TokenApproval';
import { useEffect } from 'preact/hooks';
import { NumberInput } from '../../../common/NumberInput';
import { FormProvider } from 'react-hook-form';

export interface AddLiquidityProps {
  data: SwapPoolColumn;
}

const AddLiquidity = ({ data }: AddLiquidityProps): JSX.Element | null => {
  const { toggle, mutation, onSubmit, balanceQuery, depositQuery, decimalAmount, form } = useAddLiquidity(
    data.id,
    data.token.id,
    data.token.decimals,
    data.lpTokenDecimals,
  );
  const balance = balanceQuery.balance || 0;
  const deposit = depositQuery.balance || 0;

  const {
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (balanceQuery.balance !== undefined && decimalAmount > balanceQuery.balance) {
      setError('amount', { type: 'custom', message: 'Amount exceeds balance' });
    } else {
      clearErrors('amount');
    }
  }, [decimalAmount, balanceQuery.balance, setError, clearErrors]);

  console.log(errors, Object.keys(errors));

  const hideCss = !mutation.isIdle ? 'hidden' : '';
  return (
    <div className="text-[initial] dark:text-neutral-200">
      <TransactionProgress mutation={mutation} onClose={mutation.reset}>
        <PoolProgress symbol={data.token.symbol} amount={decimalAmount} />
      </TransactionProgress>
      <div className={`flex items-center gap-2 mb-8 mt-2 ${hideCss}`}>
        <Button size="sm" color="ghost" className="px-2" type="button" onClick={() => toggle(undefined)}>
          <ArrowLeftIcon className="w-4 h-4 dark:text-neutral-400" />
        </Button>
        <h3 className="text-3xl font-normal">Confirm deposit</h3>
      </div>
      <div className={hideCss}>
        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
            <div>
              <div className="flex justify-between align-end text-sm text-initial my-3">
                <p>Deposited: {depositQuery.isLoading ? <NumberLoader /> : `${depositQuery.formatted || 0} LP`}</p>
                <p className="text-neutral-500 dark:text-neutral-400 text-right">
                  Balance:{' '}
                  {balanceQuery.isLoading ? <NumberLoader /> : `${balanceQuery.formatted || 0} ${data.token.symbol}`}
                </p>
              </div>
              <div className="relative flex gap-1 items-center rounded-lg bg-neutral-100 dark:bg-neutral-700 p-4">
                <NumberInput
                  autoFocus
                  className="input-ghost flex-grow w-full text-4xl font-outfit py-3 px-0"
                  placeholder="Amount"
                  registerName="amount"
                />
                <Button
                  className="bg-neutral-200 dark:bg-neutral-800 px-3 rounded-2xl"
                  size="sm"
                  type="button"
                  onClick={() =>
                    setValue('amount', balance / 2, {
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
                    setValue('amount', balance, {
                      shouldDirty: true,
                      shouldTouch: true,
                    })
                  }
                >
                  MAX
                </Button>
              </div>
            </div>
            <div className="relative flex w-full flex-col gap-4 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-300  p-4 mt-4">
              <div className="flex items-center justify-between">
                <div>Total deposit</div>
                <div>{depositQuery.isLoading ? <NumberLoader /> : `${roundNumber(deposit)} ${data.token.symbol}`}</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Pool Share</div>
                <div>
                  {depositQuery.isLoading ? (
                    <NumberLoader />
                  ) : (
                    calcSharePercentage(rawToDecimal(data.totalSupply || 0, data.lpTokenDecimals).toNumber(), deposit)
                  )}
                  %
                </div>
              </div>
            </div>
            <Validation className="text-center mt-2" errors={errors} />
            <div>
              <TokenApproval
                className="w-full"
                spender={data.id}
                token={data.token.id}
                decimals={data.token.decimals}
                decimalAmount={decimalAmount}
                enabled={decimalAmount > 0 && Object.keys(errors).length === 0}
              >
                <Button
                  color="primary"
                  className="w-full"
                  type="submit"
                  disabled={decimalAmount === 0 || Object.keys(errors).length > 0}
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
