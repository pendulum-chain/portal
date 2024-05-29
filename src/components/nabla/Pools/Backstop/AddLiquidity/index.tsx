import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Button } from 'react-daisyui';
import { Big } from 'big.js';

import { PoolProgress } from '../..';
import { rawToDecimal, stringifyBigWithSignificantDecimals } from '../../../../../shared/parseNumbers/metric';
import Validation from '../../../../Form/Validation';
import { NumberLoader } from '../../../../Loader';
import { useAddLiquidity } from './useAddLiquidity';
import { NablaInstanceBackstopPool } from '../../../../../hooks/nabla/useNablaInstance';
import { TransactionProgress } from '../../../common/TransactionProgress';
import { TokenApproval } from '../../../common/TokenApproval';
import { FormProvider } from 'react-hook-form';
import { AmountSelector } from '../../../common/AmountSelector';
import { calcSharePercentage } from '../../../../../helpers/calc';
import { TokenBalance } from '../../../common/TokenBalance';
import { useGlobalState } from '../../../../../GlobalStateProvider';

interface AddLiquidityProps {
  data: NablaInstanceBackstopPool;
}

const AddLiquidity = ({ data }: AddLiquidityProps): JSX.Element | null => {
  const { toggle, onSubmit, mutation, depositQuery, balanceQuery, amountString, amountBigDecimal, form } =
    useAddLiquidity(data.id, data.token.id, data.token.decimals, data.lpTokenDecimals);

  const { walletAccount } = useGlobalState();

  const {
    formState: { errors },
  } = form;

  const totalSupplyOfLpTokens = rawToDecimal(data.totalSupply, data.token.decimals);
  const submitEnabled = amountBigDecimal?.gt(new Big(0)) && Object.keys(errors).length === 0;

  const hideCss = !mutation.isIdle ? 'hidden' : '';
  return (
    <div className="text-[initial] dark:text-neutral-200">
      <TransactionProgress mutation={mutation} onClose={mutation.reset}>
        <PoolProgress symbol={data.token.symbol} amount={amountString} />
      </TransactionProgress>
      <div className={hideCss}>
        <div className="flex items-center gap-2 mb-8 mt-2">
          <Button size="sm" color="ghost" className="px-2" type="button" onClick={() => toggle(undefined)}>
            <ArrowLeftIcon className="w-4 h-4 dark:text-neutral-400" />
          </Button>
          <h3 className="text-3xl font-normal">Deposit {data.token.symbol}</h3>
        </div>
        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
            {walletAccount && (
              <div className="flex justify-between align-end text-sm text-initial my-3">
                <p>
                  Deposited: <TokenBalance query={depositQuery} symbol={data.symbol}></TokenBalance>
                </p>
                <p className="text-neutral-500 dark:text-neutral-400 text-right">
                  Balance: <TokenBalance query={balanceQuery} symbol={data.token.symbol}></TokenBalance>
                </p>
              </div>
            )}
            <AmountSelector maxBalance={balanceQuery.data} formFieldName="amount" form={form} />
            <Validation className="text-center mt-2" errors={errors} />
            <div className="relative flex w-full flex-col gap-4 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-300 p-4 mt-4">
              <div className="flex items-center justify-between">
                <div>Total LP tokens</div>
                <div>
                  {stringifyBigWithSignificantDecimals(totalSupplyOfLpTokens, 2)} {data.symbol}
                </div>
              </div>
              {walletAccount && (
                <div className="flex items-center justify-between">
                  <div>Your pool Share</div>
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
            <div className="mt-8">
              <TokenApproval
                className="w-full"
                spender={data.id}
                token={data.token.id}
                decimals={data.token.decimals}
                decimalAmount={amountBigDecimal}
                enabled={submitEnabled}
              >
                <Button color="primary" className="w-full" type="submit" disabled={!submitEnabled}>
                  Deposit
                </Button>
              </TokenApproval>
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
export default AddLiquidity;
