import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { Moon, Sun, Home, LogOut } from "lucide-react";

const HomeScreen = () => {
  const { theme, toggleTheme, colors } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col transition-all duration-500"
      style={{
        background:
          theme === "light"
            ? `linear-gradient(135deg, ${colors.background}, #e0f2fe)`
            : `linear-gradient(135deg, #0f172a, #1e293b)`,
        color: colors.text,
      }}
    >
      {/* Navbar */}
      <nav
        className="flex items-center justify-between px-8 py-4 shadow-lg backdrop-blur-md sticky top-0 z-50"
        style={{
          background:
            theme === "light"
              ? "rgba(255,255,255,0.8)"
              : "rgba(30,41,59,0.8)",
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div className="flex items-center space-x-2">
          <Home size={22} style={{ color: colors.primary }} />
          <h1 className="text-xl font-bold" style={{ color: colors.primary }}>
            Oral Cancer AI
          </h1>
        </div>

        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/about" className="hover:text-blue-500">About</Link>
          <a href="/contact" className="hover:text-blue-500">Contact</a>
          <Link to="/login" className="hover:text-blue-500">Login</Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border transition hover:scale-110"
            style={{ borderColor: colors.border }}
          >
            {theme === "light" ? (
              <Moon size={18} color={colors.text} />
            ) : (
              <Sun size={18} color={colors.text} />
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-4"
          style={{ color: colors.primary }}
        >
          Revolutionizing Oral Cancer Detection with AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-2xl text-lg md:text-xl mb-8"
          style={{ color: colors.secondary }}
        >
          Experience faster, more accurate oral cancer diagnosis with our
          <strong> Deep Learning (CNN)</strong> based AI system — designed for
          hospitals, clinics, and medical researchers.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
          className="px-8 py-3 rounded-lg shadow-lg font-semibold transition-all"
          style={{
            background: colors.primary,
            color: "#fff",
          }}
        >
          Get Started
        </motion.button>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="text-center py-6 border-t mt-auto"
        style={{ borderColor: colors.border }}
      >
        <p className="text-sm" style={{ color: colors.secondary }}>
          © 2025 Oral Cancer AI System — Designed by Vishnu Prakash Manikdan
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-3 text-sm flex items-center justify-center mx-auto gap-2 text-red-400 hover:text-red-500 transition"
        >
          <LogOut size={16} /> Logout
        </button>
      </footer>
    </div>
  );
};

export default HomeScreen;
