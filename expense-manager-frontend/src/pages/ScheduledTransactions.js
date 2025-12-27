import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import "./ScheduledTransactions.css";

function ScheduledTransactions() {
  const [transactions, setTransactions] = useState([]);
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
      try {
        await API.delete(`/scheduled-transactions/${id}`);
        setTransactions(transactions.filter((t) => t.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const markAsCompleted = async (id) => {
    try {
      await API.put(`/scheduled-transactions/${id}/complete`);
      setTransactions(
        transactions.map((t) =>
          t.id === id ? { ...t, completed: true } : t
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const upcomingTransactions = transactions.filter((t) => !t.completed);
  const completedTransactions = transactions.filter((t) => t.completed);

  const renderTable = (data, isUpcoming) => (
    <div className="table-wrapper">
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Frequency</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>₹{t.amount}</td>
              <td>{t.date}</td>
              <td>{t.frequency}</td>
              <td className="action-buttons">
                {isUpcoming && (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/edit-scheduled/${t.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="complete-btn"
                      onClick={() => markAsCompleted(t.id)}
                    >
                      Mark Completed
                    </button>
                  </>
                )}
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(t.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No transactions
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="content-wrap scheduled-container">
        <h2>Scheduled Transactions</h2>
        <button
          className="add-btn"
          onClick={() => navigate("/add-scheduled-transaction")}
        >
          + Add Scheduled Transaction
        </button>

        <div className="transaction-section">
          <h3>Upcoming Transactions</h3>
          {renderTable(upcomingTransactions, true)}
        </div>

        <div className="transaction-section">
          <h3>Completed Transactions</h3>
          {renderTable(completedTransactions, false)}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ScheduledTransactions;
