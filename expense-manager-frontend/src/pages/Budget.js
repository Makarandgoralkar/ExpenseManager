import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Budget.css";

function Budget() {
  const [mode, setMode] = useState("MONTHLY");
  const setupbudget = () => {
    alert("Setup-Budget coming soon!");
  };

  const heading =
    mode === "MONTHLY"
      ? "Set Up Your First Monthly Budget"
      : "Set Up Your First Yearly Budget";

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="content-wrap">
        <div className="budget-container">

          {/* Segmented Toggle */}
          <div className="segmented-toggle">
            <button
              className={mode === "MONTHLY" ? "active" : ""}
              onClick={() => setMode("MONTHLY")}
            >
              Monthly
            </button>

            <button
              className={mode === "YEARLY" ? "active" : ""}
              onClick={() => setMode("YEARLY")}
            >
              Yearly
            </button>
          </div>

          {/* Illustration */}
          <div className="budget-illustration">
            <img
              src="/money-bag-rupee.png"
              alt="Money Bag"
            />
          </div>

          {/* Heading */}
          <h2 className="budget-heading">{heading}</h2>

          {/* Description */}
          <p className="budget-description">
            Budgeting is one of the most important steps toward financial
            stability and control over your expenses.
          </p>

          {/* CTA Button */}
          <button
           className="setup-budget-btn"
           onClick={setupbudget}
          >
            Set Up Budget
          </button>


        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Budget;
