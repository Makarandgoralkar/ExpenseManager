import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  const fileInputRef = useRef(null);

  // Fetch profile + image
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({ ...res.data, password: "" });

      const imgRes = await API.get("/user/profile/picture", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (imgRes.data) {
        setPreview(`data:image/jpeg;base64,${imgRes.data}`);
      }
    } catch {
      setPreview("");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemovePhoto = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.delete("/user/profile/picture", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPreview("");
      setSelectedFile(null);
      alert("Profile photo removed");
    } catch {
      alert("Failed to remove photo");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await API.put("/user/profile", user, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        await API.post("/user/profile/upload", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      alert("Profile updated successfully!");
      fetchProfile();
    } catch {
      alert("Profile update failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h2>User Profile</h2>

        {/* PROFILE IMAGE */}
        <div
          className="profile-image-wrapper"
          onClick={() => fileInputRef.current.click()}
          title="Click to upload photo"
        >
          {preview ? (
            <img src={preview} alt="Profile" className="profile-preview" />
          ) : (
            <div className="profile-placeholder">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {preview && (
          <button className="remove-photo-btn" onClick={handleRemovePhoto}>
            <FaTrash /> Remove Photo
          </button>
        )}

        <form className="profile-form" onSubmit={handleUpdate}>
          <label>Name</label>
          <input name="name" value={user.name} onChange={handleChange} required />

          <label>Email</label>
          <input name="email" value={user.email} onChange={handleChange} required />

          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Change password (optional)"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="eye-icon"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button className="update-btn">Update Profile</button>
        </form>
      </div>
    </>
  );
}

export default Profile;
