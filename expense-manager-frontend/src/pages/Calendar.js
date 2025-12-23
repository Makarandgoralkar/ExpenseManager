import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import "./Calendar.css";

function Calendar() {
  const navigate = useNavigate();
  const { date } = useParams();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [transactionDates, setTransactionDates] = useState([]);

  const selectedDate = date || new Date().toISOString().split("T")[0];

  // Month navigation
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getHeaderLabel = () =>
    currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  // 🔴 Fetch transaction dates for month
  useEffect(() => {
    const fetchTransactionDates = async () => {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");

      try {
        const res = await API.get(`/expenses/month/${year}-${month}`);
        setTransactionDates(res.data);
      } catch {
        setTransactionDates([]);
      }
    };

    fetchTransactionDates();
  }, [currentDate]);

  // Generate days
  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);

    return days;
  };

  const calendarDays = generateCalendar();

  return (
    <>
      <Navbar />
      <div className="calendar-container">
        <div className="filter-navigation">
          <button onClick={() => changeMonth(-1)}>◀</button>
          <span>{getHeaderLabel()}</span>
          <button onClick={() => changeMonth(1)}>▶</button>
        </div>

        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="calendar-header">{day}</div>
          ))}

          {calendarDays.map((day, index) => {
            if (!day) {
              return <div key={index} className="calendar-cell empty-cell" />;
            }

            const fullDate = `${currentDate.getFullYear()}-${String(
              currentDate.getMonth() + 1
            ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

            const isSelected = fullDate === selectedDate;
            const hasTransaction = transactionDates.includes(fullDate);

            return (
              <div
                key={index}
                className={`calendar-cell 
                  ${isSelected ? "selected-date" : ""}
                `}
                onClick={() => navigate(`/day/${fullDate}`)}
              >
                {day}
                {hasTransaction && <span className="transaction-dot" />}
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
    
  );
}

export default Calendar;
