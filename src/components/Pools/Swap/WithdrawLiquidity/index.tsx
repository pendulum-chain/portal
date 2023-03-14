import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Avatar, Button } from 'react-daisyui';
import { useModalToggle } from '../../../../services/modal';
import { SwapPoolColumn } from '../columns';
import { ModalTypes } from '../Modals/types';

export interface WithdrawLiquidityProps {
  data: SwapPoolColumn;
}

const WithdrawLiquidity = ({
  data,
}: WithdrawLiquidityProps): JSX.Element | null => {
  const toggle = useModalToggle();

  return (
    <>
      <div className="flex justify-between mb-8 text-3xl font-normal text-gray-800 mt-2">
        <div className="flex items-center gap-3">
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
          <Avatar
            size="sm"
            letters={data.asset?.symbol}
            shape="circle"
            color="gray-200"
            className="text-xs"
          />
          <h3 className="text-2xl">
            {data.asset?.symbol} - Withdraw Liquidity
          </h3>
        </div>
      </div>
    </>
  );
};
export default WithdrawLiquidity;
