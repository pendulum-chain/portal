import { Avatar, Button } from 'react-daisyui';
import { useModalToggle } from '../../../../services/modal';
import { SwapPoolColumn } from '../columns';
import { ModalTypes } from '../Modals/types';

export type PoolOverviewProps = {
  data: SwapPoolColumn;
};

const PoolOverview = ({ data }: PoolOverviewProps) => {
  const toggle = useModalToggle();
  const totalBalance = '$0.78';

  return (
    <>
      <div className="flex items-center mb-8 text-3xl font-normal text-gray-800 gap-3 mt-2">
        <Avatar
          size="sm"
          letters={data.asset?.symbol}
          shape="circle"
          color="gray-200"
          className="text-xs"
        />
        <h3 className="text-2xl">My Pool Balance</h3>
      </div>
      <div className="center mb-6">
        <div
          className="bg-gray-100 px-8 py-4 rounded-lg text-3xl sm:text-4xl text-gray-900"
          title={totalBalance}
        >
          <strong>{totalBalance}</strong>
        </div>
      </div>
      <div className="my-6">
        TODO: name, logo, stats - earned fees, deposited date, TVL, APR
      </div>
      <Button
        variant="primary"
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
        variant="secondary"
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
