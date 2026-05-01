'use client';
import { useEffect, useState } from 'react';
import { fetchAPI, logout } from '@/lib/api';
import './dashboard.css';

interface User {
  username: string;
  email: string;
  created_at: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchAPI('/auth/me');
        setUser(data);
      } catch (err) {
        // If unauthenticated, the fetchAPI already handles redirect, but we can have fallback logic here.
        console.error('Failed to fetch user', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading your identity data...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {user.username}</h1>
          <p className="subtitle">Digital Identity Overview</p>
        </div>
        <button onClick={logout} className="btn-secondary outline-btn">Logout</button>
      </div>

      <div className="dashboard-grid">
        <div className="card identity-card">
          <h3>Core Identity Info</h3>
          <ul className="identity-list">
            <li><strong>Email:</strong> {user.email} <span className="badge badge-verified">Verified</span></li>
            <li><strong>Username:</strong> {user.username}</li>
            <li><strong>Account Created:</strong> {new Date().toLocaleDateString()}</li>
          </ul>
        </div>

        <div className="card linked-card">
          <h3>Linked Accounts (Simulation)</h3>
          <ul className="linked-list">
            <li className="linked-item">
              <span className="platform">Google</span>
              <button className="btn-small connect-btn">Connect</button>
            </li>
            <li className="linked-item">
              <span className="platform">Facebook</span>
              <button className="btn-small connect-btn">Connect</button>
            </li>
            <li className="linked-item">
              <span className="platform">LinkedIn</span>
              <button className="btn-small connect-btn">Connect</button>
            </li>
            <li className="linked-item connected">
              <span className="platform">Phone Number</span>
              <span className="status">***-***-1234</span>
            </li>
          </ul>
        </div>

        <div className="card alert-card">
          <h3>Security Status</h3>
          <div className="status-indicator warning">
            <div className="status-circle"></div>
            <span>Needs Attention</span>
          </div>
          <p className="status-desc">Your password strength has not been analyzed yet. We recommend reviewing your MFA settings.</p>
          <a href="/dashboard/password-analyzer" className="btn-primary mt-3 inline-block text-center w-full">Analyze Password</a>
        </div>
      </div>
    </div>
  );
}
