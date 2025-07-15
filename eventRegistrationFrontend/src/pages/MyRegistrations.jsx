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

  if (loading) return <p>Loading...</p>;

  if (registrations.length === 0) {
    return <p>No registrations found.</p>;
  }

  return (
    <div>
      <h2>My Event Registrations</h2>
      <ul>
        {registrations.map((reg) => (
          <li key={reg._id}>
            <h3>{reg.event.title}</h3>
            <p>{reg.event.description}</p>
            <p>Date: {new Date(reg.event.date).toLocaleString()}</p>
            <p>Location: {reg.event.location}</p>
            <button onClick={() => handleCancel(reg._id)}>Cancel Registration</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
