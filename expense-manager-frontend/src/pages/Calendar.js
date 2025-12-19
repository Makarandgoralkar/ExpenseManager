import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./Calendar.css";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Month navigation
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Get month label
  const getHeaderLabel = () =>
    currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  // Generate days of month
  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];
    // Empty cells for previous month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }
    // Days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day);
    }
    return calendarDays;
  };

  const calendarDays = generateCalendar();

  return (
    <>
      <Navbar />
      <div className="calendar-container">
        {/* Month Navigation */}
        <div className="filter-navigation">
          <button onClick={() => changeMonth(-1)}>◀</button>
          <span>{getHeaderLabel()}</span>
          <button onClick={() => changeMonth(1)}>▶</button>
        </div>

        {/* Calendar Grid */}
        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="calendar-header">
              {day}
            </div>
          ))}

          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`calendar-cell ${day ? "" : "empty-cell"}`}
            >
              {day || ""}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Calendar;
