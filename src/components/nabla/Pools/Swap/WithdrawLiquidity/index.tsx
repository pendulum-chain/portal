import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Button } from 'react-daisyui';

import { PoolProgress } from '../..';
import { calcSharePercentage } from '../../../../../helpers/calc';
import { rawToDecimal, stringifyBigWithSignificantDecimals } from '../../../../../shared/parseNumbers/metric';
import Validation from '../../../../Form/Validation';
import { NumberLoader } from '../../../../Loader';
import { SwapPoolColumn } from '../columns';
import { ModalTypes } from '../Modals/types';
import { useSwapPoolWithdrawLiquidity } from './useWithdrawLiquidity';
import { TransactionProgress } from '../../../common/TransactionProgress';
import { FormProvider } from 'react-hook-form';
import { AmountSelector } from '../../../common/AmountSelector';
import { TokenBalance } from '../../../common/TokenBalance';
import Spinner from '../../../../../assets/spinner';

export interface WithdrawLiquidityProps {
  data: SwapPoolColumn;
}

const WithdrawLiquidity = ({ data }: WithdrawLiquidityProps): JSX.Element | null => {
  const { toggle, mutation, onSubmit, balanceQuery, depositQuery, amountString, form, withdrawalQuote } =
    useSwapPoolWithdrawLiquidity(data.id, data.token.id, data.token.decimals, data.lpTokenDecimals);

  const {
    formState: { errors },
  } = form;

  const totalSupplyOfLpTokens = rawToDecimal(data.totalSupply, data.token.decimals);

  const submitEnabled = !withdrawalQuote.isLoading && withdrawalQuote.enabled && Object.keys(errors).length === 0;

  const lpTokenBalance = depositQuery.data;

  // TODO Torsten: show spinner on withdraw button when loading the share value??
  const hideCss = !mutation.isIdle ? 'hidden' : '';
  return (
    <div className="text-[initial] dark:text-neutral-200">
      <TransactionProgress mutation={mutation} onClose={mutation.reset}>
        <PoolProgress symbol={data.symbol} amount={amountString} />
      </TransactionProgress>
      <div className={hideCss}>
        <div className="flex items-center gap-2 mt-2 mb-8">
          <Button size="sm" color="ghost" className="px-2" type="button" onClick={() => toggle(undefined)}>
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <h3 className="text-3xl font-normal">Withdraw {data.token?.symbol}</h3>
        </div>
        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
            <div className="flex justify-between align-end text-sm text-initial my-3">
              <p>
                Deposited: <TokenBalance query={depositQuery} symbol={data.symbol}></TokenBalance>
              </p>
              <p className="text-neutral-500 text-right">
                Balance: <TokenBalance query={balanceQuery} symbol={data.token.symbol}></TokenBalance>
              </p>
            </div>
            <AmountSelector maxBalance={depositQuery.data} formFieldName="amount" form={form}>
              <div className="flex items-center justify-between pt-2">
                <div>Share Value</div>
                <TokenBalance query={withdrawalQuote} symbol={data.token.symbol}></TokenBalance>
              </div>
            </AmountSelector>
            <div className="relative flex w-full flex-col gap-4 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-300 p-4 mt-4">
              <div className="flex items-center justify-between">
                <div>Total deposit</div>
                <div>
                  {stringifyBigWithSignificantDecimals(totalSupplyOfLpTokens, 2)} {data.symbol}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>Your pool share</div>
                <div>
                  {lpTokenBalance === undefined ? (
                    <NumberLoader />
                  ) : (
                    calcSharePercentage(totalSupplyOfLpTokens, lpTokenBalance.preciseBigDecimal)
                  )}
                  %
                </div>
              </div>
            </div>
            <Validation className="text-center mt-2" errors={errors} />
            <div className="mt-8">
              <div className="text-center">
                <button
                  type="button"
                  onClick={() =>
                    toggle({
                      type: ModalTypes.Redeem,
                      props: { data },
                    })
                  }
                  className="btn btn-link mb-2 text-center"
                >
                  Redeem from backstop pool
                </button>
              </div>
              <Button color="primary" className="w-full" type="submit" disabled={!submitEnabled}>
                Withdraw{' '}
                {withdrawalQuote.isLoading && (
                  <span className="inline-flex w-0 justify-start items-center">
                    <span className="inline-flex pl-2 justify-center items-center w-12">
                      <Spinner></Spinner>
                    </span>
                  </span>
                )}
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
        </FormProvider>
      </div>
    </div>
  );
};
export default WithdrawLiquidity;
