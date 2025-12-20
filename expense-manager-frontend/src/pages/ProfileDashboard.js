import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  FaMoneyBillAlt,
  FaCalendarAlt,
  FaCog,
  FaUserPlus,
  FaStar,
  FaQuestionCircle,
  FaSignOutAlt,
  FaDyalog,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./ProfileDashboard.css";

function ProfileDashboard() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUser(data);
        setProfilePic(data.profilePic || data.name.charAt(0).toUpperCase());
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, []);

  const handleNavigate = (path) => navigate(path);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className="profile-dashboard-container">
        {/* --- Profile Header --- */}
        <div className="profile-header-card">
          <div
            className="profile-image"
            onClick={() => handleNavigate("/profile")}
            style={{ cursor: "pointer" }}
          >
          {profilePic}
          </div>

          <div
            className="profile-info"
            onClick={() => handleNavigate("/profile")}
            style={{ cursor: "pointer" }}
          >
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>

       {/* --- Options Grid --- */}
       <div className="options-grid">
        <div className="option-card" onClick={() => handleNavigate("/transactions")}>
        <FaMoneyBillAlt />
        <span>Transactions</span>
        </div>

        <div className="option-card" onClick={() => handleNavigate("/scheduled-transactions")}>
        <FaCalendarAlt />
        <span>Scheduled Txns</span>
        </div>

        <div className="option-card" onClick={() => handleNavigate("/budgets")}>
        <FaMoneyBillAlt />
        <span>Budgets</span>
        </div>

        <div className="option-card" onClick={() => handleNavigate("/categories")}>
        <FaMoneyBillAlt />
        <span>Categories</span>
        </div>

        <div className="option-card" onClick={() => handleNavigate("/tags")}>
        <FaMoneyBillAlt />
        <span>Tags</span>
        </div>

        <div className="option-card" onClick={() => handleNavigate("/goPremium")}>
        <FaStar />
        <span>Go Premium</span>
        </div>

        <div className="options-title">Views</div>

        <div className="option-card" onClick={() => handleNavigate("/day")}>
        <FaDyalog />
        <span>Day</span>
        </div>

        <div className="option-card" onClick={() => handleNavigate("/calendar")}>
        <FaCalendarAlt />
        <span>Calendar</span>
        </div>

        {/* ✅ MORE OPTIONS TITLE */}
        <div className="options-title">More Options</div>

        <div className="option-card" onClick={() => handleNavigate("/settings")}>
        <FaCog />
        <span>Settings</span>
        </div>

        <div className="option-card" onClick={() => alert("Invite feature coming soon!")}>
        <FaUserPlus />
        <span>Invite a Friend</span>
        </div>

        <div className="option-card" onClick={() => handleNavigate("/faq")}>
        <FaQuestionCircle />
        <span>FAQs</span>
        </div>

        <div className="option-card" onClick={() => handleNavigate("/about")}>
        <FaQuestionCircle />
        <span>About App</span>
        </div>

        <div className="option-card" onClick={handleSignOut}>
        <FaSignOutAlt />
        <span>Sign Out</span>
        </div>
        </div>
      </div>
    </>
  );
}

export default ProfileDashboard;
