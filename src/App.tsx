import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "@/pages/signup";
import Login from "@/pages/login";
import Profile from "@/pages/profile";
import { ROUTE_PATHS } from "@/constants/route.constant";
import Home from "./pages/home";
import Dashboard_customer from "./pages/dashboard_customer";
import StaffDashboard from "./pages/dashboard_staff";

function App() {
  return (
    <Routes>
      <Route path={ROUTE_PATHS.ROOT} element={<Home />} />
      <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />
      <Route path={ROUTE_PATHS.SIGNUP} element={<Signup />} />
      <Route
        path={ROUTE_PATHS.DASHBOARD_CUSTOMER}
        element={<Dashboard_customer />}
      />
      <Route path={ROUTE_PATHS.DASHBOARD_STAFF} element={<StaffDashboard />} />
      <Route path={ROUTE_PATHS.PROFILE} element={<Profile />} />
      <Route path="*" element={<Navigate to={ROUTE_PATHS.ROOT} replace />} />
    </Routes>
  );
}

export default App;
