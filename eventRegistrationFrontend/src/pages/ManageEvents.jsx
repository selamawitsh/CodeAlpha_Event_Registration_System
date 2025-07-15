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

  if (!isAdmin) {
    return (
      <p className="text-center text-yellow-500 mt-10 font-semibold">
        Access denied. Admins only.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold text-yellow-600 mb-6 text-center">Manage Events</h2>

      {events.length === 0 ? (
        <p className="text-center text-yellow-400">No events found.</p>
      ) : (
        <ul className="space-y-6 max-w-3xl mx-auto">
          {events.map((ev) => (
            <li
              key={ev._id}
              className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-yellow-500">{ev.title}</h3>
              <p className="mt-1 text-gray-300">{ev.description}</p>
              <p className="mt-1 text-sm text-gray-400">
                📅 {new Date(ev.date).toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">📍 {ev.location}</p>
              <button
                onClick={() => handleDelete(ev._id)}
                className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-4 py-2 rounded transition duration-200"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
