import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import { FaEdit, FaTrash, FaCheckCircle, FaSearch } from "react-icons/fa";
import "./ScheduledTransactions.css";

function ScheduledTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [tab, setTab] = useState("upcoming"); // upcoming or completed
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all, today, weekly, monthly
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await API.get("/scheduled-transactions");
        setTransactions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      await API.delete(`/scheduled-transactions/${id}`);
      setTransactions(transactions.filter((t) => t.id !== id));
    }
  };

  const markAsCompleted = async (id) => {
    await API.put(`/scheduled-transactions/${id}/complete`);
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...t, completed: true } : t))
    );
  };

  const filtered = transactions
    .filter((t) => (tab === "upcoming" ? !t.completed : t.completed))
    .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) => {
      if (filter === "all") return true;
      // Simple filter logic (assuming date format YYYY-MM-DD)
      const today = new Date();
      const tDate = new Date(t.date);

      if (filter === "today") {
        return (
          tDate.getDate() === today.getDate() &&
          tDate.getMonth() === today.getMonth() &&
          tDate.getFullYear() === today.getFullYear()
        );
      }
      if (filter === "weekly") {
        const diff = (tDate - today) / (1000 * 60 * 60 * 24);
        return diff >= 0 && diff <= 7;
      }
      if (filter === "monthly") {
        return (
          tDate.getMonth() === today.getMonth() &&
          tDate.getFullYear() === today.getFullYear()
        );
      }
      return true;
    });

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="scheduled-container">
        <div className="top-section">
          <h2>Scheduled Transactions</h2>

          <div className="tab-bar">
            <button
              className={tab === "upcoming" ? "tab active" : "tab"}
              onClick={() => setTab("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={tab === "completed" ? "tab active" : "tab"}
              onClick={() => setTab("completed")}
            >
              Completed
            </button>
          </div>

          <div className="search-filter">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search Scheduled Transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="filters">
              <button
                className={filter === "all" ? "filter active" : "filter"}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={filter === "today" ? "filter active" : "filter"}
                onClick={() => setFilter("today")}
              >
                Today
              </button>
              <button
                className={filter === "weekly" ? "filter active" : "filter"}
                onClick={() => setFilter("weekly")}
              >
                Weekly
              </button>
              <button
                className={filter === "monthly" ? "filter active" : "filter"}
                onClick={() => setFilter("monthly")}
              >
                Monthly
              </button>
            </div>
          </div>

          <button
            className="add-scheduled-transactionbtn"
            onClick={() => navigate("/add-scheduled-transaction")}
          >
            + Add Scheduled Transaction
          </button>
        </div>

        <div className="card-grid-st">
          {filtered.length === 0 ? (
            <div className="empty">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                alt="No transactions"
                className="empty-img"
              />
              <h3>No Scheduled Transactions</h3>
              <p>
                Add a new scheduled transaction to automate your recurring
                expenses or incomes.
              </p>
            </div>
          ) : (
            filtered.map((t) => (
              <div className="cardst" key={t.id}>
                <div className="card-left">
                  <h3>{t.title}</h3>
                  <p>₹{t.amount}</p>
                  <span className="date">{t.date}</span>
                  <span className="frequency">{t.frequency}</span>
                </div>

                <div className="card-right">
                  {tab === "upcoming" && (
                    <button
                      className="icon-btn complete"
                      onClick={() => markAsCompleted(t.id)}
                      title="Mark Completed"
                    >
                      <FaCheckCircle />
                    </button>
                  )}

                  <button
                    className="icon-btn edit"
                    onClick={() => navigate(`/edit-scheduled/${t.id}`)}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="icon-btn delete"
                    onClick={() => handleDelete(t.id)}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ScheduledTransactions;
