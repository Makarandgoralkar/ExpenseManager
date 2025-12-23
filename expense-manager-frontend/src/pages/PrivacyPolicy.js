import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Legal.css";

function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      <div className="home-container">
        <div className="table-wrapper legal-box">
          <h1 className="legal-title">Privacy Policy</h1>

          <h3>Introduction</h3>
          <p>
            Expense Manager values your privacy and is committed to protecting
            your personal data. This Privacy Policy explains how your information
            is collected, used, and safeguarded.
          </p>

          <h3>Information We Collect</h3>
          <ul>
            <li>Name and email address</li>
            <li>Income and expense records</li>
            <li>Authentication and login data</li>
          </ul>

          <h3>How We Use Your Information</h3>
          <ul>
            <li>To provide expense tracking services</li>
            <li>To personalize user experience</li>
            <li>To maintain account security</li>
          </ul>

          <h3>Data Security</h3>
          <p>
            We use industry-standard security practices to protect your data.
            However, no online system is 100% secure.
          </p>

          <h3>Your Rights</h3>
          <p>
            You may update or delete your personal data at any time through your
            account settings.
          </p>

          <h3>Contact</h3>
          <p>Email: support@expensemanager.com</p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default PrivacyPolicy;
