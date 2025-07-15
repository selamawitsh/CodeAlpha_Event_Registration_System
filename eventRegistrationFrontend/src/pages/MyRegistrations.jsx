import { useEffect, useState } from 'react';
import API from '../services/api';

export default function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRegistrations = async () => {
    try {
      const res = await API.get('/registrations/my-registrations');
      setRegistrations(res.data);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Failed to load registrations');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (registrationId) => {
    if (!window.confirm('Are you sure you want to cancel this registration?')) return;
    try {
      await API.delete(`/registrations/cancel/${registrationId}`);
      alert('Registration cancelled');
      fetchRegistrations();
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to cancel registration');
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  if (loading)
    return (
      <p className="text-yellow-400 text-center mt-10">Loading...</p>
    );

  if (registrations.length === 0)
    return (
      <p className="text-yellow-400 text-center mt-10">No registrations found.</p>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold text-yellow-600 mb-6 text-center">
        My Event Registrations
      </h2>
      <ul className="space-y-6 max-w-3xl mx-auto">
        {registrations.map((reg) => {
          if (!reg.event) {
            return (
              <li
                key={reg._id}
                className="bg-yellow-100 text-yellow-900 p-4 rounded-lg shadow border border-yellow-700"
              >
                <p className="italic">
                  Event details not available (event may have been deleted)
                </p>
                <button
                  onClick={() => handleCancel(reg._id)}
                  className="mt-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-4 py-2 rounded transition duration-200"
                >
                  Cancel Registration
                </button>
              </li>
            );
          }

          return (
            <li
              key={reg._id}
              className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-yellow-500">
                {reg.event.title}
              </h3>
              <p className="mt-1 text-gray-300">{reg.event.description}</p>
              <p className="mt-1 text-sm text-gray-400">
                📅 {new Date(reg.event.date).toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">📍 {reg.event.location}</p>
              <button
                onClick={() => handleCancel(reg._id)}
                className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-4 py-2 rounded transition duration-200"
              >
                Cancel Registration
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
