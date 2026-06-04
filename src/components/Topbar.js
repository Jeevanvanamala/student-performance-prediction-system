import React from "react";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        🎓 Student Performance System
      </div>

      <div className="topbar-right">
        <button className="btn btn-danger btn-sm" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Topbar;
