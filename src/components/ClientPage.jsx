import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, Eye } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import DashboardLayout from "./dashboard/DashboardLayout";

const ClientPage = () => {
  const { theme, colors } = useContext(ThemeContext);
  const [search, setSearch] = useState("");

  const clients = [
    { id: 1, name: "Dr. Rajesh Kumar", email: "rajesh@apollo.com", hospital: "Apollo Chennai", scans: 34 },
    { id: 2, name: "Dr. Sneha Reddy", email: "sneha@care.in", hospital: "CARE Hospitals", scans: 28 },
    { id: 3, name: "Dr. Abdul Rahman", email: "abdul@aiims.in", hospital: "AIIMS Delhi", scans: 19 },
    { id: 4, name: "Dr. Divya Patel", email: "divya@maxhealth.com", hospital: "Max Health", scans: 25 },
    { id: 5, name: "Dr. Kiran Rao", email: "kiran@fortis.in", hospital: "Fortis Bangalore", scans: 31 },
  ];

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.hospital.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: colors.primary }}>
            Client Management
          </h1>
          <p className="text-sm" style={{ color: colors.secondary }}>
            View and manage registered doctors and hospitals.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 border px-3 py-2 rounded-lg mt-4 md:mt-0"
          style={{ borderColor: colors.border, background: theme === "light" ? "#fff" : colors.card }}>
          <Search size={18} color={colors.secondary} />
          <input
            type="text"
            placeholder="Search clients..."
            className="bg-transparent outline-none text-sm w-40 md:w-60"
            style={{ color: colors.text }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Card */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="p-6 mb-10 rounded-xl shadow-lg border flex items-center justify-between transition-all"
        style={{
          background: theme === "light" ? "rgba(255,255,255,0.9)" : "rgba(30,41,59,0.8)",
          borderColor: colors.border,
        }}
      >
        <div className="flex items-center gap-3">
          <Users size={36} color={colors.primary} />
          <div>
            <h2 className="text-3xl font-bold" style={{ color: colors.primary }}>
              {filteredClients.length}
            </h2>
            <p className="text-sm" style={{ color: colors.secondary }}>
              Total Registered Clients
            </p>
          </div>
        </div>
      </motion.div>

      {/* Client Table */}
      <div
        className="p-6 rounded-xl shadow-lg border overflow-x-auto"
        style={{
          background: theme === "light" ? "rgba(255,255,255,0.9)" : "rgba(30,41,59,0.8)",
          borderColor: colors.border,
        }}
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr style={{ color: colors.primary }}>
              <th className="border-b py-2 px-3">Name</th>
              <th className="border-b py-2 px-3">Email</th>
              <th className="border-b py-2 px-3">Hospital</th>
              <th className="border-b py-2 px-3 text-center">Scans</th>
              <th className="border-b py-2 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <motion.tr
                  key={client.id}
                  whileHover={{ scale: 1.01 }}
                  className="hover:bg-blue-50 dark:hover:bg-slate-700 transition"
                >
                  <td className="py-2 px-3">{client.name}</td>
                  <td className="py-2 px-3">{client.email}</td>
                  <td className="py-2 px-3">{client.hospital}</td>
                  <td className="py-2 px-3 text-center">{client.scans}</td>
                  <td className="py-2 px-3 text-center">
                    <button
                      className="px-3 py-1 rounded-md text-sm font-medium flex items-center gap-1 mx-auto"
                      style={{
                        background: colors.primary,
                        color: "#fff",
                      }}
                      onClick={() => alert(`Viewing details for ${client.name}`)}
                    >
                      <Eye size={14} /> View
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default ClientPage;
