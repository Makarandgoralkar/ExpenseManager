import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Legal.css";

function TermsOfService() {
  return (
    <>
      <Navbar />

      <div className="home-container">
        <div className="table-wrapper legal-box">
          <h1 className="legal-title">Terms of Service</h1>

          <h3>Acceptance of Terms</h3>
          <p>
            By accessing or using Expense Manager, you agree to be bound by these
            Terms of Service.
          </p>

          <h3>Use of the Application</h3>
          <p>
            You agree to use this application only for lawful purposes and not
            misuse its features.
          </p>

          <h3>User Responsibilities</h3>
          <ul>
            <li>Maintain account confidentiality</li>
            <li>Provide accurate information</li>
            <li>Do not attempt unauthorized access</li>
          </ul>

          <h3>Account Termination</h3>
          <p>
            We reserve the right to suspend or terminate accounts that violate
            these terms.
          </p>

          <h3>Limitation of Liability</h3>
          <p>
            Expense Manager shall not be liable for financial losses or data
            inaccuracies.
          </p>

          <h3>Changes to Terms</h3>
          <p>
            These terms may be updated periodically. Continued use indicates
            acceptance of the updated terms.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default TermsOfService;
