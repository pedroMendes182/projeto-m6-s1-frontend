import { Navigate, Routes, Route } from "react-router-dom";
import DashBoard from "../pages/Dashboard";
import HomePage from "../pages/Home";
import Register from "../pages/Register";

const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesMain;
