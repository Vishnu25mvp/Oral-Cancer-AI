import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Users, Eye, UserPlus, X } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import DashboardLayout from "./dashboard/DashboardLayout";
import axiosInstance from "../api/axiosInstance";

const ClientPage = () => {
  const { theme, colors } = useContext(ThemeContext);

  // === States ===
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Sorting
  const [orderbyCol, setOrderbyCol] = useState("created_at");
  const [orderbyDir, setOrderbyDir] = useState("desc");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [registering, setRegistering] = useState(false);

  // Counselor registration form
  const [newCounselor, setNewCounselor] = useState({
    name: "",
    email: "",
  });

  // ===========================
  // Fetch counselors
  // ===========================
  const fetchClients = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get("/user/users", {
        params: {
          page,
          limit,
          search,
          filters: JSON.stringify({ role: "counselor" }),
          orderby_col: orderbyCol,
          orderby_dir: orderbyDir,
        },
      });

      const data = res.data;
      setClients(data.data || []);
      setTotalPages(data.pages || 1);
    } catch (err) {
      console.error("Error fetching counselors:", err);
      setError("⚠️ Failed to load counselors. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [page, search, orderbyCol, orderbyDir]);

  // ===========================
  // Handle Counselor Registration
  // ===========================
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setRegistering(true);
    try {
      const res = await axiosInstance.post("/user/users/register", {
        ...newCounselor,
        role: "counselor",
      });
      setMessage("✅ Counselor registered successfully! Credentials sent via email.");
      setNewCounselor({ name: "", email: "" });
      setShowModal(false);
      fetchClients();
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response?.data?.detail?.includes("already registered")) {
        setError("⚠️ This email is already registered for this role.");
      } else {
        setError("⚠️ Failed to register counselor. Try again.");
      }
    } finally {
      setRegistering(false);
    }
  };

  // ===========================
  // Render UI
  // ===========================
  return (
    <DashboardLayout>
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto pr-2">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: colors.primary }}>
                Counselor Management
              </h1>
              <p className="text-sm" style={{ color: colors.secondary }}>
                Manage and register new counselors in the system.
              </p>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              {/* Search Bar */}
              <div
                className="flex items-center gap-2 border px-3 py-2 rounded-lg"
                style={{
                  borderColor: colors.border,
                  background: theme === "light" ? "#fff" : colors.card,
                }}
              >
                <Search size={18} color={colors.secondary} />
                <input
                  type="text"
                  placeholder="Search counselors..."
                  className="bg-transparent outline-none text-sm w-40 md:w-60"
                  style={{ color: colors.text }}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>

              {/* Add Counselor Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow-md"
                style={{
                  background: colors.primary,
                  color: "#fff",
                }}
                onClick={() => setShowModal(true)}
              >
                <UserPlus size={18} /> Add Counselor
              </motion.button>
            </div>
          </div>

          {/* Stats */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 mb-10 rounded-xl shadow-lg border flex items-center justify-between transition-all"
            style={{
              background:
                theme === "light"
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(30,41,59,0.8)",
              borderColor: colors.border,
            }}
          >
            <div className="flex items-center gap-3">
              <Users size={36} color={colors.primary} />
              <div>
                <h2 className="text-3xl font-bold" style={{ color: colors.primary }}>
                  {clients.length}
                </h2>
                <p className="text-sm" style={{ color: colors.secondary }}>
                  Total Registered Counselors
                </p>
              </div>
            </div>
          </motion.div>

          {/* Counselor Table */}
          <div
            className="p-6 rounded-xl shadow-lg border overflow-x-auto"
            style={{
              background:
                theme === "light"
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(30,41,59,0.8)",
              borderColor: colors.border,
            }}
          >
            {loading ? (
              <p className="text-center py-6 text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-center py-6 text-red-500">{error}</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr style={{ color: colors.primary }}>
                    <th className="border-b py-2 px-3 cursor-pointer">Name</th>
                    <th className="border-b py-2 px-3">Email</th>
                    <th className="border-b py-2 px-3">Created At</th>
                    <th className="border-b py-2 px-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.length > 0 ? (
                    clients.map((client) => (
                      <motion.tr
                        key={client.id}
                        whileHover={{ scale: 1.01 }}
                        className="hover:bg-blue-50 dark:hover:bg-slate-700 transition"
                      >
                        <td className="py-2 px-3">{client.name}</td>
                        <td className="py-2 px-3">{client.email}</td>
                        <td className="py-2 px-3">
                          {new Date(client.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-3 text-center">
                          <button
                            className="px-3 py-1 rounded-md text-sm font-medium flex items-center gap-1 mx-auto"
                            style={{
                              background: colors.primary,
                              color: "#fff",
                            }}
                            onClick={() =>
                              alert(`Viewing details for ${client.name}`)
                            }
                          >
                            <Eye size={14} /> View
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-gray-400">
                        No counselors found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* ===========================
           Counselor Registration Modal
      =========================== */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="rounded-xl shadow-2xl p-6 w-full max-w-lg relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{
                background:
                  theme === "light"
                    ? "rgba(255,255,255,0.98)"
                    : "rgba(30,41,59,0.95)",
                border: `1px solid ${colors.border}`,
              }}
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>

              <h3
                className="text-xl font-semibold mb-4 flex items-center gap-2"
                style={{ color: colors.primary }}
              >
                <UserPlus size={18} /> Register New Counselor
              </h3>

              <form onSubmit={handleRegister} className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newCounselor.name}
                  onChange={(e) =>
                    setNewCounselor({ ...newCounselor, name: e.target.value })
                  }
                  className="p-2 rounded-lg border"
                  style={{
                    borderColor: colors.border,
                    background: theme === "light" ? "#fff" : colors.card,
                    color: colors.text,
                  }}
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newCounselor.email}
                  onChange={(e) =>
                    setNewCounselor({ ...newCounselor, email: e.target.value })
                  }
                  className="p-2 rounded-lg border"
                  style={{
                    borderColor: colors.border,
                    background: theme === "light" ? "#fff" : colors.card,
                    color: colors.text,
                  }}
                  required
                />

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={registering}
                  className="py-2 rounded-lg font-semibold"
                  style={{
                    background: colors.primary,
                    color: "#fff",
                    opacity: registering ? 0.6 : 1,
                  }}
                >
                  {registering ? "Registering..." : "Register Counselor"}
                </motion.button>
              </form>

              {message && <p className="text-green-500 text-sm mt-3">{message}</p>}
              {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default ClientPage;
