import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link, useParams } from 'react-router-dom';

export interface PoolOverviewProps {
  data?: unknown;
}

const PoolOverview = ({ data }: PoolOverviewProps): JSX.Element | null => {
  console.log(data);
  const { network } = useParams();
  const totalBalance = '$0.78';

  return (
    <>
      <div className="flex items-center mb-8 text-3xl font-normal text-gray-800">
        <Link
          className="btn btn-sm px-2 btn-ghost mr-2"
          to={`/${network}/amm/pools`}
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </Link>
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
      <Link to="add" className="btn btn-primary w-full text-base" role="button">
        Add Liquidity
      </Link>
      <Link
        to="withdraw"
        className="btn btn-secondary w-full text-base"
        role="button"
      >
        Withdraw
      </Link>
    </>
  );
};

export default PoolOverview;
