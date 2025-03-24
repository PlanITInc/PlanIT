import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
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
    } catch (err) {
      setError(err);
    }
  };

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }

  if (error) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Error: {error}</h1>
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
