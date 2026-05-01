'use client';
import { FormEvent, useState } from 'react';
import { fetchAPI, setToken } from '@/lib/api';
import './login.css'; // Let's use some specific css for auth if needed, or stick to globals

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // OAuth2 form data expects URL encoded payload
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const data = await fetchAPI('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });
      
      setToken(data.access_token);
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <h1 className="auth-title">Secure Login</h1>
        <p className="auth-subtitle">Verify your identity to continue</p>
        
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
            <label htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              className="input-field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
        <div className="auth-links">
          <span>Don't have an account? <a href="/register">Register here</a></span>
        </div>
      </div>
    </div>
  );
}
