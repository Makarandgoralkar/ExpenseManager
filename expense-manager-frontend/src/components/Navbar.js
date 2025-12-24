import React from "react";
import "./Navbar.css";
import { FaPlus, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/expense_manager_logo.png";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* Logo + Title */}
      <div className="logo-container" onClick={() => navigate("/home")}>
        <img src={logo} alt="Expense Manager Logo" className="app-logo" />
        <h2 className="logo-text">Expense Manager</h2>
      </div>

      <ul className="nav-links">
        <li><a href="/home">Home</a></li>
        <li><a href="/analysis">Analysis</a></li>

        <li className="add-btn">
          <a href="/addtransaction">
            <FaPlus />
          </a>
        </li>

        <li
          className="more-menu"
          onClick={() => navigate("/profile-dashboard")}
        >
          <FaBars />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
