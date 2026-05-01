'use client';
import { useState } from 'react';
import './privacy.css';

interface AuditTask {
  id: string;
  platform: string;
  task: string;
  description: string;
  completed: boolean;
}

const initialTasks: AuditTask[] = [
  { id: '1', platform: 'Google', task: 'Review Activity Controls', description: 'Disable saving of web & app activity if not needed. Check location history settings.', completed: false },
  { id: '2', platform: 'Google', task: 'Check Third-Party Connections', description: 'Revoke access for applications you no longer use in your Google Account Security settings.', completed: false },
  { id: '3', platform: 'Facebook', task: 'Update Profile Visibility', description: 'Set "Who can see your future posts" to Friends, and limit past posts visibility.', completed: false },
  { id: '4', platform: 'Facebook', task: 'Off-Facebook Activity', description: 'Clear history and disconnect future off-Facebook activity tracking.', completed: false },
  { id: '5', platform: 'LinkedIn', task: 'Profile Viewing Options', description: 'Decide if you want to be anonymous when viewing other profiles.', completed: false },
  { id: '6', platform: 'LinkedIn', task: 'Public Profile Visibility', description: 'Toggle what information is visible to search engines and non-connections.', completed: false },
];

export default function PrivacyAuditPage() {
  const [tasks, setTasks] = useState<AuditTask[]>(initialTasks);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const progress = Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100);

  return (
    <div className="privacy-container">
      <div className="privacy-header">
        <h1>Privacy Settings Audit</h1>
        <p className="subtitle">Take control of your data across major platforms.</p>
      </div>

      <div className="card progress-card mb-4">
        <h3>Audit Progress: {progress}%</h3>
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progress}%`, backgroundColor: progress === 100 ? '#10b981' : 'var(--primary)' }}
          ></div>
        </div>
        {progress === 100 && (
          <p className="success-text mt-2">Amazing! You've audited all your fundamental privacy settings.</p>
        )}
      </div>

      <div className="audit-list">
        {['Google', 'Facebook', 'LinkedIn'].map(platform => (
          <div key={platform} className="platform-section mb-4">
            <h2 className="platform-title">{platform}</h2>
            <div className="tasks-container">
              {tasks.filter(t => t.platform === platform).map(task => (
                <div key={task.id} className={`card task-card ${task.completed ? 'task-completed' : ''}`}>
                  <label className="checkbox-container">
                    <input 
                      type="checkbox" 
                      checked={task.completed} 
                      onChange={() => toggleTask(task.id)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <div className="task-content">
                    <h4 className="task-name">{task.task}</h4>
                    <p className="task-desc">{task.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
