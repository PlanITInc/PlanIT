import React, { useState } from 'react';
import './App.css';
import { RequestService } from './services/RequestService';
import { CalendarDays, CheckCircle2, Clock, DollarSign, MapPin, ShoppingCart, Users } from 'lucide-react';


function App() {
  const service = new RequestService();
  
  const [event, setEvent] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    budget: '',
    location: '',
    description: '',
    images: [],
    numParticipants: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormFileChange = (e) => {
    setFormData({
      ...formData,
      images: Array.from(e.target.files)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitted form data with:", formData);
      setLoading(true);
      const post = await service.postEvent();
      console.log(post);
      const get = await service.getEvent();
      setLoading(false);
      setEvent(true);
      setEventData(get);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  if (event && eventData) {
    return (
      <div class="container mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Beach Party Event</h1>
          <p className="text-gray-500">Annual summer celebration at Sunset Beach</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full">In Progress</span>
          <button className="px-4 py-2 bg-black text-white rounded-md">Edit Event</button>
        </div>
      </div>

      {/* Event Details and Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Event Details */}
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-bold mb-4">Event Details</h2>
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <span className="text-gray-500">📅</span>
              <span>July 15, 2025, 2:00 PM - 10:00 PM</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-500">📍</span>
              <span>Sunset Beach, 123 Coastal Highway, Oceanside</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-500">👥</span>
              <span>Expected Attendance: 250 (187 RSVPs)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-500">💰</span>
              <span>Budget: $5,000 (Spent: $3,250)</span>
            </li>
          </ul>
        </div>

        {/* Event Progress */}
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-bold mb-4">Event Progress</h2>
          <p className="text-gray-500 mb-2">75% of tasks completed</p>
          <div className="space-y-2">
            <div>
              <label className="text-gray-700">Overall Progress</label>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-black h-4 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <label className="text-gray-700">Planning</label>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-black h-4 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <label className="text-gray-700">Logistics</label>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-black h-4 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <label className="text-gray-700">Marketing</label>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-black h-4 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
            <div>
              <label className="text-gray-700">Vendor Management</label>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-black h-4 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
          <button className="mt-4 px-4 py-2 bg-black text-white rounded-md">View Detailed Report</button>
        </div>
      </div>

      {/* To-Do List */}
      <div className="p-6 bg-white shadow rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-4">To-Do List</h2>
        <p className="text-gray-500 mb-2">15 of 20 tasks completed</p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <input type="checkbox" checked className="form-checkbox" />
            <span className="line-through text-gray-500">Book venue and confirm reservation</span>
          </li>
          <li className="flex items-center gap-2">
            <input type="checkbox" checked className="form-checkbox" />
            <span className="line-through text-gray-500">Hire DJ and sound equipment</span>
          </li>
          <li className="flex items-center gap-2">
            <input type="checkbox" checked className="form-checkbox" />
            <span className="line-through text-gray-500">Order decorations and supplies</span>
          </li>
          <li className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            <span>Confirm catering order and menu</span>
          </li>
          <li className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            <span>Arrange transportation for equipment</span>
          </li>
        </ul>
        <button className="mt-4 px-4 py-2 bg-black text-white rounded-md">View All Tasks</button>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <p className="text-gray-500">Time Remaining: 45 Days, 6 Hours</p>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-black text-white rounded-md">Mark Complete</button>
          <button className="px-4 py-2 bg-gray-200 text-black rounded-md">View Dashboard</button>
        </div>
      </div>
    </div>
    )
  }

  // if (event && eventData) {
  //   const todos = eventData.todos;

  //   const handleCheck = (event, index) => {
  //     const newCheckedItems = event.target.checked ? [...checkedItems, index] : checkedItems.filter((item) => item !== index);

  //     setCheckedItems(newCheckedItems);
  //   }
  
  //   const progressPercentage = (checkedItems.length / todos.length) * 100;

  //   return (
  //     <div className="event">
  //       <header className="event-header">
  //         <h1>{eventData.eventName} Event</h1>
  //         <div className="event-top">
  //           <div className="event-details">
  //             <h2>Event Details</h2>
  //             <div className="event-details-container">
  //               <p>Venue: {eventData.venue}</p>
  //               <p>Event Description: apsdjfpaosidjfpoaisjdfpoaisjdfpoaisjdfpoaisjdfpoaijsdfpoaijsdfpoiajsdfpoijasdfpoijasdpfoij</p>
  //             </div>
  //           </div>
  //           <div className="event-progress-info">
  //             <h2>Event Progress</h2>
  //             <div className="event-progress-container">
  //               <div className="event-progress-bar" style={{ width: `${progressPercentage}%` }}></div>
  //             </div>
  //             <p>{progressPercentage.toFixed(0)}%</p>
  //           </div>
  //         </div>
  //         <div className="event-bottom">
  //           <div className="event-bot">
  //             <div className="event-todos">
  //               <h2>To Do</h2>
  //               <div className="event-todo-list">
  //                 {
  //                   eventData.todos.map((todo, index) => (
  //                     <label key={index}>
  //                       <input
  //                         type="checkbox"
  //                         checked={checkedItems.includes(index)}
  //                         onChange={(event) => handleCheck(event, index)}
  //                       />
  //                       {todo}
  //                     </label>
  //                   ))
  //                 }
  //               </div>
  //             </div>
  //             <div className="event-purchasables">
  //               <h2>Purchased Items</h2>
  //             </div>
  //           </div>
  //         </div>
  //         {/* <h3>Todos:</h3>
  //         <ul>
  //           {eventData.todos.map((todo, idx) => (
  //             <li key={idx}>{todo}</li>
  //           ))}
  //         </ul>
  //         <h3>Purchasables:</h3>
  //         <ul>
  //           {eventData.purchasables.map((item, idx) => (
  //             <li key={idx}>{item.item} - ${item.price}</li>
  //           ))}
  //         </ul> */}
  //       </header>
  //     </div>
  //   )
  // }

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Please wait while we create an event plan...
          </p>
          <div className="spinner"></div>
        </header>
      </div>
    )
  }

  if (error) {
    return (
      <div className="App">
        <header className="App-header">
          <h2>An error has occurred:</h2>
          <h2>{error}</h2>
        </header>
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to PlanIT</h1>
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Date
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Budget
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Location
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Images
            <input
              type="file"
              name="images"
              multiple
              onChange={handleFormFileChange}
            />
          </label>
          <label>
            Number of Participants
            <input
              type="number"
              name="numParticipants"
              value={formData.numParticipants}
              onChange={handleFormChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
