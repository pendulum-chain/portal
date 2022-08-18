import { Routes, Route } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Staking } from "./pages/staking/Staking";
import { Swap } from "./pages/swap/Swap";
import Layout from "./components/Layout";

export function App(props) {
  return (
    <div style={{ maxWidth: 1300, marginLeft: 'auto', marginRight: 'auto' }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="staking" element={<Staking />} />
          <Route path="swap" element={<Swap />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}
