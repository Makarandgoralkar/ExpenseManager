import React, { useState } from "react";
import API from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./ResetPassword.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
          <div className="password-wrapper">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="New Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <span
    className="eye-icon"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
  </span>
</div>
          <button className="primary-btn">Reset</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
