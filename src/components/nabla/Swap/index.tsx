import { Cog8ToothIcon } from '@heroicons/react/24/outline';
import { Button, Card } from 'react-daisyui';
import { FormProvider } from 'react-hook-form';
import ApprovalSubmit from './ApprovalSubmit';
import { From } from './From';
import { To } from './To';
import { useSwapComponent, UseSwapComponentProps } from './useSwapComponent';
import { PoolSelectorModal } from '../common/PoolSelectorModal';
import Validation from '../../Form/Validation';
import { TransactionSettingsDropdown } from '../common/TransactionSettingsDropdown';
import { SwapProgress } from '../common/SwapProgress';

const Swap = (props: UseSwapComponentProps): JSX.Element | null => {
  const {
    tokensModal: [modalType, setModalType],
    onFromChange,
    onToChange,
    swapMutation,
    onSubmit,
    form,
    updateStorage,
    progressClose,
    swapPools,
    nablaInstanceIsLoading,
    fromTokenBalance,
    fromAmountString,
    fromAmount,
    toAmountQuote,
    fromToken,
    toToken,
    slippage,
  } = useSwapComponent(props);

  const {
    setValue,
    register,
    formState: { errors },
  } = form;

  const submitEnabled = !toAmountQuote.isLoading && toAmountQuote.enabled && Object.keys(errors).length === 0;
  const inputHasErrors = errors.fromAmount?.message !== undefined || errors.root?.message !== undefined;
  console.log('submitEnabled', toAmountQuote, errors);

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
              fromToken={fromToken}
              onOpenSelector={() => setModalType('from')}
              inputHasError={inputHasErrors}
              form={form}
              fromFormFieldName="fromAmount"
              fromTokenBalance={fromTokenBalance}
            />
            <To
              toToken={toToken}
              fromToken={fromToken}
              toAmountQuote={
                inputHasErrors ? { enabled: false, data: undefined, error: null, isLoading: false } : toAmountQuote
              }
              onOpenSelector={() => setModalType('to')}
              fromAmount={fromAmount}
              slippage={slippage}
            />
            <Validation className="text-center mb-2" errors={errors} />
            <div className="mt-6">
              {/* <Validation errors={errors} className="mb-2" /> */}
              <ApprovalSubmit token={fromToken} disabled={!submitEnabled} fromAmount={fromAmount} />
            </div>
          </form>
        </FormProvider>
      </Card>
      <PoolSelectorModal
        swapPools={swapPools}
        open={!!modalType}
        onSelect={modalType === 'from' ? onFromChange : onToChange}
        selected={{
          type: 'token',
          tokenAddress: modalType ? (modalType === 'from' ? fromToken?.id : toToken?.id) : undefined,
        }}
        onClose={() => setModalType(undefined)}
        isLoading={nablaInstanceIsLoading}
      />
      <SwapProgress
        open={swapMutation.isIdle !== true && fromToken !== undefined && toToken !== undefined}
        mutation={swapMutation}
        onClose={progressClose}
      >
        <p className="text-center text-[--text]">{`Swapping ${fromAmountString} ${fromToken?.symbol} for ${toAmountQuote.data?.amountOut.approximateStrings.atLeast4Decimals} ${toToken?.symbol}`}</p>
      </SwapProgress>
    </>
  );
};
export default Swap;
