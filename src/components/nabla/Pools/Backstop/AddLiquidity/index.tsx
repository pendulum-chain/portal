import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Button } from 'react-daisyui';
import { Big } from 'big.js';

import { PoolProgress } from '../..';
import { rawToDecimal, stringifyBigWithSignificantDecimals } from '../../../../../shared/parseNumbers/metric';
import { Validation } from '../../../../Form/Validation';
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
import OpenWallet from '../../../../Wallet';

export interface AddLiquidityProps {
  data: NablaInstanceBackstopPool;
  onClose: () => void;
}

const AddLiquidity = ({ data, onClose }: AddLiquidityProps): JSX.Element => {
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
      <TransactionProgress
        mutation={mutation}
        onClose={() => {
          mutation.reset();
          onClose();
        }}
      >
        <PoolProgress symbol={data.token.symbol} amount={amountString} />
      </TransactionProgress>
      <div className={hideCss}>
        <div className="absolute top-0 mb-8 mt-2 flex translate-y-2/4 items-center gap-2">
          <Button size="sm" color="ghost" className="px-2" type="button" onClick={() => toggle(undefined)}>
            <ArrowLeftIcon className="h-4 w-4 dark:text-neutral-400" />
          </Button>
          <h3 className="text-3xl font-normal">Deposit {data.token.symbol}</h3>
        </div>
        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
            {walletAccount && (
              <div className="align-end text-initial my-3 flex justify-between text-sm">
                <p>
                  Deposited: <TokenBalance query={depositQuery} symbol={data.symbol}></TokenBalance>
                </p>
                <p className="text-right text-neutral-500 dark:text-neutral-400">
                  Balance: <TokenBalance query={balanceQuery} symbol={data.token.symbol}></TokenBalance>
                </p>
              </div>
            )}
            <AmountSelector
              maxBalance={balanceQuery.data}
              formFieldName="amount"
              form={form}
              showAvailableActions={true}
            />
            <Validation className="mt-2 text-center" errors={errors} />
            <div className="relative mt-4 flex w-full flex-col gap-4 rounded-lg bg-base-300 p-4 text-neutral-500 dark:text-neutral-300">
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
                {walletAccount ? (
                  <Button color="primary" className="w-full" type="submit" disabled={!submitEnabled}>
                    Deposit
                  </Button>
                ) : (
                  <OpenWallet />
                )}
              </TokenApproval>
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
export default AddLiquidity;
