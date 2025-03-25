import React, { useState } from 'react';
import './App.css';
import { RequestService } from './services/RequestService';

function App() {
  const service = new RequestService();
  
  const [event, setEvent] = useState(false);
  const [eventData, setEventData] = useState(null);
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
      await service.postEvent();
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
      <div className="App">
        <header className="App-header">
          <h2>Event Details: {}</h2>
          <h3>Venue: {eventData.venue}</h3>
          <h3>Todos:</h3>
          <ul>
            {eventData.todos.map((todo, idx) => (
              <li key={idx}>{todo}</li>
            ))}
          </ul>
          <h3>Purchasables:</h3>
          <ul>
            {eventData.purchasables.map((item, idx) => (
              <li key={idx}>{item.item} - ${item.price}</li>
            ))}
          </ul>
        </header>
      </div>
    )
  }

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
