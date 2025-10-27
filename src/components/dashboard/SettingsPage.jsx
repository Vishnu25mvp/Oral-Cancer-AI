import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import DashboardLayout from "./DashboardLayout";
import { motion } from "framer-motion";
import { User, Mail, Phone, Building, Lock, Save, Moon, Sun } from "lucide-react";

const SettingsPage = () => {
  const { theme, toggleTheme, colors } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    name: "Dr. Vishnu Prakash",
    email: "doctor@example.com",
    phone: "+91 98765 43210",
    hospital: "Apollo Chennai",
    specialization: "Oncology",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Profile updated successfully!");
  };

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>
          Account Settings
        </h1>
        <p className="text-sm" style={{ color: colors.secondary }}>
          Manage your profile, hospital details, and preferences.
        </p>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-6 mb-10 rounded-xl shadow-lg border flex items-center gap-6 flex-wrap"
        style={{
          background: theme === "light" ? "rgba(255,255,255,0.9)" : "rgba(30,41,59,0.8)",
          borderColor: colors.border,
        }}
      >
        <div className="flex flex-col items-center">
          <div
            className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold"
          >
            {formData.name.charAt(0)}
          </div>
          <p className="mt-3 text-base font-semibold" style={{ color: colors.text }}>
            {formData.name}
          </p>
          <p className="text-sm" style={{ color: colors.secondary }}>
            {formData.specialization}
          </p>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <p className="text-sm" style={{ color: colors.secondary }}>
            Theme:
          </p>
          <button
            onClick={toggleTheme}
            className="p-2 border rounded-full transition hover:scale-110"
            style={{ borderColor: colors.border }}
          >
            {theme === "light" ? (
              <Moon size={18} color={colors.text} />
            ) : (
              <Sun size={18} color={colors.text} />
            )}
          </button>
        </div>
      </motion.div>

      {/* Update Profile Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-6 rounded-xl shadow-lg border grid md:grid-cols-2 gap-8"
        style={{
          background: theme === "light" ? "rgba(255,255,255,0.9)" : "rgba(30,41,59,0.8)",
          borderColor: colors.border,
        }}
      >
        {/* Left Section */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <div className="flex items-center gap-2 border px-3 py-2 rounded-lg"
              style={{ borderColor: colors.border }}>
              <User size={16} color={colors.secondary} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-transparent outline-none w-full"
                style={{ color: colors.text }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Email Address</label>
            <div className="flex items-center gap-2 border px-3 py-2 rounded-lg"
              style={{ borderColor: colors.border }}>
              <Mail size={16} color={colors.secondary} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent outline-none w-full"
                style={{ color: colors.text }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Phone</label>
            <div className="flex items-center gap-2 border px-3 py-2 rounded-lg"
              style={{ borderColor: colors.border }}>
              <Phone size={16} color={colors.secondary} />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-transparent outline-none w-full"
                style={{ color: colors.text }}
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Hospital Name</label>
            <div className="flex items-center gap-2 border px-3 py-2 rounded-lg"
              style={{ borderColor: colors.border }}>
              <Building size={16} color={colors.secondary} />
              <input
                type="text"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                className="bg-transparent outline-none w-full"
                style={{ color: colors.text }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Specialization</label>
            <div className="flex items-center gap-2 border px-3 py-2 rounded-lg"
              style={{ borderColor: colors.border }}>
              <User size={16} color={colors.secondary} />
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="bg-transparent outline-none w-full"
                style={{ color: colors.text }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">New Password</label>
            <div className="flex items-center gap-2 border px-3 py-2 rounded-lg"
              style={{ borderColor: colors.border }}>
              <Lock size={16} color={colors.secondary} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-transparent outline-none w-full"
                style={{ color: colors.text }}
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="md:col-span-2 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 text-white mt-4"
          style={{ background: colors.primary }}
        >
          <Save size={18} /> Save Changes
        </motion.button>
      </motion.form>
    </DashboardLayout>
  );
};

export default SettingsPage;
