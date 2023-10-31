import { Cog8ToothIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'preact/compat';
import { Button, Card } from 'react-daisyui';
import { FormProvider } from 'react-hook-form';
import { errorClass } from '../../../helpers/form';
import { AssetSelectorModal } from '../../Asset/Selector/Modal';
import { TransactionSettingsDropdown } from '../../Transaction/Settings';
import ApprovalSubmit from './Approval';
import From from './From';
import SwapProgress from './Progress';
import To from './To';
import { useSwapComponent, UseSwapComponentProps } from './useSwapComponent';

const inputCls = 'bg-neutral-100 dark:bg-neutral-900 text-right text-neutral-600 dark:text-neutral-200';

const Swap = (props: UseSwapComponentProps): JSX.Element | null => {
  const {
    tokensQuery,
    tokensModal: [modalType, setModalType],
    onFromChange,
    onToChange,
    swapMutation,
    onSubmit,
    form,
    from,
    updateStorage,
    progressClose,
  } = useSwapComponent(props);
  const {
    setValue,
    register,
    getValues,
    formState: { errors },
  } = form;
  const { tokens, tokensMap } = tokensQuery.data || {};

  const progressUi = useMemo(() => {
    if (!swapMutation.isLoading) return '';
    const { from: fromV, to: toV, fromAmount = 0, toAmount = 0 } = getValues();
    // TODO: optimize finding tokens with object map
    const fromAsset = tokensMap?.[fromV];
    const toAsset = tokensMap?.[toV];
    return (
      <p className="text-center text-neutral-500">{`Swapping ${fromAmount} ${fromAsset?.symbol} for ${toAmount} ${toAsset?.symbol}`}</p>
    );
  }, [tokensMap, getValues, swapMutation.isLoading]);

  return (
    <>
      <Card bordered className="w-full max-w-xl bg-base-200 shadow-0">
        <FormProvider {...form}>
          <form className="card-body dark:text-neutral-200 text-neutral-800" onSubmit={onSubmit}>
            <div className="flex justify-between mb-2">
              <Card.Title tag="h2" className="text-3xl font-normal">
                Swap
              </Card.Title>
              <TransactionSettingsDropdown
                setSlippage={(slippage) => {
                  setValue('slippage', slippage);
                  updateStorage({ slippage });
                }}
                slippageProps={register('slippage', {
                  onChange: (ev) =>
                    updateStorage({
                      slippage: Number(ev.currentTarget.value),
                    }),
                })}
                deadlineProps={register('deadline', {
                  valueAsNumber: true,
                  onChange: (ev) =>
                    updateStorage({
                      deadline: Number(ev.currentTarget.value),
                    }),
                })}
                button={
                  <Button color="ghost" shape="circle" className="text-neutral-600" type="button">
                    <Cog8ToothIcon className="h-8 w-8" />
                  </Button>
                }
              />
            </div>
            <From
              onOpenSelector={() => setModalType('from')}
              className={`border ${errorClass(errors.fromAmount, 'border-red-600', 'border-transparent')}`}
            />
            <To
              onOpenSelector={() => setModalType('to')}
              className={`border ${errorClass(errors.to, 'border-red-600', 'border-transparent')}`}
            />
            <div className="mt-6">
              {/* <Validation errors={errors} className="mb-2" /> */}
              <ApprovalSubmit token={from} />
            </div>
          </form>
        </FormProvider>
      </Card>
      <AssetSelectorModal
        assets={tokens}
        open={!!modalType}
        onSelect={modalType === 'from' ? onFromChange : onToChange}
        selected={modalType ? (modalType === 'from' ? getValues('from') : getValues('to')) : undefined}
        onClose={() => setModalType(undefined)}
      />
      <SwapProgress open={!swapMutation.isIdle} className="modal-top" onClose={progressClose} mutation={swapMutation}>
        {progressUi}
      </SwapProgress>
    </>
  );
};
export default Swap;
