import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://chat-app-production-5f7e.up.railway.app/api/auth/signup', { name, email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/chat');
    } catch (err) {
      setError('Signup failed. Try again!');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center' }}>Sign Up 📝</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <div style={{ marginBottom: '15px' }}>
          <input type="text" placeholder="Full Name" value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Sign Up
        </button>
        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Already have account? <span onClick={() => navigate('/')} style={{ color: '#4CAF50', cursor: 'pointer' }}>Login</span>
        </p>
      </form>
    </div>
  );
}

export default Signup;