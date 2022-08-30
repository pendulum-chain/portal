import * as React from "preact";
import { h } from "preact";
import { Navigate, Routes, Route } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Bridge } from "./pages/bridge/Bridge";
import { Amm } from "./pages/amm/Amm";
import { Collators } from "./pages/collators/Collators";
import Layout from "./components/Layout";

export function App() {
  return (
    <div style={{ maxWidth: 1800, marginLeft: "auto", marginRight: "auto" }}>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/amplitude/dashboard" replace />}
        />
        <Route path="/:network/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="amm" element={<Amm />} />
          <Route path="bridge" element={<Bridge />} />
          <Route path="collators" element={<Collators />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}
