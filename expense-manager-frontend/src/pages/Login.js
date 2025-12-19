import React, { useState } from "react";
import API from "../services/api";
import { saveToken } from "../utils/auth.js";
import "./Auth.css";
// import logo from "../assets/logo.png"; // optional logo

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      saveToken(res.data.token);
      window.location.href = "/home"; // redirect after successful login
    } catch (err) {
      // Show alert if login fails
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

      {/* Top Logo + Heading */}
      <div className="app-header">
        {/* <img src={logo} className="app-logo" alt="logo" /> */}
        <h1 className="app-title">Expenses Manager</h1>
        <p className="app-tagline">Privacy First. Your Data. Your Device.</p>
      </div>

      {/* Glass Card */}
      <div className="auth-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          {/* PASSWORD WITH EYE */}
          <div className="password-wrapper">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <button type="submit" className="primary-btn">Login</button>
        </form>

        <div className="divider">Or continue with</div>

        <button className="social google" onClick={handleGoogleLogin}>
          Continue with Google
        </button>

        <button className="social facebook" onClick={handleFacebookLogin}>
          Continue with Facebook
        </button>

        <button className="social linkedin" onClick={handleLinkedInLogin}>
          Continue with LinkedIn
        </button>

        <p className="switch-page">
          Don’t have an account? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
