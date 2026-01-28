import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
} from "react-icons/fa";
import "./Day.css";

function Day() {
  const { date } = useParams();
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(
    date ? new Date(date) : new Date()
  );
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0 });

  const fetchTransactions = async (dateStr) => {
    try {
      const res = await API.get(`/expenses/date/${dateStr}`);
      setTransactions(res.data);

      let income = 0;
      let expense = 0;
      res.data.forEach((t) => {
        if (t.type.toLowerCase() === "income") income += t.amount;
        else expense += t.amount;
      });
      setSummary({ totalIncome: income, totalExpense: expense });
    } catch {
      setTransactions([]);
      setSummary({ totalIncome: 0, totalExpense: 0 });
    }
  };

  useEffect(() => {
    const dateStr = currentDate.toISOString().split("T")[0];
    fetchTransactions(dateStr);
  }, [currentDate]);

  const changeDate = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + direction);
    setCurrentDate(newDate);
  };

  const getHeaderLabel = () => currentDate.toDateString();
  const balance = summary.totalIncome - summary.totalExpense;

  // Category Icons
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
      <div className="dayview-container">
        {/* Date Navigation */}
        <div className="filter-navigation">
          <button onClick={() => changeDate(-1)}>◀</button>
          <span>{getHeaderLabel()}</span>
          <button onClick={() => changeDate(1)}>▶</button>
        </div>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="card income">
            <h4>Income</h4>
            <p>₹{summary.totalIncome.toFixed(2)}</p>
          </div>
          <div className="card expense">
            <h4>Expense</h4>
            <p>₹{summary.totalExpense.toFixed(2)}</p>
          </div>
          <div className="card balance">
            <h4>Balance</h4>
            <p>₹{balance.toFixed(2)}</p>
          </div>
        </div>

        {/* Transactions Cards */}
        <h2 className="title">Transactions</h2>
        <div className="recent-cards">
          {transactions.length === 0 ? (
            <p className="no-data">No transactions for this day.</p>
          ) : (
            transactions.map((t) => (
              <div
                key={t.id}
                className="transaction-card"
                onClick={() => navigate(`/edit/${t.id}`)}
              >
                <div className={`icon-wrapper ${t.category.toLowerCase()}-bg`}>
                  {categoryIcons[t.category] || <FaBox />}
                </div>
                <div className="details">
                  <span className="amount">
                    {t.type.toUpperCase() === "INCOME"
                      ? `+₹${t.amount}`
                      : `-₹${t.amount}`}
                  </span>
                  <span className="title">{t.title}</span>
                </div>
                <div className="meta">
                  <span className="date">{t.date}</span>
                  <span className={`type ${t.type.toLowerCase()}`}>
                    {t.type.toUpperCase() === "INCOME" ? (
                      <FaArrowUp className="arrow-icon" />
                    ) : (
                      <FaArrowDown className="arrow-icon" />
                    )}
                    {t.type}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Day;
