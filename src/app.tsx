import { h } from "preact";
import { Navigate, Routes, Route } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Bridge } from "./pages/bridge/Bridge";
import { BridgeRedeem } from "./pages/bridge/BridgeRedeem";
import { BridgeTransfer } from "./pages/bridge/BridgeTransfer";
import { Amm } from "./pages/amm/Amm";
import { Collators } from "./pages/collators/Collators";
import Layout from "./components/Layout";

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
          <Route path="bridge" element={<Bridge />} />
          <Route path="bridge/redeem" element={<BridgeRedeem />} />
          <Route path="bridge/transfer" element={<BridgeTransfer />} />
          <Route path="collators" element={<Collators />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}
