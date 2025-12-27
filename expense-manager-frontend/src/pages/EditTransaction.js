import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import "./EditTransaction.css";
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
  FaArrowDown
} from "react-icons/fa";

const categories = [
  { value: "FOOD", label: "Food", icon: <FaUtensils /> },
  { value: "TRAVEL", label: "Travel", icon: <FaPlane /> },
  { value: "BILLS", label: "Bills", icon: <FaFileInvoice /> },
  { value: "ENTERTAINMENT", label: "Entertainment", icon: <FaFilm /> },
  { value: "SHOPPING", label: "Shopping", icon: <FaShoppingCart /> },
  { value: "MEDICAL", label: "Medical", icon: <FaHeartbeat /> },
  { value: "EDUCATION", label: "Education", icon: <FaGraduationCap /> },
  { value: "RENT", label: "Rent", icon: <FaHome /> },
  { value: "OTHER", label: "Other", icon: <FaBox /> },
];

const types = [
  { value: "INCOME", label: "Income", icon: <FaArrowUp color="green" /> },
  { value: "EXPENSE", label: "Expense", icon: <FaArrowDown color="red" /> },
];

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

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);

  const categoryRef = useRef(null);
  const typeRef = useRef(null);

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

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Update transaction
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

  // Delete transaction
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

  const selectedCategory = categories.find((c) => c.value === form.category);
  const selectedType = types.find((t) => t.value === form.type);

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoryOpen(false);
      }
      if (typeRef.current && !typeRef.current.contains(event.target)) {
        setTypeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

            {/* CATEGORY DROPDOWN */}
            <label className="dropdown-label">Category</label>
            <div className="dropdown-wrapper" ref={categoryRef}>
              <div
                className="dropdown-selected"
                onClick={() => setCategoryOpen(!categoryOpen)}
              >
                <span className="icon">{selectedCategory?.icon}</span>
                <span>{selectedCategory?.label}</span>
                <span className={`arrow ${categoryOpen ? "open" : ""}`}>▾</span>
              </div>
              {categoryOpen && (
                <div className="dropdown-menu">
                  {categories.map((cat) => (
                    <div
                      key={cat.value}
                      className="dropdown-item"
                      onClick={() => {
                        setForm({ ...form, category: cat.value });
                        setCategoryOpen(false);
                      }}
                    >
                      <span className="icon">{cat.icon}</span>
                      <span>{cat.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* TYPE DROPDOWN */}
            <label className="dropdown-label">Type</label>
            <div className="dropdown-wrapper" ref={typeRef}>
              <div
                className="dropdown-selected"
                onClick={() => setTypeOpen(!typeOpen)}
              >
                <span className="icon">{selectedType?.icon}</span>
                <span>{selectedType?.label}</span>
                <span className={`arrow ${typeOpen ? "open" : ""}`}>▾</span>
              </div>
              {typeOpen && (
                <div className="dropdown-menu">
                  {types.map((t) => (
                    <div
                      key={t.value}
                      className="dropdown-item"
                      onClick={() => {
                        setForm({ ...form, type: t.value });
                        setTypeOpen(false);
                      }}
                    >
                      <span className="icon">{t.icon}</span>
                      <span>{t.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

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
