import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "./EditTransaction.css";

function EditTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    type: "",
    date: "",
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
      alert("Update failed.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await API.delete(`/expenses/${id}`);
        alert("Transaction Deleted Successfully!");
        navigate("/transactions");
      } catch (error) {
        console.error("Delete failed", error);
        alert("Delete failed!");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="edit-container">
        <FontAwesomeIcon
          icon={faTrash}
          className="delete-icon"
          onClick={handleDelete}
        />

        <h2>Edit Transaction</h2>
        <form className="edit-form" onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
          />

          <label>Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          />

          <label>Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>

          <label>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <button type="submit" className="update-btn">
            Update Transaction
          </button>
        </form>
      </div>
    </>
  );
}

export default EditTransaction;
