import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import { NotFound } from './components/NotFound';
import { config } from './config';
import AmberPage from './pages/amber';
import BackstopPoolsPage from './pages/amber/backstop-pools';
import SwapPage from './pages/amber/swap';
import SwapPoolsPage from './pages/amber/swap-pools';
import { Amm } from './pages/amm/Amm';
import Bridge from './pages/bridge';
import { Collators } from './pages/collators/Collators';
import { Dashboard } from './pages/dashboard/Dashboard';

export function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={config.defaultPage} replace />}
        />
        <Route path="/:network/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="amm" element={<Amm />} />
          <Route path="amber">
            <Route path="" element={<AmberPage />} />
            <Route path="swap" element={<SwapPage />} />
            <Route path="swap-pools" element={<SwapPoolsPage />} />
            <Route path="backstop-pools" element={<BackstopPoolsPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="bridge/:to?" element={<Bridge />} />
          <Route path="collators" element={<Collators />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}
