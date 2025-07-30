import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "./Navbar.jsx";

export default function About() {
  const { darkMode } = useAuth();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Navigation */}
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1
            className={`text-4xl font-bold mb-8 transition-colors duration-300 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            About Our Repair Service
          </h1>

          <div className="prose prose-lg">
            <p
              className={`mb-6 transition-colors duration-300 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              We are a professional repair service company with over 10 years of
              experience in fixing electronic devices. Our team of certified
              technicians specializes in mobile phones, laptops, tablets, and
              home appliances.
            </p>

            <h2
              className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Why Choose Us?
            </h2>

            <ul
              className={`list-disc list-inside space-y-2 mb-6 transition-colors duration-300 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <li>Expert technicians with years of experience</li>
              <li>Quick turnaround time</li>
              <li>Competitive pricing</li>
              <li>Warranty on all repairs</li>
              <li>Genuine parts and components</li>
            </ul>

            <h2
              className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Our Mission
            </h2>

            <p
              className={`transition-colors duration-300 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              To provide reliable, affordable, and high-quality repair services
              to keep your devices running smoothly and extend their lifespan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
