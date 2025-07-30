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
      description: "Display issues, sound problems, smart TV troubleshooting",
    },
    {
      icon: Laptop,
      name: "Laptop Repair",
      description:
        "Hardware fixes, software installation, performance optimization",
    },
    {
      icon: Wind,
      name: "AC Repair",
      description: "Cooling issues, maintenance, installation services",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "Amazing service! Fixed my laptop within 2 hours. Highly recommend!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Mike Chen",
      text: "Professional team, fair pricing, and excellent customer service.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      name: "Emily Davis",
      text: "They saved my phone data when I thought it was lost forever!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
  ];

  const whyChooseUs = [
    {
      icon: Clock,
      title: "Fast Service",
      description: "Most repairs completed within 24 hours",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "6-month warranty on all repair work",
    },
    {
      icon: Award,
      title: "Expert Technicians",
      description: "Certified professionals with 10+ years experience",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [services.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Navigation */}
      <Navbar />

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

      {/* Services Carousel */}
      <section className={`py-20 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Our Services
            </h2>
            <p
              className={`text-xl ${
                darkMode ? "text-gray-300" : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              Professional repair services for all your electronic devices
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {services.map((service, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div
                      className={`text-center p-8 rounded-lg ${
                        darkMode ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <service.icon
                        className={`w-16 h-16 mx-auto mb-4 ${
                          darkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      />
                      <h3
                        className={`text-2xl font-bold mb-4 ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {service.name}
                      </h3>
                      <p
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={() =>
                setCurrentSlide(
                  currentSlide === 0 ? services.length - 1 : currentSlide - 1
                )
              }
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-white hover:bg-gray-100"
              } p-2 rounded-full shadow-lg transition duration-200`}
            >
              <ChevronLeft
                className={`w-6 h-6 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              />
            </button>
            <button
              onClick={() =>
                setCurrentSlide(
                  currentSlide === services.length - 1 ? 0 : currentSlide + 1
                )
              }
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-white hover:bg-gray-100"
              } p-2 rounded-full shadow-lg transition duration-200`}
            >
              <ChevronRight
                className={`w-6 h-6 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition duration-200 ${
                    index === currentSlide
                      ? "bg-blue-600"
                      : darkMode
                      ? "bg-gray-600"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={`py-20 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Why Choose TechFix Pro?
            </h2>
            <p
              className={`text-xl ${
                darkMode ? "text-gray-300" : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              We're committed to providing the best repair experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className={`text-center p-8 rounded-lg ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg hover:shadow-xl transition duration-300`}
              >
                <item.icon
                  className={`w-12 h-12 mx-auto mb-4 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                />
                <h3
                  className={`text-xl font-bold mb-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-20 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              What Our Customers Say
            </h2>
            <p
              className={`text-xl ${
                darkMode ? "text-gray-300" : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              Don't just take our word for it - hear from satisfied customers
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentTestimonial * 100}%)`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div
                      className={`text-center p-8 rounded-lg ${
                        darkMode ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full mx-auto mb-4"
                      />
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <p
                        className={`text-lg mb-4 italic ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        "{testimonial.text}"
                      </p>
                      <h4
                        className={`font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {testimonial.name}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition duration-200 ${
                    index === currentTestimonial
                      ? "bg-blue-600"
                      : darkMode
                      ? "bg-gray-600"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Fix Your Device?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Get in touch with our expert technicians today for a free quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition duration-200 inline-flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Contact Us Now
            </Link>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-200 inline-flex items-center justify-center">
              <ExternalLink className="w-5 h-5 mr-2" />
              Get Free Quote
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`${
          darkMode ? "bg-gray-900" : "bg-gray-800"
        } text-white py-12`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">T</span>
                </div>
                <span className="text-xl font-bold">TechFix Pro</span>
              </div>
              <p className="text-gray-300 mb-4">
                Professional electronics repair services you can trust.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link to="/services" className="hover:text-white">
                    Mobile Repair
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white">
                    TV Repair
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white">
                    Laptop Repair
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white">
                    AC Repair
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link to="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>info@techfixpro.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>123 Tech Street, City, ST 12345</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TechFix Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
