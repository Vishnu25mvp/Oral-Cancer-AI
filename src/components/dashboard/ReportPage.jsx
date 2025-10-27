import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import DashboardLayout from "./DashboardLayout";
import { motion } from "framer-motion";
import { FileText, Search, Download, Eye } from "lucide-react";

const ReportPage = () => {
  const { theme, colors } = useContext(ThemeContext);
  const [search, setSearch] = useState("");

  // Dummy Report Data
  const reports = [
    {
      id: 1,
      patient: "Rajesh Kumar",
      age: 45,
      gender: "Male",
      result: "Cancerous",
      confidence: 96.4,
      date: "2025-10-20",
    },
    {
      id: 2,
      patient: "Sneha Reddy",
      age: 32,
      gender: "Female",
      result: "Normal",
      confidence: 91.8,
      date: "2025-10-21",
    },
    {
      id: 3,
      patient: "Abdul Rahman",
      age: 50,
      gender: "Male",
      result: "Cancerous",
      confidence: 94.2,
      date: "2025-10-23",
    },
    {
      id: 4,
      patient: "Divya Patel",
      age: 41,
      gender: "Female",
      result: "Normal",
      confidence: 89.7,
      date: "2025-10-25",
    },
  ];

  const filteredReports = reports.filter((r) =>
    r.patient.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: colors.primary }}>
            AI Detection Reports
          </h1>
          <p className="text-sm" style={{ color: colors.secondary }}>
            View and download reports generated from AI-based oral cancer detection.
          </p>
        </div>

        {/* Search Bar */}
        <div
          className="flex items-center gap-2 border px-3 py-2 rounded-lg mt-4 md:mt-0"
          style={{
            borderColor: colors.border,
            background: theme === "light" ? "#fff" : colors.card,
          }}
        >
          <Search size={18} color={colors.secondary} />
          <input
            type="text"
            placeholder="Search patient..."
            className="bg-transparent outline-none text-sm w-48 md:w-60"
            style={{ color: colors.text }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Summary Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-6 mb-10 rounded-xl shadow-lg border flex items-center justify-between transition-all"
        style={{
          background:
            theme === "light" ? "rgba(255,255,255,0.9)" : "rgba(30,41,59,0.8)",
          borderColor: colors.border,
        }}
      >
        <div className="flex items-center gap-3">
          <FileText size={36} color={colors.primary} />
          <div>
            <h2 className="text-3xl font-bold" style={{ color: colors.primary }}>
              {filteredReports.length}
            </h2>
            <p className="text-sm" style={{ color: colors.secondary }}>
              Total Reports Generated
            </p>
          </div>
        </div>
      </motion.div>

      {/* Reports Table */}
      <div
        className="p-6 rounded-xl shadow-lg border overflow-x-auto"
        style={{
          background:
            theme === "light" ? "rgba(255,255,255,0.9)" : "rgba(30,41,59,0.8)",
          borderColor: colors.border,
        }}
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr style={{ color: colors.primary }}>
              <th className="border-b py-2 px-3">Patient Name</th>
              <th className="border-b py-2 px-3">Age</th>
              <th className="border-b py-2 px-3">Gender</th>
              <th className="border-b py-2 px-3">Result</th>
              <th className="border-b py-2 px-3">Confidence</th>
              <th className="border-b py-2 px-3">Date</th>
              <th className="border-b py-2 px-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length > 0 ? (
              filteredReports.map((r) => (
                <motion.tr
                  key={r.id}
                  whileHover={{ scale: 1.01 }}
                  className="hover:bg-blue-50 dark:hover:bg-slate-700 transition"
                >
                  <td className="py-2 px-3">{r.patient}</td>
                  <td className="py-2 px-3">{r.age}</td>
                  <td className="py-2 px-3">{r.gender}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`font-semibold ${
                        r.result === "Cancerous"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {r.result}
                    </span>
                  </td>
                  <td className="py-2 px-3">{r.confidence}%</td>
                  <td className="py-2 px-3">{r.date}</td>
                  <td className="py-2 px-3 text-center flex justify-center gap-2">
                    <button
                      className="flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium"
                      style={{
                        background: colors.primary,
                        color: "#fff",
                      }}
                      onClick={() => alert(`Viewing report for ${r.patient}`)}
                    >
                      <Eye size={14} /> View
                    </button>
                    <button
                      className="flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium border"
                      style={{
                        borderColor: colors.border,
                        color: colors.primary,
                      }}
                      onClick={() =>
                        alert(`Downloading PDF report for ${r.patient}`)
                      }
                    >
                      <Download size={14} /> PDF
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-400">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default ReportPage;
