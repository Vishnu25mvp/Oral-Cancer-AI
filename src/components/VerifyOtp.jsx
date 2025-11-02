import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { Moon, Sun, Mail, ShieldCheck, RefreshCw } from "lucide-react";
import axiosInstance from "../api/axiosInstance";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme, colors } = useContext(ThemeContext);

  // Get email passed from signup screen
  const emailFromState = location.state?.email || "";
  const [email, setEmail] = useState(emailFromState);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  // Redirect if email missing
  useEffect(() => {
    if (!email) {
      navigate("/signup");
    }
  }, [email, navigate]);

  // ==========================
  // Verify OTP Handler
  // ==========================
  const handleVerify = async (e) => {
  e.preventDefault();
  setError("");
  setMessage("");

  if (!otp || otp.length !== 6) {
    setError("⚠️ Please enter a valid 6-digit OTP");
    return;
  }

  setLoading(true);
  try {
    const res = await axiosInstance.post("/user/users/verify-otp", {
      email,
      otp_code: otp,
    });

    const data = res.data;
    console.log("✅ OTP Verified:", data);

    // Optional: clear temp data if stored
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    setMessage("✅ OTP verified successfully! Redirecting to login...");
    setTimeout(() => navigate("/login"), 1500);
  } catch (err) {
    console.error("❌ OTP verification error:", err);

    if (err.response?.data?.detail === "Invalid OTP code") {
      setError("❌ Invalid OTP. Please try again.");
    } else if (err.response?.data?.detail === "User not found") {
      setError("⚠️ User not found. Please register again.");
    } else {
      setError("⚠️ OTP verification failed. Try again later.");
    }
  } finally {
    setLoading(false);
  }
};


  // ==========================
  // Resend OTP Handler
  // ==========================
  const handleResendOtp = async () => {
    if (!email) return;

    setError("");
    setMessage("");
    setResending(true);
    try {
      const res = await axiosInstance.post("/user/users/resend-otp", { email });
      setMessage("📩 A new OTP has been sent to your email.");
    } catch (err) {
      console.error("Resend OTP error:", err);
      setError("⚠️ Failed to resend OTP. Please try again later.");
    } finally {
      setResending(false);
    }
  };

  // ==========================
  // UI
  // ==========================
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
              Verify Your OTP
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
            Enter the 6-digit OTP sent to your email <b>{email}</b>.
          </p>

          {/* OTP Form */}
          <form onSubmit={handleVerify}>
            {/* Email (readonly) */}
            <div className="mb-5 relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                className="w-full pl-10 pr-3 py-2 rounded-lg border bg-gray-100"
                style={{
                  color: colors.text,
                  borderColor: colors.border,
                  cursor: "not-allowed",
                }}
                value={email}
                readOnly
              />
            </div>

            {/* OTP Input */}
            <div className="mb-5 relative">
              <ShieldCheck
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <input
                type="text"
                maxLength={6}
                pattern="\d*"
                className="w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 outline-none transition-all text-center tracking-widest text-lg font-semibold"
                style={{
                  background: theme === "light" ? "#fff" : colors.card,
                  color: colors.text,
                  borderColor: colors.border,
                  letterSpacing: "4px",
                }}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
              />
            </div>

            {/* Messages */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm mb-4 text-center"
              >
                {error}
              </motion.p>
            )}
            {message && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-500 text-sm mb-4 text-center"
              >
                {message}
              </motion.p>
            )}

            {/* Verify Button */}
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
              {loading ? "Verifying..." : "Verify OTP"}
            </motion.button>
          </form>

          {/* Resend OTP */}
          <div className="text-center mt-5">
            <button
              onClick={handleResendOtp}
              disabled={resending}
              className="flex items-center justify-center gap-2 mx-auto text-sm font-medium hover:underline"
              style={{
                color: colors.accent,
                opacity: resending ? 0.6 : 1,
              }}
            >
              <RefreshCw size={14} />
              {resending ? "Resending..." : "Resend OTP"}
            </button>
          </div>

          {/* Back to Login */}
          <p
            className="text-center mt-6 text-sm"
            style={{ color: colors.secondary }}
          >
            Already verified?{" "}
            <Link
              to="/login"
              style={{ color: colors.accent }}
              className="font-semibold hover:underline"
            >
              Go to Login
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p
          className="text-center mt-6 text-xs opacity-70"
          style={{ color: colors.secondary }}
        >
          © 2025 Oral Cancer AI System — Secure Account Verification
        </p>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;
