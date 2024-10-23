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
import { NablaFootnote } from '../common/NablaFootnote';
import { SwapAssetsButton } from '../../SwapAssetsButton';

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

  return (
    <>
      <Card bordered className="shadow-0 w-full max-w-xl bg-base-200">
        <FormProvider {...form}>
          <form className="card-body text-neutral-800 dark:text-neutral-200" onSubmit={onSubmit}>
            <div className="mb-2 flex justify-between">
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
              form={form}
              fromToken={fromToken}
              fromAmount={fromAmount}
              fromFormFieldName="fromAmount"
              fromTokenBalance={fromTokenBalance}
              onOpenSelector={() => setModalType('from')}
              inputHasError={inputHasErrors}
            />
            <SwapAssetsButton
              onClick={() => {
                toToken && onFromChange(toToken.id);
              }}
            />
            <To
              fromToken={fromToken}
              fromAmount={fromAmount}
              toToken={toToken}
              toAmountQuote={
                inputHasErrors ? { enabled: false, data: undefined, error: null, isLoading: false } : toAmountQuote
              }
              onOpenSelector={() => setModalType('to')}
              slippage={slippage}
            />
            <Validation className="mb-2 text-center" errors={errors} />
            <div className="mt-6">
              <ApprovalSubmit token={fromToken} disabled={!submitEnabled} fromAmount={fromAmount} />
            </div>
          </form>
        </FormProvider>
      </Card>
      <NablaFootnote />
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
