import { useState } from 'react';
import assetData from '../data/cloudinary-assets.json';

export default function Community() {
  const assets = assetData;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    inDatabase: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.firstName || 
      !formData.lastName || 
      !formData.email || 
      !formData.inDatabase || 
      !formData.subject || 
      !formData.message
    ) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSubmitted(true);
  };



  return (
    <div className="animate-fade-in">
      
      {/* Hero Header Section */}
      <section style={{ 
        width: '100%', 
        padding: '160px 8% 80px 8%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '960px'
      }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px' }}>
          <span className="section-tag" style={{ marginBottom: '16px', display: 'inline-block' }}>Creative Network</span>
          <h1 style={{ 
            fontSize: '4.25rem', 
            fontFamily: 'var(--font-title)', 
            color: '#0f172a',
            fontWeight: 800,
            lineHeight: '1.1',
            letterSpacing: '-0.03em',
            margin: 0
          }}>
            We are a base for creatives in Europe.
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-muted)',
            marginTop: '24px',
            lineHeight: '1.8',
            maxWidth: '620px',
            margin: '24px 0 0 0'
          }}>
            From the beginning, our priority has been to ensure the stories we tell reflect the communities we work in. That’s why we collaborate with local co-directors and partners on every trail, capturing the genuine spirit of each region.
          </p>
          <button 
            onClick={() => {
              const el = document.getElementById('creator-database-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            style={{
              backgroundColor: 'var(--color-accent)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '14px 28px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(234, 88, 12, 0.3)',
              marginTop: '32px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f97316';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(234, 88, 12, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent)';
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(234, 88, 12, 0.3)';
            }}
          >
            Join as a creator
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </button>
        </div>

        {/* Minimalist Animated Solar System */}
        <div className="solar-system-container" aria-hidden="true">
          <div className="solar-system-core" />
          
          {/* Inner Orbit: 3 items (Filmmaker, Photographer, Writer) */}
          <div className="orbit-circle orbit-inner">
            <div className="planet-node planet-node-inner planet-inner-1" title="Filmmaker">
              <div className="planet-node-visual">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 7l-7 5 7 5V7z" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <span className="planet-tooltip">Filmmaker</span>
            </div>
            <div className="planet-node planet-node-inner planet-inner-2" title="Photographer">
              <div className="planet-node-visual">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <span className="planet-tooltip">Photographer</span>
            </div>
            <div className="planet-node planet-node-inner planet-inner-3" title="Writer">
              <div className="planet-node-visual">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </div>
              <span className="planet-tooltip">Writer</span>
            </div>
          </div>

          {/* Middle Orbit: 4 items (Writer, Sound Designer, Designer, Filmmaker) */}
          <div className="orbit-circle orbit-middle">
            <div className="planet-node planet-node-middle planet-middle-1" title="Writer">
              <div className="planet-node-visual">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </div>
              <span className="planet-tooltip">Writer</span>
            </div>
            <div className="planet-node planet-node-middle planet-middle-2" title="Sound Designer">
              <div className="planet-node-visual">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              </div>
              <span className="planet-tooltip">Sound Designer</span>
            </div>
            <div className="planet-node planet-node-middle planet-middle-3" title="Designer">
              <div className="planet-node-visual">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C4.85857 19 4.5 20 5.5 21C6.5 22 7.5 21.5 7.5 21.5C8.89749 21.8241 10.3793 22 12 22Z" />
                  <circle cx="7.5" cy="10.5" r="1.5" />
                  <circle cx="11.5" cy="7.5" r="1.5" />
                  <circle cx="16.5" cy="9.5" r="1.5" />
                </svg>
              </div>
              <span className="planet-tooltip">Designer</span>
            </div>
            <div className="planet-node planet-node-middle planet-middle-4" title="Filmmaker">
              <div className="planet-node-visual">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 7l-7 5 7 5V7z" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <span className="planet-tooltip">Filmmaker</span>
            </div>
          </div>

          {/* Outer Orbit: 5 items (Designer, Writer, Photographer, Sound Designer, Filmmaker) */}
          <div className="orbit-circle orbit-outer">
            <div className="planet-node planet-node-outer planet-outer-1" title="Designer">
              <div className="planet-node-visual">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C4.85857 19 4.5 20 5.5 21C6.5 22 7.5 21.5 7.5 21.5C8.89749 21.8241 10.3793 22 12 22Z" />
                  <circle cx="7.5" cy="10.5" r="1.5" />
                  <circle cx="11.5" cy="7.5" r="1.5" />
                  <circle cx="16.5" cy="9.5" r="1.5" />
                </svg>
              </div>
              <span className="planet-tooltip">Designer</span>
            </div>
            <div className="planet-node planet-node-outer planet-outer-2" title="Writer">
              <div className="planet-node-visual">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </div>
              <span className="planet-tooltip">Writer</span>
            </div>
            <div className="planet-node planet-node-outer planet-outer-3" title="Photographer">
              <div className="planet-node-visual">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <span className="planet-tooltip">Photographer</span>
            </div>
            <div className="planet-node planet-node-outer planet-outer-4" title="Sound Designer">
              <div className="planet-node-visual">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              </div>
              <span className="planet-tooltip">Sound Designer</span>
            </div>
            <div className="planet-node planet-node-outer planet-outer-5" title="Filmmaker">
              <div className="planet-node-visual">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 7l-7 5 7 5V7z" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <span className="planet-tooltip">Filmmaker</span>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Movement Info Section */}
      <section id="creator-database-section" style={{ 
        width: '100%', 
        padding: '60px 8% 80px 8%',
        background: '#ffffff',
        borderBottom: '1px solid rgba(0, 0, 0, 0.03)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}>
        <h2 style={{ 
          fontFamily: 'var(--font-title)', 
          fontSize: '2.5rem', 
          color: '#0f172a', 
          marginBottom: '56px',
          fontWeight: 800,
          letterSpacing: '-0.02em'
        }}>
          Join the movement.
        </h2>

        <div style={{ 
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '64px',
          alignItems: 'start'
        }}>
          {/* Left Column: Visual Concepts of the Database */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: 'rgba(15, 59, 162, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                flexShrink: 0
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-title)', fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0' }}>
                  Europa Creator Database
                </h3>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                  A growing space to register your interest in the project and connect with others in our creative network.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: 'rgba(234, 88, 12, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-accent)',
                flexShrink: 0
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-title)', fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0' }}>
                  Diverse Creative Roles
                </h3>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                  Whether you are a filmmaker, designer, writer, researcher, sound artist, or just eager to collaborate.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: 'rgba(15, 59, 162, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                flexShrink: 0
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-title)', fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0' }}>
                  Get in Touch
                </h3>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                  Submit the form below to register, or email us directly if you prefer not to be listed in the public database.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Checkerboard cube of 4 crew photos */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '0',
            maxWidth: '360px',
            width: '100%',
            aspectRatio: '1',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            justifySelf: 'center',
            marginTop: '-16px'
          }}>
            {assets.crew && assets.crew.length > 0 ? (
              assets.crew.slice(0, 4).map((member, idx) => (
                <img 
                  key={idx} 
                  src={member.url} 
                  alt={member.name}
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    aspectRatio: '1', 
                    objectFit: 'cover'
                  }}
                />
              ))
            ) : (
              [1, 2, 3, 4].map((n) => (
                <div 
                  key={n} 
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    aspectRatio: '1', 
                    backgroundColor: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9ca3af'
                  }}
                >
                  👤
                </div>
              ))
            )}
          </div>
        </div>

        {/* Minimalist Bounce Scroll Arrow */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '64px'
        }}>
          <button
            onClick={() => {
              const formSection = document.querySelector('.integrated-form-panel');
              if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bounce-arrow"
            aria-label="Scroll to contact form"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px'
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </button>
        </div>
      </section>

      {/* Registration/Crew Contact Form - Expanded to 2 columns with visual photo */}
      <section style={{ 
        width: '100%', 
        padding: '100px 8%',
        background: '#f9fafb',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div className="integrated-form-panel">
          {/* Left Column: Image P1000814 (Integrated, uncropped, matching form height) */}
          {assets.crewPhotoP1000814 ? (
            <div className="integrated-photo-col">
              <img 
                src={assets.crewPhotoP1000814} 
                alt="Europa Crew Collaboration" 
              />
            </div>
          ) : (
            <div className="integrated-photo-placeholder">
              Crew Photo Placeholder
            </div>
          )}

          {/* Right Column: Contact Form (integrated in single panel) */}
          <div className="integrated-form-col">
            <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '2.25rem', fontWeight: 800, marginBottom: '12px', color: '#0f172a' }}>
              Join our crew
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.5' }}>
              Register for the Europa Creator Database or get in touch about creative collaborations.
            </p>

            {submitted ? (
              <div style={{ 
                padding: '24px', 
                backgroundColor: 'rgba(15, 59, 162, 0.05)', 
                border: '1px solid var(--color-primary)', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>Application Logged</h4>
                <p style={{ fontSize: '0.9rem' }}>Thank you for registering interest, {formData.firstName}. We will review your application soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">First Name *</label>
                    <input 
                      type="text" 
                      className="form-control"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name *</label>
                    <input 
                      type="text" 
                      className="form-control"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input 
                    type="email" 
                    className="form-control"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Are you listed on the Europa Creator Database? *</label>
                  <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="inDatabase"
                        value="yes"
                        checked={formData.inDatabase === 'yes'}
                        onChange={(e) => setFormData({...formData, inDatabase: e.target.value})}
                        style={{ accentColor: 'var(--color-primary)' }}
                      />
                      Yes
                    </label>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="inDatabase"
                        value="no"
                        checked={formData.inDatabase === 'no'}
                        onChange={(e) => setFormData({...formData, inDatabase: e.target.value})}
                        style={{ accentColor: 'var(--color-primary)' }}
                      />
                      No
                    </label>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginTop: '8px' }}>
                    Please note, there is a link to add your name to the database further up on this page.
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject *</label>
                  <input 
                    type="text" 
                    className="form-control"
                    required
                    placeholder="e.g. Director of Photography / Illustrator"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea 
                    className="form-control"
                    required
                    rows="4"
                    placeholder="Outline your background, creative skills, and why you'd like to collaborate..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                {error && <span style={{ color: '#dc2626', fontSize: '0.85rem', marginBottom: '16px', display: 'block' }}>{error}</span>}

                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
