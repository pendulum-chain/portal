import { VNode } from 'preact';
import { Button } from 'react-daisyui';
import { useModalToggle } from '../../../services/modal';
import { ModalTypes } from '../Modals';

export interface PoolOverviewProps {
  data?: unknown;
}

const PoolOverview = ({ data }: PoolOverviewProps): VNode | null => {
  console.log(data);
  const toggle = useModalToggle();
  const totalBalance = '$0.78';

  return (
    <>
      <div className="flex items-center mb-8 text-3xl font-normal text-gray-800 mt-2">
        <h2>My Pool Balance</h2>
      </div>
      <div className="center mb-6">
        <div
          className="bg-gray-100 px-8 py-4 rounded-lg text-3xl sm:text-4xl text-gray-900"
          title={totalBalance}
        >
          <strong>{totalBalance}</strong>
        </div>
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
