import { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AddEvent() {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.role === 'admin') {
      setIsAdmin(true);
    } else {
      alert('Access denied. Admins only.');
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/events', eventData); // backend checks isAdmin
      alert('Event created successfully!');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create event');
    }
  };

  if (!isAdmin) return null;

  return (
    <div>
      <h2>Create New Event (Admin Only)</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={eventData.title}
          required
          onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={eventData.description}
          required
          onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
        />
        <input
          type="datetime-local"
          value={eventData.date}
          required
          onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={eventData.location}
          required
          onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzVlZmJmZGYwYjdiOTRjYmZkZmJlYiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MjU1OTYzNCwiZXhwIjoxNzUyNjQ2MDM0fQ.avO2DAWgqMy3AVcTyyL5PxDxzVoSxDN_lDZnlJJJ6_E