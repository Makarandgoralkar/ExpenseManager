import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaUserCog,
  FaInfoCircle,
  FaTrash,
  FaFileContract,
  FaEnvelope,
  FaShieldAlt,
  FaUsers,
  FaQuestionCircle,
  FaCommentDots,
} from "react-icons/fa";
import "./Settings.css";

function Settings() {

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
    <div className="page-wrapper">
      <Navbar />

      <div className="content-wrap">
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

          {/* MORE SECTION */}
          <motion.div className="settings-card" whileHover={{ scale: 1.02 }}>
            <div className="settings-header">
              <FaInfoCircle className="icon" />
              <h3>More</h3>
            </div>

            <a href="/privacy-policy" className="settings-item">
              <FaShieldAlt className="link-icon" /> Privacy Policy
            </a>
            <a href="/terms-of-service" className="settings-item">
              <FaFileContract className="link-icon" /> Terms of Service
            </a>
            <a href="/contact" className="settings-item">
              <FaEnvelope className="link-icon" /> Contact Us
            </a>
            <a href="/about" className="settings-item">
              <FaUsers className="link-icon" /> About Us
            </a>
          </motion.div>

          {/* SUPPORT & FEEDBACK SECTION */}
          <motion.div className="settings-card" whileHover={{ scale: 1.02 }}>
            <div className="settings-header">
              <FaCommentDots className="icon" />
              <h3>Support & Feedback</h3>
            </div>

            <a href="/faq" className="settings-item">
              <FaQuestionCircle className="link-icon" /> FAQ
            </a>
            <a href="/query" className="settings-item">
              <FaCommentDots className="link-icon" /> Query
            </a>
            <a href="/feedback" className="settings-item">
              <FaEnvelope className="link-icon" /> Feedback
            </a>
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
      </div>

      <Footer />
    </div>
  );
}

export default Settings;
