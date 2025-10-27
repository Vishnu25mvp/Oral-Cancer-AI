import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Dashboard";
import About from "./components/About";
import Contact from "./components/Contact";
import DashboardHome from "./components/DashboardHome";
import ClientPage from "./components/ClientPage";
import PatientScreening from "./components/dashboard/PatientScreening";
import ReportPage from "./components/dashboard/ReportPage";
import SettingsPage from './components/dashboard/SettingsPage'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard/clients" element={<ClientPage />} />
            <Route path="/dashboard/patient" element={<PatientScreening />} />
              <Route path="/dashboard/reports" element={<ReportPage />} />
                <Route path="/dashboard/settings" element={<SettingsPage />} />




      </Routes>
    </Router>
  );
};

export default App;
