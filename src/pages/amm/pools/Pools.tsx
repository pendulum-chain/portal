import { Outlet, Route, Routes } from 'react-router-dom';
import AddLiquidity from '../../../components/Pool/AddLiquidity';
import PoolOverview from '../../../components/Pool/Overview';
import WithdrawLiquidity from '../../../components/Pool/WithdrawLiquidity';
import Pools from '../../../components/Pools';

const Layout = () => (
  <div className="center">
    <div className="card w-full max-w-xl bg-base-100 shadow-xl border rounded-lg">
      <div className="card-body">
        <Outlet />
      </div>
    </div>
  </div>
);

const PoolsPage = (): JSX.Element | null => {
  return (
    <div className="mt-8">
      <Routes>
        <Route path="/" element={<Pools />} />
        <Route path="/:address/" element={<Layout />}>
          <Route path="" element={<PoolOverview />} />
          <Route path="add" element={<AddLiquidity />} />
          <Route path="withdraw" element={<WithdrawLiquidity />} />
        </Route>
      </Routes>
    </div>
  );
};
export default PoolsPage;
