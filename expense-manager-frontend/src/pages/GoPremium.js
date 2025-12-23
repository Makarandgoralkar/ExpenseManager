import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./GoPremium.css";

function GoPremium() {
  const handleUpgrade = () => {
    alert("Premium upgrade coming soon!");
  };

  const features = [
    { title: "Unlimited Categories", description: "Create unlimited categories to track your spending." },
    { title: "Advanced Analytics", description: "Get detailed insights, charts, and trends for your finances." },
    { title: "Priority Support", description: "Access priority customer support anytime." },
    { title: "Custom Reports", description: "Generate reports in PDF/Excel for any period." },
    { title: "Ad-Free Experience", description: "Enjoy a clean, ad-free interface while managing finances." },
    { title: "Scheduled Transactions", description: "Set recurring payments and never miss a transaction." },
  ];

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="content-wrap">
        <div className="page-container">
          <h2>Go Premium</h2>
          <p>Unlock exclusive features and take full control of your finances!</p>
          <button className="upgrade-button" onClick={handleUpgrade}>
            Upgrade Now
          </button>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GoPremium;
