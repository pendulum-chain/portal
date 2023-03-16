import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Button, Range } from 'react-daisyui';
import pendulumIcon from '../../../../assets/pendulum-icon.svg';
import Spinner from '../../../../assets/spinner';
import { SwapPoolColumn } from '../columns';
import { ModalTypes } from '../Modals/types';
import { useWithdrawLiquidity } from './useWithdrawLiquidity';

export interface WithdrawLiquidityProps {
  data: SwapPoolColumn;
}

const WithdrawLiquidity = ({
  data,
}: WithdrawLiquidityProps): JSX.Element | null => {
  const {
    toggle,
    mutation,
    form: { register, handleSubmit, watch, setValue },
  } = useWithdrawLiquidity(data.asset.address);
  const deposited = 0;
  const balance = 120.53;
  const amount = watch('amount');

  const hideCss = mutation.isLoading ? 'hidden' : '';
  return (
    <div className="text-[initial]">
      {mutation.isLoading ? (
        <>
          <div className="flex flex-col items-center justify-center text-center mt-4 mb-10">
            <Spinner size={100} color="#ddd" />
            <h4 className="text-2xl mt-10">Waiting for Confirmation</h4>
            <p className="text-gray-500 mt-4">
              Please confirm this transaction in your wallet
            </p>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4">
            <div className="flex items-center gap-2 text-lg">
              <div className="rounded-full bg-gray-300 w-10 h-10 p-px">
                <img
                  src={pendulumIcon}
                  alt="Pendulum"
                  className="h-full w-auto"
                />
              </div>
              <div>
                <strong>{data.asset.symbol}</strong>
              </div>
            </div>
            <div className="text-3xl font-2">{amount}%</div>
          </div>
          <div className="relative flex w-full flex-col gap-4 rounded-lg bg-gray-100 text-gray-500 p-4 mt-4">
            <div className="flex items-center justify-between">
              <p>Fee</p>
              <p>0.99 USDC</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Minimum Received</p>
              <p>0.99 USDC</p>
            </div>
          </div>
        </>
      ) : null}
      <div className={hideCss}>
        <div className="flex items-center gap-2 mt-2 mb-8">
          <Button
            size="sm"
            color="ghost"
            className="px-2"
            type="button"
            onClick={() =>
              toggle({
                type: ModalTypes.Overview,
                props: { data },
              })
            }
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <h3 className="text-3xl font-normal">
            Withdraw {data.asset?.symbol}
          </h3>
        </div>
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
          <div className="flex justify-between align-end text-sm text-initial my-3">
            <p>
              Deposited: {deposited} {data.asset?.symbol}
            </p>
            <p className="text-gray-500 text-right">
              Balance: {balance} {data.asset?.symbol}
            </p>
          </div>
          <div className="relative rounded-lg bg-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl font-2">{amount}%</div>
              <Button
                className="bg-gray-200 px-4 rounded-2xl"
                size="sm"
                type="button"
                onClick={() =>
                  setValue('amount', 100, {
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
              {...register('amount')}
            />
          </div>
          <div className="relative flex w-full flex-col gap-4 rounded-lg bg-gray-100 text-gray-500 p-4 mt-4">
            <div className="flex items-center justify-between">
              <p>Amount deposit (after fee)</p>
              <p>0.99 USDC</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Fee / Penalty</p>
              <p>0.99 USDC</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Minimum Received</p>
              <p>0.99 USDC</p>
            </div>
            <div className="flex items-center justify-between">
              <p>My Remaining Deposit</p>
              <p>0.99 USDC</p>
            </div>
            <div className="flex items-center justify-between">
              <p>My Remain Pool Share</p>
              <p>0.99 USDC</p>
            </div>
          </div>
          <Button variant="primary" className="mt-8 w-full" type="submit">
            Withdraw
          </Button>
          <Button
            variant="secondary"
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
