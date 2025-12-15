import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import Navbar from "../components/Navbar"; 
import API from "../services/api"; 
import "./AddTransaction.css"; 

function AddTransaction() { 
  const navigate = useNavigate(); 
  const [form, setForm] = useState({ 
    title: "", 
    amount: "", 
    category: "OTHER", 
    type: "EXPENSE", 
    date: "", 
  }); 

  const handleChange = (e) => { 
    setForm({ ...form, [e.target.name]: e.target.value }); 
  }; 

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    try { 
      await API.post("/expenses", form); 
      alert("Transaction Added Successfully!"); 
      navigate("/home"); 
    } catch (err) { 
      console.error("Error while adding transaction:", err); 
      alert("Failed to add transaction!"); 
    } 
  }; 

  return ( 
    <> 
      <Navbar /> 
      <div className="add-transaction-container"> 
        <form className="add-transaction-form" onSubmit={handleSubmit}> 
          <h2>Add Transaction</h2> 
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required /> 
          <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} required /> 
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
          <input type="date" name="date" value={form.date} onChange={handleChange} required /> 
          <button type="submit">Add Transaction</button> 
        </form> 
      </div> 
    </> 
  ); 
} 

export default AddTransaction;
