import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import CustomerPage from "./pages/CustomerPage";
import PriorityFollowUpPage from "./pages/PriorityFollowUpPage";
import InputPage from "./pages/InputPage";
import SettingPage from "./pages/SettingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DetailCustomerPage from "./pages/DetailCustomerPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PackagePage from "./pages/PackagePage";
import SegmentPage from "./pages/SegmentPage";
import { getToken } from "./utils/auth";

function PublicRoute() {
  const token = getToken();
  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

function App() {
  return (
    <div>
      <main>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/customer/:id" element={<DetailCustomerPage />} />
            <Route
              path="/priority-followup"
              element={<PriorityFollowUpPage />}
            />
            <Route path="/input-page" element={<InputPage />} />
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/packages" element={<PackagePage />} />
            <Route path="/segments" element={<SegmentPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
