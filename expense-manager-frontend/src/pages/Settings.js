import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import {
  FaUserCog,
  FaPalette,
  FaMoneyBill,
  FaInfoCircle,
  FaTrash,
} from "react-icons/fa";
import "./Settings.css";

function Settings() {
  const [theme, setTheme] = useState("light");
  const [currency, setCurrency] = useState("INR");
  const [notifications, setNotifications] = useState(true);

  const deleteAccount = async () => {
  if (!window.confirm("Are you sure you want to delete your account permanently?")) {
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8080/api/user/delete", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const msg = await res.text();

    alert(msg);

    if (res.ok) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  } catch (err) {
    alert("Failed to delete account");
  }
};


  return (
    <>
      <Navbar />

      <div className="settings-wrapper">
        <motion.h2
          className="settings-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Settings
        </motion.h2>

        {/* ACCOUNT SETTINGS */}
        <motion.div
          className="settings-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="settings-header">
            <FaUserCog className="icon" />
            <h3>Account Settings</h3>
          </div>

          <a href="/profile" className="settings-item">
            Update Profile
          </a>

          <button className="delete-account-btn" onClick={deleteAccount}>
          <FaTrash /> Delete Account
          </button>

        </motion.div>

        {/* APPEARANCE */}
        <motion.div
          className="settings-card"
          whileHover={{ scale: 1.02 }}
        >
          <div className="settings-header">
            <FaPalette className="icon" />
            <h3>Appearance</h3>
          </div>

          <label className="settings-row">
            Theme
            <select
              className="select-input"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">☀ Light</option>
              <option value="dark">🌙 Dark</option>
            </select>
          </label>
        </motion.div>

        {/* APP PREFERENCES */}
        <motion.div className="settings-card" whileHover={{ scale: 1.02 }}>
          <div className="settings-header">
            <FaMoneyBill className="icon" />
            <h3>App Preferences</h3>
          </div>

          <label className="settings-row">
            Currency
            <select
              className="select-input"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="INR">₹ INR</option>
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
            </select>
          </label>

          {/* Toggle switch */}
          <label className="settings-row">
            Notifications
            <label className="switch">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <span className="slider"></span>
            </label>
          </label>
        </motion.div>

        {/* ABOUT SECTION */}
        <motion.div className="settings-card" whileHover={{ scale: 1.02 }}>
          <div className="settings-header">
            <FaInfoCircle className="icon" />
            <h3>About</h3>
          </div>

          <p className="about-text">Expense Manager v1.0</p>
          <p className="about-text">Developed by Makarand Goralkar</p>
        </motion.div>
      </div>
    </>
  );
}

export default Settings;
