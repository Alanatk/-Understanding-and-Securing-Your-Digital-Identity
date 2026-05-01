'use client';
import { FormEvent, useState } from 'react';
import { fetchAPI } from '@/lib/api';
import '../login/login.css';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await fetchAPI('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
      });
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-container">
        <div className="card auth-card success-card">
          <h2>Registration Successful</h2>
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Establish your secure digital identity</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              id="username"
              type="text" 
              className="input-field" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              className="input-field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Master Password</label>
            <input 
              id="password"
              type="password" 
              className="input-field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            {/* Note: Password strength analyzer will be added here later */}
          </div>
          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? 'Creating Identity...' : 'Register'}
          </button>
        </form>
        <div className="auth-links">
          <span>Already have an account? <a href="/login">Login here</a></span>
        </div>
      </div>
    </div>
  );
}
