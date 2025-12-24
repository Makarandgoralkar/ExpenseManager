import React, { useState } from "react";
import API from "../services/api";
import { saveToken } from "../utils/auth.js";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/expense_manager_logo.png";
import "./Auth.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // useNavigate hook

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      saveToken(res.data.token);
      navigate("/home", { replace: true }); // use replace to prevent back navigation
    } catch (err) {
      alert("Invalid username or password!");
    }
  };

  const handleGoogleLogin = () =>
    (window.location.href =
      "http://localhost:8080/oauth2/authorization/google");

  const handleFacebookLogin = () =>
    (window.location.href =
      "http://localhost:8080/oauth2/authorization/facebook");

  const handleLinkedInLogin = () =>
    (window.location.href =
      "http://localhost:8080/oauth2/authorization/linkedin");

  return (
    <div className="auth-page">
      <div className="app-header">
  <div className="app-brand">
    <img src={logo} alt="Expense Manager Logo" className="app-logo" />
    <h1 className="app-title">Expense Manager</h1>
  </div>
  <p className="app-tagline">Privacy First. Your Data. Your Device.</p>
</div>


      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            autoComplete="off"
          />

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

          <p className="forgot-link" onClick={() => navigate("/forgot-password", { replace: true })}>
            Forgot Password?
          </p>

          <button type="submit" className="primary-btn">Login</button>
        </form>

        <div className="divider">Or continue with</div>

        <div className="social-buttons">
          <button className="social google" onClick={handleGoogleLogin}>
            <FaGoogle size={20} style={{ marginRight: "8px" }} /> Continue with Google
          </button>
          <button className="social facebook" onClick={handleFacebookLogin}>
            <FaFacebook size={20} style={{ marginRight: "8px" }} /> Continue with Facebook
          </button>
          <button className="social linkedin" onClick={handleLinkedInLogin}>
            <FaLinkedin size={20} style={{ marginRight: "8px" }} /> Continue with LinkedIn
          </button>
        </div>

        <p className="switch-page">
          Don’t have an account? <span onClick={() => navigate("/signup", { replace: true })}>Signup</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
