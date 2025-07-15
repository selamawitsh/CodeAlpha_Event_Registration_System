
import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('Registered! Now log in.');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-md mx-auto bg-gray-900 p-6 rounded shadow-lg text-yellow-600"
    >
      <h2 className="text-2xl font-semibold mb-6 border-b border-yellow-600 pb-2 text-center">
        Sign Up
      </h2>
      <input
        placeholder="Name"
        required
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full mb-4 px-4 py-2 rounded bg-gray-800 border border-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-yellow-600"
      />
      <input
        placeholder="Email"
        type="email"
        required
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full mb-4 px-4 py-2 rounded bg-gray-800 border border-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-yellow-600"
      />
      <input
        placeholder="Password"
        type="password"
        required
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full mb-6 px-4 py-2 rounded bg-gray-800 border border-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-yellow-600"
      />
      <button
        type="submit"
        className="w-full bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-semibold py-2 rounded transition duration-200"
      >
        Sign Up
      </button>
    </form>
  );
}
