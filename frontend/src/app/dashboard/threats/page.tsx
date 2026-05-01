'use client';
import { useState } from 'react';
import './threats.css';

const threatsData = [
  {
    id: 'phishing',
    title: 'Phishing & Social Engineering',
    icon: '🎣',
    description: 'Attackers trick you into revealing sensitive information by pretending to be a trustworthy entity.',
    example: 'An email claiming your bank account is locked, with a link to a fake login page.',
    prevention: ['Verify the sender\'s email address.', 'Don\'t click suspicious links; type the URL directly.', 'Look out for urgent or threatening language.']
  },
  {
    id: 'stuffing',
    title: 'Credential Stuffing',
    icon: '🔑',
    description: 'Hackers use compromised password lists from one breach to attempt logging into other completely unrelated services.',
    example: 'Your password from a gaming forum breach is used to log into your Netflix or bank account.',
    prevention: ['Never reuse passwords across different sites.', 'Use a password manager to generate unique passwords.', 'Enable MFA everywhere.']
  },
  {
    id: 'identity_theft',
    title: 'Identity Theft',
    icon: '👤',
    description: 'When someone uses your personal data (SSN, DOB, Address) to commit fraud or crimes in your name.',
    example: 'An attacker uses your stolen information to open a credit card account.',
    prevention: ['Freeze your credit if not actively seeking a loan.', 'Shred physical documents with PII.', 'Limit the personal info you share on social media.']
  }
];

export default function ThreatAwarenessPage() {
  const [activeThreat, setActiveThreat] = useState(threatsData[0].id);
  const currentThreat = threatsData.find(t => t.id === activeThreat);

  return (
    <div className="threats-container">
      <div className="threats-header">
        <h1>Threat Awareness & Recommendations</h1>
        <p className="subtitle">Understand how attackers operate and how to defend yourself.</p>
      </div>

      <div className="threats-layout">
        <div className="threats-sidebar">
          {threatsData.map(threat => (
            <button
              key={threat.id}
              className={`threat-nav-btn ${activeThreat === threat.id ? 'active' : ''}`}
              onClick={() => setActiveThreat(threat.id)}
            >
              <span className="threat-icon">{threat.icon}</span>
              {threat.title}
            </button>
          ))}
        </div>

        <div className="threats-content">
          {currentThreat && (
            <div className="card threat-detail-card">
              <div className="detail-header">
                <span className="big-icon">{currentThreat.icon}</span>
                <h2>{currentThreat.title}</h2>
              </div>
              
              <div className="detail-section">
                <h3>What is it?</h3>
                <p>{currentThreat.description}</p>
              </div>

              <div className="detail-section highlight-box">
                <h3>Real-World Example</h3>
                <p><i>"{currentThreat.example}"</i></p>
              </div>

              <div className="detail-section">
                <h3>How to Prevent It</h3>
                <ul className="prevention-list">
                  {currentThreat.prevention.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="card engine-card mt-4">
        <div className="engine-header">
          <h3>🤖 Security Recommendations Engine</h3>
          <span className="badge badge-ai">Mock AI</span>
        </div>
        <p className="mb-2">Based on your activity and standard best practices, our engine recommends:</p>
        <ul className="rec-engine-list">
          <li><strong>High Priority:</strong> Set up a Password Manager to handle 100% unique passwords.</li>
          <li><strong>Medium Priority:</strong> Opt-out of data brokers (like Spokeo, Whitepages) to clean up your Digital Footprint.</li>
          <li><strong>Periodic:</strong> Review your connected third-party app permissions every 3 months.</li>
        </ul>
      </div>
    </div>
  );
}
