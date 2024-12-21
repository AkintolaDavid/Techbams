import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("admintoken");

  return isAuthenticated ? children : <Navigate to="/signinadmin" />;
};

export default ProtectedAdminRoute;
