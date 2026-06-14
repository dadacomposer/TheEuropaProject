import { useState, useEffect, useRef } from 'react';
import assetData from '../data/cloudinary-assets.json';

export default function PartnersPress() {
  const assets = assetData;
  const [formData, setFormData] = useState({ name: '', email: '', org: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const [counts, setCounts] = useState({ tiktok: 0, instagram: 0, threads: 0 });
  const [animated, setAnimated] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    if (!statsRef.current) return;
    if (animated) return;
    
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setAnimated(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [animated]);

  useEffect(() => {
    if (!animated) return;
    
    let start = null;
    const duration = 1500;
    let animationFrameId;
    
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      setCounts({
        tiktok: Math.floor(easeProgress * 10),
        instagram: Math.floor(easeProgress * 50),
        threads: Math.floor(easeProgress * 13)
      });
      
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCounts({ tiktok: 10, instagram: 50, threads: 13 });
      }
    };
    
    animationFrameId = window.requestAnimationFrame(step);
    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [animated]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('collaborate-contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-fade-in">
      
      {/* Hero Header Section */}
      <section style={{ 
        width: '100%', 
        padding: '120px 8% 40px 8%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}>
        <span className="section-tag" style={{ marginBottom: '16px' }}>Network & Support</span>
        <h1 style={{ 
          fontSize: '4.25rem', 
          fontFamily: 'var(--font-title)', 
          color: '#0f172a',
          fontWeight: 800,
          lineHeight: '1.1',
          maxWidth: '850px',
          letterSpacing: '-0.03em',
          margin: 0
        }}>
          This is not a journey we can walk alone. Join us.
        </h1>
      </section>

      {/* Logos and Collaboration Section */}
      <section style={{ 
        width: '100%', 
        padding: '80px 8%',
        scrollMarginTop: '100px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        {/* Floating Container Panel */}
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          background: '#ffffff',
          borderRadius: '8px',
          padding: '80px 5%',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(0, 0, 0, 0.03)'
        }}>
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

          <div className="partners-grid-layout" style={{ position: 'relative', zIndex: 1 }}>
            {/* Left Column: Logos Table */}
            <div style={{ width: '100%', overflowX: 'auto' }}>
              <table className="partners-table" style={{ marginTop: 0 }}>
                <tbody>
                  {/* Row 1: Supported By */}
                  <tr>
                    <td className="category-cell">
                      Supported By
                    </td>
                    <td className="content-cell">
                      <div className="logo-flex-container">
                        {assets.logos?.act_government ? (
                          <div className="partner-logo-card">
                            <img 
                              src={assets.logos.act_government} 
                              alt="ACT Government" 
                              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            />
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 600 }}>ACT GOVERNMENT</span>
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Row 2: Partners & Collaborators */}
                  <tr>
                    <td className="category-cell">
                      Partners & Collaborators
                    </td>
                    <td className="content-cell">
                      <div className="logo-flex-container">
                        {['walk_of_peace', 'go2025_nova_gorica', 'ulvang', 'durston'].map((key) => {
                          const logoUrl = assets.logos?.[key];
                          const name = key.replace(/_/g, ' ').toUpperCase();
                          return (
                            <div key={key} className="partner-logo-card">
                              {logoUrl ? (
                                <img 
                                  src={logoUrl} 
                                  alt={name} 
                                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                />
                              ) : (
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 600 }}>{name}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  </tr>

                  {/* Row 3: Media Institutions */}
                  <tr>
                    <td className="category-cell">
                      Media Institutions
                    </td>
                    <td className="content-cell">
                      <div className="logo-flex-container">
                        {assets.logos?.rtv_slo ? (
                          <div className="partner-logo-card">
                            <img 
                              src={assets.logos.rtv_slo} 
                              alt="RTV SLO" 
                              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            />
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 600 }}>RTV SLO</span>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Right Column: Collaboration Pitch */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              gap: '24px',
              alignItems: 'flex-start',
              width: '100%',
              minHeight: '100%'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                <span className="section-tag" style={{ alignSelf: 'flex-start' }}>Collaborate</span>
                <h2 style={{ 
                  fontFamily: 'var(--font-title)', 
                  fontSize: '2.75rem', 
                  color: 'var(--color-primary)', 
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: '1.15',
                  margin: 0
                }}>
                  Do you want to collaborate?
                </h2>
                <p style={{ 
                  fontSize: '1.15rem', 
                  color: 'var(--text-muted)', 
                  lineHeight: '1.8',
                  margin: 0
                }}>
                  Whether you're a brand interested in sponsoring our journey or an organisation eager to help amplify it, we’d love to connect with you!
                </p>
              </div>

              {/* Animated Counters Grid */}
              <div ref={statsRef} style={{ 
                display: 'flex', 
                gap: '16px', 
                width: '100%', 
                margin: '0',
                padding: '16px 0',
                borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                justifyContent: 'space-between'
              }}>
                {/* TikTok Counter */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'var(--font-title)', lineHeight: '1' }}>
                    {counts.tiktok}K
                  </div>
                  <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '24px' }} title="TikTok">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.01 1.62 4.18 1.23 1.33 2.95 2.15 4.68 2.41v3.96c-1.85-.05-3.66-.78-5.12-1.95-.34-.28-.66-.58-.95-.9v6.59a7.66 7.66 0 0 1-1.4 4.39A7.73 7.73 0 0 1 5.3 18.06a7.68 7.68 0 0 1-.22-5.78 7.71 7.71 0 0 1 5.34-4.99V11.4a3.84 3.84 0 0 0-2.48 2.45 3.79 3.79 0 0 0 .52 3.23c1.07 1.48 3.15 1.95 4.73 1.05a3.83 3.83 0 0 0 1.63-3.18V.02h.02z"/>
                    </svg>
                  </div>
                </div>

                {/* Instagram Counter */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'var(--font-title)', lineHeight: '1' }}>
                    {counts.instagram}K
                  </div>
                  <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '24px' }} title="Instagram">
                    <svg viewBox="0 0 16 16" fill="currentColor" width="18" height="18">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                    </svg>
                  </div>
                </div>

                {/* Threads Counter */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'var(--font-title)', lineHeight: '1' }}>
                    {counts.threads}K
                  </div>
                  <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '24px' }} title="Threads">
                    <svg viewBox="0 0 16 16" fill="currentColor" width="18" height="18">
                      <path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bottom Actions Container (Say Hello + Media links) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', marginTop: 'auto' }}>
                <button className="btn-primary" onClick={scrollToContact} style={{ padding: '16px 32px', fontSize: '1rem', width: '100%' }}>
                  Say Hello
                </button>
                
                <div className="media-links-container" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a 
                    href="https://365.rtvslo.si/podkast/dogodki-in-odmevi/175146033" 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-secondary"
                    style={{ fontSize: '0.9rem', textTransform: 'none', padding: '12px 24px', width: '100%', textAlign: 'center' }}
                  >
                    🎙️ Podcast Interview (13 July 2025)
                  </a>
                  <a 
                    href="https://www.rtvslo.si/rtv365/arhiv/175148922?s=mmc" 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-secondary"
                    style={{ fontSize: '0.9rem', textTransform: 'none', padding: '12px 24px', width: '100%', textAlign: 'center' }}
                  >
                    📺 Video Interview / Archive (27 July 2025)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Contact Form Section */}
      <section id="collaborate-contact" style={{ 
        width: '100%', 
        padding: '80px 8%',
        scrollMarginTop: '100px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        {/* Floating Container Panel */}
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          background: 'transparent',
          borderRadius: '8px',
          padding: '80px 5%',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(0, 0, 0, 0.03)'
        }}>
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

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '64px',
            alignItems: 'start',
            width: '100%',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Left Column: Content */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span className="section-tag" style={{ marginBottom: '16px', display: 'inline-block' }}>Get In Touch</span>
              <h2 style={{
                fontSize: '3.25rem',
                fontFamily: 'var(--font-title)',
                color: '#0f172a',
                fontWeight: 800,
                lineHeight: '1.15',
                letterSpacing: '-0.02em',
                margin: '0 0 24px 0'
              }}>
                Say Hello
              </h2>
              <p style={{
                fontSize: '1.15rem',
                lineHeight: '1.75',
                color: 'var(--text-muted)',
                marginBottom: '16px',
                maxWidth: '540px'
              }}>
                Fill out the form to reach the Europa Project team. Whether you're a brand interested in sponsoring our journey or an organisation eager to help amplify it, we’d love to connect with you!
              </p>
              
              <a 
                href="mailto:hello@theeuropaproject.eu" 
                className="glass-card" 
                style={{
                  padding: '24px 16px',
                  background: 'transparent',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  justifyContent: 'center',
                  minHeight: '150px',
                  width: '100%',
                  maxWidth: '240px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: 'none',
                  marginTop: '16px'
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
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" style={{ marginBottom: '12px', flexShrink: 0 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <h3 style={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  fontFamily: 'var(--font-title)',
                  marginBottom: '6px'
                }}>
                  Email Directly
                </h3>
                <p style={{ fontSize: '0.8rem', lineHeight: '1.4', color: 'var(--text-muted)', margin: 0 }}>
                  hello@theeuropaproject.eu
                </p>
              </a>
            </div>

            {/* Right Column: Contact Form */}
            <div style={{ width: '100%' }}>
              {submitted ? (
                <div style={{ 
                  padding: '24px', 
                  backgroundColor: 'rgba(15, 59, 162, 0.05)', 
                  border: '1px solid var(--color-primary)', 
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <h4 style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>Transmission Logged</h4>
                  <p style={{ fontSize: '0.9rem' }}>Thank you. We have received your inquiry and will respond shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input 
                      type="text" 
                      className="form-control"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input 
                      type="email" 
                      className="form-control"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Organization</label>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="Brand, Agency or Media Outlet"
                      value={formData.org}
                      onChange={(e) => setFormData({...formData, org: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea 
                      className="form-control"
                      required
                      rows="4"
                      placeholder="How can we cooperate?"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  {error && <span style={{ color: '#dc2626', fontSize: '0.85rem', marginBottom: '16px', display: 'block' }}>{error}</span>}

                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
