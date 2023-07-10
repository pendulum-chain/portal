import { Cog8ToothIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'preact/compat';
import { Button, Card, Dropdown, Input } from 'react-daisyui';
import { FormProvider } from 'react-hook-form';
import { errorClass } from '../../helpers/form';
import { AssetSelectorModal } from '../Asset/Selector/Modal';
import From from './From';
import Progress from './Progress';
import To from './To';
import { UseSwapComponentProps, useSwapComponent } from './useSwapComponent';

const inputCls = 'bg-neutral-100 dark:bg-neutral-900 text-right text-neutral-600 dark:text-neutral-200';

const Swap = (props: UseSwapComponentProps): JSX.Element | null => {
  const {
    tokensModal: [modalType, setModalType],
    onFromChange,
    onToChange,
    form,
    updateStorage,
    onSubmit,
    swapMutation,
  } = useSwapComponent(props);
  const {
    setValue,
    getValues,
    register,
    formState: { errors },
  } = form;

  const isSwapLoading = swapMutation.status === 'loading';
  const progressUi = useMemo(
    () =>
      isSwapLoading
        ? `Swapping ${getValues('from')} ${getValues().from} for ${getValues().toAmount} ${getValues().to}`
        : null,
    [getValues, isSwapLoading],
  );

  return (
    <>
      <Card bordered className="w-full max-w-xl bg-base-200 shadow-0">
        <FormProvider {...form}>
          <form className="card-body dark:text-neutral-200 text-neutral-800" onSubmit={onSubmit}>
            <div className="flex justify-between mb-2">
              <Card.Title tag="h2" className="text-3xl font-normal">
                Swap
              </Card.Title>
              <Dropdown vertical="bottom" end>
                <Button color="ghost" shape="circle" className="text-neutral-600" type="button">
                  <Cog8ToothIcon className="h-8 w-8" />
                </Button>
                <Dropdown.Menu
                  tabIndex={0}
                  className="p-4 shadow-lg bg-base-200 border dark:border-neutral-800 rounded-lg w-64"
                >
                  <div className="w-full">
                    <h4 className="font-semibold">Settings</h4>
                    <div className="mt-4 text-sm">
                      <div className="flex gap-2">
                        Slippage tollerance
                        <div className="tooltip" data-tip="! TODO">
                          <QuestionMarkCircleIcon className="w-5 h-5 text-neutral-500" />
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          color="primary"
                          className="px-3"
                          onClick={() => {
                            setValue('slippage', undefined);
                            updateStorage({ slippage: undefined });
                          }}
                          type="button"
                        >
                          Auto
                        </Button>
                        <div className="relative flex dark:text-neutral-400 text-neutral-600">
                          <Input
                            size="sm"
                            bordered
                            className={`${inputCls} pr-6 w-full`}
                            type="number"
                            step=".1"
                            placeholder="Auto"
                            {...register('slippage', {
                              onChange: (ev) =>
                                updateStorage({
                                  slippage: Number(ev.currentTarget.value),
                                }),
                            })}
                          />
                          <div className="absolute right-0 top-0 w-5 h-full flex items-center">%</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm">
                      <div className="flex gap-2">
                        Transaction Deadline
                        <div className="tooltip" data-tip="! TODO">
                          <QuestionMarkCircleIcon className="w-5 h-5 text-neutral-500" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Input
                          size="sm"
                          bordered
                          className={`${inputCls} w-20 pr-2`}
                          type="number"
                          placeholder="30"
                          {...register('deadline', {
                            onChange: (ev) =>
                              updateStorage({
                                deadline: Number(ev.currentTarget.value),
                              }),
                          })}
                        />
                        <span className="dark:text-neutral-400 text-neutral-600">minutes</span>
                      </div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
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
              <Button color="primary" className="w-full text-base" type="submit">
                Swap
              </Button>
            </div>
          </form>
        </FormProvider>
      </Card>
      <AssetSelectorModal
        open={!!modalType}
        onSelect={modalType === 'from' ? onFromChange : onToChange}
        selected={modalType ? (modalType === 'from' ? getValues('from') : getValues('to')) : undefined}
        onClose={() => setModalType(undefined)}
      />
      <Progress
        open={!swapMutation.isIdle}
        className="modal-top"
        onClose={swapMutation.reset}
        status={swapMutation.status}
        progress={swapMutation}
      >
        {progressUi}
      </Progress>
    </>
  );
};
export default Swap;
