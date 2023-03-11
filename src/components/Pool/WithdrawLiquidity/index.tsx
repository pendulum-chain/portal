import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link, useParams } from 'react-router-dom';

export interface WithdrawLiquidityProps {
  data?: any;
}

const WithdrawLiquidity = ({
  data,
}: WithdrawLiquidityProps): JSX.Element | null => {
  const { network, address } = useParams();
  return (
    <>
      <div className="flex justify-between mb-8 text-3xl font-normal text-gray-800">
        <div className="flex items-center">
          <Link
            className="btn btn-sm px-2 btn-ghost mr-2"
            to={`/${network}/amm/pools/${address}`}
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </Link>
          <h2>Withdraw Liquidity</h2>
        </div>
      </div>
    </>
  );
};
export default WithdrawLiquidity;
