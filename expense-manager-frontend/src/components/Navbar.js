import React from "react";
import "./Navbar.css";
import { FaPlus, FaBars, FaHome, FaChartBar } from "react-icons/fa";
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
        {/* Home */}
        <li className="nav-item" title="Home">
          <a href="/home">
            <div className="icon-circle">
              <FaHome className="icon" />
            </div>
            <span className="link-text">Home</span>
          </a>
        </li>

        {/* Analysis */}
        <li className="nav-item" title="Analysis">
          <a href="/analysis">
            <div className="icon-circle">
              <FaChartBar className="icon" />
            </div>
            <span className="link-text">Analysis</span>
          </a>
        </li>

        {/* Add Transaction - only icon */}
        <li className="nav-item add-btn" title="Add Transaction">
          <a href="/addtransaction">
            <div className="icon-circle add-fab">
              <FaPlus className="icon" />
            </div>
          </a>
        </li>

        {/* Profile/Menu */}
        <li
          className="nav-item"
          title="Profile Dashboard"
          onClick={() => navigate("/profile-dashboard")}
        >
          <div className="icon-circle">
            <FaBars className="icon" />
          </div>
          <span className="link-text">Menu</span>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
