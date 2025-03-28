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

  const [checkedTodos, setCheckedTodos] = useState([]);
  const [checkedPurchasables, setCheckedPurchasables] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    date: "",
    budget: "",
    location: "",
    description: "",
    participants: "",
  });
  const [inspirationImages, setInspirationImages] = useState([]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setInspirationImages(selectedFiles);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      formDataObj.append("eventDetails", JSON.stringify(formData));
      inspirationImages.forEach((image) => {
        formDataObj.append("inspirationImages", image);
      });

      setLoading(true);

      const postResponse = await service.postEvent(formDataObj);
      console.log(postResponse);

      const getResponse = await service.getEvent(postResponse);
      console.log(getResponse);

      setLoading(false);

      setEventData(getResponse);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  if (eventData) {
    const todos = eventData.todos;
    const purchasables = eventData.purchasables;

    const handleCheckTodos = (event, index) => {
      const newCheckedTodos = event.target.checked ? [...checkedTodos, index] : checkedTodos.filter((item) => item !== index);
      setCheckedTodos(newCheckedTodos);
    }

    const handleCheckPurchasables = (event, index) => {
      const purchasable = eventData.purchasables[index];
      const isChecked = event.target.checked;

      if (isChecked) {
        setTotalSpent((prevTotal) => prevTotal + purchasable.price);
        setCheckedPurchasables([...checkedPurchasables, index]);
      } else {
        setTotalSpent((prevTotal) => prevTotal - purchasable.price);
        setCheckedPurchasables(checkedPurchasables.filter((item) => item !== index));
      }
    }

    const todoProgressPercentage = (checkedTodos.length / todos.length) * 100;
    const purchasablesProgressPercentage = (checkedPurchasables.length / purchasables.length) * 100;
    const totalProgressPercentage = ((checkedTodos.length + checkedPurchasables.length) / (todos.length + purchasables.length)) * 100;

    return (
      <div className="container mx-auto py-6 px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-black">{eventData.eventName} Event</h1>
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
                <span className="text-black">{eventData.date}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-500">📍</span>
                <span className="text-black">{eventData.venue}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-500">👥</span>
                <span className="text-black">Expected Attendance: {eventData.participants}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-500">💰</span>
                <span className="text-black">Budget: ${eventData.budget} (Spent: ${totalSpent.toFixed(1)})</span>
              </li>
            </ul>
          </div>
  
          {/* Event Progress */}
          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-black">Event Progress</h2>
            <p className="text-gray-500 mb-2 tran">{totalProgressPercentage.toFixed(0)}% of tasks completed</p>
            <div className="space-y-2">
              <div>
                <label className="text-gray-700">Overall Progress</label>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-black h-4 rounded-full" style={{ width: `${totalProgressPercentage}%` }}></div>
                </div>
              </div>
              <div>
                <label className="text-gray-700">Todo Progress</label>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-black h-4 rounded-full" style={{ width: `${todoProgressPercentage}%` }}></div>
                </div>
              </div>
              <div>
                <label className="text-gray-700">Purchasables Progress</label>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-black h-4 rounded-full" style={{ width: `${purchasablesProgressPercentage}%` }}></div>
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
            {eventData.todos.map((todo, index) => (
              <li className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={checkedTodos.includes(index)} 
                  onChange={(event) => handleCheckTodos(event, index)} 
                  className="form-checkbox" 
                />
                <span className="text-gray-500">{todo}</span>
              </li>
            ))}
          </ul>
        </div>
  
        {/* Purchasables List */}
        <div className="p-6 bg-white shadow rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4 text-black">Purchasables List</h2>
          <ul className="space-y-2">
            {eventData.purchasables.map((purchasable, index) => (
              <li className="flex items-center justify-between">
                <div className="flex items-center justify-between gap-2">
                  <input 
                    type="checkbox" 
                    checked={checkedPurchasables.includes(index)}
                    onChange={(event) => handleCheckPurchasables(event, index)}
                    className="form-checkbox" 
                  />
                  <span className="text-gray-500">{purchasable.item}</span>
                </div>
                <span className="text-gray-500">${purchasable.price.toFixed(1)}</span>
              </li>
            ))}
          </ul>
        </div>
  
        {/* Footer */}
        {/* <div className="flex justify-between items-center">
          <p className="text-gray-500">Time Remaining: 45 Days, 6 Hours</p>
          <div className="flex gap-4">
          </div>
        </div> */}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-evenly min-h-screen">
        <div className="text-3xl font-bold text-center mb-6 text-black pb-10">PlanIT</div>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-500">Please wait while we process your request...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">An error has occurred</h1>
        <h2 className="text-1xl font-bold text-center mb-6 text-gray-500">{error}</h2>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Welcome to PlanIT</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Date Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-500"
              name="date"
              value={formData.date}
              onChange={handleFormChange}
            />
          </div>

          {/* Budget Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Budget</label>
            <input
              type="number"
              placeholder="Enter your budget"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-500"
              name="budget"
              value={formData.budget}
              onChange={handleFormChange}
            />
          </div>

          {/* Location Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Location</label>
            <input
              type="text"
              placeholder="Enter the location"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-500"
              name="location"
              value={formData.location}
              onChange={handleFormChange}
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              placeholder="Enter a description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-500"
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
            ></textarea>
          </div>

          {/* Participants Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Participants</label>
            <input
              type="number"
              placeholder="Enter the number of participants"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-500"
              name="participants"
              value={formData.participants}
              onChange={handleFormChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Images (Optional)</label>
            <input
              type="file"
              multiple
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-500"
              name="images"
              onChange={handleImageChange}
            />
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
