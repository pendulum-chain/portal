import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppsProvider from './components/Apps/provider';
import Layout from './components/Layout';
import { defaultPageLoader } from './components/Loader/Page';
import { NotFound } from './components/NotFound';
import { SuspenseLoad } from './components/Suspense';
import { config } from './config';
import TermsAndConditions from './TermsAndConditions';
import { useGlobalState } from './GlobalStateProvider';
import { TenantName } from './models/Tenant';

/**
 * Components need to be default exports inside the file for suspense loading to work properly
 */
const loadPage = (path: string)  => <SuspenseLoad importFn={() => import(`./pages/${path}`)} fallback={defaultPageLoader} />;

const Dashboard = loadPage('dashboard');
const Gas = loadPage('gas');
const Bridge = loadPage('bridge');
const TransactionsPage = loadPage('bridge/Transactions');
const Staking = loadPage('collators');
const NablaPage = loadPage('nabla');
const SwapPage = loadPage('nabla/swap');
const SwapPoolsPage = loadPage('nabla/swap-pools');
const BackstopPoolsPage = loadPage('nabla/backstop-pools');

enum PATHS {
  DASHBOARD = 'dashboard',
  GAS = 'gas',
  SPACEWALK = 'spacewalk',
  BRIDGE = 'bridge',
  TRANSACTIONS = 'transactions',
  NABLA = 'nabla',
  NABLA_SWAP = 'swap',
  NABLA_SWAP_POOLS = 'swap-pools',
  NABLA_BACKSTOP_POOLS = 'backstop-pools',
  STAKING = 'staking',
}

export const PAGES_PATHS = {
  DASHBOARD: 'dashboard',
  GAS: 'gas',
  BRIDGE: `${PATHS.SPACEWALK}/${PATHS.BRIDGE}`,
  TRANSACTIONS: `${PATHS.SPACEWALK}/${PATHS.TRANSACTIONS}`,
  NABLA: 'nabla',
  NABLA_SWAP: `${PATHS.NABLA}/${PATHS.NABLA_SWAP}`,
  NABLA_SWAP_POOLS: `${PATHS.NABLA}/${PATHS.NABLA_SWAP_POOLS}`,
  NABLA_BACKSTOP_POOLS: `${PATHS.NABLA}/${PATHS.NABLA_BACKSTOP_POOLS}`,
  STAKING: 'staking',
};

function enableOnAmplitude(tenantName: TenantName, page: JSX.Element){
  if((tenantName === TenantName.Foucoco || tenantName === TenantName.Amplitude)){
    return page;
  }
}

export function App() {
  const { tenantName } = useGlobalState();

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={config.defaultPage} replace />} />
        <Route path="/:network/" element={<Layout />}>
          <Route index element={<Navigate to={PATHS.DASHBOARD} replace />} />
          <Route path={PATHS.DASHBOARD} element={Dashboard} />
          {enableOnAmplitude(tenantName, <Route path="gas" element={Gas} />)}
          <Route path={PATHS.SPACEWALK}>
            <Route path={PATHS.BRIDGE} element={Bridge} />
            <Route path={PATHS.TRANSACTIONS} element={TransactionsPage} />
          </Route>
          <Route path={PATHS.NABLA} Component={() => <AppsProvider app="nabla" />}>
            <Route path="" element={NablaPage} />
            <Route path={PATHS.NABLA_SWAP} element={SwapPage} />
            <Route path={PATHS.NABLA_SWAP_POOLS} element={SwapPoolsPage} />
            <Route path={PATHS.NABLA_BACKSTOP_POOLS} element={BackstopPoolsPage} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path={PATHS.STAKING} element={Staking} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <TermsAndConditions />
      <ToastContainer />
    </>
  );
}
