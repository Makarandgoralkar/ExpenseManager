import { useEffect } from "react";
import { saveToken } from "../utils/auth";
import "./OAuth2Success.css";

function OAuth2Success() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      saveToken(token);
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="oauth2-success-container">
      <p>Logging you in...</p>
      <div className="loader"></div>
    </div>
  );
}

export default OAuth2Success;
