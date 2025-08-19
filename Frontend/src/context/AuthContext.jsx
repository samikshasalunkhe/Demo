import React from "react";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (token && storedUser) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      console.log("Decoded token:", decoded); // ✅ debug

      if (decoded.exp < currentTime) {
        console.log("❌ Token expired");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
      } else {
        const userObj = JSON.parse(storedUser);
        setIsAuthenticated(true);
        setUser(userObj);
        console.log("AuthContext user:", userObj);
      }
    } catch (error) {
      console.log("❌ Invalid token", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUser(null);
    }
  } else {
    setIsAuthenticated(false);
    setUser(null);
  }
}, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
