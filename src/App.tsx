import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "@/pages/signup";
import Login from "@/pages/login";
import { ROUTE_PATHS } from "@/constants/route.constant";
import Home from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path={ROUTE_PATHS.ROOT} element={<Home />} />
      <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />
      <Route path={ROUTE_PATHS.SIGNUP} element={<Signup />} />
      <Route path="*" element={<Navigate to={ROUTE_PATHS.ROOT} replace />} />
    </Routes>
  );
}

export default App;
