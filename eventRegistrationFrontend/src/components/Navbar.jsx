import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav>
      <Link to="/">Events</Link>
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
