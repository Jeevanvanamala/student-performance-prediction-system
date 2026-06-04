import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const name = localStorage.getItem("name");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* 🔥 Glass Sidebar */}
      <div style={{
        width: "260px",
        backdropFilter: "blur(20px)",
        background: "rgba(255,255,255,0.08)",
        borderRight: "1px solid rgba(255,255,255,0.15)",
        padding: "30px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderTopRightRadius: "20px",
        borderBottomRightRadius: "20px"
      }}>
        <div>
          <h4 style={{
            marginBottom: "40px",
            fontWeight: "600",
            letterSpacing: "1px"
          }}>
            📊 StudentPro
          </h4>

          <SidebarItem label="Dashboard" active={isActive("/dashboard")} onClick={() => navigate("/dashboard")} />
          <SidebarItem label="Add Student" active={isActive("/add-student")} onClick={() => navigate("/add-student")} />
          <SidebarItem label="View Students" active={isActive("/view-students")} onClick={() => navigate("/view-students")} />
          <SidebarItem label="Analytics" active={isActive("/analytics")} onClick={() => navigate("/analytics")} />
        </div>

        <div>
          <div style={{ fontSize: "14px", marginBottom: "15px", opacity: 0.8 }}>
            Logged in as:
            <div style={{ fontWeight: "600" }}>{name}</div>
          </div>

          <button
            onClick={logout}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              background: "rgba(239,68,68,0.8)",
              border: "none",
              color: "white",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px" }}>
        <Outlet />
      </div>
    </div>
  );
}

function SidebarItem({ label, onClick, active }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "14px",
        borderRadius: "12px",
        cursor: "pointer",
        marginBottom: "15px",
        background: active ? "rgba(255,255,255,0.15)" : "transparent",
        fontWeight: active ? "600" : "400",
        transition: "0.3s",
        backdropFilter: active ? "blur(10px)" : "none"
      }}
      onMouseEnter={(e) =>
        !active && (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
      }
      onMouseLeave={(e) =>
        !active && (e.currentTarget.style.background = "transparent")
      }
    >
      {label}
    </div>
  );
}

export default Layout;