import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Check if user is logged in and load dark mode preference on app start
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          if (parsedUser.isLoggedIn) {
            setUser(parsedUser);
          }
        }

        // Load dark mode preference
        const savedDarkMode = localStorage.getItem("darkMode");
        if (savedDarkMode) {
          setDarkMode(JSON.parse(savedDarkMode));
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const login = (userData) => {
    const userWithLoginStatus = {
      ...userData,
      isLoggedIn: true,
      loginTime: new Date().toISOString(),
    };

    setUser(userWithLoginStatus);
    localStorage.setItem("user", JSON.stringify(userWithLoginStatus));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const register = (userData) => {
    const userWithLoginStatus = {
      ...userData,
      isLoggedIn: true,
      registrationDate: new Date().toISOString(),
    };

    setUser(userWithLoginStatus);
    localStorage.setItem("user", JSON.stringify(userWithLoginStatus));
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isLoggedIn: !!user,
    isLoading,
    darkMode,
    toggleDarkMode,
    login,
    logout,
    register,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
