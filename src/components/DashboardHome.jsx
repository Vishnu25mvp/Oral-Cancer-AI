import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Users, Activity, FileText, Database } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import DashboardLayout from "./dashboard/DashboardLayout";

const DashboardHome = () => {
  const { theme, colors } = useContext(ThemeContext);

  const stats = [
    { label: "Total Users", value: 124, icon: <Users size={24} />, color: "blue" },
    { label: "Total Clients", value: 57, icon: <Database size={24} />, color: "green" },
    { label: "Total Scans", value: 238, icon: <Activity size={24} />, color: "orange" },
    { label: "Reports Generated", value: 89, icon: <FileText size={24} />, color: "purple" },
  ];

  const clients = [
    { id: 1, name: "Dr. Rajesh Kumar", email: "rajesh@apollo.com", hospital: "Apollo Chennai", scans: 34 },
    { id: 2, name: "Dr. Sneha Reddy", email: "sneha@care.in", hospital: "CARE Hospitals", scans: 28 },
    { id: 3, name: "Dr. Abdul Rahman", email: "abdul@aiims.in", hospital: "AIIMS Delhi", scans: 19 },
  ];

  return (
    <DashboardLayout>
      {/* Dashboard Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-xl shadow-lg border flex flex-col items-center justify-center text-center"
            style={{
              background:
                theme === "light"
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(30,41,59,0.8)",
              borderColor: colors.border,
            }}
          >
            <div className="mb-2">{stat.icon}</div>
            <h2 className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>
              {stat.value}
            </h2>
            <p className="text-sm" style={{ color: colors.secondary }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Client Details Table */}
      <div
        className="p-6 rounded-xl shadow-lg border"
        style={{
          background:
            theme === "light"
              ? "rgba(255,255,255,0.9)"
              : "rgba(30,41,59,0.8)",
          borderColor: colors.border,
        }}
      >
        <h2 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>
          Client Details
        </h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr style={{ color: colors.primary }}>
              <th className="border-b py-2 px-3">Name</th>
              <th className="border-b py-2 px-3">Email</th>
              <th className="border-b py-2 px-3">Hospital</th>
              <th className="border-b py-2 px-3">Scans</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-blue-50 dark:hover:bg-slate-700 transition">
                <td className="py-2 px-3">{client.name}</td>
                <td className="py-2 px-3">{client.email}</td>
                <td className="py-2 px-3">{client.hospital}</td>
                <td className="py-2 px-3">{client.scans}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
