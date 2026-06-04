import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/students");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name?.toLowerCase().includes(search.toLowerCase()) ||
      student.email?.toLowerCase().includes(search.toLowerCase());

    const matchesDept =
      departmentFilter === "All" ||
      student.department === departmentFilter;

    return matchesSearch && matchesDept;
  });

  // ✅ EXCEL EXPORT (FIXED WIDTH)
  const exportToExcel = () => {
    const data = filteredStudents.map((student, index) => ({
      "S.No": index + 1,
      Name: student.name,
      Email: student.email,
      Department: student.department,
      Year: student.year,
      Risk: student.riskLevel || "N/A"
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    worksheet["!cols"] = [
      { wch: 6 },
      { wch: 25 },
      { wch: 35 },
      { wch: 15 },
      { wch: 8 },
      { wch: 12 }
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    saveAs(blob, "students.xlsx");
  };

  // ✅ PDF EXPORT
  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Student Performance Report", 14, 20);

    const tableData = filteredStudents.map((student, index) => [
      index + 1,
      student.name,
      student.email,
      student.department,
      student.year,
      student.riskLevel || "N/A"
    ]);

    autoTable(doc, {
      startY: 30,
      head: [["S.No", "Name", "Email", "Dept", "Year", "Risk"]],
      body: tableData
    });

    doc.save("Student_Report.pdf");
  };

  const headerStyle = {
    textAlign: "left",
    padding: "14px 20px",
    color: "#d1d5db",
    fontWeight: "600"
  };

  const cellStyle = {
    padding: "16px 20px",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    color: "#e5e7eb"
  };

  const riskBadge = (risk) => {
    let bg = "#6b7280";

    if (risk === "Low") bg = "#16a34a";
    if (risk === "Medium") bg = "#f59e0b";
    if (risk === "High") bg = "#dc2626";

    return (
      <span
        style={{
          padding: "4px 12px",
          borderRadius: "20px",
          background: bg,
          color: "white",
          fontSize: "12px",
          fontWeight: "500"
        }}
      >
        {risk || "N/A"}
      </span>
    );
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ color: "white", marginBottom: "10px" }}>Students</h2>
      <p style={{ color: "#9ca3af", marginBottom: "20px" }}>
        View students by department and search easily
      </p>

      {/* Filters */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          style={{
            padding: "8px 14px",
            borderRadius: "8px",
            background: "#1f2937",
            color: "white",
            border: "1px solid #374151"
          }}
        >
          <option value="All">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
          <option value="MECH">MECH</option>
        </select>

        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 14px",
            borderRadius: "8px",
            background: "#1f2937",
            color: "white",
            border: "1px solid #374151"
          }}
        />

        {/* ✅ BUTTONS (NO DESIGN CHANGE) */}
        <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
          <button
            onClick={exportToExcel}
            style={{
              background: "linear-gradient(135deg,#00d2ff,#3a7bd5)",
              border: "none",
              padding: "8px 22px",
              borderRadius: "20px",
              color: "white",
              fontWeight: "500",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(0,210,255,0.4)"
            }}
          >
            Export Excel
          </button>

          <button
            onClick={exportToPDF}
            style={{
              background: "linear-gradient(135deg,#22c55e,#16a34a)",
              border: "none",
              padding: "8px 22px",
              borderRadius: "20px",
              color: "white",
              fontWeight: "500",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(34,197,94,0.4)"
            }}
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          borderRadius: "16px",
          backdropFilter: "blur(8px)",
          padding: "10px"
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={headerStyle}>S.No</th>
              <th style={headerStyle}>Name</th>
              <th style={headerStyle}>Email</th>
              <th style={headerStyle}>Department</th>
              <th style={headerStyle}>Year</th>
              <th style={headerStyle}>Risk</th>
              <th style={headerStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={student.id}>
                <td style={cellStyle}>{index + 1}</td>
                <td style={cellStyle}>{student.name}</td>
                <td style={cellStyle}>{student.email}</td>
                <td style={cellStyle}>{student.department}</td>
                <td style={cellStyle}>{student.year}</td>
                <td style={cellStyle}>{riskBadge(student.riskLevel)}</td>
                <td style={cellStyle}>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button
                      onClick={() => navigate(`/add-record/${student.id}`)}
                      style={{
                        padding: "6px 18px",
                        borderRadius: "20px",
                        border: "1px solid rgba(255,255,255,0.15)",
                        background: "rgba(255,255,255,0.08)",
                        color: "#e5e7eb"
                      }}
                    >
                      Add Record
                    </button>

                    <button
                      onClick={() => navigate(`/result/${student.id}`)}
                      style={{
                        padding: "6px 18px",
                        borderRadius: "20px",
                        border: "none",
                        background: "#2563eb",
                        color: "white"
                      }}
                    >
                      Predict
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewStudents;