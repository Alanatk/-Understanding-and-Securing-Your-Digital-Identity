import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Digital Identity | Security Dashboard',
  description: 'Understand and secure your digital identity with advanced threat awareness.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="layout-wrapper">
          <nav className="navbar">
            <div className="nav-brand">CyberIdentity Shield</div>
            <div className="nav-links">
              <a href="/">Home</a>
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </div>
          </nav>
          <main className="main-content">
            {children}
          </main>
          <footer className="footer">
            <p>&copy; 2026 Digital Identity Project. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
