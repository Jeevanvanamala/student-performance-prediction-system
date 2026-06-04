import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [mlInfo, setMlInfo] = useState(null);

  useEffect(() => {
    loadDashboard();
    loadModelInfo();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/api/dashboard");

      // ✅ ONLY CHANGE: convert names → S1, S2...
      const updatedScores = res.data.scores.map((item, index) => ({
        ...item,
        id: `S${index + 1}`
      }));

      setStats({ ...res.data, scores: updatedScores });
    } catch (err) {
      console.log("Dashboard error");
    }
  };

  const loadModelInfo = async () => {
    try {
      const res = await api.get("/api/predict-ml/3");
      if (res.data.allModels) {
        setMlInfo(res.data.allModels);
      }
    } catch (err) {
      console.log("ML info error");
    }
  };

  if (!stats) return <h4 style={{ color: "white" }}>Loading...</h4>;

  const gradeData = Object.keys(stats.gradeDistribution).map((key) => ({
    name: key,
    value: stats.gradeDistribution[key]
  }));

  const COLORS = ["#3b82f6", "#f59e0b", "#ef4444"];

  const modelChartData = mlInfo
    ? [
        { name: "Linear Regression", score: mlInfo.linear_regression_r2 },
        { name: "Random Forest", score: mlInfo.random_forest_r2 }
      ]
    : [];

  return (
    <div style={{ color: "white" }}>
      <h2 style={{ marginBottom: "10px" }}>Dashboard Overview</h2>
      <p style={{ opacity: 0.7, marginBottom: "30px" }}>
        Monitor academic performance insights and ML model evaluation.
      </p>

      <div style={{ display: "flex", gap: "30px", marginBottom: "40px" }}>

        <div style={chartContainer}>
          <h4 style={{ marginBottom: "15px" }}>Student Performance</h4>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stats.scores}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
              {/* ✅ CHANGED HERE */}
              <XAxis dataKey="id" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="score" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={chartContainer}>
          <h4 style={{ marginBottom: "15px" }}>Grade Distribution</h4>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={gradeData} dataKey="value" nameKey="name" outerRadius={100} label>
                {gradeData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {mlInfo && (
        <div style={chartContainer}>
          <h3 style={{ marginBottom: "20px" }}>
            ML Model Comparison (R² Score)
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={modelChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="score" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>

          <div style={{ marginTop: "15px", opacity: 0.8 }}>
            <p>Selected Model: <strong>{mlInfo.selected_model}</strong></p>
            <p>Best R² Score: <strong>{mlInfo.r2_score}</strong></p>
          </div>
        </div>
      )}
    </div>
  );
}

const chartContainer = {
  flex: 1,
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(15px)",
  padding: "25px",
  borderRadius: "20px",
  border: "1px solid rgba(255,255,255,0.2)"
};

export default Dashboard;