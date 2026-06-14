import { useState, useEffect } from 'react';
import assetData from '../data/cloudinary-assets.json';

const REELS = [
  {
    id: 1,
    url: "https://www.instagram.com/p/DZITJcHRcsU/",
    video: "https://res.cloudinary.com/djy1yx724/video/upload/f_auto,q_auto/v1781468829/europa-project/reels/reel_1.mp4"
  },
  {
    id: 2,
    url: "https://www.instagram.com/reel/DYm0z22hQXs/",
    video: "https://res.cloudinary.com/djy1yx724/video/upload/f_auto,q_auto/v1781468835/europa-project/reels/reel_2.mp4"
  },
  {
    id: 3,
    url: "https://www.instagram.com/reel/DYUzMPoSipb/",
    video: "https://res.cloudinary.com/djy1yx724/video/upload/f_auto,q_auto/v1781468849/europa-project/reels/reel_3.mp4"
  },
  {
    id: 4,
    url: "https://www.instagram.com/reel/DWWvILaOwAR/",
    video: "https://res.cloudinary.com/djy1yx724/video/upload/f_auto,q_auto/v1781468857/europa-project/reels/reel_4.mp4"
  },
  {
    id: 5,
    url: "https://www.instagram.com/reel/DWRllGGuM5Z/",
    video: "https://res.cloudinary.com/djy1yx724/video/upload/f_auto,q_auto/v1781468863/europa-project/reels/reel_5.mp4"
  }
];

export default function Navbar({ activePage, setActivePage }) {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const assets = assetData;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768 || window.innerHeight <= 480);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [mobileMenuOpen]);

  const navProgress = (isMobile && activePage === 'films')
    ? 1
    : Math.min(Math.max((scrollY - 400) / 300, 0), 1);

  const navItems = [
    { id: 'mission', label: 'The Mission' },
    { id: 'films', label: 'The Films' },
    { id: 'community', label: 'The Community' },
    { id: 'partners-press', label: 'Partners & Press' }
  ];

  const handleFaqClick = () => {
    setActivePage('films');
    setMobileMenuOpen(false);
    setIsSupportOpen(false);
    setTimeout(() => {
      const faqSection = document.getElementById('faq');
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <header 
        className="navbar-header"
        data-page={activePage}
        style={{
          '--nav-progress': navProgress,
          pointerEvents: navProgress > 0.8 ? 'auto' : 'none'
        }}
      >
      {/* 1. Logo (No background container, color dynamically updates based on page and scroll) */}
      <div 
        className={`logo-pill-uncontained ${activePage === 'mission' && scrollY < 400 ? 'logo-white' : ''}`}
        onClick={() => setActivePage('mission')}
      >
        {assetData.logo ? (
          <img 
            src={assetData.logo} 
            alt="The Europa Project Logo" 
            className="logo-img"
          />
        ) : (
          <div className="logo-text">The Europa Project</div>
        )}
      </div>

      {/* Desktop navigation & tools */}
      <div className="desktop-nav-container">
        {/* 2. Page Links Pill */}
        <nav className="nav-pill menu-pill">
          <ul className="nav-links">
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  className={`nav-link-btn ${activePage === item.id ? 'active' : ''}`}
                  onClick={() => {
                    setActivePage(item.id);
                    setIsSupportOpen(false);
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* 3. Social Media Pill */}
        <div className="nav-pill socials-pill">
          {/* Patreon Icon */}
          <a
            href="https://www.patreon.com/cw/TheEuropaProject?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink"
            target="_blank"
            rel="noreferrer"
            title="Support us on Patreon"
            className="social-icon-link patreon-icon"
          >
            <svg viewBox="0 0 1080 1080" fill="currentColor" width="18" height="18">
              <path d="M1033.05,324.45c-0.19-137.9-107.59-250.92-233.6-291.7c-156.48-50.64-362.86-43.3-512.28,27.2 C106.07,145.41,49.18,332.61,47.06,519.31c-1.74,153.5,13.58,557.79,241.62,560.67c169.44,2.15,194.67-216.18,273.07-321.33 c55.78-74.81,127.6-95.94,216.01-117.82C929.71,603.22,1033.27,483.3,1033.05,324.45z"/>
            </svg>
          </a>

          {/* Instagram Icon */}
          <a
            href="https://www.instagram.com/the.europa.project/"
            target="_blank"
            rel="noreferrer"
            title="Follow us on Instagram"
            className="social-icon-link instagram-icon"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" width="18" height="18">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
            </svg>
          </a>

          {/* Threads Icon */}
          <a
            href="https://www.threads.com/@the.europa.project"
            target="_blank"
            rel="noreferrer"
            title="Follow us on Threads"
            className="social-icon-link threads-icon"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" width="18" height="18">
              <path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161"/>
            </svg>
          </a>

          {/* Separator and Support Heart Icon Button */}
          <span className="socials-divider" />
          <button
            onClick={() => setIsSupportOpen(!isSupportOpen)}
            className={`heart-icon-btn ${isSupportOpen ? 'active' : ''}`}
            title="How you can support us"
            aria-label="Support us"
          >
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Toggle — only visible on mobile via CSS */}
      <div className="nav-pill mobile-toggle-pill">
        <button 
          className="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {/* Hamburger icon — always show hamburger; close is inside drawer */}
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </header>

      {/* Mobile Drawer — full-screen slide-in from right */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="mobile-drawer-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <nav className="mobile-drawer" role="navigation" aria-label="Mobile navigation">
            {/* Drawer header with close button */}
            <div className="mobile-drawer-header">
              <div className="mobile-drawer-logo">
                {assets.logo ? (
                  <img src={assets.logo} alt="The Europa Project" className="mobile-drawer-logo-img" />
                ) : (
                  <span className="logo-text">The Europa Project</span>
                )}
              </div>
              <button
                className="mobile-drawer-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Main nav links */}
            <ul className="mobile-drawer-nav-list">
              {navItems.map(item => (
                <li key={item.id}>
                  <button
                    className={`mobile-drawer-nav-link ${activePage === item.id ? 'active' : ''}`}
                    onClick={() => {
                      setActivePage(item.id);
                      setMobileMenuOpen(false);
                      setIsSupportOpen(false);
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  className="mobile-drawer-nav-link"
                  onClick={handleFaqClick}
                >
                  FAQ
                </button>
              </li>
            </ul>

            {/* Drawer footer actions */}
            <div className="mobile-drawer-footer">
              <a
                href="https://www.patreon.com/cw/TheEuropaProject?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink"
                target="_blank"
                rel="noreferrer"
                className="mobile-drawer-patreon-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg viewBox="0 0 1080 1080" fill="currentColor" width="18" height="18" aria-hidden="true">
                  <path d="M1033.05,324.45c-0.19-137.9-107.59-250.92-233.6-291.7c-156.48-50.64-362.86-43.3-512.28,27.2 C106.07,145.41,49.18,332.61,47.06,519.31c-1.74,153.5,13.58,557.79,241.62,560.67c169.44,2.15,194.67-216.18,273.07-321.33 c55.78-74.81,127.6-95.94,216.01-117.82C929.71,603.22,1033.27,483.3,1033.05,324.45z"/>
                </svg>
                Become a Patron
              </a>

              {/* Social icons row */}
              <div className="mobile-drawer-socials">
                <a href="https://www.instagram.com/the.europa.project/" target="_blank" rel="noreferrer" className="mobile-drawer-social-link" title="Instagram" onClick={() => setMobileMenuOpen(false)}>
                  <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                  </svg>
                </a>
                <a href="https://www.threads.com/@the.europa.project" target="_blank" rel="noreferrer" className="mobile-drawer-social-link" title="Threads" onClick={() => setMobileMenuOpen(false)}>
                  <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
                    <path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161"/>
                  </svg>
                </a>
                <a href="https://www.patreon.com/cw/TheEuropaProject?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink" target="_blank" rel="noreferrer" className="mobile-drawer-social-link mobile-drawer-social-link--patreon" title="Patreon" onClick={() => setMobileMenuOpen(false)}>
                  <svg viewBox="0 0 1080 1080" fill="currentColor" width="20" height="20">
                    <path d="M1033.05,324.45c-0.19-137.9-107.59-250.92-233.6-291.7c-156.48-50.64-362.86-43.3-512.28,27.2 C106.07,145.41,49.18,332.61,47.06,519.31c-1.74,153.5,13.58,557.79,241.62,560.67c169.44,2.15,194.67-216.18,273.07-321.33 c55.78-74.81,127.6-95.94,216.01-117.82C929.71,603.22,1033.27,483.3,1033.05,324.45z"/>
                  </svg>
                </a>
              </div>
            </div>
          </nav>
        </>
      )}

    {/* Dynamic Island Support Modal */}
    {!isMobile && isSupportOpen && (
        <div className="dynamic-island-overlay" onClick={() => setIsSupportOpen(false)}>
          <div 
            className="dynamic-island-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="dynamic-island-close-btn"
              onClick={() => setIsSupportOpen(false)}
              aria-label="Close panel"
            >
              ✕
            </button>
            
            {/* Subtle ambient glow inside the panel */}
            <div style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(15, 59, 162, 0.03) 0%, rgba(15, 59, 162, 0) 70%)',
              pointerEvents: 'none',
              zIndex: 0
            }} />

            {/* Support Grid */}
            <div className="modal-support-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '40px',
              alignItems: 'center',
              width: '100%',
              position: 'relative',
              zIndex: 1
            }}>
              {/* Left Column: Content */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <h2 style={{
                  fontSize: '2.25rem',
                  fontFamily: 'var(--font-title)',
                  color: '#0f172a',
                  fontWeight: 800,
                  lineHeight: '1.15',
                  letterSpacing: '-0.02em',
                  margin: '0 0 12px 0',
                  textAlign: 'left'
                }}>
                  How you can support us?
                </h2>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: 'var(--text-muted)',
                  marginBottom: '20px',
                  maxWidth: '480px',
                  textAlign: 'left'
                }}>
                  We are a small, collaborative team hiking across Europe's border trails. If our films and community resonate with you, here are the best ways to support the project.
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '12px',
                  width: '100%',
                  maxWidth: '440px'
                }}>
                  {/* Patreon Card */}
                  <a 
                    href="https://www.patreon.com/cw/TheEuropaProject?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="glass-card" 
                    style={{
                      padding: '12px 16px',
                      background: 'transparent',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      textAlign: 'left',
                      gap: '12px',
                      minHeight: '80px',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      boxShadow: 'none'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)';
                      e.currentTarget.style.borderColor = 'var(--color-primary)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    <svg viewBox="0 0 1080 1080" fill="#ff424d" width="24" height="24" style={{ flexShrink: 0 }}>
                      <path d="M1033.05,324.45c-0.19-137.9-107.59-250.92-233.6-291.7c-156.48-50.64-362.86-43.3-512.28,27.2 C106.07,145.41,49.18,332.61,47.06,519.31c-1.74,153.5,13.58,557.79,241.62,560.67c169.44,2.15,194.67-216.18,273.07-321.33 c55.78-74.81,127.6-95.94,216.01-117.82C929.71,603.22,1033.27,483.3,1033.05,324.45z"/>
                    </svg>
                    <div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a', margin: '0 0 2px 0' }}>Become a Patron</h3>
                      <p style={{ fontSize: '0.75rem', lineHeight: '1.3', color: 'var(--text-muted)', margin: 0 }}>Memberships from €5/month.</p>
                    </div>
                  </a>

                  {/* Email Card */}
                  <a 
                    href="mailto:hello@theeuropaproject.eu" 
                    className="glass-card" 
                    style={{
                      padding: '12px 16px',
                      background: 'transparent',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      textAlign: 'left',
                      gap: '12px',
                      minHeight: '80px',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      boxShadow: 'none'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)';
                      e.currentTarget.style.borderColor = 'var(--color-primary)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" style={{ flexShrink: 0 }}>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a', margin: '0 0 2px 0' }}>Say Hello</h3>
                      <p style={{ fontSize: '0.75rem', lineHeight: '1.3', color: 'var(--text-muted)', margin: 0 }}>Send us a trail hello.</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Right Column: Team Image */}
              <div className="modal-team-photo-column" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                {assets.team ? (
                  <div style={{
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    maxHeight: '200px'
                  }}>
                    <img 
                      src={assets.team} 
                      alt="The Europa Project Team" 
                      style={{
                        width: '100%',
                        height: '200px',
                        display: 'block',
                        objectFit: 'cover',
                        objectPosition: 'center 20%'
                      }}
                    />
                  </div>
                ) : (
                  <div style={{
                    height: '200px',
                    borderRadius: '8px',
                    background: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#4b5563'
                  }}>
                    Team photo placeholder
                  </div>
                )}
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: 'var(--text-muted)', 
                  marginTop: '10px', 
                  fontStyle: 'italic',
                  textAlign: 'center' 
                }}>
                  Left to right: Ažbe, Benjamin, Rowena, Diogo, Jye
                </span>
              </div>
            </div>

            {/* Reels Section with Side-by-side Grid & Vertical Social Stack */}
            <div className="modal-reels-container">
              {/* Reels Grid */}
              <div className="reels-grid modal-reels-grid">
                {REELS.map((reel) => (
                  <a
                    key={reel.id}
                    href={reel.url}
                    target="_blank"
                    rel="noreferrer"
                    className="reel-card"
                    title="View on Instagram"
                  >
                    <video
                      src={reel.video}
                      muted
                      playsInline
                      loop
                      preload="metadata"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.play().catch(() => {});
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    />
                    <div className="reel-overlay" />
                  </a>
                ))}
              </div>

              {/* Vertical Social Stack */}
              <div className="modal-social-stack">
                <a
                  href="https://www.patreon.com/cw/TheEuropaProject?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink"
                  target="_blank"
                  rel="noreferrer"
                  className="large-social-btn patreon"
                  title="Support us on Patreon"
                >
                  <svg viewBox="0 0 1080 1080" fill="currentColor" width="28" height="28">
                    <path d="M1033.05,324.45c-0.19-137.9-107.59-250.92-233.6-291.7c-156.48-50.64-362.86-43.3-512.28,27.2 C106.07,145.41,49.18,332.61,47.06,519.31c-1.74,153.5,13.58,557.79,241.62,560.67c169.44,2.15,194.67-216.18,273.07-321.33 c55.78-74.81,127.6-95.94,216.01-117.82C929.71,603.22,1033.27,483.3,1033.05,324.45z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/the.europa.project/"
                  target="_blank"
                  rel="noreferrer"
                  className="large-social-btn instagram"
                  title="Follow us on Instagram"
                >
                  <svg viewBox="0 0 16 16" fill="currentColor" width="28" height="28">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                  </svg>
                </a>
                <a
                  href="https://www.threads.net/@the.europa.project"
                  target="_blank"
                  rel="noreferrer"
                  className="large-social-btn threads"
                  title="Follow us on Threads"
                >
                  <svg viewBox="0 0 16 16" fill="currentColor" width="28" height="28">
                    <path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
