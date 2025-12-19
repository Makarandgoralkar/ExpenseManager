// src/pages/About.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./About.css";

function About() {
    const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="about-container">
        <button className="back-btn" onClick={() => navigate("/profile-dashboard")}>
          ← Back to Dashboard
        </button>
        <h1>About Expense Manager</h1>

        <div className="about-card">
          <h2>Overview</h2>
          <p>
            Expense Manager helps you track your income, manage expenses, set budgets, and analyze your spending patterns. Stay on top of your finances easily!
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
          <p>
            <a href="https://my-portfolio-ca78f.web.app/">Website</a> | <a href="https://www.linkedin.com/in/makarand-goralkar-505788258/">LinkedIn</a> | <a href="https://github.com/Makarandgoralkar">GitHub</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
