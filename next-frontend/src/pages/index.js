import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { RequestService } from "@/services/RequestService";
import React, { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const service = new RequestService();

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    date: "",
    budget: "",
    location: "",
    description: "",
    images: [],
    participants: "",
  });

  if (eventData) {
    return (
      <div className="container mx-auto py-6 px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-black">Beach Party Event</h1>
            <p className="text-gray-500">Annual summer celebration at Sunset Beach</p>
          </div>
          <div className="flex items-center gap-2">
            {/* <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full">In Progress</span>
            <button className="px-4 py-2 bg-black text-white rounded-md">Edit Event</button> */}
          </div>
        </div>
  
        {/* Event Details and Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Event Details */}
          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-black">Event Details</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <span className="text-gray-500">📅</span>
                <span className="text-black">July 15, 2025, 2:00 PM - 10:00 PM</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-500">📍</span>
                <span className="text-black">Sunset Beach, 123 Coastal Highway, Oceanside</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-500">👥</span>
                <span className="text-black">Expected Attendance: 250 (187 RSVPs)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-500">💰</span>
                <span className="text-black">Budget: $5,000 (Spent: $3,250)</span>
              </li>
            </ul>
          </div>
  
          {/* Event Progress */}
          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-black">Event Progress</h2>
            <p className="text-gray-500 mb-2 tran">75% of tasks completed</p>
            <div className="space-y-2">
              <div>
                <label className="text-gray-700">Overall Progress</label>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-black h-4 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <label className="text-gray-700">Todo Progress</label>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-black h-4 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div>
                <label className="text-gray-700">Purchasables Progress</label>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-black h-4 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* To-Do List */}
        <div className="p-6 bg-white shadow rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4 text-black">To-Do List</h2>
          {/* <p className="text-gray-500 mb-2">15 of 20 tasks completed</p> */}
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" />
              <span className="text-gray-500">Book venue and confirm reservation</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" />
              <span className="text-gray-500">Hire DJ and sound equipment</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" />
              <span className="text-gray-500">Order decorations and supplies</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" />
              <span className="text-gray-500">Confirm catering order and menu</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" />
              <span className="text-gray-500">Arrange transportation for equipment</span>
            </li>
          </ul>
        </div>
  
        {/* Purchasables List */}
        <div className="p-6 bg-white shadow rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4 text-black">Purchasables List</h2>
          <ul className="space-y-2">
            <li className="flex items-center justify-between">
              <div className="flex items-center justify-between gap-2">
                  <input type="checkbox" className="form-checkbox" />
              <span className="text-gray-500">Book venue and confirm reservation</span>
              </div>
              <span className="text-gray-500">$1500</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" />
              <span className="text-gray-500">Hire DJ and sound equipment</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" />
              <span className="text-gray-500">Order decorations and supplies</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" />
              <span className="text-gray-500">Confirm catering order and menu</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" />
              <span className="text-gray-500">Arrange transportation for equipment</span>
            </li>
          </ul>
        </div>
  
        {/* Footer */}
        <div className="flex justify-between items-center">
          <p className="text-gray-500">Time Remaining: 45 Days, 6 Hours</p>
          <div className="flex gap-4">
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Welcome to PlanIT</h1>
        <form className="space-y-4">
          {/* Date Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-500"
            />
          </div>

          {/* Budget Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Budget</label>
            <input
              type="number"
              placeholder="Enter your budget"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-500"
            />
          </div>

          {/* Location Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Location</label>
            <input
              type="text"
              placeholder="Enter the location"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-500"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              placeholder="Enter a description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-500"
              rows="4"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
