import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/forgot-password", { email });

      const token = res.data; // backend returns token string

      // ✅ Navigate to reset password page with token
      navigate(`/reset-password?token=${token}`);

    } catch {
      setMsg("Email not registered");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="primary-btn">Send Reset Link</button>
        </form>
        <p className="info-msg">{msg}</p>
      </div>
    </div>
  );
}

export default ForgotPassword;
