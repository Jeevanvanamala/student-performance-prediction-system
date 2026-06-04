import React, { useEffect } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

function Predict() {

  const { studentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    const generatePrediction = async () => {
      try {
        const res = await api.post(`/api/predict/${studentId}`);
        setTimeout(() => {
          navigate(`/result/${res.data.id}`);
        }, 2000);
      } catch (err) {
        alert("Prediction failed. Make sure academic record exists.");
        navigate("/view-students");
      }
    };

    generatePrediction();

  }, [studentId, navigate]);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "70vh"
    }}>

      <div style={{
        width: "500px",
        background: "white",
        borderRadius: "16px",
        padding: "40px",
        textAlign: "center",
        boxShadow: "0 8px 30px rgba(0,0,0,0.1)"
      }}>

        {/* Spinner */}
        <div style={{
          width: "60px",
          height: "60px",
          border: "6px solid #e0e0e0",
          borderTop: "6px solid #0d3b66",
          borderRadius: "50%",
          margin: "0 auto 25px",
          animation: "spin 1s linear infinite"
        }}></div>

        <h4 style={{ fontWeight: "600", marginBottom: "10px" }}>
          Generating Prediction
        </h4>

        <p style={{ color: "#666" }}>
          Please wait while we analyze the student performance data...
        </p>

      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

    </div>
  );
}

export default Predict;