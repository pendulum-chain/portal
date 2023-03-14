import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Avatar, Button, Input } from 'react-daisyui';
import { useModalToggle } from '../../../../services/modal';
import { SwapPoolColumn } from '../columns';
import { ModalTypes } from '../Modals/types';

export interface AddLiquidityProps {
  data: SwapPoolColumn;
}

const AddLiquidity = ({ data }: AddLiquidityProps): JSX.Element | null => {
  const toggle = useModalToggle();
  const balance = 0;

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
          <h3 className="text-2xl">{data.asset?.symbol} - Add Liquidity</h3>
        </div>
      </div>
      <div className="my-3">
        <p className="text-gray-500 text-right mb-2">
          Balance: {balance} {data.asset?.symbol}
        </p>
        <Input
          size="md"
          bordered
          name="amount"
          value="0"
          type="number"
          step="0.1"
          max={balance}
          className="w-full text-right text-lg"
        />
        <div className="mt-2">TODO: deposit stats</div>
        <Button variant="primary" className="mt-6 w-full">
          Add
        </Button>
      </div>
    </>
  );
};

export default AddLiquidity;
