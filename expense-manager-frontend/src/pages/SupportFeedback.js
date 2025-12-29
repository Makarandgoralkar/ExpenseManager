import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./SupportFeedback.css";
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";

function SupportFeedback() {
  const [form, setForm] = useState({
    type: "QUERY",
    subject: "",
    message: "",
    rating: 0,
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("type", form.type);
    data.append("subject", form.subject);
    data.append("message", form.message);
    if (form.rating) data.append("rating", form.rating);
    if (form.attachment) data.append("attachment", form.attachment);

    await axios.post("http://localhost:8080/api/support", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    alert("Submitted Successfully!");
    setForm({ type: "QUERY", subject: "", message: "", rating: 0, attachment: null });
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="content-wrap">
        <div className="support-container">
          <h2>Support & Feedback</h2>

          <form className="support-form" onSubmit={submitForm}>
            <label>Type</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="QUERY">Query</option>
              <option value="FEEDBACK">Feedback</option>
            </select>

            <label>Subject</label>
            <input name="subject" value={form.subject} onChange={handleChange} required />

            <label>Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} required />

            {form.type === "FEEDBACK" && (
              <>
                <label>Rating</label>
                <div className="stars">
                  {[1,2,3,4,5].map(n => (
                    <span
                      key={n}
                      className={form.rating >= n ? "active" : ""}
                      onClick={() => setForm({ ...form, rating: n })}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </>
            )}

            <label>Attach Screenshot</label>
            <input type="file" name="attachment" onChange={handleChange} />

            <button type="submit">
              <FaPaperPlane /> Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SupportFeedback;
