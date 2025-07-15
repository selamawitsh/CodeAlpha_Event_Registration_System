import { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get('/events').then((res) => setEvents(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold text-yellow-600 mb-6 text-center">Upcoming Events</h2>
      
      <ul className="space-y-6 max-w-3xl mx-auto">
        {events.map((event) => (
          <li
            key={event._id}
            className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
          >
            <h3 className="text-xl font-semibold text-yellow-500">{event.title}</h3>
            <p className="mt-1 text-gray-300">{event.description}</p>
            <p className="mt-1 text-sm text-gray-400">
              📅 {new Date(event.date).toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">📍 {event.location}</p>
            <div className="mt-3">
              <RegisterButton eventId={event._id} />
            </div>
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
        userId: user.id,
      });
      alert('Registered successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error occurred');
    }
  };

  return user ? (
    <button
      onClick={handleRegister}
      className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-4 py-2 rounded transition duration-200"
    >
      Register
    </button>
  ) : (
    <Link
      to="/login"
      className="text-yellow-500 underline hover:text-yellow-400"
    >
      Login to register
    </Link>
  );
}
// import { useEffect, useState } from 'react';
// import API from '../services/api';
// import { Link } from 'react-router-dom';

// export default function Home() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     API.get('/events').then((res) => setEvents(res.data));
//   }, []);

//   return (
//     <div>
//       <h2>Upcoming Events</h2>
//       <ul>
//         {events.map((event) => (
//           <li key={event._id}>
//             <h3>{event.title}</h3>
//             <p>{event.description}</p>
//             <p>{new Date(event.date).toLocaleString()}</p>
//             <p>{event.location}</p>
//             <RegisterButton eventId={event._id} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function RegisterButton({ eventId }) {
//   const user = JSON.parse(localStorage.getItem('user'));

//   const handleRegister = async () => {
//     try {
//       await API.post('/registrations/register', {
//       eventId,
//       userId: user.id
//     });
//       alert('Registered successfully!');
//     } catch (err) {
//       alert(err.response.data.message);
//     }
//   };

//   return user ? (
//     <button onClick={handleRegister}>Register</button>
//   ) : (
//     <Link to="/login">Login to register</Link>
//   );
// }
