import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function Result() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchPrediction = useCallback(async () => {
    try {
      const res = await api.get(`/api/predict-ml/${id}`);
      setData(res.data);
    } catch (err) {
      setError("No academic record found for this student");
      toast.error("Prediction failed ❌");
    }
  }, [id]);

  useEffect(() => {
    fetchPrediction();
  }, [fetchPrediction]);

  if (error)
    return (
      <div style={{ padding: "40px", color: "white" }}>
        <h3>{error}</h3>
      </div>
    );

  if (!data)
    return (
      <div style={{ padding: "40px", color: "white" }}>
        <h3>Loading prediction...</h3>
      </div>
    );

  const riskColor =
    data.riskLevel === "Low"
      ? "#10b981"
      : data.riskLevel === "Medium"
      ? "#f59e0b"
      : "#ef4444";

  const featureChartData = Object.keys(data.featureImportance || {}).map(
    (key) => ({
      name: key,
      value: data.featureImportance[key]
    })
  );

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h2 style={{ marginBottom: "30px" }}>Prediction Result</h2>

      {/* Prediction Card */}
      <div
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(15px)",
          borderRadius: "20px",
          padding: "40px",
          display: "flex",
          gap: "50px",
          alignItems: "center",
          border: "1px solid rgba(255,255,255,0.2)",
          marginBottom: "40px"
        }}
      >
        {/* Score Circle */}
        <div
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: `conic-gradient(#2563eb ${data.predictedScore * 3.6}deg, rgba(255,255,255,0.2) 0deg)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            fontWeight: "700"
          }}
        >
          {data.predictedScore}
        </div>

        <div style={{ flex: 1 }}>
          <h3>Student: {data.studentName}</h3>

          <p><strong>Grade:</strong> {data.grade}</p>

          <p>
            <strong>Risk Level:</strong>{" "}
            <span
              style={{
                background: riskColor,
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "13px"
              }}
            >
              {data.riskLevel}
            </span>
          </p>

          <hr style={{ margin: "20px 0", opacity: 0.2 }} />

          <p><strong>Model Used:</strong> {data.model}</p>
          <p><strong>Model Accuracy (R²):</strong> {data.accuracy}</p>
        </div>
      </div>

      {/* Feature Importance Chart */}
      <div
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(15px)",
          borderRadius: "20px",
          padding: "30px",
          border: "1px solid rgba(255,255,255,0.2)"
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>
          Feature Importance (Explainable ML)
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={featureChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Result;