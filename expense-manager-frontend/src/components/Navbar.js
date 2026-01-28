import React from "react";
import "./Navbar.css";
import { FaPlus, FaBars, FaHome, FaChartBar } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/expense_manager_logo.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // get current route

  // Function to check if route is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ===== DESKTOP NAVBAR ===== */}
      <nav className="desktop-navbar">
        <div className="logo-container" onClick={() => navigate("/home")}>
          <img src={logo} alt="Expense Manager Logo" />
          <h2>Expense Manager</h2>
        </div>

        <ul className="desktop-links">
          <li
            className={isActive("/home") ? "active" : ""}
            onClick={() => navigate("/home")}
          >
            <FaHome /> Home
          </li>
          <li
            className={isActive("/analysis") ? "active" : ""}
            onClick={() => navigate("/analysis")}
          >
            <FaChartBar /> Analysis
          </li>
          <li
            className={`desktop-add ${isActive("/addtransaction") ? "active" : ""}`}
            onClick={() => navigate("/addtransaction")}
          >
            <FaPlus />
          </li>
          <li
            className={isActive("/profile-dashboard") ? "active" : ""}
            onClick={() => navigate("/profile-dashboard")}
          >
            <FaBars /> Menu
          </li>
        </ul>
      </nav>

      {/* ===== MOBILE HEADER ===== */}
      <header className="top-header">
        <img src={logo} alt="Expense Manager Logo" />
        <h2>Expense Manager</h2>
      </header>

      {/* ===== MOBILE BOTTOM NAV ===== */}
      <nav className="bottom-nav">
        <button
          className={isActive("/home") ? "active" : ""}
          onClick={() => navigate("/home")}
        >
          <FaHome />
          <span>Home</span>
        </button>

        <button
          className={isActive("/analysis") ? "active" : ""}
          onClick={() => navigate("/analysis")}
        >
          <FaChartBar />
          <span>Analysis</span>
        </button>

        <button
          className={`add-btn ${isActive("/addtransaction") ? "active" : ""}`}
          onClick={() => navigate("/addtransaction")}
        >
          <FaPlus />
        </button>

        <button
          className={isActive("/profile-dashboard") ? "active" : ""}
          onClick={() => navigate("/profile-dashboard")}
        >
          <FaBars />
          <span>Menu</span>
        </button>
      </nav>
    </>
  );
}

export default Navbar;
