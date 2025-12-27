import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import {
  FaUtensils,
  FaPlane,
  FaFileInvoice,
  FaFilm,
  FaShoppingCart,
  FaHeartbeat,
  FaGraduationCap,
  FaHome,
  FaBox,
  FaArrowUp,
  FaArrowDown,
  FaSearch,
} from "react-icons/fa";
import "./Transactions.css";

function Transactions() {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState(""); // ✅ Controlled input
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses");
      setExpenses(res.data);
    } catch (error) {
      console.error("Failed to fetch expenses", error);
    }
  };

  const handleSearch = async (keyword) => {
    setSearch(keyword);
    if (keyword.trim() === "") {
      fetchExpenses();
      return;
    }
    try {
      const res = await API.get(`/expenses/search?keyword=${keyword}`);
      setExpenses(res.data);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const categoryIcons = {
    FOOD: <FaUtensils />,
    TRAVEL: <FaPlane />,
    BILLS: <FaFileInvoice />,
    ENTERTAINMENT: <FaFilm />,
    SHOPPING: <FaShoppingCart />,
    MEDICAL: <FaHeartbeat />,
    EDUCATION: <FaGraduationCap />,
    RENT: <FaHome />,
    OTHER: <FaBox />,
  };

  return (
    <>
      <Navbar />

      <div className="transactions-container">
        <h2 className="title">All Transactions</h2>

        {/* Search */}
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="search-input"
            value={search} // ✅ Controlled input
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Transactions as cards */}
        <div className="recent-cards">
          {expenses.length === 0 && (
            <p className="no-data">No transactions found</p>
          )}

          {expenses.map((e) => (
            <div
              key={e.id}
              className="transaction-card"
              onClick={() => navigate(`/edit/${e.id}`)}
            >
              <div className={`icon-wrapper ${e.category.toLowerCase()}-bg`}>
                {categoryIcons[e.category] || <FaBox />}
              </div>
              <div className="details">
                <span className="amount">
                  {e.type === "INCOME" ? `+₹${e.amount}` : `-₹${e.amount}`}
                </span>
                <span className="title">{e.title}</span>
              </div>
              <div className="meta">
                <span className="date">{e.date}</span>
                <span className={`type ${e.type.toLowerCase()}`}>
                  {e.type === "INCOME" ? (
                    <FaArrowUp className="arrow-icon" />
                  ) : (
                    <FaArrowDown className="arrow-icon" />
                  )}
                  {e.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Transactions;
