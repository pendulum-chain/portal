import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Button } from 'react-daisyui';
import pendulumIcon from '../../../../assets/pendulum-icon.svg';
import Spinner from '../../../../assets/spinner';
import { ModalTypes } from '../Modals/types';
import { SwapPoolColumn } from '../columns';
import { useAddLiquidity } from './useAddLiquidity';
import LabelledInputField from '../../../LabelledInputField';
import { Controller } from 'react-hook-form';
import { isCompatibleStellarAmount } from '../../../../helpers/stellar';

export interface AddLiquidityProps {
  data: SwapPoolColumn;
}

const AddLiquidity = ({ data }: AddLiquidityProps): JSX.Element | null => {
  // ! TODO: get pool stats, create add liquidity transaction
  const {
    toggle,
    mutation,
    form: { control, register, handleSubmit, getValues },
  } = useAddLiquidity(data.asset.address);
  const deposited = 0;
  const balance = 120.53;

  const hideCss = mutation.isLoading ? 'hidden' : '';
  return (
    <div>
      {mutation.isLoading ? (
        <>
          <div className="flex flex-col items-center justify-center text-center mt-4 mb-10">
            <Spinner size={100} color="#ddd" />
            <h4 className="text-2xl mt-10">Waiting for Confirmation</h4>
            <p className="text-secondary-content mt-4">Please confirm this transaction in your wallet</p>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-base-300 p-4">
            <div className="flex items-center gap-2 text-lg">
              <div className="rounded-full bg-base-300 w-10 h-10 p-px">
                <img src={pendulumIcon} alt="Pendulum" className="h-full w-auto" />
              </div>
              <div>
                <strong>{data.asset.symbol}</strong>
              </div>
            </div>
            <div className="text-3xl font-2">{getValues('amount')}</div>
          </div>
        </>
      ) : null}
      <div className={`flex items-center gap-2 mb-8 mt-2 ${hideCss}`}>
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
        <h3 className="text-3xl">Confirm deposit</h3>
      </div>
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <div className={hideCss}>
          <div className="flex justify-between align-end text-sm text-initial my-3">
            <p>
              Deposited: {deposited} {data.asset?.symbol}
            </p>
            <p className="text-secondary-content text-right">
              Balance: {balance} {data.asset?.symbol}
            </p>
          </div>
          <div className="relative rounded-lg bg-base-300">
            <input
              autoFocus
              className="input-ghost w-full text-4xl font-2 py-7 px-4"
              placeholder="Amount"
              {...register('amount', { onChange: () => undefined })}
            />
            <Button
              className="absolute bg-base-200 px-4 rounded-2xl right-3 top-1/2 -mt-4"
              size="sm"
              type="button"
              onClick={() => console.log('! TODO')}
            >
              MAX
            </Button>
          </div>
        </div>
        <div className="relative flex w-full flex-col gap-4 rounded-lg bg-base-300 text-secondary-content p-4 mt-4">
          <div className="flex items-center justify-between">
            <div>Effective Deposit</div>
            <div>0.99 USDC</div>
          </div>
          <div className="flex items-center justify-between">
            <div>Fee / Penalty</div>
            <div>0.99 USDC</div>
          </div>
          <div className="flex items-center justify-between">
            <div>My Total Deposits</div>
            <div>0.99 USDC</div>
          </div>
          <div className="flex items-center justify-between">
            <div>Pool Share</div>
            <div>0.99 USDC</div>
          </div>
        </div>
        <div className={hideCss}>
          <Button color="primary" className="mt-8 w-full" type="submit">
            Deposit
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
  );
};

export default AddLiquidity;
