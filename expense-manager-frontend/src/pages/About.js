import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaGlobe, FaLinkedin, FaGithub } from "react-icons/fa";
import "./About.css";

// IMPORT ASSETS (same style as Navbar)
import appLogo from "../assets/expense_manager_logo.png";
import devPhoto from "../assets/dev_photo.jpg"; // add your photo here

function About() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="content-wrap">
        {/* HERO */}
        <section className="about-hero">
          <button
            className="back-btn"
            onClick={() => navigate("/profile-dashboard")}
          >
            ← Back to Dashboard
          </button>

          <h1>Expense Manager</h1>
          <p>Smart. Simple. Secure way to manage your finances.</p>
        </section>

        {/* CONTENT */}
        <div className="about-container">
          {/* OVERVIEW */}
          <div className="about-card glass">
            <h2>📌 Overview</h2>
            <p>
              Expense Manager helps you track income, manage expenses,
              set budgets, and analyze your spending patterns — all in one place.
            </p>
          </div>

          {/* APP + DEVELOPER */}
          <div className="info-grid">
            {/* APP INFO */}
            <div className="about-card app-card glass">
              <img src={appLogo} alt="App Logo" className="app-icon" />
              <h2>Expense Manager</h2>
              <p className="app-version">Version 1.0.0</p>
              <p className="app-desc">
                A modern finance app designed to make expense tracking
                simple, fast, and reliable.
              </p>
            </div>

            {/* DEVELOPER INFO */}
            <div className="about-card dev-card glass">
              <img src={devPhoto} alt="Developer" className="dev-photo" />
              <h2>Makarand Goralkar</h2>
              <p className="dev-role">Full Stack Developer</p>
              <p className="dev-email">makarandgoralkar27@gmail.com</p>

              <div className="social-icons">
                <a href="https://my-portfolio-ca78f.web.app/" target="_blank" rel="noreferrer">
                  <FaGlobe size={26} />
                </a>
                <a href="https://www.linkedin.com/in/makarand-goralkar-505788258/" target="_blank" rel="noreferrer">
                  <FaLinkedin size={26} />
                </a>
                <a href="https://github.com/Makarandgoralkar" target="_blank" rel="noreferrer">
                  <FaGithub size={26} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
