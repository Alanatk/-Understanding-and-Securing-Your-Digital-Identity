import './landing.css';



export default function Home() {
  return (
    <div className="landing-container">
      <section className="hero-section text-center">
        <h1 className="hero-title">Protect Your Digital Life</h1>
        <p className="hero-subtitle">
          Understand your digital footprint, analyze your habits, and secure your online identity against modern threats.
        </p>
        <div className="hero-actions">
          <a href="/register" className="btn-primary hero-btn">Get Started</a>
          <a href="/login" className="btn-secondary hero-btn outline-btn">Login to Dashboard</a>
        </div>
      </section>

      <section className="features-grid">
        <div className="card feature-card fade-in">
          <div className="feature-icon">🛡️</div>
          <h3>Password Strength</h3>
          <p>Analyze the entropy of your passwords and get real-time feedback on potential vulnerabilities.</p>
        </div>
        <div className="card feature-card fade-in">
          <div className="feature-icon">👤</div>
          <h3>Digital Footprint</h3>
          <p>Discover what information is publicly available about you across the web.</p>
        </div>
        <div className="card feature-card fade-in">
          <div className="feature-icon">🔒</div>
          <h3>MFA & Privacy</h3>
          <p>Learn how to configure robust privacy settings and multi-factor authentication on top platforms.</p>
        </div>
      </section>
    </div>
  );
}
