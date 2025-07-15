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
    <nav className="bg-gray-900 text-yellow-600 px-6 py-4 flex items-center space-x-6">
      <Link to="/" className="hover:text-yellow-400 font-semibold">
        Home
      </Link>

      {user && isAdmin && (
        <>
          <Link to="/add-event" className="hover:text-yellow-400 font-semibold">
            Add Event
          </Link>
          <Link to="/manage-events" className="hover:text-yellow-400 font-semibold">
            Manage Events
          </Link>
        </>
      )}

      {user ? (
        <>
          <Link to="/my-registrations" className="hover:text-yellow-400 font-semibold">
            My Registrations
          </Link>
          <button
            onClick={logout}
            className="ml-4 bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-semibold py-1 px-4 rounded transition duration-200"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/signup" className="hover:text-yellow-400 font-semibold">
            Sign Up
          </Link>
          <Link to="/login" className="hover:text-yellow-400 font-semibold">
            Login
          </Link>
        </>
      )}
    </nav>
  );
}
