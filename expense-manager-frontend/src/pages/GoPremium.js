// src/pages/GoPremium.js
import React from "react";
import Navbar from "../components/Navbar";
import "./GoPremium.css";

function GoPremium() {
  const handleUpgrade = () => {
    alert("Premium upgrade coming soon!");
  };

  const features = [
    {
      title: "Unlimited Categories",
      description: "Create unlimited categories to track your spending.",
    },
    {
      title: "Advanced Analytics",
      description: "Get detailed insights, charts, and trends for your finances.",
    },
    {
      title: "Priority Support",
      description: "Access priority customer support anytime.",
    },
    {
      title: "Custom Reports",
      description: "Generate reports in PDF/Excel for any period.",
    },
    {
      title: "Ad-Free Experience",
      description: "Enjoy a clean, ad-free interface while managing finances.",
    },
    {
      title: "Scheduled Transactions",
      description: "Set recurring payments and never miss a transaction.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h2>Go Premium</h2>
        <p>Unlock exclusive features and take full control of your finances!</p>
        <button className="upgrade-button" onClick={handleUpgrade}>
          Upgrade Now
        </button>

        <div className="features-grid">
          {features.map((f, index) => (
            <div className="feature-card" key={index}>
              <h4>{f.title}</h4>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default GoPremium;
