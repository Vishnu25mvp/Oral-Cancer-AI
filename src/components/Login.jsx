import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { Moon, Sun, Mail, Lock } from "lucide-react";
import axiosInstance from "../api/axiosInstance.js"; // ✅ Import Axios instance

const Login = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme, colors } = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await axiosInstance.post("/user/users/login", {
      email,
      password,
    });

    const data = res.data;

    // ✅ Save token & user info
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("user", JSON.stringify(data.user));

    const userRole = data.user.role;
    alert("✅ Login successful!");

    // ✅ Redirect user based on role
    if (userRole === "admin") {
      navigate("/dashboard");
    } else if (userRole === "counselor") {
      navigate("/dashboard/patient");
    } else if (userRole === "user") {
      navigate("/dashboard/reports");
    } else {
      navigate("/unauthorized"); // fallback safety
    }
  } catch (err) {
    console.error("Login error:", err);

    const detail =
      err.response?.data?.detail ||
      "⚠️ Login failed. Please try again later.";

    if (detail.includes("verify your OTP")) {
      setError("⚠️ Please verify your email via OTP before logging in.");
    } else if (detail.includes("Invalid email or password")) {
      setError("❌ Invalid email or password.");
    } else {
      setError(detail);
    }
  } finally {
    setLoading(false);
  }
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
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <h2
              className="text-2xl font-bold"
              style={{ color: colors.primary }}
            >
              Oral Cancer Detection
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
            Sign in to access AI-powered oral cancer detection dashboard.
          </p>

          {/* Form */}
          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="mb-5 relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                className="w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 outline-none transition-all"
                style={{
                  background: theme === "light" ? "#fff" : colors.card,
                  color: colors.text,
                  borderColor: colors.border,
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@example.com"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-5 relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                className="w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 outline-none transition-all"
                style={{
                  background: theme === "light" ? "#fff" : colors.card,
                  color: colors.text,
                  borderColor: colors.border,
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full py-2 font-semibold rounded-lg shadow-md transition-all"
              style={{
                background: colors.primary,
                color: "#fff",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </motion.button>
          </form>

          {/* Footer */}
          <p
            className="text-center mt-6 text-sm"
            style={{ color: colors.secondary }}
          >
            Don’t have an account?{" "}
            <Link
              to="/signup"
              style={{ color: colors.accent }}
              className="font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Branding or Footer Note */}
        <p
          className="text-center mt-6 text-xs opacity-70"
          style={{ color: colors.secondary }}
        >
          © 2025 Oral Cancer AI System — Designed for Smarter Health Diagnosis
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
