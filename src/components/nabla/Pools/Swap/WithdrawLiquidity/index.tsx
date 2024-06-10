import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Button } from 'react-daisyui';

import { PoolProgress } from '../..';
import { calcSharePercentage } from '../../../../../helpers/calc';
import { rawToDecimal, stringifyBigWithSignificantDecimals } from '../../../../../shared/parseNumbers/metric';
import Validation from '../../../../Form/Validation';
import { NumberLoader } from '../../../../Loader';
import { SwapPoolColumn } from '../columns';
import { useSwapPoolWithdrawLiquidity } from './useWithdrawLiquidity';
import { TransactionProgress } from '../../../common/TransactionProgress';
import { FormProvider } from 'react-hook-form';
import { AmountSelector } from '../../../common/AmountSelector';
import { TokenBalance } from '../../../common/TokenBalance';
import { useGlobalState } from '../../../../../GlobalStateProvider';
import OpenWallet from '../../../../Wallet';

export interface WithdrawLiquidityProps {
  data: SwapPoolColumn;
  onClose: () => void;
}

const WithdrawLiquidity = ({ data, onClose }: WithdrawLiquidityProps): JSX.Element | null => {
  const { toggle, mutation, onSubmit, balanceQuery, depositQuery, amountString, form, withdrawalQuote } =
    useSwapPoolWithdrawLiquidity(data.id, data.token.id, data.token.decimals, data.lpTokenDecimals);

  const {
    formState: { errors },
  } = form;

  const { walletAccount } = useGlobalState();

  const totalSupplyOfLpTokens = rawToDecimal(data.totalSupply, data.token.decimals);
  const backstopBurnIsPossible = BigInt(data.reserve) < BigInt(data.totalLiabilities);

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
        <div className="flex items-center gap-2 mt-2 mb-8 absolute top-0 translate-y-2/4">
          <Button size="sm" color="ghost" className="px-2" type="button" onClick={() => toggle()}>
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <h3 className="text-3xl font-normal">Withdraw {data.token?.symbol}</h3>
        </div>
        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
            {walletAccount && (
              <div className="flex justify-between align-end text-sm text-initial my-3">
                <p>
                  Deposited: <TokenBalance query={depositQuery} symbol={data.symbol}></TokenBalance>
                </p>
                <p className="text-neutral-500 text-right">
                  Balance: <TokenBalance query={balanceQuery} symbol={data.token.symbol}></TokenBalance>
                </p>
              </div>
            )}
            <AmountSelector maxBalance={depositQuery.data} formFieldName="amount" form={form}>
              <div className="flex items-center justify-between pt-2">
                <div>You will withdraw</div>
                <TokenBalance query={withdrawalQuote} symbol={data.token.symbol} significantDecimals={4}></TokenBalance>
              </div>
            </AmountSelector>
            <Validation className="text-center mt-2" errors={errors} />
            <div className="relative flex w-full flex-col gap-4 rounded-lg bg-base-300 text-neutral-500 dark:text-neutral-300 p-4 mt-4">
              <div className="flex items-center justify-between">
                <div>Total LP tokens</div>
                <div>
                  {stringifyBigWithSignificantDecimals(totalSupplyOfLpTokens, 2)} {data.symbol}
                </div>
              </div>
              {walletAccount && (
                <div className="flex items-center justify-between">
                  <div>Your pool share</div>
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
            <div className={backstopBurnIsPossible ? 'mt-2' : 'mt-8'}>
              {backstopBurnIsPossible && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() =>
                      toggle({
                        type: 'Redeem',
                        props: { data },
                      })
                    }
                    className="btn btn-link mb-2 text-center"
                  >
                    Redeem from backstop pool
                  </button>
                </div>
              )}
              {walletAccount ? (
                <Button
                  color="primary"
                  className="w-full"
                  loading={withdrawalQuote.isLoading}
                  type="submit"
                  disabled={!submitEnabled}
                >
                  Withdraw
                </Button>
              ) : (
                <OpenWallet />
              )}
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
        </FormProvider>
      </div>
    </div>
  );
};
export default WithdrawLiquidity;
