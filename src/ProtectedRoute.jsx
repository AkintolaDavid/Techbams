import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Replace with your actual auth logic

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
