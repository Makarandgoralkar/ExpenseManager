import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaGlobe, FaLinkedin, FaGithub } from "react-icons/fa";
import "./About.css";

function About() {
  const navigate = useNavigate();
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="content-wrap">
        <div className="about-container">
          <button
            className="back-btn"
            onClick={() => navigate("/profile-dashboard")}
          >
            ← Back to Dashboard
          </button>

          <h1 className="about-title">About Expense Manager</h1>

          <div className="about-card">
            <h2>Overview</h2>
            <p>
              Expense Manager helps you track your income, manage expenses,
              set budgets, and analyze your spending patterns. Stay on top of
              your finances easily!
            </p>
          </div>

          <div className="about-card">
            <h2>Version</h2>
            <p>1.0.0</p>
          </div>

          <div className="about-card">
            <h2>Developer</h2>
            <p>Makarand Goralkar</p>
            <p>Email: support@expensemanager.com</p>
          </div>

          <div className="about-card">
  <h2>Follow Us</h2>
  <p className="social-icons">
    <a href="https://my-portfolio-ca78f.web.app/" target="_blank" rel="noopener noreferrer">
      <FaGlobe size={32} />
    </a>
    <a href="https://www.linkedin.com/in/makarand-goralkar-505788258/" target="_blank" rel="noopener noreferrer">
      <FaLinkedin size={32} />
    </a>
    <a href="https://github.com/Makarandgoralkar" target="_blank" rel="noopener noreferrer">
      <FaGithub size={32} />
    </a>
  </p>
</div>


        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
