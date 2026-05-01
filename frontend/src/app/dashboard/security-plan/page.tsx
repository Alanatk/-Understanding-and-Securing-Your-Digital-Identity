'use client';
import './security-plan.css';

const securedAccounts = [
  { account: 'Primary Email', status: 'Enabled', note: 'MFA protected with authenticator app' },
  { account: 'Google Account', status: 'Reviewed', note: 'Third-party access cleaned up' },
  { account: 'Social Media', status: 'Updated', note: 'Privacy controls tightened on key profiles' },
  { account: 'Password Vault', status: 'Active', note: 'Unique passwords stored for critical services' },
];

const hygieneChecklist = [
  'Review privacy settings every 3 months.',
  'Use unique passwords for every important account.',
  'Keep MFA recovery codes stored in a safe location.',
  'Watch for phishing language, spoofed links, and urgent requests.',
  'Audit old accounts and remove unused public information.',
];

const nextSteps = [
  'Finish documenting all major accounts in the account security log.',
  'Repeat the footprint scan after updating privacy settings.',
  'Prepare a short presentation summarizing improvements and risks.',
];

export default function SecurityPlanPage() {
  return (
    <div className="security-plan-page">
      <div className="security-plan-header">
        <h1>My Digital Identity Security Plan</h1>
        <p className="subtitle">
          Consolidate the work from threats, passwords, MFA, privacy, and footprint review into a final action plan.
        </p>
      </div>

      <div className="security-plan-grid">
        <section className="card security-card">
          <h2>Account Security Snapshot</h2>
          <div className="snapshot-list">
            {securedAccounts.map((item) => (
              <div key={item.account} className="snapshot-item">
                <div>
                  <h3>{item.account}</h3>
                  <p>{item.note}</p>
                </div>
                <span className="status-pill">{item.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card security-card">
          <h2>Personal Security Summary</h2>
          <div className="summary-block">
            <h3>Strengths</h3>
            <p>Strong password habits, MFA awareness, and better visibility into public exposure.</p>
          </div>
          <div className="summary-block">
            <h3>Remaining Risks</h3>
            <p>Old accounts, reused credentials from past services, and overshared profile information can still create risk.</p>
          </div>
          <div className="summary-block">
            <h3>Commitment</h3>
            <p>I will regularly review account security, keep software updated, and treat unexpected links or requests with caution.</p>
          </div>
        </section>
      </div>

      <section className="card security-card">
        <h2>Ongoing Digital Hygiene</h2>
        <ul className="plan-list">
          {hygieneChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="card security-card">
        <h2>Recommended Final Deliverables</h2>
        <div className="deliverables-grid">
          <div className="deliverable-item">
            <h3>Account Security Log</h3>
            <p>Track password strength, MFA status, and which accounts were reviewed.</p>
          </div>
          <div className="deliverable-item">
            <h3>Privacy Review Summary</h3>
            <p>Record platform settings changed and the reason for each change.</p>
          </div>
          <div className="deliverable-item">
            <h3>Footprint Audit Report</h3>
            <p>Document findings from self-searches and any remediation actions taken.</p>
          </div>
          <div className="deliverable-item">
            <h3>Final Presentation</h3>
            <p>Summarize the journey, lessons learned, and the final security plan.</p>
          </div>
        </div>
      </section>

      <section className="card security-card">
        <h2>Next Steps</h2>
        <ul className="plan-list">
          {nextSteps.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
