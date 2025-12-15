import React, { useState } from "react";
import API from "../services/api";
import "./Auth.css";
// import logo from "../assets/logo.png";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);
      setMessage("Signup successful! Please login.");
      setForm({ name: "", email: "", password: "" });
      window.location.href = "/login";
    } catch {
      setMessage("Email already exists!");
    }
  };

  return (
    <div className="auth-page">
      <div className="app-header">
        {/* <img src={logo} className="app-logo" alt="logo" /> */}
        <h1 className="app-title">Expenses Manager</h1>
        <p className="app-tagline">Track smarter. Spend better.</p>
      </div>

      <div className="auth-card">
        <h2>Signup</h2>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <button type="submit" className="primary-btn">Signup</button>
        </form>

        <p className="info-msg">{message}</p>

        <p className="switch-page">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
