import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Mail,
  ArrowLeft,
  UserPlus,
  Wrench,
  Moon,
  Sun,
  UserCog,
} from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("customer"); // 'customer' or 'technician'
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login, darkMode, toggleDarkMode } = useAuth();

  // Check for success message from registration
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Backend integration - replace with your actual endpoint
      const endpoint =
        userType === "customer"
          ? "/api/auth/customer/login" // Replace with your customer login endpoint
          : "/api/auth/technician/login"; // Replace with your technician login endpoint

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          userType: userType,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        const userData = {
          ...data.user,
          userType: userType,
          token: data.token, // Store auth token if provided
        };

        login(userData);
        navigate("/");
      } else {
        // Handle different error types
        if (response.status === 401) {
          setErrors({ submit: "Invalid email or password. Please try again." });
        } else if (response.status === 403) {
          setErrors({
            submit: "Account not verified. Please check your email.",
          });
        } else {
          setErrors({
            submit: data.message || "Login failed. Please try again.",
          });
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        submit: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br transition-colors duration-300 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
        darkMode ? "from-gray-900 to-gray-800" : "from-blue-50 to-indigo-100"
      }`}
    >
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="inline-flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-blue-600" />
              <span className="text-blue-600 hover:text-blue-800 font-medium">
                Back to Home
              </span>
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-300 ${
                darkMode
                  ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-center space-x-2 mb-6">
            <Wrench className="h-10 w-10 text-blue-600" />
            <h1
              className={`text-3xl font-bold transition-colors duration-300 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              TechFix Pro
            </h1>
          </div>

          <h2
            className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Welcome Back
          </h2>
          <p
            className={`transition-colors duration-300 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Sign in to your account to continue
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-600 rounded-lg p-3">
            <p className="text-sm text-green-600 dark:text-green-400 text-center">
              {successMessage}
            </p>
          </div>
        )}

        {/* User Type Selector */}
        <div
          className={`rounded-xl shadow-lg p-6 transition-colors duration-300 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="mb-6">
            <label
              className={`block text-sm font-medium mb-3 transition-colors duration-300 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              I am a:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserType("customer")}
                className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 ${
                  userType === "customer"
                    ? darkMode
                      ? "border-blue-500 bg-blue-900/30 text-blue-300"
                      : "border-blue-500 bg-blue-100 text-blue-700"
                    : darkMode
                    ? "border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50"
                    : "border-gray-300 text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                <User className="h-4 w-4 mr-2" />
                Customer
              </button>
              <button
                type="button"
                onClick={() => setUserType("technician")}
                className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 ${
                  userType === "technician"
                    ? darkMode
                      ? "border-blue-500 bg-blue-900/30 text-blue-300"
                      : "border-blue-500 bg-blue-100 text-blue-700"
                    : darkMode
                    ? "border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50"
                    : "border-gray-300 text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                <UserCog className="h-4 w-4 mr-2" />
                Technician
              </button>
            </div>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                    errors.email
                      ? "border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-600"
                      : darkMode
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                    errors.password
                      ? "border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-600"
                      : darkMode
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="rememberMe"
                  className={`ml-2 block text-sm transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-600 rounded-lg p-3">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </div>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p
              className={`text-sm transition-colors duration-300 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Don't have an account?{" "}
              <Link
                to={`/register?type=${userType}`}
                className="text-blue-600 hover:text-blue-500 font-medium transition duration-200"
              >
                Create {userType} account
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div
            className={`mt-6 p-4 rounded-lg transition-colors duration-300 ${
              darkMode ? "bg-blue-900/20" : "bg-blue-50"
            }`}
          >
            <h4
              className={`text-sm font-medium mb-2 transition-colors duration-300 ${
                darkMode ? "text-blue-200" : "text-blue-800"
              }`}
            >
              Demo Credentials:
            </h4>
            <div
              className={`text-xs transition-colors duration-300 ${
                darkMode ? "text-blue-300" : "text-blue-600"
              }`}
            >
              <p>
                <strong>Customer:</strong> customer@demo.com / demo123
              </p>
              <p>
                <strong>Technician:</strong> tech@demo.com / demo123
              </p>
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="text-center">
          <p
            className={`text-sm transition-colors duration-300 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            By signing in, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
