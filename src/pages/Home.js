import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #eef1f6, #ffffff)"
    }}>

      {/* Navbar */}
      <nav
        style={{
          background: "#4f63c4",
          padding: "15px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white"
        }}
      >
        <h5 style={{ margin: 0 }}>🎓 Student Performance</h5>

        <div style={{ display: "flex", gap: "15px" }}>
          <Link
            to="/login"
            style={navBtnLight}
          >
            🔑 Login
          </Link>

          <Link
            to="/login"
            style={navBtnDark}
          >
            ⚙ Admin
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          background: "#4f63c4",
          margin: "40px",
          borderRadius: "12px",
          padding: "80px 20px",
          textAlign: "center",
          color: "white",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
        }}
      >
        <h1 style={{ fontWeight: "600", marginBottom: "15px" }}>
          🎓 Welcome to the Student Performance Prediction System
        </h1>

        <p style={{ marginBottom: "25px", fontSize: "16px", opacity: 0.9 }}>
          Register, login, and predict your performance based on key study indicators.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
          <Link to="/login" style={primaryBtn}>
            🚀 Get Started
          </Link>

          <Link to="/login" style={secondaryBtn}>
            🔑 Login
          </Link>
        </div>
      </section>

      {/* Key Features */}
      <section style={{ textAlign: "center", padding: "20px 40px 80px" }}>
        <h3 style={{ marginBottom: "50px", color: "#111827" }}>
          ✨ Key Features
        </h3>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap"
          }}
        >
          <FeatureCard
            title="Student Profiles"
            text="Maintain detailed student profiles with academic info, study hours, and attendance tracking."
          />

          <FeatureCard
            title="Performance Prediction"
            text="Analyze study patterns and predict academic performance using intelligent scoring logic."
          />

          <FeatureCard
            title="Data Insights"
            text="Access dashboards with statistics, charts, and reports to understand student trends."
          />
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#1f2937",
          color: "white",
          textAlign: "center",
          padding: "20px"
        }}
      >
        🎓 Student Performance System © 2026
      </footer>

    </div>
  );
}

/* ================= STYLES ================= */

const navBtnLight = {
  background: "#d1fae5",
  padding: "6px 15px",
  borderRadius: "6px",
  textDecoration: "none",
  color: "#065f46",
  fontWeight: "500"
};

const navBtnDark = {
  background: "#1f2937",
  padding: "6px 15px",
  borderRadius: "6px",
  textDecoration: "none",
  color: "white",
  fontWeight: "500"
};

const primaryBtn = {
  background: "linear-gradient(45deg, #00c6a7, #1e90ff)",
  padding: "12px 28px",
  borderRadius: "25px",
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
};

const secondaryBtn = {
  background: "white",
  padding: "12px 28px",
  borderRadius: "25px",
  color: "#4f63c4",
  textDecoration: "none",
  fontWeight: "500"
};

function FeatureCard({ title, text }) {
  return (
    <div
      style={{
        background: "white",
        padding: "30px",
        width: "300px",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
      }}
    >
      <h5 style={{ marginBottom: "15px", color: "#111827" }}>{title}</h5>
      <p style={{ fontSize: "14px", color: "#6b7280" }}>{text}</p>
    </div>
  );
}

export default Home;