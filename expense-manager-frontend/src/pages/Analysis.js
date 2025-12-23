import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Analysis.css";

const FILTERS = ["DATE", "WEEK", "MONTH", "YEAR"];

function Analysis() {
  const [categoryData, setCategoryData] = useState([]);
  const [filterType, setFilterType] = useState("MONTH");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0 });

  /* -------------------- WEEK HELPERS -------------------- */
  const getWeekRange = (date) => {
    const d = new Date(date);
    const day = d.getDay(); // 0 = Sunday
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
    const start = new Date(d.setDate(diff));
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start, end };
  };

  const formatDate = (date) =>
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

  /* -------------------- API CALL -------------------- */
  const fetchCategorySummary = useCallback(async () => {
    try {
      let params = { type: filterType };

      if (filterType === "WEEK") {
        const { start, end } = getWeekRange(currentDate);
        params.startDate = start.toISOString().split("T")[0];
        params.endDate = end.toISOString().split("T")[0];
      } else {
        params.date = currentDate.toISOString().split("T")[0];
      }

      // Fetch category summary
      const res = await API.get("/expenses/analytics/category", { params });
      const formattedData = Object.keys(res.data).map((key) => ({
        name: key,
        value: res.data[key],
      }));
      setCategoryData(formattedData);

      // Fetch summary for total income/expense
      const summaryRes = await API.get("/expenses/analytics/summary", { params });
      setSummary(summaryRes.data);

    } catch (err) {
      console.error("Failed to load data:", err);
      setCategoryData([]);
      setSummary({ totalIncome: 0, totalExpense: 0 });
    }
  }, [filterType, currentDate]);

  useEffect(() => {
    fetchCategorySummary();
  }, [fetchCategorySummary]);

  /* -------------------- NAVIGATION -------------------- */
  const changeDate = (direction) => {
    const newDate = new Date(currentDate);

    if (filterType === "DATE") newDate.setDate(newDate.getDate() + direction);
    if (filterType === "WEEK") newDate.setDate(newDate.getDate() + 7 * direction);
    if (filterType === "MONTH") newDate.setMonth(newDate.getMonth() + direction);
    if (filterType === "YEAR") newDate.setFullYear(newDate.getFullYear() + direction);

    setCurrentDate(newDate);
  };

  /* -------------------- HEADER LABEL -------------------- */
  const getHeaderLabel = () => {
    if (filterType === "WEEK") {
      const { start, end } = getWeekRange(currentDate);
      return `${formatDate(start)} - ${formatDate(end)}`;
    }
    if (filterType === "DATE") return currentDate.toDateString();
    if (filterType === "MONTH")
      return currentDate.toLocaleString("default", { month: "long", year: "numeric" });
    if (filterType === "YEAR") return currentDate.getFullYear();
  };

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF4444",
    "#AA00FF",
    "#FF6D00",
    "#009688",
  ];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight="bold">
        {(percent * 100).toFixed(1)}%
      </text>
    );
  };

  const balance = summary.totalIncome - summary.totalExpense;

  return (
    <>
      <Navbar />
      <div className="analysis-container">

        {/* FILTER BAR */}
        <div className="filter-bar">
          <div className="filter-tabs">
            {FILTERS.map((f) => (
              <button key={f} className={filterType === f ? "active" : ""} onClick={() => setFilterType(f)}>
                {f}
              </button>
            ))}
          </div>

          <div className="filter-navigation">
            <button onClick={() => changeDate(-1)}>◀</button>
            <span>{getHeaderLabel()}</span>
            <button onClick={() => changeDate(1)}>▶</button>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="summary-cards">
          <div className="card income">
            <h4>Total Income</h4>
            <p>₹{summary.totalIncome}</p>
          </div>
          <div className="card expense">
            <h4>Total Expense</h4>
            <p>₹{summary.totalExpense}</p>
          </div>
          <div className="card balance">
            <h4>Balance</h4>
            <p>₹{balance}</p>
          </div>
        </div>

        {/* CATEGORY WISE SPENDING */}
        <h2 className="analysis-title">Category-wise Spending</h2>

        {categoryData.length === 0 ? (
          <div className="no-transactions">
            No Transactions
            <br />
            <small>Total Income: ₹{summary.totalIncome} | Total Expense: ₹{summary.totalExpense} | Balance: ₹{balance}</small>
          </div>
        ) : (
          <>
            <div className="chart-section">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    dataKey="value"
                    label={renderCustomizedLabel}
                    labelLine={false}
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="category-list">
              {categoryData.map((item, index) => (
                <div key={index} className="category-row">
                  <span>{item.name}</span>
                  <span>₹ {item.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Analysis;
