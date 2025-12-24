import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import "./ScheduledTransactions.css"; // reuse same CSS

function AddScheduledTransaction() {
  const navigate = useNavigate();
  const now = new Date();
  const [transaction, setTransaction] = useState({
    title: "",
    amount: "",
    date: now.toISOString().split("T")[0],
    time: now.toTimeString().split(" ")[0].slice(0,5),
    frequency: "Daily",
  });

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/scheduled-transactions", transaction);
      alert("Scheduled transaction added successfully!");
      navigate("/scheduled-transactions");
    } catch (err) {
      console.error("Failed to add transaction:", err);
      alert("Error: Could not add transaction.");
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="content-wrap">
        <div className="add-transaction-container">
          <form className="add-transaction-form" onSubmit={handleSubmit}>
            <h2>Add Scheduled Transaction</h2>

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={transaction.title}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={transaction.amount}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="date"
              value={transaction.date}
              onChange={handleChange}
              required
            />
            
            <input
              type="time"
              name="time"
              value={transaction.time}
              onChange={handleChange}
              required
            />

            <select
              name="frequency"
              value={transaction.frequency}
              onChange={handleChange}
            >
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>

            <button type="submit">Add Transaction</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddScheduledTransaction;
