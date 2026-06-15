import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Mission from './components/Mission';
import Films from './components/Films';
import Community from './components/Community';
import PartnersPress from './components/PartnersPress';
import assetData from './data/cloudinary-assets.json';
import MobileSimulator from './components/MobileSimulator';

function App() {
  const isSimulator = new URLSearchParams(window.location.search).get('simulator') === 'true';

  if (isSimulator) {
    return <MobileSimulator />;
  }

  const [activePage, setActivePage] = useState(() => {
    return sessionStorage.getItem('activePage') || 'mission';
  });

  useEffect(() => {
    sessionStorage.setItem('activePage', activePage);
  }, [activePage]);

  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'terms' | 'cookies' | null
  const [showCookieBanner, setShowCookieBanner] = useState(() => {
    return !localStorage.getItem('cookieConsent');
  });

  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowCookieBanner(false);
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowCookieBanner(false);
  };

  // Dynamic SEO Controller
  useEffect(() => {
    let title = 'The Europa Project';
    let description = 'A collaborative documentary journey telling stories of solidarity, culture, and hope across Europe’s border trails.';
    
    switch (activePage) {
      case 'mission':
        title = 'The Mission | The Europa Project - Hiking Europe\'s Border Trails';
        description = 'Discover the mission of The Europa Project: hiking Europe\'s border trails to tell stories of hope, peace, and solidarity.';
        break;
      case 'films':
        title = 'The Films & Documentary | The Europa Project';
        description = 'Watch the films, trailer, and explore the route mapping of The Europa Project\'s journey across 21 European countries.';
        break;
      case 'community':
        title = 'The Creative Community | The Europa Project';
        description = 'Join the Europa Creator Database and collaborate with filmmakers, photographers, and writers in our European network.';
        break;
      case 'partners-press':
        title = 'Partners & Press | The Europa Project';
        description = 'Meet our institutional partners, sponsors, and explore our podcast and video interviews in European media.';
        break;
      default:
        break;
    }
    
    document.title = title;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
    
    // Automatically scroll to the top of the viewport on page change
    window.scrollTo(0, 0);
  }, [activePage]);

  const renderActivePage = () => {
    switch (activePage) {
      case 'mission':
        return <Mission setActivePage={setActivePage} />;
      case 'films':
        return <Films setActivePage={setActivePage} />;
      case 'community':
        return <Community />;
      case 'partners-press':
        return <PartnersPress />;
      default:
        return <Mission />;
    }
  };

  return (
    <div className="app-container">
      {/* Ambient background glows */}
      <div className="nebula-glow nebula-1" />
      <div className="nebula-glow nebula-2" />

      {/* Sticky Navbar */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Page Area */}
      <main className="main-content">
        {renderActivePage()}
      </main>

      {/* Elegant Footer */}
      <footer className="footer-container">
        <div className="footer-grid">
          {/* Brand Info Column */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              {assetData.logo ? (
                <img src={assetData.logo} alt="The Europa Project Logo" className="footer-logo-img" />
              ) : (
                <span className="logo-text">The Europa Project</span>
              )}
            </div>
            <p className="footer-description">
              A bold and inclusive collaborative documentary journey telling stories of solidarity, culture, and hope across Europe’s border trails.
            </p>
            <div className="footer-socials">
              <a 
                href="https://www.patreon.com/cw/TheEuropaProject?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink" 
                target="_blank" 
                rel="noreferrer" 
                className="footer-social-link patreon" 
                title="Support us on Patreon"
              >
                <svg viewBox="0 0 1080 1080" fill="currentColor" width="18" height="18">
                  <path d="M1033.05,324.45c-0.19-137.9-107.59-250.92-233.6-291.7c-156.48-50.64-362.86-43.3-512.28,27.2 C106.07,145.41,49.18,332.61,47.06,519.31c-1.74,153.5,13.58,557.79,241.62,560.67c169.44,2.15,194.67-216.18,273.07-321.33 c55.78-74.81,127.6-95.94,216.01-117.82C929.71,603.22,1033.27,483.3,1033.05,324.45z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/the.europa.project/" 
                target="_blank" 
                rel="noreferrer" 
                className="footer-social-link instagram" 
                title="Follow us on Instagram"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" width="18" height="18">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                </svg>
              </a>
              <a 
                href="https://www.threads.com/@the.europa.project" 
                target="_blank" 
                rel="noreferrer" 
                className="footer-social-link threads" 
                title="Follow us on Threads"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" width="18" height="18">
                  <path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="footer-col links-col">
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li><button onClick={() => setActivePage('mission')} className="footer-link-btn">The Mission</button></li>
              <li><button onClick={() => setActivePage('films')} className="footer-link-btn">The Films</button></li>
              <li><button onClick={() => setActivePage('community')} className="footer-link-btn">The Community</button></li>
              <li><button onClick={() => setActivePage('partners-press')} className="footer-link-btn">Partners & Press</button></li>
            </ul>
          </div>

          {/* Support & Resources Column */}
          <div className="footer-col links-col">
            <h4 className="footer-title">Resources</h4>
            <ul className="footer-links">
              <li>
                <button 
                  onClick={() => {
                    setActivePage('films');
                    setTimeout(() => {
                      const faq = document.getElementById('faq');
                      if (faq) faq.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }} 
                  className="footer-link-btn"
                >
                  FAQ Accordion
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setActivePage('community');
                    setTimeout(() => {
                      const db = document.getElementById('creator-database-section');
                      if (db) db.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }} 
                  className="footer-link-btn"
                >
                  Join Us
                </button>
              </li>
              <li><a href="https://www.patreon.com/cw/TheEuropaProject?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink" target="_blank" rel="noreferrer" className="footer-link-btn" style={{ textDecoration: 'none' }}>Become a Patron</a></li>
              <li>
                <button 
                  onClick={() => {
                    setActivePage('partners-press');
                    setTimeout(() => {
                      const contact = document.getElementById('collaborate-contact');
                      if (contact) contact.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }} 
                  className="footer-link-btn"
                >
                  Say Hello
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer-col newsletter-col" style={{
            background: '#ffffff',
            padding: '28px',
            borderRadius: '8px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <h4 className="footer-title" style={{ marginBottom: '8px' }}>Newsletter</h4>
            <p className="footer-newsletter-text" style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
              Subscribe to receive production updates and chapter release notifications directly.
            </p>
            <form className="footer-newsletter-form" onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing!');
            }} style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', marginTop: '4px' }}>
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="form-control" 
                required 
                style={{ 
                  width: '100%', 
                  padding: '10px 14px', 
                  borderRadius: '8px', 
                  fontSize: '0.9rem', 
                }} 
              />
              <button 
                type="submit" 
                className="btn-primary" 
                style={{ 
                  width: '100%', 
                  padding: '10px 20px', 
                  fontSize: '0.85rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 MangoMilk Productions. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#privacy" className="footer-bottom-link" onClick={(e) => { e.preventDefault(); setActiveModal('privacy'); }}>Privacy Policy</a>
            <span className="footer-separator">•</span>
            <a href="#cookies" className="footer-bottom-link" onClick={(e) => { e.preventDefault(); setActiveModal('cookies'); }}>Cookies Policy</a>
            <span className="footer-separator">•</span>
            <a href="#terms" className="footer-bottom-link" onClick={(e) => { e.preventDefault(); setActiveModal('terms'); }}>Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Floating Island Panel (Modal) for Terms and Privacy */}
      {activeModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          animation: 'fadeIn 0.25s ease-out'
        }} onClick={() => setActiveModal(null)}>
          <div style={{
            background: '#ffffff',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '600px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            padding: '36px',
            position: 'relative',
            maxHeight: '85vh',
            overflowY: 'auto',
            animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }} onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button 
              onClick={() => setActiveModal(null)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#0f172a'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {activeModal === 'privacy' && (
              <div>
                <span className="section-tag" style={{ marginBottom: '12px' }}>Legal</span>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: '#0f172a', marginBottom: '20px' }}>Privacy Policy</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  <p>
                    Your privacy is important to us. This policy details how The Europa Project handles your data when you visit and interact with our website.
                  </p>
                  <h4 style={{ color: '#0f172a', fontWeight: 700, fontSize: '1.1rem', marginTop: '12px' }}>1. Performance Tracking & Analytics</h4>
                  <p>
                    We use third-party analytics services (such as Google Analytics) to track performance and understand how visitors interact with our site. This tracking collects anonymous usage data to help us optimize performance. No personally identifiable information is processed through this tracking.
                  </p>
                  <h4 style={{ color: '#0f172a', fontWeight: 700, fontSize: '1.1rem', marginTop: '12px' }}>2. Form Submissions</h4>
                  <p>
                    Personal information is only collected when you voluntarily submit it through our forms (such as the contact form or creator database registration). This information is solely used to communicate with you and manage your request. We do not sell or share your data with third parties.
                  </p>
                  <h4 style={{ color: '#0f172a', fontWeight: 700, fontSize: '1.1rem', marginTop: '12px' }}>3. Data Control</h4>
                  <p>
                    If you wish to view, modify, or remove any personal data you have voluntarily provided to us, please feel free to reach out via hello@theeuropaproject.eu.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'cookies' && (
              <div>
                <span className="section-tag" style={{ marginBottom: '12px' }}>Legal</span>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: '#0f172a', marginBottom: '20px' }}>Cookies Policy</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  <p>
                    This website uses cookies to optimize your browsing experience. This Cookies Policy explains what cookies are and how we use them.
                  </p>
                  <h4 style={{ color: '#0f172a', fontWeight: 700, fontSize: '1.1rem', marginTop: '12px' }}>1. What are cookies?</h4>
                  <p>
                    Cookies are small text files stored on your device when you visit a website. They help us remember your preferences, keep you logged in (if applicable), and analyze site performance.
                  </p>
                  <h4 style={{ color: '#0f172a', fontWeight: 700, fontSize: '1.1rem', marginTop: '12px' }}>2. Types of cookies we use</h4>
                  <p>
                    - <strong>Necessary Cookies:</strong> Required for basic website operations, such as loading elements and navigation.
                    <br />
                    - <strong>Performance & Analytics Cookies:</strong> Used to track anonymous usage data through analytics software. This helps us count visits and see traffic sources to evaluate performance.
                  </p>
                  <h4 style={{ color: '#0f172a', fontWeight: 700, fontSize: '1.1rem', marginTop: '12px' }}>3. Controlling cookies</h4>
                  <p>
                    You can manage cookie settings in your web browser. You can block or delete cookies entirely, but this may affect how some features on our site display.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'terms' && (
              <div>
                <span className="section-tag" style={{ marginBottom: '12px' }}>Legal</span>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: '#0f172a', marginBottom: '20px' }}>Terms & Conditions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  <p>
                    Welcome to The Europa Project website. By using this website, you agree to comply with and be bound by the following terms.
                  </p>
                  <h4 style={{ color: '#0f172a', fontWeight: 700, fontSize: '1.1rem', marginTop: '12px' }}>1. Use of Content</h4>
                  <p>
                    All documentary films, text, photographs, logo assets, and designs published on this site are the intellectual property of The Europa Project unless indicated otherwise. They may be viewed for personal, non-commercial use only.
                  </p>
                  <h4 style={{ color: '#0f172a', fontWeight: 700, fontSize: '1.1rem', marginTop: '12px' }}>2. Consent to Tracking</h4>
                  <p>
                    By browsing this website, you consent to anonymous tracking via analytics for optimization and performance evaluation purposes, as described in our Privacy Policy.
                  </p>
                  <h4 style={{ color: '#0f172a', fontWeight: 700, fontSize: '1.1rem', marginTop: '12px' }}>3. Contact Info</h4>
                  <p>
                    For any questions regarding our terms, please contact hello@theeuropaproject.eu.
                  </p>
                </div>
              </div>
            )}
            
            <button 
              className="btn-primary" 
              onClick={() => setActiveModal(null)}
              style={{ width: '100%', marginTop: '28px', padding: '12px 24px', fontSize: '0.9rem', border: 'none', cursor: 'pointer' }}
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      {/* Cookie Consent Banner */}
      {showCookieBanner && (
        <div className="cookie-banner">
          <div className="cookie-content">
            <h4 className="cookie-title">We value your privacy</h4>
            <p className="cookie-text">
              We use cookies to improve your browsing experience and analyze site traffic. Read our{' '}
              <span 
                className="cookie-link" 
                onClick={() => setActiveModal('cookies')}
                style={{ cursor: 'pointer' }}
              >
                Cookies Policy
              </span>{' '}
              to learn more.
            </p>
          </div>
          <div className="cookie-buttons">
            <button className="cookie-btn-decline" onClick={handleDeclineCookies}>
              Decline
            </button>
            <button className="cookie-btn-accept" onClick={handleAcceptCookies}>
              Accept Cookies
            </button>
          </div>
        </div>
      )}
      {/* Floating Developer Simulator Toggle */}
      {import.meta.env.DEV && (window.self === window.top) && (
        <button
          onClick={() => {
            window.location.href = window.location.origin + window.location.pathname + '?simulator=true';
          }}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 99999,
            backgroundColor: '#ea580c',
            color: '#ffffff',
            border: 'none',
            borderRadius: '9999px',
            padding: '10px 18px',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 10px 15px -3px rgba(234, 88, 12, 0.4), 0 4px 6px -4px rgba(234, 88, 12, 0.4)',
            transition: 'all 0.2s ease',
            fontFamily: 'Inter, sans-serif'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#f97316';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#ea580c';
            e.currentTarget.style.transform = 'none';
          }}
        >
          <span>📱 Simulator</span>
        </button>
      )}
    </div>
  );
}

export default App;
