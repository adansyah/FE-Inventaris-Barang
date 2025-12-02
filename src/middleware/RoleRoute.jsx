import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const RoleRoute = ({ roles, userRole, children }) => {
  const isAllowed = roles.includes(userRole);

  useEffect(() => {
    if (!isAllowed) {
      const timer = setTimeout(() => {
        toast.error("Maaf, Anda tidak dapat mengakses halaman ini");
      }, 0); 

      
      return () => clearTimeout(timer);
    }
  }, [isAllowed]);
  // Jika role tidak cocok → arahkan ke dashboard
  if (!isAllowed) {
    return <Navigate to="/dashboard" replace />;
  }

  // Jika role cocok → tampilkan halaman
  return children;
};

export default RoleRoute;
