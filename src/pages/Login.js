import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const promise = api.post("/api/auth/login", formData);

    toast.promise(promise, {
      loading: "Signing in...",
      success: "Login successful ✅",
      error: "Invalid credentials ❌"
    });

    try {
      const res = await promise;

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("role", res.data.role);

      navigate("/dashboard");
    } catch {}
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>

        {/* Left Illustration Section */}
        <div style={styles.left}>
          <div style={styles.imageWrapper}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
              alt="male user"
              style={styles.image}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140051.png"
              alt="female user"
              style={styles.image}
            />
          </div>
        </div>

        {/* Right Login Form */}
        <div style={styles.right}>
          <h2 style={styles.title}>Login</h2>

          <form onSubmit={handleSubmit} style={{ marginTop: "40px" }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ ...styles.input, marginTop: "15px" }}
            />

            <button type="submit" style={styles.button}>
              Sign In
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

/* ✅ STYLES OBJECT RESTORED */
const styles = {
  background: {
    height: "100vh",
    background: "#4c4c97",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    width: "850px",
    height: "500px",
    background: "white",
    borderRadius: "12px",
    display: "flex",
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
  },
  left: {
    flex: 1,
    background: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  imageWrapper: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: "140px"
  },
  right: {
    flex: 1,
    padding: "60px 50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  title: {
    fontWeight: "800",
    fontSize: "28px",
    color: "#111827"
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    fontSize: "14px"
  },
  button: {
    marginTop: "25px",
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer"
  }
};

export default Login;