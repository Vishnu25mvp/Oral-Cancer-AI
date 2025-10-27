import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { ArrowLeft, Brain, BarChart, Microscope } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const { theme, colors } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen px-6 md:px-20 py-16 transition-all duration-500"
      style={{
        background:
          theme === "light"
            ? `linear-gradient(135deg, ${colors.background}, #f0f9ff)`
            : `linear-gradient(135deg, #0f172a, #1e293b)`,
        color: colors.text,
      }}
    >
      <button
        onClick={() => navigate("/")}
        className="flex items-center mb-8 text-sm hover:text-blue-500 transition"
      >
        <ArrowLeft className="mr-2" size={16} /> Back to Home
      </button>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold mb-6 text-center"
        style={{ color: colors.primary }}
      >
        About the Oral Cancer Detection System
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto text-lg leading-relaxed mb-12 text-center"
        style={{ color: colors.secondary }}
      >
        Oral cancer is one of the most life-threatening diseases worldwide, often
        detected in late stages. This project uses <strong>Convolutional Neural
        Networks (CNN)</strong> to automatically analyze medical images and
        detect signs of oral cancer early — assisting doctors in accurate and
        timely diagnosis.
      </motion.p>

      {/* Feature Sections */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {/* CNN Architecture */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="p-6 rounded-xl shadow-lg border transition-all backdrop-blur-md"
          style={{
            background:
              theme === "light"
                ? "rgba(255,255,255,0.9)"
                : "rgba(30,41,59,0.8)",
            borderColor: colors.border,
          }}
        >
          <Brain size={36} className="mb-3 text-blue-500" />
          <h3 className="text-xl font-semibold mb-2" style={{ color: colors.primary }}>
            Deep Learning Architecture
          </h3>
          <p className="text-base" style={{ color: colors.secondary }}>
            The system employs a CNN model trained on labeled oral image datasets.
            The network automatically extracts spatial features and learns to
            classify between <strong>Normal</strong> and <strong>Cancerous</strong> cases.
          </p>
        </motion.div>

        {/* System Benefits */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="p-6 rounded-xl shadow-lg border transition-all backdrop-blur-md"
          style={{
            background:
              theme === "light"
                ? "rgba(255,255,255,0.9)"
                : "rgba(30,41,59,0.8)",
            borderColor: colors.border,
          }}
        >
          <BarChart size={36} className="mb-3 text-green-500" />
          <h3 className="text-xl font-semibold mb-2" style={{ color: colors.primary }}>
            System Benefits
          </h3>
          <ul className="list-disc list-inside text-base" style={{ color: colors.secondary }}>
            <li>Reduces diagnostic time and human error.</li>
            <li>Provides cost-effective screening.</li>
            <li>Supports early-stage cancer identification.</li>
            <li>Helps rural clinics without advanced labs.</li>
          </ul>
        </motion.div>

        {/* Future Enhancements */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="p-6 rounded-xl shadow-lg border transition-all backdrop-blur-md"
          style={{
            background:
              theme === "light"
                ? "rgba(255,255,255,0.9)"
                : "rgba(30,41,59,0.8)",
            borderColor: colors.border,
          }}
        >
          <Microscope size={36} className="mb-3 text-purple-500" />
          <h3 className="text-xl font-semibold mb-2" style={{ color: colors.primary }}>
            Future Enhancements
          </h3>
          <p className="text-base" style={{ color: colors.secondary }}>
            Future iterations will include:
            <br /> 
            • Integration with cloud-based image databases.
            <br />
            • Real-time image detection via webcam.
            <br />
            • Grad-CAM visualizations for transparency.
            <br />
            • Integration with hospital EMR systems.
          </p>
        </motion.div>
      </div>

      <footer className="text-center mt-16 border-t pt-6" style={{ borderColor: colors.border }}>
        <p className="text-sm" style={{ color: colors.secondary }}>
          © 2025 Oral Cancer AI — Empowering early detection through innovation.
        </p>
      </footer>
    </div>
  );
};

export default About;
