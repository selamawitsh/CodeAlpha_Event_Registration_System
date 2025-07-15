import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await API.post('/auth/login', form);
    localStorage.setItem('user', JSON.stringify(res.data));
    navigate('/');
  };

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button>Login</button>
    </form>
  );
}
