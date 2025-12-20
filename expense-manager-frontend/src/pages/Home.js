import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Home.css";

function Home() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0 });
  const [userName, setUserName] = useState("");
  const [greeting, setGreeting] = useState("");

  const navigate = useNavigate();

  // Fetch expenses + summary
  const fetchData = async () => {
    const expensesRes = await API.get("/expenses");
    setExpenses(expensesRes.data);

    const summaryRes = await API.get("/expenses/analytics/summary");
    setSummary(summaryRes.data);
  };

  // Fetch user profile
  const fetchUserName = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserName(res.data.name);
    } catch (error) {
      console.error("Failed to fetch user profile", error);
    }
  };

  // Greeting logic wrapped in useCallback
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

  // Main effect
  useEffect(() => {
    fetchData();
    fetchUserName();
    updateGreeting();

    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, [updateGreeting]);

  // Search expenses
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

  return (
    <>
      <Navbar />

      <div className="home-container">
        {/* --- GREETING --- */}
        <h2 className="greeting">
          {greeting}, {userName}!
        </h2>

        {/* Search Bar */}
        <div className="search-wrapper">
          <i className="fa fa-search"></i>
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

        {/* Recent Transactions */}
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

  <div className="table-wrapper">
    <table className="transactions-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Type</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {recentExpenses.map((e) => (
          <tr
            key={e.id}
            className="click-row"
            onClick={() => navigate(`/edit/${e.id}`)}
          >
            <td>{e.title}</td>
            <td>₹{e.amount}</td>
            <td>{e.category}</td>
            <td>{e.type}</td>
            <td>{e.date}</td>
          </tr>
          ))}

          {recentExpenses.length === 0 && (
            <tr>
              <td colSpan="5" className="no-data">
                No recent transactions
              </td>
            </tr>
          )}
      </tbody>
    </table>
  </div>
</div>
</div>
    </>
  );
}

export default Home;
