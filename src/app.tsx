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

export enum PATHS {
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
  DASHBOARD: PATHS.DASHBOARD,
  GAS: PATHS.GAS,
  BRIDGE: `${PATHS.SPACEWALK}/${PATHS.BRIDGE}`,
  TRANSACTIONS: `${PATHS.SPACEWALK}/${PATHS.TRANSACTIONS}`,
  NABLA: PATHS.NABLA,
  NABLA_SWAP: `${PATHS.NABLA}/${PATHS.NABLA_SWAP}`,
  NABLA_SWAP_POOLS: `${PATHS.NABLA}/${PATHS.NABLA_SWAP_POOLS}`,
  NABLA_BACKSTOP_POOLS: `${PATHS.NABLA}/${PATHS.NABLA_BACKSTOP_POOLS}`,
  STAKING: PATHS.STAKING,
};

/**
 * Components need to be default exports inside the file for suspense loading to work properly
 */
const pages = import.meta.glob('./pages/**/index.tsx');

const loadPage = (path: string) => (
  <SuspenseLoad importFn={pages[`./pages/${path}/index.tsx`]} fallback={defaultPageLoader} />
);

const Dashboard = loadPage(PAGES_PATHS.DASHBOARD);
const Gas = loadPage(PAGES_PATHS.GAS);
const Bridge = loadPage(PAGES_PATHS.BRIDGE);
const TransactionsPage = loadPage(PAGES_PATHS.TRANSACTIONS);
const Staking = loadPage(PAGES_PATHS.STAKING);
const NablaPage = loadPage(PAGES_PATHS.NABLA);
const SwapPage = loadPage(PAGES_PATHS.NABLA_SWAP);
const SwapPoolsPage = loadPage(PAGES_PATHS.NABLA_SWAP_POOLS);
const BackstopPoolsPage = loadPage(PAGES_PATHS.NABLA_BACKSTOP_POOLS);

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={config.defaultPage} replace />} />
        <Route path="/:network/" element={<Layout />}>
          <Route index element={<Navigate to={PATHS.DASHBOARD} replace />} />
          <Route path={PATHS.DASHBOARD} element={Dashboard} />
          <Route path={PATHS.GAS} element={Gas} />
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
        <Route path="staking" element={Staking} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <TermsAndConditions />
      <ToastContainer />
      <div id="modals">
        {/* This is where the dialogs/modals are rendered. It is placed here because it is the highest point in the app where the tailwind data-theme is available */}
      </div>
    </>
  );
}
