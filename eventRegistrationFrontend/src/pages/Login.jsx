import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      // res.data should include token and role
      localStorage.setItem('user', JSON.stringify(res.data));
      alert('Login successful');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-yellow-600 mb-6 text-center">
          Login
        </h2>
        <input
          placeholder="Email"
          type="email"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mb-4 p-3 rounded border border-gray-700 bg-gray-900 text-white placeholder-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full mb-6 p-3 rounded border border-gray-700 bg-gray-900 text-white placeholder-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
        />
        <button
          type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
