import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
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
import "./Home.css";

function Home() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0 });
  const [userName, setUserName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    const expensesRes = await API.get("/expenses");
    setExpenses(expensesRes.data);

    const summaryRes = await API.get("/expenses/analytics/summary");
    setSummary(summaryRes.data);
  };

  const fetchUserProfile = async () => {
    try {
      const res = await API.get("/user/profile");
      setUserName(res.data.name);
    } catch (error) {
      console.error("Failed to fetch user profile", error);
    }
  };

  const fetchProfilePicture = async () => {
    try {
      const res = await API.get("/user/profile/picture");
      setProfilePic(res.data);
    } catch {
      setProfilePic(null);
    }
  };

  const getGreeting = useCallback(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 21) return "Good Evening";
    return "Good Night";
  }, []);

  const updateGreeting = useCallback(() => {
    setGreeting(getGreeting());
  }, [getGreeting]);

  useEffect(() => {
    fetchData();
    fetchUserProfile();
    fetchProfilePicture();
    updateGreeting();

    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, [updateGreeting]);

  const handleSearch = async (keyword) => {
    if (keyword.trim() === "") {
      fetchData();
      return;
    }
    const res = await API.get(`/expenses/search?keyword=${keyword}`);
    setExpenses(res.data);
  };

  const recentExpenses = expenses.slice(-4).reverse();
  const balance = summary.totalIncome - summary.totalExpense;

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

      {/* Header */}
      <div className="home-header">
        <div className="home-greeting">
          <h1>{greeting},</h1>
          <h2>{userName}</h2>
        </div>

        <div className="home-profile" onClick={() => navigate("/profile")}>
          {profilePic ? (
            <img
              src={`data:image/jpeg;base64,${profilePic}`}
              alt="Profile"
              className="home-profile-img"
            />
          ) : (
            <div className="home-profile-placeholder">
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      <div className="home-container">
        {/* Search */}
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="search-input"
              onChange={(e) => handleSearch(e.target.value)}
            />
        </div>


        {/* Dashboard Cards */}
        <div className="dashboard">
          <div className="cards">
            <div className="card income">
              <h3>Total Income</h3>
              <p>₹{summary.totalIncome}</p>
            </div>
            <div className="card expense">
              <h3>Total Expense</h3>
              <p>₹{summary.totalExpense}</p>
            </div>
            <div className="card balance">
              <h3>Balance</h3>
              <p>₹{balance}</p>
            </div>
          </div>
        </div>

        {/* Recent Transactions Cards */}
        <div className="recent-section">
          <h2 className="recent-title">
            Recent Transactions
            <button
              className="see-all-btn"
              onClick={() => navigate("/transactions")}
            >
              See All
            </button>
          </h2>

          <div className="recent-cards">
            {recentExpenses.length === 0 && (
              <p className="no-data">No recent transactions</p>
            )}
            {recentExpenses.map((e) => (
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
      </div>

      <Footer />
    </>
  );
}

export default Home;
