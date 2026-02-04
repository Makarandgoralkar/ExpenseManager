import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaEnvelope, FaUser, FaCommentDots } from "react-icons/fa";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const msg = await res.text();
      alert(msg);

      if (res.ok) {
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="content-wrap contact-wrapper">
        <h2>Contact Us</h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            <FaUser className="icon" /> Name
             <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
          </label>


          <label>
            <FaEnvelope /> Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <FaCommentDots /> Message
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
