import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  ArrowLeft,
  UserPlus,
  Wrench,
  CheckCircle,
  Moon,
  Sun,
  UserCog,
  Upload,
  FileImage,
  Users,
  Shield,
  Camera,
} from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const [userType, setUserType] = useState(
    searchParams.get("type") || "customer"
  );
  const { darkMode, toggleDarkMode } = useAuth();
  const [formData, setFormData] = useState({
    // Common fields
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,

    // Technician specific fields
    governmentProof: "",
    governmentProofNumber: "",
    governmentProofFile: null,
    selfieImage: null,
    services: [],
    experience: "",
    certifications: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const availableServices = [
    "Mobile Phone Repair",
    "TV Repair",
    "Laptop Repair",
    "AC Repair",
    "Desktop Computer Repair",
    "Tablet Repair",
    "Gaming Console Repair",
    "Audio Equipment Repair",
    "Home Appliances Repair",
    "Other Electronics",
  ];

  const governmentProofTypes = [
    "Aadhar Card",
    "PAN Card",
    "Driving License",
    "Passport",
    "Voter ID",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else if (type === "checkbox") {
      if (name === "services") {
        // Handle service selection for technicians
        setFormData((prev) => ({
          ...prev,
          services: checked
            ? [...prev.services, value]
            : prev.services.filter((service) => service !== value),
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: "File size must be less than 5MB",
        }));
        return;
      }

      // Validate file type for images
      if (fieldName === "selfieImage" && !file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: "Please select a valid image file",
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
      }));

      // Clear any previous errors
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Common validations
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Please enter a complete address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Technician specific validations
    if (userType === "technician") {
      if (!formData.governmentProof) {
        newErrors.governmentProof = "Please select a government proof type";
      }

      if (!formData.governmentProofNumber.trim()) {
        newErrors.governmentProofNumber = "Government proof number is required";
      }

      if (!formData.governmentProofFile) {
        newErrors.governmentProofFile =
          "Please upload government proof document";
      }

      if (!formData.selfieImage) {
        newErrors.selfieImage = "Please upload a selfie image";
      }

      if (formData.services.length === 0) {
        newErrors.services =
          "Please select at least one service you can provide";
      }

      if (!formData.experience.trim()) {
        newErrors.experience = "Please enter your experience details";
      }
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
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
      // Create FormData for file uploads
      const submitData = new FormData();

      // Add common fields
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("address", formData.address);
      submitData.append("password", formData.password);
      submitData.append("userType", userType);

      // Add technician specific fields
      if (userType === "technician") {
        submitData.append("governmentProof", formData.governmentProof);
        submitData.append(
          "governmentProofNumber",
          formData.governmentProofNumber
        );
        submitData.append("services", JSON.stringify(formData.services));
        submitData.append("experience", formData.experience);
        submitData.append("certifications", formData.certifications);

        // Add files
        if (formData.governmentProofFile) {
          submitData.append(
            "governmentProofFile",
            formData.governmentProofFile
          );
        }
        if (formData.selfieImage) {
          submitData.append("selfieImage", formData.selfieImage);
        }
      }

      // Backend integration - replace with your actual endpoint
      const endpoint =
        userType === "customer"
          ? "/api/auth/customer/register" // Replace with your customer registration endpoint
          : "/api/auth/technician/register"; // Replace with your technician registration endpoint

      const response = await fetch(endpoint, {
        method: "POST",
        body: submitData, // Don't set Content-Type header, let browser set it for FormData
      });

      const data = await response.json();

      if (response.ok) {
        // Successful registration
        if (data.requiresVerification) {
          // Redirect to login with verification message
          navigate("/login", {
            state: {
              message:
                "Registration successful! Please check your email to verify your account before signing in.",
              userType: userType,
            },
          });
        } else {
          // Auto-login after registration
          const userData = {
            ...data.user,
            userType: userType,
            token: data.token,
          };
          register(userData);
          navigate("/");
        }
      } else {
        // Handle different error types
        if (response.status === 409) {
          setErrors({
            email:
              "Email already exists. Please use a different email or try logging in.",
          });
        } else if (response.status === 400) {
          // Handle validation errors from backend
          if (data.errors) {
            setErrors(data.errors);
          } else {
            setErrors({ submit: data.message || "Invalid data provided." });
          }
        } else {
          setErrors({
            submit: data.message || "Registration failed. Please try again.",
          });
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({
        submit: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8 ${
        darkMode ? "from-gray-900 to-gray-800" : "from-blue-50 to-indigo-100"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
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
            Create Your {userType === "technician" ? "Technician" : "Customer"}{" "}
            Account
          </h2>
          <p
            className={`transition-colors duration-300 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {userType === "technician"
              ? "Join our network of professional repair technicians"
              : "Join TechFix Pro for fast and reliable device repair services"}
          </p>
        </div>

        {/* Registration Form */}
        <div
          className={`rounded-xl shadow-lg p-8 transition-colors duration-300 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* User Type Selector */}
          <div className="mb-8">
            <label
              className={`block text-sm font-medium mb-3 transition-colors duration-300 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              I want to register as:
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUserType("customer")}
                className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
                  userType === "customer"
                    ? darkMode
                      ? "border-blue-500 bg-blue-900/30 text-blue-300"
                      : "border-blue-500 bg-blue-100 text-blue-700"
                    : darkMode
                    ? "border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50"
                    : "border-gray-300 text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                <User className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Customer</div>
                  <div className="text-xs opacity-75">Get device repairs</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setUserType("technician")}
                className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
                  userType === "technician"
                    ? darkMode
                      ? "border-blue-500 bg-blue-900/30 text-blue-300"
                      : "border-blue-500 bg-blue-100 text-blue-700"
                    : darkMode
                    ? "border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50"
                    : "border-gray-300 text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                <UserCog className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Technician</div>
                  <div className="text-xs opacity-75">
                    Provide repair services
                  </div>
                </div>
              </button>
            </div>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                    errors.name
                      ? "border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-600"
                      : darkMode
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email and Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email Address *
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

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                      errors.phone
                        ? "border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-600"
                        : darkMode
                        ? "border-gray-600 bg-gray-700 text-white"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Address Field */}
            <div>
              <label
                htmlFor="address"
                className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none ${
                    errors.address
                      ? "border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-600"
                      : darkMode
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  }`}
                  placeholder="Enter your complete address"
                />
              </div>
              {errors.address && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.address}
                </p>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Password *
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
                    placeholder="Create a password"
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

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Confirm Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                      errors.confirmPassword
                        ? "border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-600"
                        : darkMode
                        ? "border-gray-600 bg-gray-700 text-white"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Technician Specific Fields */}
            {userType === "technician" && (
              <>
                <div
                  className={`p-6 rounded-lg border-2 border-dashed transition-colors duration-300 ${
                    darkMode
                      ? "border-gray-600 bg-gray-700/50"
                      : "border-gray-300 bg-gray-50"
                  }`}
                >
                  <h3
                    className={`text-lg font-semibold mb-4 flex items-center transition-colors duration-300 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    <Shield className="h-5 w-5 mr-2 text-blue-600" />
                    Verification Documents
                  </h3>

                  {/* Government Proof Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="governmentProof"
                        className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Government Proof Type *
                      </label>
                      <select
                        id="governmentProof"
                        name="governmentProof"
                        value={formData.governmentProof}
                        onChange={handleInputChange}
                        className={`block w-full py-3 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                          errors.governmentProof
                            ? "border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-600"
                            : darkMode
                            ? "border-gray-600 bg-gray-700 text-white"
                            : "border-gray-300 bg-white text-gray-900"
                        }`}
                      >
                        <option value="">Select proof type</option>
                        {governmentProofTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.governmentProof && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.governmentProof}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="governmentProofNumber"
                        className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {formData.governmentProof} Number *
                      </label>
                      <input
                        id="governmentProofNumber"
                        name="governmentProofNumber"
                        type="text"
                        value={formData.governmentProofNumber}
                        onChange={handleInputChange}
                        className={`block w-full py-3 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                          errors.governmentProofNumber
                            ? "border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-600"
                            : darkMode
                            ? "border-gray-600 bg-gray-700 text-white"
                            : "border-gray-300 bg-white text-gray-900"
                        }`}
                        placeholder="Enter document number"
                      />
                      {errors.governmentProofNumber && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.governmentProofNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* File Uploads */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Government Proof Upload */}
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Upload Government Proof *
                      </label>
                      <div
                        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors duration-300 ${
                          errors.governmentProofFile
                            ? "border-red-300 bg-red-50 dark:bg-red-900/20"
                            : darkMode
                            ? "border-gray-600 hover:border-gray-500"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <input
                          type="file"
                          name="governmentProofFile"
                          onChange={(e) =>
                            handleFileUpload(e, "governmentProofFile")
                          }
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          id="governmentProofFile"
                        />
                        <label
                          htmlFor="governmentProofFile"
                          className="cursor-pointer"
                        >
                          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <p
                            className={`text-sm transition-colors duration-300 ${
                              darkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {formData.governmentProofFile
                              ? formData.governmentProofFile.name
                              : "Click to upload (PDF, JPG, PNG)"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Max size: 5MB
                          </p>
                        </label>
                      </div>
                      {errors.governmentProofFile && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.governmentProofFile}
                        </p>
                      )}
                    </div>

                    {/* Selfie Upload */}
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Upload Selfie Image *
                      </label>
                      <div
                        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors duration-300 ${
                          errors.selfieImage
                            ? "border-red-300 bg-red-50 dark:bg-red-900/20"
                            : darkMode
                            ? "border-gray-600 hover:border-gray-500"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <input
                          type="file"
                          name="selfieImage"
                          onChange={(e) => handleFileUpload(e, "selfieImage")}
                          accept="image/*"
                          className="hidden"
                          id="selfieImage"
                        />
                        <label htmlFor="selfieImage" className="cursor-pointer">
                          <Camera className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <p
                            className={`text-sm transition-colors duration-300 ${
                              darkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {formData.selfieImage
                              ? formData.selfieImage.name
                              : "Click to upload selfie"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            JPG, PNG only
                          </p>
                        </label>
                      </div>
                      {errors.selfieImage && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.selfieImage}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Services Offered */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-3 transition-colors duration-300 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Services You Can Provide * (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableServices.map((service) => (
                      <label key={service} className="flex items-center">
                        <input
                          type="checkbox"
                          name="services"
                          value={service}
                          checked={formData.services.includes(service)}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span
                          className={`ml-2 text-sm transition-colors duration-300 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {service}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.services && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.services}
                    </p>
                  )}
                </div>

                {/* Experience */}
                <div>
                  <label
                    htmlFor="experience"
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Experience & Skills *
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    rows="4"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className={`block w-full py-3 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none ${
                      errors.experience
                        ? "border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-600"
                        : darkMode
                        ? "border-gray-600 bg-gray-700 text-white"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                    placeholder="Describe your experience, skills, and any relevant background in device repair..."
                  />
                  {errors.experience && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.experience}
                    </p>
                  )}
                </div>

                {/* Certifications (Optional) */}
                <div>
                  <label
                    htmlFor="certifications"
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Certifications (Optional)
                  </label>
                  <textarea
                    id="certifications"
                    name="certifications"
                    rows="3"
                    value={formData.certifications}
                    onChange={handleInputChange}
                    className={`block w-full py-3 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none ${
                      darkMode
                        ? "border-gray-600 bg-gray-700 text-white"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                    placeholder="List any relevant certifications, training, or qualifications..."
                  />
                </div>
              </>
            )}

            {/* Password Requirements */}
            <div
              className={`rounded-lg p-4 transition-colors duration-300 ${
                darkMode ? "bg-blue-900/20" : "bg-blue-50"
              }`}
            >
              <h4
                className={`text-sm font-medium mb-2 transition-colors duration-300 ${
                  darkMode ? "text-blue-200" : "text-blue-800"
                }`}
              >
                Password Requirements:
              </h4>
              <ul
                className={`text-xs space-y-1 transition-colors duration-300 ${
                  darkMode ? "text-blue-300" : "text-blue-700"
                }`}
              >
                <li className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-2" />
                  At least 8 characters long
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-2" />
                  Contains uppercase letter
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-2" />
                  Contains lowercase letter
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-2" />
                  Contains at least one number
                </li>
              </ul>
            </div>

            {/* Terms Agreement */}
            <div>
              <div className="flex items-start">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                />
                <label
                  htmlFor="agreeTerms"
                  className={`ml-2 block text-sm transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.agreeTerms && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.agreeTerms}
                </p>
              )}
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
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Account
                </div>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p
              className={`text-sm transition-colors duration-300 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Already have an account?{" "}
              <button
                onClick={handleLoginRedirect}
                className="text-blue-600 hover:text-blue-500 font-medium transition duration-200"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p
            className={`text-sm transition-colors duration-300 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            By creating an account, you'll get access to order tracking, repair
            history, and exclusive offers.
          </p>
        </div>
      </div>
    </div>
  );
}
