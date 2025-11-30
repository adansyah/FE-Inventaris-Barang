import React from "react";
import { Navigate } from "react-router-dom";

const RoleRoute = ({ children, role }) => {
  const userRole = localStorage.getItem("role");

  if (userRole !== role) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default RoleRoute;
