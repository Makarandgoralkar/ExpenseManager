import React, { useState } from "react";
import API from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // useNavigate hook

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);
      setMessage("Signup successful! Redirecting to login...");
      setForm({ name: "", email: "", password: "" });
      setTimeout(() => navigate("/login", { replace: true }), 1500); // redirect after 1.5s
    } catch {
      setMessage("Email already exists!");
    }
  };

  return (
    <div className="auth-page">
      <div className="app-header">
        <h1 className="app-title">Expenses Manager</h1>
        <p className="app-tagline">Track smarter. Spend better.</p>
      </div>

      <div className="auth-card">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} autoComplete="off" />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} autoComplete="off" />

          <div className="password-wrapper">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </span>
          </div>

          <button type="submit" className="primary-btn">Signup</button>
        </form>

        <p className="info-msg">{message}</p>

        <p className="switch-page">
          Already have an account? <span onClick={() => navigate("/login", { replace: true })}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
