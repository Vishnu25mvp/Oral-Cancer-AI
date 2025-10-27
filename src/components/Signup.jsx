import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { Moon, Sun, User, Mail, Lock } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme, colors } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("⚠️ Please fill in all required fields");
      return;
    }
    alert("🎉 Account created successfully! Redirecting to login...");
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 transition-all duration-500"
      style={{
        background:
          theme === "light"
            ? `linear-gradient(135deg, ${colors.background}, #e0f2fe)`
            : `linear-gradient(135deg, #0f172a, #1e293b)`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Glassmorphism Card */}
        <div
          className="rounded-2xl shadow-2xl p-8 backdrop-blur-md border transition-all duration-500"
          style={{
            background:
              theme === "light"
                ? "rgba(255, 255, 255, 0.9)"
                : "rgba(30, 41, 59, 0.8)",
            borderColor: colors.border,
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>
              Create an Account
            </h2>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border hover:scale-110 transition"
              style={{ borderColor: colors.border, color: colors.text }}
              title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>

          <p
            className="text-sm mb-6 text-center"
            style={{ color: colors.secondary }}
          >
            Join the AI-powered Oral Cancer Detection platform.
          </p>

          {/* Form */}
          <form onSubmit={handleSignup}>
            {/* Full Name */}
            <div className="mb-5 relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                name="name"
                className="w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 outline-none transition-all"
                style={{
                  background: theme === "light" ? "#fff" : colors.card,
                  color: colors.text,
                  borderColor: colors.border,
                }}
                value={formData.name}
                onChange={handleChange}
                placeholder="Dr. Vishnu Prakash"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-5 relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                className="w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 outline-none transition-all"
                style={{
                  background: theme === "light" ? "#fff" : colors.card,
                  color: colors.text,
                  borderColor: colors.border,
                }}
                value={formData.email}
                onChange={handleChange}
                placeholder="doctor@example.com"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-5 relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                name="password"
                className="w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 outline-none transition-all"
                style={{
                  background: theme === "light" ? "#fff" : colors.card,
                  color: colors.text,
                  borderColor: colors.border,
                }}
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm mb-4 text-center"
              >
                {error}
              </motion.p>
            )}

            {/* Signup Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-2 font-semibold rounded-lg shadow-md transition-all"
              style={{
                background: colors.primary,
                color: "#fff",
              }}
            >
              Sign Up
            </motion.button>
          </form>

          {/* Footer */}
          <p
            className="text-center mt-6 text-sm"
            style={{ color: colors.secondary }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: colors.accent }}
              className="font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Branding Footer */}
        <p
          className="text-center mt-6 text-xs opacity-70"
          style={{ color: colors.secondary }}
        >
          © 2025 Oral Cancer AI System — Empowering Smarter Health Diagnostics
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
