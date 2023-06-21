import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TermsAndConditions from './TermsAndConditions';
import Layout from './components/Layout';
import { defaultPageLoader } from './components/Loader/Page';
import { NotFound } from './components/NotFound';
import { SuspenseLoad } from './components/Suspense';
import { config } from './config';

/**
 * Components need to be default exports inside the file for suspense loading to work properly
 */
const Dashboard = <SuspenseLoad importFn={() => import('./pages/dashboard/Dashboard')} fallback={defaultPageLoader} />;
const Amm = <SuspenseLoad importFn={() => import('./pages/amm/Amm')} fallback={defaultPageLoader} />;
const AmberPage = <SuspenseLoad importFn={() => import('./pages/amber')} fallback={defaultPageLoader} />;
const StatsPage = <SuspenseLoad importFn={() => import('./pages/stats')} fallback={defaultPageLoader} />;
const SwapPage = <SuspenseLoad importFn={() => import('./pages/amber/swap')} fallback={defaultPageLoader} />;
const SwapPoolsPage = <SuspenseLoad importFn={() => import('./pages/amber/swap-pools')} fallback={defaultPageLoader} />;
const TransfersPage = <SuspenseLoad importFn={() => import('./pages/bridge/Transfers')} fallback={defaultPageLoader} />;
const BackstopPoolsPage = (
  <SuspenseLoad importFn={() => import('./pages/amber/backstop-pools')} fallback={defaultPageLoader} />
);
const Bridge = <SuspenseLoad importFn={() => import('./pages/bridge')} fallback={defaultPageLoader} />;
const Collators = <SuspenseLoad importFn={() => import('./pages/collators/Collators')} fallback={defaultPageLoader} />;

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={config.defaultPage} replace />} />
        <Route path="/:network/" element={<Layout />}>
          <Route path="" element={Dashboard} />
          <Route path="dashboard" element={Dashboard} />
          <Route path="amm" element={Amm} />
          <Route path="stats" element={StatsPage} />
          <Route path="spacewalk">
            <Route path="bridge" element={Bridge} />
            <Route path="transfers" element={TransfersPage} />
          </Route>
          <Route path="amber">
            <Route path="" element={AmberPage} />
            <Route path="swap" element={SwapPage} />
            <Route path="swap-pools" element={SwapPoolsPage} />
            <Route path="backstop-pools" element={BackstopPoolsPage} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="collators" element={Collators} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <TermsAndConditions />
      <ToastContainer />
    </>
  );
}
