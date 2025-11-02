import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import DashboardLayout from "./DashboardLayout";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Building,
  Lock,
  Save,
  Moon,
  Sun,
  AlertCircle,
  Info,
} from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

const SettingsPage = () => {
  const { theme, toggleTheme, colors } = useContext(ThemeContext);

  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Profile form
  const [profileForm, setProfileForm] = useState({
    phone: "",
    address: "",
    date_of_birth: "",
    bio: "",
  });

  // Password form
  const [passwordForm, setPasswordForm] = useState({
    new_password: "",
    confirm_password: "",
  });

  // ===============================
  // Load user & profile info
  // ===============================
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (!storedUser) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axiosInstance.get("/profile/profiles/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        setProfile(data);
        setProfileForm({
          phone: data.phone || "",
          address: data.address || "",
          date_of_birth: data.date_of_birth
            ? data.date_of_birth.split("T")[0]
            : "",
          bio: data.bio || "",
        });
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("⚠️ Failed to load profile information.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ===============================
  // Handle changes
  // ===============================
  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  // ===============================
  // Update Profile
  // ===============================
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("access_token");

      if (profile) {
        await axiosInstance.put(
          `/user/profiles/${profile.id}`,
          profileForm,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        const res = await axiosInstance.post(`/user/profiles/`, profileForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      }

      setMessage("✅ Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err);
      setError("⚠️ Failed to update profile. Please try again later.");
    }
  };

  // ===============================
  // Update Password
  // ===============================
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setError("⚠️ Passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      await axiosInstance.put(
        `/user/users/${user.id}`,
        { password: passwordForm.new_password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Password updated successfully!");
      setPasswordForm({ new_password: "", confirm_password: "" });
    } catch (err) {
      console.error("Password update error:", err);
      setError("⚠️ Failed to update password. Try again later.");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-center mt-10" style={{ color: colors.secondary }}>
          Loading settings...
        </p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: colors.primary }}
          >
            Account Settings
          </h1>
          <p className="text-sm" style={{ color: colors.secondary }}>
            Manage your profile and change your password.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm" style={{ color: colors.secondary }}>
            Theme:
          </span>
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
      </div>

      {/* Feedback messages */}
      {message && (
        <div
          className="mb-4 p-3 rounded-lg text-sm font-medium flex items-center gap-2"
          style={{ background: "#dcfce7", color: "#166534" }}
        >
          ✅ {message}
        </div>
      )}
      {error && (
        <div
          className="mb-4 p-3 rounded-lg text-sm font-medium flex items-center gap-2"
          style={{ background: "#fee2e2", color: "#991b1b" }}
        >
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {/* ===================== PROFILE UPDATE ===================== */}
      {/* <motion.form
        onSubmit={handleProfileUpdate}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-6 mb-10 rounded-xl shadow-lg border grid md:grid-cols-2 gap-8"
        style={{
          background:
            theme === "light"
              ? "rgba(255,255,255,0.9)"
              : "rgba(30,41,59,0.8)",
          borderColor: colors.border,
        }}
      >
        <h2
          className="md:col-span-2 text-lg font-semibold flex items-center gap-2 mb-4"
          style={{ color: colors.primary }}
        >
          <Info size={18} /> Profile Information
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <div
              className="flex items-center gap-2 border px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-700"
              style={{ borderColor: colors.border }}
            >
              <User size={16} color={colors.secondary} />
              <input
                type="text"
                value={user?.name || ""}
                disabled
                className="bg-transparent outline-none w-full cursor-not-allowed"
                style={{ color: colors.text }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <div
              className="flex items-center gap-2 border px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-700"
              style={{ borderColor: colors.border }}
            >
              <Mail size={16} color={colors.secondary} />
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="bg-transparent outline-none w-full cursor-not-allowed"
                style={{ color: colors.text }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Phone</label>
            <div
              className="flex items-center gap-2 border px-3 py-2 rounded-lg"
              style={{ borderColor: colors.border }}
            >
              <Phone size={16} color={colors.secondary} />
              <input
                type="text"
                name="phone"
                value={profileForm.phone}
                onChange={handleProfileChange}
                className="bg-transparent outline-none w-full"
                style={{ color: colors.text }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Address</label>
            <div
              className="flex items-center gap-2 border px-3 py-2 rounded-lg"
              style={{ borderColor: colors.border }}
            >
              <Building size={16} color={colors.secondary} />
              <input
                type="text"
                name="address"
                value={profileForm.address}
                onChange={handleProfileChange}
                className="bg-transparent outline-none w-full"
                style={{ color: colors.text }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Bio</label>
            <textarea
              name="bio"
              value={profileForm.bio}
              onChange={handleProfileChange}
              rows="3"
              className="w-full border rounded-lg p-2 bg-transparent outline-none"
              style={{ borderColor: colors.border, color: colors.text }}
              placeholder="Write something about yourself..."
            ></textarea>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="md:col-span-2 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 text-white mt-4"
          style={{ background: colors.primary }}
        >
          <Save size={18} /> Save Profile
        </motion.button>
      </motion.form> */}

      {/* ===================== PASSWORD UPDATE ===================== */}
      <motion.form
        onSubmit={handlePasswordUpdate}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-6 rounded-xl shadow-lg border space-y-6"
        style={{
          background:
            theme === "light"
              ? "rgba(255,255,255,0.9)"
              : "rgba(30,41,59,0.8)",
          borderColor: colors.border,
        }}
      >
        <h2
          className="text-lg font-semibold flex items-center gap-2 mb-2"
          style={{ color: colors.primary }}
        >
          <Lock size={18} /> Change Password
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm mb-1">New Password</label>
            <input
              type="password"
              name="new_password"
              value={passwordForm.new_password}
              onChange={handlePasswordChange}
              className="w-full border rounded-lg p-2 bg-transparent outline-none"
              style={{ borderColor: colors.border, color: colors.text }}
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={passwordForm.confirm_password}
              onChange={handlePasswordChange}
              className="w-full border rounded-lg p-2 bg-transparent outline-none"
              style={{ borderColor: colors.border, color: colors.text }}
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="py-2 rounded-lg font-semibold flex items-center justify-center gap-2 text-white mt-2"
          style={{ background: colors.primary }}
        >
          <Save size={18} /> Update Password
        </motion.button>
      </motion.form>
    </DashboardLayout>
  );
};

export default SettingsPage;
