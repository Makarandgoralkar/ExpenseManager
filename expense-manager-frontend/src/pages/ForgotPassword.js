import React, { useState } from "react";
import API from "../services/api";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await API.post("/auth/forgot-password", { email });
    setMsg("Reset link sent to your email");
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
