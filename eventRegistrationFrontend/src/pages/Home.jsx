import { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get('/events').then((res) => setEvents(res.data));
  }, []);

  return (
    <div>
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleString()}</p>
            <p>{event.location}</p>
            <RegisterButton eventId={event._id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function RegisterButton({ eventId }) {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleRegister = async () => {
    try {
      await API.post('/registrations/register', {
      eventId,
      userId: user.id
    });
      alert('Registered successfully!');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return user ? (
    <button onClick={handleRegister}>Register</button>
  ) : (
    <Link to="/login">Login to register</Link>
  );
}
