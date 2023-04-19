import { Button, Range } from 'react-daisyui';
import { BackstopPool } from '../../../../../../models/BackstopPool';
import AssetSelector from '../../../../../Asset/Selector';
import { useBackstopPoolForm } from './useBackstopPoolForm';

export type BackstopPoolFormProps = {
  pool: BackstopPool;
};

const BackstopPoolForm = ({ pool }: BackstopPoolFormProps): JSX.Element | null => {
  const {
    mutation,
    form: {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
    },
  } = useBackstopPoolForm();
  /* const deposited = 0;
  const balance = 120.53; */
  const amount = watch('amount');

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
      <div className="relative rounded-lg bg-gray-100 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <AssetSelector
              assets={pool.assets}
              selected="! TODO"
              onSelect={(asset) =>
                setValue('address', asset.address, {
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
              className={errors.address ? 'border-red-700 bg-red-100' : ''}
              size="sm"
            />
          </div>
          <div className="flex items-center gap-2">
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
        </div>
        <Range color="primary" min={0} max={100} size="sm" {...register('amount')} />
      </div>
      <div className="relative flex w-full flex-col gap-4 rounded-lg bg-gray-100 text-gray-500 p-4 mt-4">
        <div className="flex items-center justify-between">
          <div>Fee</div>
          <div>0.99 USDC</div>
        </div>
        <div className="flex items-center justify-between">
          <div>Minimum Received</div>
          <div>0.99 USDC</div>
        </div>
      </div>
      <Button color="primary" className="mt-4 w-full" type="submit">
        Deposit
      </Button>
    </form>
  );
};
export default BackstopPoolForm;
