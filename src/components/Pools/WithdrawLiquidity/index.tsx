import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { VNode } from 'preact';
import { Button } from 'react-daisyui';
import { useModalToggle } from '../../../services/modal';
import { ModalTypes } from '../Modals';

export interface WithdrawLiquidityProps {
  data?: unknown;
}

const WithdrawLiquidity = ({ data }: WithdrawLiquidityProps): VNode | null => {
  console.log(data);
  const toggle = useModalToggle();

  return (
    <>
      <div className="flex justify-between mb-8 text-3xl font-normal text-gray-800 mt-2">
        <div className="flex items-center">
          <Button
            size="sm"
            color="ghost"
            className="px-2 mr-2"
            onClick={() =>
              toggle({
                type: ModalTypes.Overview,
                props: { data },
              })
            }
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <h2>Withdraw Liquidity</h2>
        </div>
      </div>
    </>
  );
};
export default WithdrawLiquidity;
