import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Button } from 'react-daisyui';
import { PoolProgress } from '../..';
import { calcSharePercentage } from '../../../../../helpers/calc';
import { rawToDecimal, stringifyBigWithSignificantDecimals } from '../../../../../shared/parseNumbers/metric';
import { Validation } from '../../../../Form/Validation';
import { NumberLoader } from '../../../../Loader';
import { SwapPoolColumn } from '../columns';
import { useRedeem } from './useRedeem';
import { TransactionProgress } from '../../../common/TransactionProgress';
import { NablaTokenPrice } from '../../../common/NablaTokenPrice';
import { FormProvider } from 'react-hook-form';
import { TransactionSettingsDropdown } from '../../../common/TransactionSettingsDropdown';
import { TokenBalance } from '../../../common/TokenBalance';
import { AmountSelector } from '../../../common/AmountSelector';
import { useGlobalState } from '../../../../../GlobalStateProvider';
import OpenWallet from '../../../../Wallet';

export type RedeemLiquidityValues = {
  amount: number;
  slippage?: number | null;
};

export interface RedeemProps {
  data: SwapPoolColumn;
  onClose: () => void;
}

const Redeem = ({ data, onClose }: RedeemProps): JSX.Element | null => {
  const { toggle, mutation, onSubmit, updateStorage, balanceQuery, depositQuery, amountString, form, withdrawalQuote } =
    useRedeem(data);

  const { walletAccount } = useGlobalState();

  const {
    register,
    setValue,
    formState: { errors },
  } = form;

  const totalSupplyOfLpTokens = rawToDecimal(data.totalSupply, data.token.decimals);
  const submitEnabled = !withdrawalQuote.isLoading && withdrawalQuote.enabled && Object.keys(errors).length === 0;

  const hideCss = !mutation.isIdle ? 'hidden' : '';
  return (
    <div className="text-[initial] dark:text-neutral-200">
      <TransactionProgress
        mutation={mutation}
        onClose={() => {
          mutation.reset();
          onClose();
        }}
      >
        <PoolProgress symbol={data.symbol} amount={amountString} />
      </TransactionProgress>
      <div className={hideCss}>
        <div className="absolute top-0 mb-8 mt-2 flex translate-y-2/4 items-center gap-2">
          <Button size="sm" color="ghost" className="px-2" type="button" onClick={() => toggle()}>
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <h3 className="text-3xl font-normal">Redeem from Backstop Pool</h3>
        </div>
        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
            {walletAccount && (
              <div className="align-end text-initial my-3 flex justify-between text-sm">
                <p>
                  Deposited: <TokenBalance query={depositQuery} symbol={data.symbol}></TokenBalance>
                </p>
                <p className="text-right text-neutral-500">
                  Balance: <TokenBalance query={balanceQuery} symbol={data.backstopPool.token.symbol}></TokenBalance>
                </p>
              </div>
            )}
            <AmountSelector maxBalance={depositQuery.data} formFieldName="amount" form={form}>
              <div className="flex items-center pt-2">
                <div className="mr-2 flex flex-grow items-center justify-between">
                  <div>You will withdraw</div>
                  <TokenBalance
                    query={withdrawalQuote}
                    symbol={data.backstopPool.token.symbol}
                    significantDecimals={4}
                  ></TokenBalance>
                </div>
                <TransactionSettingsDropdown
                  setSlippage={(slippage) => {
                    setValue('slippage', slippage);
                    updateStorage({ slippage });
                  }}
                  slippageProps={register('slippage', {
                    valueAsNumber: true,
                    onChange: (ev) =>
                      updateStorage({
                        slippage: Number(ev.currentTarget.value),
                      }),
                  })}
                />
              </div>
            </AmountSelector>
            <Validation className="mt-2 text-center" errors={errors} />
            <div className="relative mt-4 flex w-full flex-col gap-4 rounded-lg bg-base-300 p-4 text-neutral-500 dark:text-neutral-300">
              <div className="flex items-center justify-between">
                <div>Security fee</div>
                <div>{(data.insuranceFeeBps / 100).toFixed(2)}%</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Price</div>
                <div>
                  <NablaTokenPrice
                    address={data.backstopPool.token.id}
                    prefix={`1 ${data.backstopPool.token.symbol} = `}
                    fallback="-"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>Total swap pool LP tokens</div>
                <div>
                  {stringifyBigWithSignificantDecimals(totalSupplyOfLpTokens, 2)} {data.symbol}
                </div>
              </div>
              {walletAccount && (
                <div className="flex items-center justify-between">
                  <div>Your swap pool share</div>
                  <div>
                    {depositQuery.data === undefined ? (
                      <NumberLoader />
                    ) : (
                      calcSharePercentage(totalSupplyOfLpTokens, depositQuery.data.preciseBigDecimal)
                    )}
                    %
                  </div>
                </div>
              )}
            </div>
            <div className="mt-2">
              <div className="text-center">
                <button
                  type="button"
                  onClick={() =>
                    toggle({
                      type: 'WithdrawLiquidity',
                      props: { data },
                    })
                  }
                  className="btn btn-link mb-2 text-center"
                >
                  Withdraw from swap pool
                </button>
              </div>
              {walletAccount ? (
                <Button
                  color="primary"
                  className="w-full"
                  loading={withdrawalQuote.isLoading}
                  type="submit"
                  disabled={!submitEnabled}
                >
                  Redeem
                </Button>
              ) : (
                <OpenWallet />
              )}
              <Button
                color="secondary"
                className="mt-2 w-full"
                type="button"
                disabled={mutation.isLoading}
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
export default Redeem;
