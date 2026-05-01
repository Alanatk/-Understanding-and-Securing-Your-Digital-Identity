'use client';
import { useState, ChangeEvent } from 'react';
import './password.css';

interface StrengthResult {
  score: number; // 0-4
  entropy: number;
  crackTime: string;
  feedback: {
    warning: string;
    suggestions: string[];
  };
}

export default function PasswordAnalyzerPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<StrengthResult>({
    score: 0,
    entropy: 0,
    crackTime: 'Instant',
    feedback: { warning: '', suggestions: [] }
  });

  const calculateEntropy = (pwd: string) => {
    let poolSize = 0;
    if (/[a-z]/.test(pwd)) poolSize += 26;
    if (/[A-Z]/.test(pwd)) poolSize += 26;
    if (/[0-9]/.test(pwd)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) poolSize += 32;

    if (poolSize === 0) return 0;
    
    const entropy = pwd.length * Math.log2(poolSize);
    return Math.round(entropy * 100) / 100;
  };

  const estimateCrackTime = (entropy: number) => {
    // Assuming 100 billion guesses per second
    const guessesPerSecond = 100e9;
    const totalGuesses = Math.pow(2, entropy);
    const seconds = totalGuesses / guessesPerSecond;

    if (seconds < 1) return "Instant";
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 31536000 * 100) return `${Math.round(seconds / 31536000)} years`;
    return "Centuries";
  };

  const evaluateStrength = (pwd: string) => {
    const entropy = calculateEntropy(pwd);
    const crackTime = estimateCrackTime(entropy);
    let score = 0;
    let warning = '';
    const suggestions = [];

    // Basic scoring based on entropy
    if (entropy > 28) score = 1;
    if (entropy > 35) score = 2;
    if (entropy > 59) score = 3;
    if (entropy > 80) score = 4;

    // Length check
    if (pwd.length < 8) {
      suggestions.push('Make your password at least 8 characters long.');
    } else if (pwd.length < 12) {
      suggestions.push('Aim for 12+ characters for better security.');
    }

    // Variety check
    if (!/[A-Z]/.test(pwd)) suggestions.push('Add uppercase letters.');
    if (!/[a-z]/.test(pwd)) suggestions.push('Add lowercase letters.');
    if (!/[0-9]/.test(pwd)) suggestions.push('Include numbers.');
    if (!/[^a-zA-Z0-9]/.test(pwd)) suggestions.push('Include special characters (!@#$%).');

    if (pwd.length > 0 && score <= 1) {
      warning = "This password is very weak. Do not use it.";
    }

    setResult({
      score,
      entropy,
      crackTime,
      feedback: { warning, suggestions }
    });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPwd = e.target.value;
    setPassword(newPwd);
    evaluateStrength(newPwd);
  };

  const getStrengthColor = () => {
    if (password.length === 0) return '#e2e8f0';
    if (result.score === 0 || result.score === 1) return '#ef4444'; // Red
    if (result.score === 2) return '#f59e0b'; // Yellow
    if (result.score === 3) return '#10b981'; // Green
    return '#8b5cf6'; // Purple (Very Strong)
  };

  const getStrengthLabel = () => {
    if (password.length === 0) return 'Too Short';
    if (result.score <= 1) return 'Weak';
    if (result.score === 2) return 'Fair';
    if (result.score === 3) return 'Strong';
    return 'Very Strong';
  };

  return (
    <div className="password-analyzer">
      <div className="analyzer-header">
        <h1>Password Strength Analyzer</h1>
        <p className="subtitle">Understand the cryptographic strength of your passwords</p>
      </div>

      <div className="analyzer-card card">
        <div className="input-group">
          <label htmlFor="password-input">Test a Password</label>
          <div className="password-input-wrapper">
            <input
              id="password-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter a password to analyze..."
              className="input-field pwd-input"
            />
            <button 
              className="toggle-visibility"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <div className="strength-meter-container">
          <div className="meter-header">
            <span>Strength: <strong style={{ color: getStrengthColor() }}>{getStrengthLabel()}</strong></span>
            <span>Entropy: <strong>{result.entropy} bits</strong></span>
          </div>
          <div className="meter-bg">
            <div 
              className="meter-fill" 
              style={{ 
                width: `${Math.max(10, Math.min(100, (result.score + 1) * 20))}%`, 
                backgroundColor: getStrengthColor() 
              }}
            ></div>
          </div>
        </div>

        <div className="analysis-stats">
          <div className="stat-box">
            <h4>Estimated Crack Time</h4>
            <div className="stat-value highlight" style={{ color: getStrengthColor() }}>
              {password.length === 0 ? '-' : result.crackTime}
            </div>
            <p className="stat-desc">Based on hardware capable of 100 Billion guesses/sec</p>
          </div>
        </div>

        {password.length > 0 && (
          <div className="feedback-section">
            {result.feedback.warning && (
              <div className="warning-banner">⚠️ {result.feedback.warning}</div>
            )}
            
            {result.feedback.suggestions.length > 0 && (
              <div className="suggestions-box">
                <h4>How to improve:</h4>
                <ul>
                  {result.feedback.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="educational-card card mt-4">
        <h3>What is Entropy?</h3>
        <p>
          Password entropy is a measurement of how unpredictable a password is. It represents the number of guesses it would take an attacker to guess your password. It is calculated based on the length of the password and the size of the character pool (lowercase, uppercase, numbers, symbols) used. higher entropy means a stronger password.
        </p>
      </div>
    </div>
  );
}
