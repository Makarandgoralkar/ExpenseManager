import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "./Day.css";

function Day() {
  const { date } = useParams();
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0 });

  const fetchTransactions = async (dateStr) => {
    try {
      const res = await API.get(`/expenses/date/${dateStr}`);
      setTransactions(res.data);

      let income = 0;
      let expense = 0;
      res.data.forEach((t) => {
        if (t.type.toLowerCase() === "income") income += t.amount;
        else expense += t.amount;
      });

      setSummary({ totalIncome: income, totalExpense: expense });
    } catch {
      setTransactions([]);
      setSummary({ totalIncome: 0, totalExpense: 0 });
    }
  };

  // 🔥 React to URL change
  useEffect(() => {
    if (!date) return;

    const parsedDate = new Date(date);
    setCurrentDate(parsedDate);
    fetchTransactions(date);
  }, [date]);

  // 🔥 Update URL (NOT state)
  const changeDate = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + direction);

    const formatted = newDate.toISOString().split("T")[0];
    navigate(`/day/${formatted}`);
  };

  const getHeaderLabel = () => currentDate.toDateString();
  const balance = summary.totalIncome - summary.totalExpense;

  return (
    <>
      <Navbar />
      <div className="dayview-container">
        <div className="filter-navigation">
          <button onClick={() => changeDate(-1)}>◀</button>
          <span>{getHeaderLabel()}</span>
          <button onClick={() => changeDate(1)}>▶</button>
        </div>

        <div className="summary-cards">
          <div className="card income">
            <h4>Income</h4>
            <p>₹{summary.totalIncome.toFixed(2)}</p>
          </div>
          <div className="card expense">
            <h4>Expense</h4>
            <p>₹{summary.totalExpense.toFixed(2)}</p>
          </div>
          <div className="card balance">
            <h4>Balance</h4>
            <p>₹{balance.toFixed(2)}</p>
          </div>
        </div>

        <h2 className="title">Transactions</h2>

        {transactions.length === 0 ? (
          <p className="no-transactions">No transactions for this day.</p>
        ) : (
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
                {transactions.map((t) => (
                  <tr
                    key={t.id}
                    className="click-row"
                    onClick={() => navigate(`/edit/${t.id}`)}
                  >
                    <td>{t.title}</td>
                    <td>₹{t.amount}</td>
                    <td>{t.category}</td>
                    <td>{t.type}</td>
                    <td>{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Day;
