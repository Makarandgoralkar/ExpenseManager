import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import "./ScheduledTransactions.css"; // reuse same CSS

function EditScheduledTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    title: "",
    amount: "",
    date: "",
    time: "",
    frequency: "Daily",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await API.get(`/scheduled-transactions/${id}`);
        if (res.data) {
          setTransaction({
            title: res.data.title || "",
            amount: res.data.amount || "",
            date: res.data.date || "",
            time: res.data.time?.substring(0, 5) || "",
            frequency: res.data.frequency || "Daily",
          });
        }
      } catch (err) {
        console.error("Failed to fetch transaction:", err);
        alert("Error fetching transaction");
        navigate("/scheduled-transactions");
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [id, navigate]);

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/scheduled-transactions/${id}`, transaction);
      alert("Transaction updated successfully!");
      navigate("/scheduled-transactions");
    } catch (err) {
      console.error("Failed to update transaction:", err);
      alert("Error: Could not update transaction.");
    }
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="content-wrap">
          <div className="add-transaction-container">
            <h2>Edit Scheduled Transaction</h2>
            <p>Loading transaction...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="content-wrap">
        <div className="add-transaction-container">
          <form className="add-transaction-form" onSubmit={handleSubmit}>
            <h2>Edit Scheduled Transaction</h2>

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

            <button type="submit">Update Transaction</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditScheduledTransaction;
