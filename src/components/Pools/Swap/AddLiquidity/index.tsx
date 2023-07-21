import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Button } from 'react-daisyui';
import { calcSharePercentage } from '../../../../helpers/calc';
import { nativeToDecimal } from '../../../../helpers/parseNumbers';
import TokenApproval from '../../../Asset/Approval';
import { numberLoader } from '../../../Loader';
import TransactionProgress from '../../../Transaction/Progress';
import { SwapPoolColumn } from '../columns';
import { useAddLiquidity } from './useAddLiquidity';

export interface AddLiquidityProps {
  data: SwapPoolColumn;
}

const AddLiquidity = ({ data }: AddLiquidityProps): JSX.Element | null => {
  const {
    toggle,
    mutation,
    balanceQuery,
    depositQuery,
    form: { register, handleSubmit, setValue, watch },
  } = useAddLiquidity(data.address, data.asset.address);
  const amount = Number(watch('amount') || 0);
  const balance = balanceQuery.balance || 0;

  const hideCss = mutation.isLoading ? 'hidden' : '';
  return (
    <div className="text-[initial] dark:text-neutral-200">
      <TransactionProgress asset={data.asset} mutation={mutation}>
        <div className="text-3xl font-2">{amount}</div>
      </TransactionProgress>
      <div className={`flex items-center gap-2 mb-8 mt-2 ${hideCss}`}>
        <Button size="sm" color="ghost" className="px-2" type="button" onClick={() => toggle(undefined)}>
          <ArrowLeftIcon className="w-4 h-4 dark:text-neutral-400" />
        </Button>
        <h3 className="text-3xl font-normal">Confirm deposit</h3>
      </div>
      <div className={hideCss}>
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
          <div>
            <div className="flex justify-between align-end text-sm text-initial my-3">
              <p>
                Deposited:{' '}
                {depositQuery.isLoading ? numberLoader : `${depositQuery.formatted || 0} ${data.asset.symbol}`}
              </p>
              <p className="text-neutral-500 dark:text-neutral-400 text-right">
                Balance: {balanceQuery.isLoading ? numberLoader : `${balanceQuery.formatted || 0} ${data.asset.symbol}`}
              </p>
            </div>
            <div className="relative rounded-lg bg-neutral-100 dark:bg-neutral-700">
              <input
                autoFocus
                className="input-ghost w-full text-4xl font-2 py-7 px-4"
                placeholder="Amount"
                {...register('amount')}
              />
              <Button
                className="absolute bg-neutral-200 dark:bg-neutral-800 px-4 rounded-2xl right-3 top-1/2 -mt-4"
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
              <div>Fee</div>
              <div>{'! TODO'}</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Total deposit</div>
              <div>{depositQuery.isLoading ? numberLoader : `${balance + amount} ${data.asset.symbol}`}</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Pool Share</div>
              <div>
                {depositQuery.isLoading
                  ? numberLoader
                  : calcSharePercentage(nativeToDecimal(data.totalSupply || 0).toNumber() + amount, balance + amount)}
                %
              </div>
            </div>
          </div>
          <div>
            <TokenApproval className="mt-8 w-full" spender={data.address} token={data.asset.address} amount={amount}>
              <Button color="primary" className="mt-8 w-full" type="submit">
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
      </div>
    </div>
  );
};

export default AddLiquidity;
