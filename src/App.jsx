// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Home from "./components/Dashboard";
// import About from "./components/About";
// import Contact from "./components/Contact";
// import DashboardHome from "./components/DashboardHome";
// import ClientPage from "./components/ClientPage";
// import PatientScreening from "./components/dashboard/PatientScreening";
// import ReportPage from "./components/dashboard/ReportPage";
// import SettingsPage from './components/dashboard/SettingsPage'
// import VerifyOtp from "./components/VerifyOtp";
// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/verify-otp" element={<VerifyOtp />} />
//         <Route path="/dashboard" element={<DashboardHome />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//           <Route path="/dashboard/clients" element={<ClientPage />} />
//             <Route path="/dashboard/patient" element={<PatientScreening />} />
//               <Route path="/dashboard/reports" element={<ReportPage />} />
//                 <Route path="/dashboard/settings" element={<SettingsPage />} />




//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Common pages
import Home from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import VerifyOtp from "./components/VerifyOtp";
import About from "./components/About";
import Contact from "./components/Contact";

// Dashboard & internal pages
import DashboardHome from "./components/DashboardHome";
import ClientPage from "./components/ClientPage";
import PatientScreening from "./components/dashboard/PatientScreening";
import ReportPage from "./components/dashboard/ReportPage";
import SettingsPage from "./components/dashboard/SettingsPage";
import Unauthorized from "./components/Unauthorized";

// Role-protection wrapper
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* ================================
            ADMIN ROUTES
           ================================ */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/clients"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ClientPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/patient"
          element={
            <ProtectedRoute allowedRoles={["admin", "counselor"]}>
              <PatientScreening />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/reports"
          element={
            <ProtectedRoute allowedRoles={["admin", "counselor", "user"]}>
              <ReportPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute allowedRoles={["admin", "counselor", "user"]}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
};

export default App;
