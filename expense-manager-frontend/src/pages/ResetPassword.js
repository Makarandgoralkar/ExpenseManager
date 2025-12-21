import React, { useState } from "react";
import API from "../services/api";
import "./ResetPassword.css";

function ResetPassword() {
  const [password, setPassword] = useState("");

  const token = new URLSearchParams(window.location.search).get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Invalid or missing token");
      return;
    }

    try {
      await API.post("/auth/reset-password", {
        token,
        newPassword: password,
      });

      alert("Password updated!");
      window.location.href = "/login";

    } catch {
      alert("Token expired or invalid");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="primary-btn">Reset</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
