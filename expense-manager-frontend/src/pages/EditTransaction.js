import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import "./EditTransaction.css";

function EditTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "OTHER",
    type: "EXPENSE",
    date: "",
    time: "",
  });

  // Fetch transaction
  const fetchTransaction = useCallback(async () => {
    try {
      const res = await API.get(`/expenses/${id}`);
      setForm(res.data);
    } catch (error) {
      console.error("Failed to fetch transaction", error);
    }
  }, [id]);

  useEffect(() => {
    fetchTransaction();
  }, [fetchTransaction]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/expenses/${id}`, form);
      alert("Transaction updated successfully!");
      navigate("/transactions");
    } catch (error) {
      console.error("Update failed", error);
      alert("Update failed!");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await API.delete(`/expenses/${id}`);
        alert("Transaction deleted successfully!");
        navigate("/transactions");
      } catch (error) {
        console.error("Delete failed", error);
        alert("Delete failed!");
      }
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="content-wrap">
        <div className="add-transaction-container">
          <form className="add-transaction-form" onSubmit={handleSubmit}>
            <h2>Edit Transaction</h2>

            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <input
              name="amount"
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
              required
            />

            <select name="category" value={form.category} onChange={handleChange}>
              <option value="FOOD">Food</option>
              <option value="TRAVEL">Travel</option>
              <option value="BILLS">Bills</option>
              <option value="ENTERTAINMENT">Entertainment</option>
              <option value="SHOPPING">Shopping</option>
              <option value="MEDICAL">Medical</option>
              <option value="EDUCATION">Education</option>
              <option value="RENT">Rent</option>
              <option value="OTHER">Other</option>
            </select>

            <select name="type" value={form.type} onChange={handleChange}>
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
            </select>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />

            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            />

            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
              <button type="submit">Update</button>
              <button
                type="button"
                onClick={handleDelete}
                style={{ background: "#dc3545" }}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditTransaction;
