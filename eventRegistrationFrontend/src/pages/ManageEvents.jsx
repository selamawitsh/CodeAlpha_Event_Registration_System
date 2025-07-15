import { useEffect, useState } from 'react';
import API from '../services/api';

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setIsAdmin(user?.role === 'admin');
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get('/events');
      setEvents(res.data);
    } catch (error) {
      alert('Failed to load events');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await API.delete(`/events/${id}`);
      alert('Event deleted!');
      fetchEvents();
    } catch (error) {
      alert(error.response?.data?.message || 'Delete failed');
    }
  };

  // For update you can create a separate update form/page or inline editing.

  if (!isAdmin) {
    return <p>Access denied. Admins only.</p>;
  }

  return (
    <div>
      <h2>Manage Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {events.map((ev) => (
            <li key={ev._id}>
              <h3>{ev.title}</h3>
              <p>{ev.description}</p>
              <p>{new Date(ev.date).toLocaleString()}</p>
              <p>{ev.location}</p>
              <button onClick={() => handleDelete(ev._id)}>Delete</button>
              {/* You can add an Edit button here */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
