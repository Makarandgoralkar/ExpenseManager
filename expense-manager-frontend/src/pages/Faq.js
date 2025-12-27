import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Faq.css";

const FAQ_LIST = [
  {
    category: "Transactions",
    q: "How do I add a transaction?",
    a: "Go to the Transactions page and click on 'Add Transaction'. Fill in the details like amount, category, date, and notes, then save.",
  },
  {
    category: "Transactions",
    q: "Can I edit or delete a transaction?",
    a: "Yes, click on any transaction in the Transactions list to open edit mode. You can update details or delete the transaction.",
  },
  {
    category: "Transactions",
    q: "Can I view transactions for a specific day?",
    a: "Yes, go to the 'Day' view from the Dashboard to see all transactions of a specific date.",
  },
  {
    category: "Analysis",
    q: "How can I analyze my spending?",
    a: "Go to the Analysis page to view category-wise, weekly, or monthly charts of your expenses.",
  },
  {
    category: "Profile",
    q: "How do I update my profile information?",
    a: "Go to the Profile page to update your name, email, and profile picture.",
  },
  {
    category: "Settings",
    q: "Can I change app settings?",
    a: "Yes, the Settings page lets you customize notifications, themes, and account preferences.",
  },
  {
    category: "Account",
    q: "How do I sign out?",
    a: "Click on 'Sign Out' from the Dashboard or Profile Dashboard to log out of your account.",
  },
  {
    category: "Home",
    q: "What is the Home page for?",
    a: "The Home page provides a quick summary of your recent transactions, budgets, and overall spending trends.",
  },
  {
    category: "Transactions",
    q: "Can I search for a transaction?",
    a: "Yes, the Transactions page has a search bar where you can filter by amount, category, or notes.",
  },
  {
    category: "App Info",
    q: "Where can I learn more about the app?",
    a: "Visit the About page to know the app version, developer info, and links to support or social profiles.",
  },
];

function Faq() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigate = useNavigate();

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <div className="faq-container">
        <button className="back-btn" onClick={() => navigate("/profile-dashboard")}>
          ← Back to Dashboard
        </button>
        <h1>FAQs</h1>

        {FAQ_LIST.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{faq.q}</span>
              <span>{expandedIndex === index ? "−" : "+"}</span>
            </div>
            {expandedIndex === index && (
              <div className="faq-answer">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Faq;
