import * as React from 'preact';
import { Navigate, Routes, Route } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Staking } from "./pages/staking/Staking";
import { Swap } from "./pages/swap/Swap";
import Layout from "./components/Layout";

export function App() {
  return (
    <div style={{ maxWidth: 1800, marginLeft: 'auto', marginRight: 'auto' }}>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/amplitude/dashboard" replace />}
        />
        <Route path="/:network/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="staking" element={<Staking />} />
          <Route path="swap" element={<Swap />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}
