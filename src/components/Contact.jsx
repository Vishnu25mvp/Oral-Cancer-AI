import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const { theme, colors } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("📩 Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

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
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center mb-8 text-sm hover:text-blue-500 transition"
      >
        <ArrowLeft className="mr-2" size={16} /> Back to Home
      </button>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold mb-4 text-center"
        style={{ color: colors.primary }}
      >
        Get in Touch
      </motion.h1>

      <p
        className="max-w-2xl mx-auto text-center text-lg mb-10"
        style={{ color: colors.secondary }}
      >
        Have questions about the Oral Cancer Detection System, or want to
        collaborate?  
        <br />We’d love to hear from you.
      </p>

      {/* Contact Container */}
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Left - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-2xl shadow-lg border backdrop-blur-md transition-all"
          style={{
            background:
              theme === "light"
                ? "rgba(255,255,255,0.9)"
                : "rgba(30,41,59,0.8)",
            borderColor: colors.border,
          }}
        >
          <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all"
                style={{
                  background: theme === "light" ? "#fff" : colors.card,
                  color: colors.text,
                  borderColor: colors.border,
                }}
                placeholder="Dr. Vishnu Prakash"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all"
                style={{
                  background: theme === "light" ? "#fff" : colors.card,
                  color: colors.text,
                  borderColor: colors.border,
                }}
                placeholder="doctor@example.com"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all resize-none"
                style={{
                  background: theme === "light" ? "#fff" : colors.card,
                  color: colors.text,
                  borderColor: colors.border,
                }}
                placeholder="Type your message here..."
                required
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-lg font-semibold transition-all shadow-md"
              style={{
                background: colors.primary,
                color: "#fff",
              }}
            >
              <Send size={18} /> Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Right - Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-2xl shadow-lg border backdrop-blur-md transition-all"
          style={{
            background:
              theme === "light"
                ? "rgba(255,255,255,0.9)"
                : "rgba(30,41,59,0.8)",
            borderColor: colors.border,
          }}
        >
          <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>
            Contact Information
          </h2>
          <ul className="space-y-4 text-base" style={{ color: colors.secondary }}>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-blue-500" />
              support@oralcancerai.com
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-green-500" />
              +91 98765 43210
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={20} className="text-red-500" />
              Chennai, Tamil Nadu, India
            </li>
          </ul>

          <div className="mt-8">
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: colors.primary }}
            >
              Find Us on Map
            </h3>
            <div
              className="rounded-xl overflow-hidden border"
              style={{ borderColor: colors.border }}
            >
              <iframe
                title="Office Location"
                width="100%"
                height="220"
                frameBorder="0"
                className="rounded-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.8588949652755!2d80.23349181475818!3d13.08268099077572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265e7a6eaf8e9%3A0x4c73a364d5acb049!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                allowFullScreen=""
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-16 border-t pt-6" style={{ borderColor: colors.border }}>
        <p className="text-sm" style={{ color: colors.secondary }}>
          © 2025 Oral Cancer AI — Designed by Vishnu Prakash Manikdan
        </p>
      </footer>
    </div>
  );
};

export default Contact;
