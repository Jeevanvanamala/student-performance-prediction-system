import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function AddRecord() {
  const navigate = useNavigate();
  const { studentId } = useParams(); // ✅ FIXED

  const [record, setRecord] = useState({
    semester: "",
    attendance: "",
    internalMarks: "",
    assignmentMarks: "",
    studyHours: "",
    previousGpa: "",
    extracurricularActivities: ""
  });

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Student ID:", studentId); // Debug

    try {
      await axios.post(
        `http://localhost:8080/api/records/${studentId}`, // ✅ CORRECT
        record
      );

      toast.success("Academic Record Added Successfully!");
      navigate("/view-students");

    } catch (error) {
      console.error("Full Error:", error.response || error);
      toast.error("Error adding academic record");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
          borderRadius: "20px",
          padding: "40px",
          display: "flex",
          gap: "50px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
        }}
      >
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
            alt="academic"
            style={{ width: "280px", opacity: 0.9 }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{ color: "white", marginBottom: "30px" }}>
            Add Academic Record
          </h2>

          <form onSubmit={handleSubmit}>
            {Object.keys(record).map((field, index) => (
              <div key={index} style={{ marginBottom: "18px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    color: "#d1d5db",
                    fontSize: "14px"
                  }}
                >
                  {field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>

                <input
                  type="text"
                  name={field}
                  value={record[field]}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.08)",
                    color: "white",
                    outline: "none"
                  }}
                />
              </div>
            ))}

            <button
              type="submit"
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "12px",
                borderRadius: "25px",
                border: "none",
                background: "linear-gradient(135deg,#00d2ff,#3a7bd5)",
                color: "white",
                fontWeight: "600",
                fontSize: "15px",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(0,210,255,0.4)"
              }}
            >
              Save Record
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRecord;