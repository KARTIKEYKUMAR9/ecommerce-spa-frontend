import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api.js';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/signup', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/listing');
    } catch (err) {
      setError(err.response?.data?.message || 'Error signing up');
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full py-2 bg-primary text-white rounded hover:bg-blue-800"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
