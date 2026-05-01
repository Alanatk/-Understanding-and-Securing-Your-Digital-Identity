import './dashboard-layout.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <ul className="sidebar-nav">
          <li><a href="/dashboard" className="sidebar-link">Overview</a></li>
          <li><a href="/dashboard/password-analyzer" className="sidebar-link">Password Analyzer</a></li>
          <li><a href="/dashboard/mfa" className="sidebar-link">MFA Setup</a></li>
          <li><a href="/dashboard/privacy" className="sidebar-link">Privacy Audit</a></li>
          <li><a href="/dashboard/footprint" className="sidebar-link">Digital Footprint</a></li>
          <li><a href="/dashboard/threats" className="sidebar-link">Threat Awareness</a></li>
          <li><a href="/dashboard/security-plan" className="sidebar-link">Security Plan</a></li>
        </ul>
      </aside>
      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
}
