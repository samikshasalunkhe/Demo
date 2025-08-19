import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (isAuthenticated === null) {
    return <div className="text-white text-center mt-10 text-xl">Loading...</div>;
  }

  // ✅ Case 1: Not logged in → Access Denied
 if (!isAuthenticated) {
  return <Navigate to="/" replace />; // Login page var redirect
}


  // ❌ Case 2: Logged in but role mismatch → Access Denied
  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/access-denied" replace />;
  }

  console.log("ProtectedRoute user role:", user?.role); // ✅ debug
  // ✅ Allowed
  return children;
};

export default ProtectedRoute;
