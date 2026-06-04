import React, { useEffect, useState } from "react";
import api from "../services/api";   // ✅ use centralized API
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
    role: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await api.get(`/students/${id}`);  // ✅ clean
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student:", error);
        toast.error("Failed to load student data");
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/students/${id}`, student);  // ✅ clean

      toast.success("Student updated successfully ✅");

      setTimeout(() => {
        navigate("/view-students");
      }, 1500);

    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("Failed to update student ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Student</h2>

      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={student.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="text"
            name="email"
            className="form-control"
            value={student.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Department</label>
          <input
            type="text"
            name="department"
            className="form-control"
            value={student.department || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Year</label>
          <input
            type="number"
            name="year"
            className="form-control"
            value={student.year || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Role</label>
          <select
            name="role"
            className="form-control"
            value={student.role || ""}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="STUDENT">STUDENT</option>
            <option value="FACULTY">FACULTY</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Student"}
        </button>
      </form>
    </div>
  );
};

export default EditStudent;