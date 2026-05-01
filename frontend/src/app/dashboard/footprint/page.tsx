'use client';
import { FormEvent, useState } from 'react';
import { fetchAPI } from '@/lib/api';
import './footprint.css';

interface Breach {
  source: string;
  data_compromised: string[];
  date: string;
}

interface ScanResult {
  email_scanned: string;
  breaches_found: number;
  breach_details: Breach[];
  risk_level: string;
  recommendations: string[];
}

export default function FootprintScannerPage() {
  const [emailToScan, setEmailToScan] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleScan = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      // Use URLSearchParams for simple query param passing or adjust fetchAPI slightly.
      // Since it's a POST, we could send json, but the backend expects `email` as a query param in this FastAPI definition
      // Wait, in FastAPI, `email: str` without Pydantic model is a query parameter!
      const data = await fetchAPI(`/auth/scan-footprint?email=${encodeURIComponent(emailToScan)}`, {
        method: 'POST'
      });
      setResult(data);
    } catch (err) {
      console.error("Scan failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="footprint-scanner">
      <div className="scanner-header">
        <h1>Digital Footprint Scanner</h1>
        <p className="subtitle">Discover if your identity has been exposed in public breaches.</p>
      </div>

      <div className="card scan-card">
        <form onSubmit={handleScan} className="scan-form">
          <label htmlFor="scan-email">Enter an email to scan public databases (Simulation)</label>
          <div className="input-group-row">
            <input 
              id="scan-email"
              type="email"
              className="input-field scan-input"
              placeholder="e.g. your.email@example.com"
              value={emailToScan}
              onChange={(e) => setEmailToScan(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Scanning Deep Web...' : 'Start Scan'}
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <div className="scanning-animation">
          <div className="radar"></div>
          <p>Analyzing public datasets and breach records...</p>
        </div>
      )}

      {result && (
        <div className="scan-results">
          <div className={`card result-summary risk-${result.risk_level.toLowerCase()}`}>
            <h2>Scan Complete</h2>
            <div className="summary-stats">
              <div className="stat">
                <span className="label">Risk Level</span>
                <span className="value risk-text">{result.risk_level}</span>
              </div>
              <div className="stat">
                <span className="label">Breaches Found</span>
                <span className="value">{result.breaches_found}</span>
              </div>
            </div>
          </div>

          {result.breaches_found > 0 ? (
            <div className="breaches-list">
              <h3>Exposed Records</h3>
              {result.breach_details.map((breach, idx) => (
                <div key={idx} className="card breach-card">
                  <div className="breach-header">
                    <h4>{breach.source}</h4>
                    <span className="date">{breach.date}</span>
                  </div>
                  <p><strong>Compromised Data:</strong> {breach.data_compromised.join(', ')}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="card safe-card">
              <h3>🎉 No Breaches Found</h3>
              <p>Your email does not appear in any known public data breaches.</p>
            </div>
          )}

          <div className="card recommendation-card mt-4">
            <h3>Recommendations</h3>
            <ul className="rec-list">
              {result.recommendations.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
