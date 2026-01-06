import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import DashboardHome from "./pages/dashboard/DashboardHome.jsx";
import GroundsFacility from "./pages/facility/Grounds.jsx";
import AccommodationFacility from "./pages/facility/Accommodation.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardHome />} />

        {/* Facility pages */}
        <Route path="/facility/grounds" element={<GroundsFacility />} />
        <Route path="/facility/accommodation" element={<AccommodationFacility />} />

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}
