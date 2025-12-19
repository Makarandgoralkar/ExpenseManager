import React from "react";
import "./Navbar.css";
import { FaPlus, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h2 className="logo">Expense Manager</h2>

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
