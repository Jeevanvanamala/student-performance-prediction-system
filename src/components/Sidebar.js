import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h4 className="sidebar-title">📊 Admin Panel</h4>

      <Link to="/dashboard" className="sidebar-link">
        Dashboard
      </Link>

      <Link to="/add-student" className="sidebar-link">
        Add Student
      </Link>

      <Link to="/view-students" className="sidebar-link">
        View Students
      </Link>

      <Link to="/analytics" className="sidebar-link">
        Analytics
      </Link>
    </div>
  );
}

export default Sidebar;
