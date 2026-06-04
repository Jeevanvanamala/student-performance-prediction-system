import API from "./api";

// Dashboard stats
export const getDashboardStats = async () => {
  const response = await API.get("/dashboard/stats");
  return response.data;
};

// Add student
export const addStudent = async (studentData) => {
  const response = await API.post("/students/add", studentData);
  return response.data;
};

// Get student by ID
export const getStudentById = async (id) => {
  const response = await API.get(`/students/${id}`);
  return response.data;
};

// Get all students
export const getAllStudents = async () => {
  const response = await API.get("/students/all");
  return response.data;
};

// Analytics
export const getAnalyticsSummary = async () => {
  const response = await API.get("/analytics/summary");
  return response.data;
};
