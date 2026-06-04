import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        🎓 Student Performance
      </div>

      <div className="navbar-right">
        <Link to="/login" className="nav-link">📄 Register</Link>
        <Link to="/login" className="nav-button login-btn">🔑 Login</Link>
        <span className="nav-button admin-btn">⚙ Admin</span>
      </div>
    </nav>
  );
}

export default Navbar;