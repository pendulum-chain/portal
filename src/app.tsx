import { h } from 'preact';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotFound } from './components/NotFound';
import { Dashboard } from './pages/dashboard/Dashboard';
import Bridge from './pages/bridge';
import { Amm } from './pages/amm/Amm';
import { Collators } from './pages/collators/Collators';
import Layout from './components/Layout';

export function App() {
  return (
    <div className="main-wrapper mx-auto">
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/amplitude/dashboard" replace />}
        />
        <Route path="/:network/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="amm" element={<Amm />} />
          <Route path="bridge/:to?" element={<Bridge />} />
          <Route path="collators" element={<Collators />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}
