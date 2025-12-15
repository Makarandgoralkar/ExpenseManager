import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "./Transactions.css";

function Transactions() {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch all transactions
  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses");
      setExpenses(res.data);
    } catch (error) {
      console.error("Failed to fetch expenses", error);
    }
  };

  // Search function
  const handleSearch = async (keyword) => {
    setSearch(keyword);

    if (keyword.trim() === "") {
      fetchExpenses();
      return;
    }

    try {
      const res = await API.get(`/expenses/search?keyword=${keyword}`);
      setExpenses(res.data);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
      <Navbar />

      <div className="transactions-container">
        <h2 className="title">All Transactions</h2>

        {/* Search */}
        <div className="search-wrapper">
          <i className="fa fa-search"></i>
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Type</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((e) => (
                <tr
                  key={e.id}
                  className="click-row"
                  onClick={() => navigate(`/edit/${e.id}`)}
                >
                  <td>{e.title}</td>
                  <td>₹{e.amount}</td>
                  <td>{e.category}</td>
                  <td>{e.type}</td>
                  <td>{e.date}</td>
                </tr>
              ))}

              {expenses.length === 0 && (
                <tr>
                  <td colSpan="5" className="no-data">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Transactions;
