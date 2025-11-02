import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import DashboardLayout from "./DashboardLayout";
import { motion } from "framer-motion";
import { UploadCloud, User, Mail, CheckCircle } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

const PatientScreening = () => {
  const { theme, colors } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ===========================
  // Handle input changes
  // ===========================
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setFiles([...e.target.files]);

  // ===========================
  // Submit to backend
  // ===========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!formData.name || !formData.email || !formData.age || !formData.gender) {
      setError("⚠️ Please fill all required fields.");
      return;
    }

    if (files.length === 0) {
      setError("⚠️ Please upload at least one image.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("age", formData.age);
      data.append("gender", formData.gender);

      files.forEach((file) => {
        data.append("files", file);
      });

      await axiosInstance.post("/result/results/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Patient details saved successfully!");
      setFormData({ name: "", email: "", age: "", gender: "" });
      setFiles([]);
    } catch (err) {
      console.error("Patient creation error:", err);
      setError("❌ Failed to save patient details. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>
          Patient Registration
        </h1>
        <p className="text-sm" style={{ color: colors.secondary }}>
          Create a new patient record with details and images.
        </p>
      </div>

      {/* Feedback Messages */}
      {message && (
        <div
          className="mb-4 p-3 rounded-lg text-sm font-medium text-green-700 bg-green-100"
        >
          {message}
        </div>
      )}
      {error && (
        <div
          className="mb-4 p-3 rounded-lg text-sm font-medium text-red-700 bg-red-100"
        >
          {error}
        </div>
      )}

      {/* Patient Registration Form */}
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit}
        className="p-6 rounded-xl shadow-lg border grid md:grid-cols-2 gap-8"
        style={{
          background:
            theme === "light"
              ? "rgba(255,255,255,0.9)"
              : "rgba(30,41,59,0.8)",
          borderColor: colors.border,
        }}
      >
        {/* Left Section */}
        <div>
          <h2
            className="text-lg font-semibold mb-4 flex items-center gap-2"
            style={{ color: colors.primary }}
          >
            <User size={18} /> Patient Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border outline-none"
                style={{
                  borderColor: colors.border,
                  background: theme === "light" ? "#fff" : colors.card,
                }}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email *</label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <Mail size={16} color={colors.secondary} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none ml-2"
                  placeholder="john@example.com"
                  style={{
                    color: colors.text,
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Age *</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border outline-none"
                style={{
                  borderColor: colors.border,
                  background: theme === "light" ? "#fff" : colors.card,
                }}
                placeholder="35"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border outline-none"
                style={{
                  borderColor: colors.border,
                  background: theme === "light" ? "#fff" : colors.card,
                }}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Section: Upload Images */}
        <div>
          <h2
            className="text-lg font-semibold mb-4 flex items-center gap-2"
            style={{ color: colors.primary }}
          >
            <UploadCloud size={18} /> Upload Patient Images
          </h2>

          <div
            className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-700 transition"
            onClick={() => document.getElementById("fileInput").click()}
            style={{ borderColor: colors.border }}
          >
            {files.length > 0 ? (
              <div className="flex flex-wrap gap-3 justify-center">
                {Array.from(files).map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <>
                <UploadCloud size={40} className="mb-3 text-blue-500" />
                <p className="text-sm" style={{ color: colors.secondary }}>
                  Click to upload or drag patient images here
                </p>
              </>
            )}

            <input
              id="fileInput"
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleFileChange}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="mt-6 w-full py-2 rounded-lg font-semibold text-white transition-all"
            style={{
              background: loading ? "#94a3b8" : colors.primary,
            }}
          >
            {loading ? "Saving..." : "Save Patient"}
          </motion.button>
        </div>
      </motion.form>

      {/* Success Indicator */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2 text-green-600 font-semibold mt-6"
        >
          <CheckCircle size={18} /> {message}
        </motion.div>
      )}
    </DashboardLayout>
  );
};

export default PatientScreening;
