import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import DashboardLayout from "./DashboardLayout";
import { motion } from "framer-motion";
import { UploadCloud, User, FileText, CheckCircle } from "lucide-react";

const PatientScreening = () => {
  const { theme, colors } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.age || !formData.gender || !selectedFile) {
      alert("⚠️ Please fill all fields and upload an image.");
      return;
    }

    setLoading(true);
    setReport(null);

    // Simulate AI prediction process
    setTimeout(() => {
      const result = Math.random() > 0.5 ? "Cancerous" : "Normal";
      const confidence = (Math.random() * (99 - 85) + 85).toFixed(2);
      setReport({
        result,
        confidence,
        fileName: selectedFile.name,
      });
      setLoading(false);
    }, 2500);
  };

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>
          Patient Screening & AI Report
        </h1>
        <p className="text-sm" style={{ color: colors.secondary }}>
          Register patient details, upload oral image, and get AI-based analysis report.
        </p>
      </div>

      {/* Patient Registration Form */}
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit}
        className="p-6 rounded-xl shadow-lg border grid md:grid-cols-2 gap-8"
        style={{
          background:
            theme === "light" ? "rgba(255,255,255,0.9)" : "rgba(30,41,59,0.8)",
          borderColor: colors.border,
        }}
      >
        {/* Left Column: Patient Info */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.primary }}>
            <User size={18} /> Patient Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Full Name</label>
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
              <label className="block text-sm mb-1">Age</label>
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
              <label className="block text-sm mb-1">Gender</label>
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

        {/* Right Column: Image Upload */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.primary }}>
            <UploadCloud size={18} /> Upload Oral Image
          </h2>

          <div
            className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-700 transition"
            onClick={() => document.getElementById("fileInput").click()}
            style={{ borderColor: colors.border }}
          >
            {selectedFile ? (
              <>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="preview"
                  className="w-32 h-32 object-cover rounded-lg mb-3"
                />
                <p className="text-sm" style={{ color: colors.secondary }}>
                  {selectedFile.name}
                </p>
              </>
            ) : (
              <>
                <UploadCloud size={40} className="mb-3 text-blue-500" />
                <p className="text-sm" style={{ color: colors.secondary }}>
                  Click to upload or drag an image here
                </p>
              </>
            )}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
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
            {loading ? "Analyzing Image..." : "Generate Report"}
          </motion.button>
        </div>
      </motion.form>

      {/* Report Section */}
      {report && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-10 p-6 rounded-xl shadow-lg border"
          style={{
            background:
              theme === "light" ? "rgba(255,255,255,0.9)" : "rgba(30,41,59,0.8)",
            borderColor: colors.border,
          }}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: colors.primary }}>
            <FileText size={18} /> AI Report Summary
          </h2>

          <div className="space-y-2">
            <p><strong>Patient:</strong> {formData.name}</p>
            <p><strong>Age:</strong> {formData.age}</p>
            <p><strong>Gender:</strong> {formData.gender}</p>
            <p><strong>File:</strong> {report.fileName}</p>
            <p>
              <strong>Result:</strong>{" "}
              <span
                className={`font-bold ${
                  report.result === "Cancerous" ? "text-red-500" : "text-green-500"
                }`}
              >
                {report.result}
              </span>
            </p>
            <p>
              <strong>Confidence:</strong> {report.confidence}%
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mt-6 flex items-center justify-center gap-2 text-green-600 font-semibold"
          >
            <CheckCircle size={18} /> Report Generated Successfully
          </motion.div>
        </motion.div>
      )}
    </DashboardLayout>
  );
};

export default PatientScreening;
