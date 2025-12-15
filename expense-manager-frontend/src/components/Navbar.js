import React, { useState } from "react";
import "./Navbar.css";
import { FaPlus, FaBars } from "react-icons/fa";

function Navbar() {
  const [showMore, setShowMore] = useState(false);

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
          onClick={() => setShowMore(!showMore)}
        >
          <FaBars />
          {showMore && (
            <div className="dropdown">
              <a href="/profile">Profile</a>
              <a href="/settings">Settings</a>
              <a href="/login">Logout</a>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
