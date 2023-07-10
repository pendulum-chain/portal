import { Button } from 'react-daisyui';
import { useModalToggle } from '../../../../services/modal';
import { ModalTypes } from '../Modals/types';
import { SwapPoolColumn } from '../columns';

export type PoolOverviewProps = {
  data: SwapPoolColumn;
};

const PoolOverview = ({ data }: PoolOverviewProps) => {
  // ! TODO: get pool info and stats, get user pool liquidity, get user asset wallet balance
  const toggle = useModalToggle();
  const totalBalance = 0.78;

  return (
    <>
      <div className="mb-8 mt-2 font-normal text-neutral-800 dark:text-neutral-200">
        <h3 className="text-2xl">My Pool Balance</h3>
      </div>
      <div className="center mb-6">
        <div className="bg-neutral-100 dark:bg-neutral-700 px-8 py-4 rounded-lg text-2xl sm:text-4xl text-neutral-900 dark:text-neutral-400">
          <strong>
            {totalBalance} {data.asset.symbol}
          </strong>
        </div>
      </div>
      <div className="my-6">TODO: name, logo, stats - earned fees, deposited date, TVL, APR</div>
      <Button
        color="primary"
        className="w-full text-base"
        onClick={() =>
          toggle({
            type: ModalTypes.AddLiquidity,
            props: { data },
          })
        }
        role="button"
      >
        Add Liquidity
      </Button>
      <Button
        color="secondary"
        className="w-full text-base mt-2"
        onClick={() =>
          toggle({
            type: ModalTypes.WithdrawLiquidity,
            props: { data },
          })
        }
        role="button"
      >
        Withdraw
      </Button>
    </>
  );
};

export default PoolOverview;
