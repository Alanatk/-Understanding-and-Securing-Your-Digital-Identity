'use client';
import { useState } from 'react';
import './mfa.css';

export default function MFAPage() {
  const [activeTab, setActiveTab] = useState<'totp' | 'sms' | 'email'>('totp');
  const [setupStep, setSetupStep] = useState(1);
  const [mfaCode, setMfaCode] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (mfaCode.length === 6) {
      setIsSuccess(true);
    } else {
      alert("Invalid code. Enter any 6-digit code for this simulation.");
    }
  };

  const resetSimulation = () => {
    setSetupStep(1);
    setMfaCode('');
    setIsSuccess(false);
  };

  return (
    <div className="mfa-container">
      <div className="mfa-header">
        <h1>Multi-Factor Authentication (MFA)</h1>
        <p className="subtitle">Learn about and simulate setting up an extra layer of security.</p>
      </div>

      <div className="mfa-info-cards">
        <div className={`card method-card ${activeTab === 'totp' ? 'active' : ''}`} onClick={() => { setActiveTab('totp'); resetSimulation(); }}>
          <h3>📱 Authenticator App (TOTP)</h3>
          <p>Most Secure. Uses an app like Google Authenticator or Authy to generate time-based codes.</p>
        </div>
        <div className={`card method-card ${activeTab === 'sms' ? 'active' : ''}`} onClick={() => { setActiveTab('sms'); resetSimulation(); }}>
          <h3>💬 SMS verification</h3>
          <p>Moderate Security. Sends a code via text message. Vulnerable to SIM swapping attacks.</p>
        </div>
        <div className={`card method-card ${activeTab === 'email' ? 'active' : ''}`} onClick={() => { setActiveTab('email'); resetSimulation(); }}>
          <h3>✉️ Email Link</h3>
          <p>Basic Security. Sends a code or magic link to your email inbox.</p>
        </div>
      </div>

      <div className="card simulation-card">
        <h2>Interactive Setup Simulation: {activeTab.toUpperCase()}</h2>
        
        {isSuccess ? (
          <div className="success-state text-center">
            <div className="success-icon">✅</div>
            <h3>MFA Successfully Enabled!</h3>
            <p>Your account is now significantly more secure against unauthorized access.</p>
            <button onClick={resetSimulation} className="btn-secondary mt-3">Try Another Method</button>
          </div>
        ) : (
          <div className="setup-steps">
            {activeTab === 'totp' && (
              <>
                {setupStep === 1 && (
                  <div className="step-content">
                    <h3>Step 1: Download an Authenticator App</h3>
                    <p>Download Google Authenticator or Authy on your mobile device.</p>
                    <button onClick={() => setSetupStep(2)} className="btn-primary mt-3">I have an app</button>
                  </div>
                )}
                {setupStep === 2 && (
                  <div className="step-content">
                    <h3>Step 2: Scan QR Code</h3>
                    <div className="mock-qr-code">
                      <span>Mock QR Code</span>
                    </div>
                    <p>Or enter this setup key manually: <strong>JBSWY3DPEHPK3PXP</strong></p>
                    <button onClick={() => setSetupStep(3)} className="btn-primary mt-3">Next</button>
                  </div>
                )}
              </>
            )}

            {activeTab === 'sms' && (
              <>
                {setupStep === 1 && (
                  <div className="step-content">
                    <h3>Step 1: Verify Phone Number</h3>
                    <p>Your registered phone number is: <strong>***-***-1234</strong></p>
                    <button onClick={() => setSetupStep(3)} className="btn-primary mt-3">Send SMS Code</button>
                  </div>
                )}
              </>
            )}

            {activeTab === 'email' && (
              <>
                {setupStep === 1 && (
                  <div className="step-content">
                    <h3>Step 1: Send Verification Email</h3>
                    <p>We will send a code to your registered email address.</p>
                    <button onClick={() => setSetupStep(3)} className="btn-primary mt-3">Send Email</button>
                  </div>
                )}
              </>
            )}

            {setupStep === 3 && (
              <div className="step-content">
                <h3>Final Step: Verify Code</h3>
                <p>Enter the 6-digit code provided by your {activeTab === 'totp' ? 'Authenticator App' : activeTab === 'sms' ? 'SMS' : 'Email'}.</p>
                <form onSubmit={handleVerify} className="verify-form">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="000000"
                    className="input-field code-input"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                    required
                  />
                  <button type="submit" className="btn-primary">Verify & Enable</button>
                </form>
                <p className="hint">Hint: Enter any 6 digits for this simulation.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="educational-card card mt-4">
        <h3>Why is MFA Important?</h3>
        <p>Even if an attacker guesses or steals your password, they cannot access your account without the second factor (something you have, like your phone). Microsoft reports that MFA can block over 99.9% of account compromise attacks.</p>
      </div>
    </div>
  );
}
