import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "./Navbar.jsx";
import {
  Smartphone,
  Tv,
  Laptop,
  Wind,
  Wrench,
  ShieldCheck,
} from "lucide-react";

export default function Services() {
  const { darkMode } = useAuth();

  const services = [
    {
      icon: Smartphone,
      name: "Mobile Phone Repair",
      description:
        "Screen replacement, battery issues, charging problems, water damage recovery",
      features: [
        "Screen Repair",
        "Battery Replacement",
        "Water Damage",
        "Software Issues",
      ],
    },
    {
      icon: Tv,
      name: "TV Repair",
      description: "LED, LCD, OLED, Smart TV repairs and maintenance services",
      features: [
        "Display Issues",
        "Sound Problems",
        "Smart TV Setup",
        "Component Replacement",
      ],
    },
    {
      icon: Laptop,
      name: "Laptop & Computer Repair",
      description:
        "Hardware fixes, virus removal, data recovery, and performance optimization",
      features: [
        "Hardware Repair",
        "Virus Removal",
        "Data Recovery",
        "Performance Boost",
      ],
    },
    {
      icon: Wind,
      name: "Home Appliances",
      description:
        "Washing machines, refrigerators, microwaves, and other household appliances",
      features: [
        "Washing Machines",
        "Refrigerators",
        "Microwaves",
        "Small Appliances",
      ],
    },
    {
      icon: Wrench,
      name: "General Electronics",
      description:
        "Gaming consoles, audio systems, and other electronic devices",
      features: [
        "Gaming Consoles",
        "Audio Systems",
        "Cameras",
        "Other Electronics",
      ],
    },
    {
      icon: ShieldCheck,
      name: "Warranty & Maintenance",
      description:
        "Extended warranty services and regular maintenance packages",
      features: [
        "Extended Warranty",
        "Regular Checkups",
        "Preventive Care",
        "Priority Support",
      ],
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1
            className={`text-4xl font-bold mb-4 text-center transition-colors duration-300 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Our Services
          </h1>
          <p
            className={`text-lg text-center mb-12 transition-colors duration-300 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Professional repair services for all your electronic devices
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="flex items-center mb-4">
                  <service.icon className="h-8 w-8 text-blue-600 mr-3" />
                  <h3
                    className={`text-xl font-semibold transition-colors duration-300 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {service.name}
                  </h3>
                </div>

                <p
                  className={`mb-4 transition-colors duration-300 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className={`flex items-center text-sm transition-colors duration-300 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                    Get Quote
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div
              className={`rounded-lg p-8 transition-colors duration-300 ${
                darkMode ? "bg-blue-900/20" : "bg-blue-50"
              }`}
            >
              <h2
                className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Need Something Else?
              </h2>
              <p
                className={`mb-6 transition-colors duration-300 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Don't see your device or issue listed? Contact us for a custom
                solution.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
