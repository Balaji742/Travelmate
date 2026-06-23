import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firabase";
// import { auth } from "../firebase";

const ProtectedRoutes = ({ children }) => {
  const user = auth.currentUser;

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;