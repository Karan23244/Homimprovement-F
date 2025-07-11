// components/SubscriptionForm.jsx
"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export default function SubscriptionForm() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/api/subscribe`, formData);
      setMessage("🎉 Subscription successful!");
      setFormData({ name: "", email: "" });
    } catch (error) {
      setMessage("❌ Subscription failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full">
      {/* Left Side – Full Background Color with Image */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <img
          src="/subscribe.webp"
          alt="Inbox"
          className="w-full h-full object-cover rounded-l-2xl lg:rounded-none lg:rounded-l-2xl"
        />
      </div>

      {/* Right Side – Form */}
      <div className="w-full lg:w-1/2 bg-[#f0f4ff] flex flex-col justify-center items-center">
        <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl px-8 py-14">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">
            Craft the Home of Your Dreams. We'll Show You How.
          </h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Smart Home Improvement. Straight to Your Inbox.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your best email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />

            <p className="text-xs text-gray-500 text-center">
              Your journey to a better home starts here. subscribe anytime.
            </p>

            <button
              type="submit"
              className="hover:bg-indigo-700 text-black border hover:text-white font-semibold py-3 rounded-lg w-full transition duration-200 cursor-pointer">
              JOIN THE HOME IMPROVEMENT COMMUNITY!
            </button>
          </form>

          {message && (
            <p className="text-center text-sm text-gray-700 mt-4">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
