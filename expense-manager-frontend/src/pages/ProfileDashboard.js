import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaMoneyBillAlt,
  FaCalendarAlt,
  FaCog,
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
    const fetchUserAndImage = async () => {
      try {
        const token = localStorage.getItem("token");

        const userRes = await fetch("http://localhost:8080/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        setUser(userData);

        const imgRes = await fetch(
          "http://localhost:8080/api/user/profile/picture",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (imgRes.ok) {
          const base64 = await imgRes.text();
          setProfilePic(`data:image/jpeg;base64,${base64}`);
        } else {
          setProfilePic(userData.name.charAt(0).toUpperCase());
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchUserAndImage();
  }, []);

  const handleNavigate = (path) => navigate(path);
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="content-wrap">
        <div className="profile-dashboard-container">
          {/* Profile Header */}
          <div className="profile-header-card">
            <div
              className="profile-image"
              onClick={() => handleNavigate("/profile")}
            >
              {profilePic.startsWith("data:image") ? (
                <img src={profilePic} alt="Profile" />
              ) : (
                profilePic
              )}
            </div>

            <div
              className="profile-info"
              onClick={() => handleNavigate("/profile")}
            >
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          </div>

          {/* Options Grid */}
          <div className="options-grid">
            <div className="option-card" onClick={() => handleNavigate("/transactions")}>
              <FaMoneyBillAlt />
              <span>Transactions</span>
            </div>
            <div className="option-card" onClick={() => handleNavigate("/scheduled-transactions")}>
              <FaCalendarAlt />
              <span>Scheduled Txns</span>
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

            <div className="options-title">More Options</div>
            <div className="option-card" onClick={() => handleNavigate("/settings")}>
              <FaCog />
              <span>Settings</span>
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
      </div>
      <Footer />
    </div>
  );
}

export default ProfileDashboard;
