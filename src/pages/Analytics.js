import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from "recharts";

function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await api.get("/api/dashboard");

      // ✅ ONLY CHANGE: name → S1, S2...
      const updatedScores = res.data.scores.map((item, index) => ({
        ...item,
        id: `S${index + 1}`
      }));

      setData({ ...res.data, scores: updatedScores });
    } catch (err) {
      console.error("Analytics failed");
    }
  };

  if (!data) return <h3 style={{ fontSize: "24px" }}>Loading analytics...</h3>;

  const gradeData = Object.keys(data.gradeDistribution).map((key) => ({
    name: key,
    value: data.gradeDistribution[key]
  }));

  const COLORS = ["#22c55e", "#3b82f6", "#ef4444"];

  return (
    <div>

      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700" }}>
          Analytics Dashboard
        </h2>
        <p style={{ fontSize: "20px", color: "#6b7280" }}>
          Detailed academic insights
        </p>
      </div>

      <div style={{ display: "flex", gap: "20px", marginBottom: "40px", flexWrap: "wrap" }}>

        <div className="card shadow p-4" style={{ flex: 1 }}>
          <h5>Total Students</h5>
          <h1>{data.totalStudents}</h1>
        </div>

        <div className="card shadow p-4" style={{ flex: 1 }}>
          <h5>Average Score</h5>
          <h1>{data.averageScore.toFixed(2)}</h1>
        </div>

        <div className="card shadow p-4" style={{ flex: 1 }}>
          <h5>High Risk Students</h5>
          <h1 style={{ color: "#ef4444" }}>{data.highRiskCount}</h1>
        </div>

      </div>

      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>

        <div style={card}>
          <h4>Student Scores</h4>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.scores}>
              <CartesianGrid strokeDasharray="3 3" />
              {/* ✅ CHANGED HERE */}
              <XAxis dataKey="id" tick={{ fontSize: 16 }} />
              <YAxis tick={{ fontSize: 16 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={card}>
          <h4>Grade Distribution</h4>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={gradeData} dataKey="value" nameKey="name" outerRadius={100} label>
                {gradeData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  flex: 1,
  minWidth: "350px"
};

export default Analytics;