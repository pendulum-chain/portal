import {
  ChevronDownIcon,
  Cog8ToothIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { Fragment, VNode } from 'preact';
import { Button, Card, Dropdown, Input } from 'react-daisyui';
import { errorClass } from '../../helpers/form';
import Progress from './Progress';
import SwapToken from './SwapToken';
import { TokenSelectorModal } from './TokenSelector';
import { useSwapComponent, UseSwapComponentProps } from './useSwapComponent';

const Swap = (props: UseSwapComponentProps): VNode | null => {
  const {
    walletAccount,
    storage,
    dropdown,
    modalState,
    onFromChange,
    onToChange,
    swapQuery,
    tokensQuery,
    submitMutation,
    form,
    progress,
  } = useSwapComponent(props);
  const {
    setValue,
    register,
    formState: { errors },
  } = form;
  const { merge } = storage;
  const [isOpen, { toggle }] = dropdown;
  const [modalType, setModalType] = modalState;
  const swapData = swapQuery.data || {};

  return (
    <>
      <Card bordered className="w-full max-w-xl bg-base-100 shadow-xl">
        <form
          className="card-body text-gray-800"
          onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))}
        >
          <div className="flex justify-between mb-2">
            <Card.Title tag="h2" className="text-3xl font-normal">
              Swap
            </Card.Title>
            <Dropdown vertical="end">
              <Button
                color="ghost"
                shape="circle"
                className="text-gray-600"
                type="button"
              >
                <Cog8ToothIcon className="h-8 w-8" />
              </Button>
              <Dropdown.Menu
                tabIndex={0}
                className="p-4 shadow-lg bg-base-100 border rounded-lg w-64"
              >
                <div className="w-full">
                  <h4 className="font-semibold">Settings</h4>
                  <div className="mt-4 text-sm">
                    <div className="flex gap-2">
                      Slippage tollerance
                      <div className="tooltip" data-tip="! TODO">
                        <QuestionMarkCircleIcon className="w-5 h-5 text-gray-500" />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="primary"
                        className="px-3"
                        onClick={() => {
                          setValue('slippage', undefined);
                          merge({ slippage: undefined });
                        }}
                        type="button"
                      >
                        Auto
                      </Button>
                      <div className="relative flex text-gray-600">
                        <Input
                          size="sm"
                          bordered
                          className={`bg-gray-100 text-right text-gray-600 pr-6 w-full`}
                          type="number"
                          step=".1"
                          placeholder="Auto"
                          {...register('slippage', {
                            onChange: (ev) =>
                              merge({
                                slippage: Number(ev.currentTarget.value),
                              }),
                          })}
                        />
                        <div className="absolute right-0 top-0 w-5 h-full flex items-center">
                          %
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-sm">
                    <div className="flex gap-2">
                      Transaction Deadline
                      <div className="tooltip" data-tip="! TODO">
                        <QuestionMarkCircleIcon className="w-5 h-5 text-gray-500" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        size="sm"
                        bordered
                        className={`bg-gray-100 text-right text-gray-600 w-20 pr-2`}
                        type="number"
                        placeholder="30"
                        {...register('deadline', {
                          onChange: (ev) =>
                            merge({
                              deadline: Number(ev.currentTarget.value),
                            }),
                        })}
                      />
                      <span className="text-gray-600">minutes</span>
                    </div>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <SwapToken
            token="ETH"
            onValueSelect={() => console.log('! TODO')}
            onOpenSelector={() => setModalType('from')}
            className={`border ${errorClass(
              errors.fromAmount,
              'border-red-600',
              'border-transparent',
            )}`}
            value={
              <input
                autoFocus
                className="input-ghost w-full text-4xl font-2"
                {...register('fromAmount', { onChange: () => undefined })}
              />
            }
          />

          <SwapToken
            token="USDC"
            onOpenSelector={() => setModalType('to')}
            isLoading={swapQuery.isLoading}
            className={`border ${errorClass(
              errors.to,
              'border-red-600',
              'border-transparent',
            )}`}
            value={120}
          >
            <Fragment>
              <div className="mt-4 h-px -mx-4 bg-gray-200" />
              <div
                className={`collapse text-gray-500 -mx-4 text-sm${
                  isOpen ? ' collapse-open' : ''
                }`}
              >
                <div
                  className="collapse-title cursor-pointer flex justify-between px-4 pt-3 pb-0"
                  onClick={toggle}
                >
                  <div className="flex items-center">
                    <div className="tooltip" data-tip="! TODO" title="! TODO">
                      <InformationCircleIcon className="w-5 h-5 mr-1" />
                    </div>
                    1 USDC = 0.00 ETH ($1.00)
                  </div>
                  <div>
                    ${swapData.price}
                    <ChevronDownIcon className="w-3 h-3 inline ml-1 -mt-px" />
                  </div>
                </div>
                <div className="collapse-content flex flex-col gap-4">
                  <div className="mt-3 h-px -mx-4 bg-gray-200" />
                  <div className="flex justify-between px-4">
                    <div>Expected Output:</div>
                    <div>{swapData.output} USDC</div>
                  </div>
                  <div className="flex justify-between px-4">
                    <div>Price Impact:</div>
                    <div>{swapData.impact}%</div>
                  </div>
                  <div className="flex justify-between px-4">
                    <div>Minimum received after slippage (0.56%):</div>
                    <div>{swapData.receive} USDC</div>
                  </div>
                  <div className="flex justify-between px-4">
                    <div>Network Fee:</div>
                    <div>{swapData.fee}</div>
                  </div>
                </div>
              </div>
            </Fragment>
          </SwapToken>
          <div className="mt-6">
            {/* <Validation errors={errors} className="mb-2" /> */}
            <Button
              variant="primary"
              className="w-full text-base"
              disabled={!walletAccount?.wallet}
              type="submit"
            >
              Swap
            </Button>
          </div>
        </form>
      </Card>
      <TokenSelectorModal
        open={!!modalType}
        className="modal-top"
        tokens={tokensQuery.data}
        onSelect={modalType === 'from' ? onFromChange : onToChange}
        selected={
          modalType === 'from' ? form.getValues().from : form.getValues().to
        }
        onClose={() => setModalType(undefined)}
        isLoading={tokensQuery.isLoading}
      />
      <Progress
        open={!!progress[0]}
        className="modal-top"
        onClose={() => progress[1](undefined)}
        status={submitMutation.status}
        transaction={progress[0]}
      />
    </>
  );
};
export default Swap;
