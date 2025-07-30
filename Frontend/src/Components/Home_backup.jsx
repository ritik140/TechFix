import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "./Navbar.jsx";
import {
  Phone,
  Mail,
  MapPin,
  Star,
  Smartphone,
  Tv,
  Laptop,
  Wind,
  Clock,
  Shield,
  Award,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ExternalLink,
} from "lucide-react";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { user, isLoggedIn, logout, darkMode } = useAuth();

  const services = [
    {
      icon: Smartphone,
      name: "Mobile Repair",
      description: "Screen replacement, battery issues, software problems",
    },
    {
      icon: Tv,
      name: "TV Repair",
      description: "LED, LCD, Smart TV repairs and maintenance",
    },
    {
      icon: Laptop,
      name: "Laptop Repair",
      description: "Hardware fixes, virus removal, data recovery",
    },
    {
      icon: Wind,
      name: "AC Repair",
      description: "Installation, maintenance, and emergency repairs",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, NY",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      feedback:
        "Amazing service! They fixed my iPhone screen in just 2 hours. The quality is perfect and the price was very reasonable. Highly recommend TechFix Pro!",
    },
    {
      name: "Michael Chen",
      location: "Los Angeles, CA",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      feedback:
        "My laptop was completely dead, but these guys brought it back to life! Professional service and they explained everything clearly. Will definitely come back.",
    },
    {
      name: "Emily Rodriguez",
      location: "Chicago, IL",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      feedback:
        "Fast and reliable AC repair service. They came to my home the same day and fixed the issue quickly. Great customer service and fair pricing!",
    },
    {
      name: "David Wilson",
      location: "Houston, TX",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      feedback:
        "Excellent TV repair service! They diagnosed the problem quickly and had it fixed within a day. Very professional and knowledgeable technicians.",
    },
    {
      name: "Jessica Lee",
      location: "Miami, FL",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      feedback:
        "Outstanding service from start to finish. They repaired my phone and it works like new. The warranty they provide gives me peace of mind. Highly recommended!",
    },
  ];

  // Auto-slide functionality for services
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [services.length]);

  // Auto-slide functionality for testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserDropdown && !event.target.closest('.user-dropdown')) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const features = [
    {
      icon: Clock,
      title: "Quick Service",
      description: "Same day repair for most devices",
    },
    {
      icon: Shield,
      title: "Warranty",
      description: "90-day warranty on all repairs",
    },
    {
      icon: Award,
      title: "Expert Technicians",
      description: "Certified professionals with 10+ years experience",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className={`font-medium hover:text-blue-600 transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Home
              </Link>
              <Link
                to="/services"
                className={`font-medium hover:text-blue-600 transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Services
              </Link>
              <Link
                to="/about"
                className={`font-medium hover:text-blue-600 transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`font-medium hover:text-blue-600 transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Contact Info & Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <div className="flex items-center space-x-1 text-sm">
                <Phone className="h-4 w-4 text-blue-600" />
                <span
                  className={`transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  +1 (555) 123-4567
                </span>
              </div>

              {/* Conditional Auth Buttons */}
              {isLoggedIn ? (
                /* User Dropdown when logged in */
                <div className="relative user-dropdown">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                      darkMode
                        ? "text-gray-300 hover:text-blue-400 hover:bg-gray-700"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                    }`}
                  >
                    <User className="h-4 w-4" />
                    <span>{user?.name || 'User'}</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  
                  {showUserDropdown && (
                    <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 border ${
                      darkMode 
                        ? "bg-gray-800 border-gray-700" 
                        : "bg-white border-gray-200"
                    }`}>
                      <div className="py-1">
                        <div className={`px-4 py-2 text-sm border-b ${
                          darkMode 
                            ? "text-gray-300 border-gray-700" 
                            : "text-gray-700 border-gray-200"
                        }`}>
                          <div className="font-medium">{user?.name}</div>
                          <div className="text-xs opacity-75">{user?.email}</div>
                        </div>
                        
                        <button
                          onClick={() => {
                            logout();
                            setShowUserDropdown(false);
                          }}
                          className={`flex items-center w-full px-4 py-2 text-sm transition-colors duration-200 ${
                            darkMode
                              ? "text-gray-300 hover:bg-gray-700 hover:text-red-400"
                              : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
                          }`}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Login buttons when not logged in */
                <>
                  <Link
                    to="/login"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                      darkMode
                        ? "text-gray-300 hover:text-blue-400 hover:bg-gray-700"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                    }`}
                  >
                    <User className="h-4 w-4" />
                    <span>Login</span>
                  </Link>

                  <Link
                    to="/register"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                      darkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                    }`}
                  >
                    <UserCog className="h-4 w-4" />
                    <span>Register</span>
                  </Link>
                </>
              )}

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              {/* Get Quote Button */}
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium">
                Get Quote
              </button>
            </div>

            {/* Mobile menu button & controls */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Auth Buttons */}
              {isLoggedIn ? (
                <button
                  onClick={logout}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    darkMode
                      ? "text-gray-300 hover:text-red-400 hover:bg-gray-700"
                      : "text-gray-700 hover:text-red-600 hover:bg-gray-100"
                  }`}
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              ) : (
                <Link
                  to="/login"
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    darkMode
                      ? "text-gray-300 hover:text-blue-400 hover:bg-gray-700"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  }`}
                >
                  <User className="h-5 w-5" />
                </Link>
              )}

              <button
                className={`p-2 rounded-lg transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <UserCog className="h-5 w-5" />
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {darkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>

              {/* Hamburger Menu */}
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span
                    className={`block h-0.5 w-6 transition-all duration-300 ${
                      isMenuOpen ? "rotate-45 translate-y-1" : ""
                    } ${darkMode ? "bg-gray-300" : "bg-gray-600"}`}
                  ></span>
                  <span
                    className={`block h-0.5 w-6 mt-1 transition-all duration-300 ${
                      isMenuOpen ? "opacity-0" : ""
                    } ${darkMode ? "bg-gray-300" : "bg-gray-600"}`}
                  ></span>
                  <span
                    className={`block h-0.5 w-6 mt-1 transition-all duration-300 ${
                      isMenuOpen ? "-rotate-45 -translate-y-1" : ""
                    } ${darkMode ? "bg-gray-300" : "bg-gray-600"}`}
                  ></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <nav className="flex flex-col space-y-3">
                <Link
                  to="/"
                  className={`py-2 hover:text-blue-600 transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/services"
                  className={`py-2 hover:text-blue-600 transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  to="/about"
                  className={`py-2 hover:text-blue-600 transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className={`py-2 hover:text-blue-600 transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>

                {/* Mobile Auth Buttons */}
                <div className="pt-4 border-t border-gray-300 dark:border-gray-600">
                  <div className="flex flex-col space-y-2">
                    {isLoggedIn ? (
                      <>
                        <div className={`py-3 px-4 rounded-lg ${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}>
                          <div className={`text-sm font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}>
                            Welcome, {user?.name}!
                          </div>
                          <div className={`text-xs opacity-75 ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}>
                            {user?.email}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                          }}
                          className={`flex items-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                            darkMode
                              ? "text-gray-300 hover:text-red-400 hover:bg-gray-700"
                              : "text-gray-700 hover:text-red-600 hover:bg-gray-100"
                          }`}
                        >
                          <LogOut className="h-5 w-5" />
                          <span>Sign Out</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className={`flex items-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                            darkMode
                              ? "text-gray-300 hover:text-blue-400 hover:bg-gray-700"
                              : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <User className="h-5 w-5" />
                          <span>Sign In</span>
                        </Link>

                        <Link
                          to="/register"
                          className={`flex items-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                            darkMode
                              ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <UserCog className="h-5 w-5" />
                          <span>Create Account</span>
                        </Link>
                      </>
                    )}

                    <button className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium">
                      Get Quote
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          )}
      {/* Hero Section */}
      <section
        id="home"
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Electronics
              <span className="block text-yellow-400">Repair Service</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Fast, reliable repairs for all your electronic devices. Mobile,
              TV, Laptop, AC and more - fixed by certified experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition duration-200">
                Book Repair Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-200">
                Get Free Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className={`py-20 transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Our Services
            </h2>
            <p
              className={`text-xl max-w-2xl mx-auto transition-colors duration-300 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              We repair all major electronic devices with quality parts and
              expert craftsmanship
            </p>
          </div>

          {/* Services Slider */}
          <div className="relative max-w-4xl mx-auto">
            {/* Desktop Grid View */}
            <div className="hidden lg:grid grid-cols-4 gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={index}
                    className={`p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 hover:shadow-blue-500/10"
                        : "bg-white border-gray-100"
                    }`}
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                        darkMode ? "bg-blue-900" : "bg-blue-100"
                      }`}
                    >
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3
                      className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {service.name}
                    </h3>
                    <p
                      className={`transition-colors duration-300 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Mobile/Tablet Slider */}
            <div className="lg:hidden">
              <div className="overflow-hidden rounded-xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {services.map((service, index) => {
                    const IconComponent = service.icon;
                    return (
                      <div key={index} className="w-full flex-shrink-0 px-4">
                        <div
                          className={`p-8 rounded-xl text-center shadow-lg border mx-2 transition-colors duration-300 ${
                            darkMode
                              ? "bg-gray-700 border-gray-600"
                              : "bg-white border-gray-100"
                          }`}
                        >
                          <div
                            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                              darkMode ? "bg-blue-900" : "bg-blue-100"
                            }`}
                          >
                            <IconComponent className="h-10 w-10 text-blue-600" />
                          </div>
                          <h3
                            className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                              darkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {service.name}
                          </h3>
                          <p
                            className={`text-lg transition-colors duration-300 ${
                              darkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {service.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center justify-center mt-6 space-x-4">
                <button
                  onClick={prevSlide}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-200"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Dots Indicators */}
                <div className="flex space-x-2">
                  {services.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition duration-200 ${
                        currentSlide === index
                          ? "bg-blue-600"
                          : darkMode
                          ? "bg-gray-600"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-200"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className={`py-20 transition-colors duration-300 ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Why Choose TechFix Pro?
            </h2>
            <p
              className={`text-xl transition-colors duration-300 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Trusted by thousands of satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center p-6">
                  <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3
                    className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`transition-colors duration-300 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className={`py-20 transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              What Our Customers Say
            </h2>
            <p
              className={`text-xl transition-colors duration-300 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Don't just take our word for it - hear from our satisfied
              customers
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Desktop View - Show 3 testimonials */}
            <div className="hidden lg:grid grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl text-center transition-all duration-300 ${
                    darkMode
                      ? "bg-gray-700 shadow-lg hover:shadow-blue-500/10"
                      : "bg-gray-50 shadow-lg hover:shadow-xl"
                  } hover:-translate-y-1`}
                >
                  <div className="mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
                    />
                    <div className="flex justify-center mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <p
                    className={`text-lg mb-6 italic transition-colors duration-300 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    "{testimonial.feedback}"
                  </p>
                  <div>
                    <h4
                      className={`font-semibold text-lg transition-colors duration-300 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {testimonial.name}
                    </h4>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile/Tablet Slider */}
            <div className="lg:hidden">
              <div className="overflow-hidden rounded-xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentTestimonial * 100}%)`,
                  }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <div
                        className={`p-8 rounded-xl text-center transition-colors duration-300 ${
                          darkMode
                            ? "bg-gray-700 shadow-lg"
                            : "bg-gray-50 shadow-lg"
                        } mx-2`}
                      >
                        <div className="mb-6">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
                          />
                          <div className="flex justify-center mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-6 w-6 text-yellow-400 fill-current"
                              />
                            ))}
                          </div>
                        </div>
                        <p
                          className={`text-lg mb-6 italic leading-relaxed transition-colors duration-300 ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          "{testimonial.feedback}"
                        </p>
                        <div>
                          <h4
                            className={`font-semibold text-xl mb-1 transition-colors duration-300 ${
                              darkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {testimonial.name}
                          </h4>
                          <p
                            className={`transition-colors duration-300 ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial Slider Controls */}
              <div className="flex items-center justify-center mt-8 space-x-4">
                <button
                  onClick={prevTestimonial}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-200"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Dots Indicators */}
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition duration-200 ${
                        currentTestimonial === index
                          ? "bg-blue-600"
                          : darkMode
                          ? "bg-gray-600"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-200"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">5000+</div>
              <div className="text-blue-200">Devices Repaired</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-200">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24hr</div>
              <div className="text-blue-200">Average Turnaround</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">4.9★</div>
              <div className="text-blue-200">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`py-20 transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Ready to Fix Your Device?
          </h2>
          <p
            className={`text-xl mb-8 transition-colors duration-300 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Get a free diagnosis and quote today. No hidden fees, transparent
            pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-200">
              Schedule Repair
            </button>
            <button
              className={`border-2 border-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition duration-200 ${
                darkMode
                  ? "text-blue-400 hover:bg-blue-600 hover:text-white"
                  : "text-blue-600 hover:bg-blue-600 hover:text-white"
              }`}
            >
              Call Now: (555) 123-4567
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-16 transition-colors duration-300 ${
          darkMode ? "bg-gray-900 border-t border-gray-800" : "bg-gray-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Wrench className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold text-white">
                  TechFix Pro
                </span>
              </div>
              <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                Your trusted partner for professional electronics repair
                services. We fix what others can't with certified technicians
                and quality parts.
              </p>

              {/* Social Media */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-gray-800 p-3 rounded-lg hover:bg-blue-600 transition duration-300 group"
                  >
                    <Facebook className="h-5 w-5 text-gray-400 group-hover:text-white" />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-800 p-3 rounded-lg hover:bg-blue-400 transition duration-300 group"
                  >
                    <Twitter className="h-5 w-5 text-gray-400 group-hover:text-white" />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-800 p-3 rounded-lg hover:bg-pink-600 transition duration-300 group"
                  >
                    <Instagram className="h-5 w-5 text-gray-400 group-hover:text-white" />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-800 p-3 rounded-lg hover:bg-red-600 transition duration-300 group"
                  >
                    <Youtube className="h-5 w-5 text-gray-400 group-hover:text-white" />
                  </a>
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <h4 className="text-white font-semibold mb-3">Stay Updated</h4>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 transition duration-200"
                  />
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#home"
                    className="text-gray-400 hover:text-blue-400 transition duration-200 flex items-center group"
                  >
                    <span>Home</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition duration-200" />
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-blue-400 transition duration-200 flex items-center group"
                  >
                    <span>Our Services</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition duration-200" />
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-blue-400 transition duration-200 flex items-center group"
                  >
                    <span>About Us</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition duration-200" />
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-400 hover:text-blue-400 transition duration-200 flex items-center group"
                  >
                    <span>Contact</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition duration-200" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition duration-200 flex items-center group"
                  >
                    <span>Book Repair</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition duration-200" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition duration-200 flex items-center group"
                  >
                    <span>Get Quote</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition duration-200" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Our Services
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition duration-200 flex items-center"
                  >
                    <Smartphone className="h-4 w-4 mr-2 text-blue-400" />
                    Mobile Repair
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition duration-200 flex items-center"
                  >
                    <Tv className="h-4 w-4 mr-2 text-blue-400" />
                    TV Repair
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition duration-200 flex items-center"
                  >
                    <Laptop className="h-4 w-4 mr-2 text-blue-400" />
                    Laptop Repair
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition duration-200 flex items-center"
                  >
                    <Wind className="h-4 w-4 mr-2 text-blue-400" />
                    AC Repair
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition duration-200"
                  >
                    Data Recovery
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition duration-200"
                  >
                    Screen Replacement
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition duration-200"
                  >
                    Battery Replacement
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Contact Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400">123 Tech Street</p>
                    <p className="text-gray-400">City, ST 12345</p>
                    <p className="text-gray-400">United States</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <div>
                    <a
                      href="tel:+15551234567"
                      className="text-gray-400 hover:text-blue-400 transition duration-200"
                    >
                      +1 (555) 123-4567
                    </a>
                    <p className="text-sm text-gray-500">24/7 Emergency</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <div>
                    <a
                      href="mailto:info@techfixpro.com"
                      className="text-gray-400 hover:text-blue-400 transition duration-200"
                    >
                      info@techfixpro.com
                    </a>
                    <p className="text-sm text-gray-500">Quick Response</p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-6">
                <h4 className="text-white font-semibold mb-3">
                  Business Hours
                </h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mon - Fri:</span>
                    <span className="text-gray-300">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Saturday:</span>
                    <span className="text-gray-300">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sunday:</span>
                    <span className="text-gray-300">10:00 AM - 4:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="flex flex-wrap justify-center items-center gap-8 text-center">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-green-400" />
                <span className="text-gray-400">Licensed & Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-yellow-400" />
                <span className="text-gray-400">Certified Technicians</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-6 w-6 text-blue-400" />
                <span className="text-gray-400">Same Day Service</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-6 w-6 text-yellow-400 fill-current" />
                <span className="text-gray-400">4.9/5 Customer Rating</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-center md:text-left">
                <p>&copy; 2025 TechFix Pro. All rights reserved.</p>
                <p className="text-sm mt-1">
                  Professional Electronics Repair Services
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition duration-200"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition duration-200"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition duration-200"
                >
                  Warranty
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition duration-200"
                >
                  Sitemap
                </a>
              </div>

              <div className="text-gray-400 text-center md:text-right">
                <p className="text-sm">Need Help?</p>
                <a
                  href="tel:+15551234567"
                  className="text-blue-400 hover:text-blue-300 transition duration-200 font-semibold"
                >
                  Call (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
