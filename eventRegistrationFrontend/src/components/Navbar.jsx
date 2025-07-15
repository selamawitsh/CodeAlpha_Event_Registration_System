import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav>
      <Link to="/">Home</Link>

      {user && isAdmin && (
        <>
          <Link to="/add-event">Add Event</Link>
          <Link to="/manage-events">Manage Events</Link>
        </>
      )}

      {user ? (
        <>
          <Link to="/my-registrations">My Registrations</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
}
