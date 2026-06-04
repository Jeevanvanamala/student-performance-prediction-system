import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import Result from "./pages/Result";
import ViewStudents from "./pages/ViewStudents";
import Analytics from "./pages/Analytics";
import Layout from "./components/Layout";
import Predict from "./pages/Predict";
import AddRecord from "./pages/AddRecord";

function PrivateRoute({ children }) {
  const role = localStorage.getItem("role");
  return role ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(0,0,0,0.85)",
            color: "white",
            borderRadius: "12px"
          }
        }}
      />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/view-students" element={<ViewStudents />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/result/:id" element={<Result />} />
          <Route path="/predict/:studentId" element={<Predict />} />
          <Route path="/add-record/:studentId" element={<AddRecord />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;