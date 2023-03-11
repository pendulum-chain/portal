import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import { NotFound } from "./components/NotFound";
import { Amm } from "./pages/amm/Amm";
import Bridge from "./pages/bridge";
import { Collators } from "./pages/collators/Collators";
import { Dashboard } from "./pages/dashboard/Dashboard";

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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}
