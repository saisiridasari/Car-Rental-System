import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cars from "./pages/Cars";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <Router>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/booking/:carId" element={<Booking />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

    </Router>
  );
};

export default App;