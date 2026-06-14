import { useState, useEffect } from 'react';
import assetData from '../data/cloudinary-assets.json';

const REELS = [
  {
    id: 1,
    url: "https://www.instagram.com/p/DZITJcHRcsU/",
    video: "https://res.cloudinary.com/djy1yx724/video/upload/f_auto,q_auto/v1781468829/europa-project/reels/reel_1.mp4",
    poster: "https://res.cloudinary.com/djy1yx724/image/upload/f_auto,q_auto/v1781475235/europa-project/reels/reel_1_actual_thumb.jpg"
  },
  {
    id: 2,
    url: "https://www.instagram.com/reel/DYm0z22hQXs/",
    video: "https://res.cloudinary.com/djy1yx724/video/upload/f_auto,q_auto/v1781468835/europa-project/reels/reel_2.mp4",
    poster: "https://res.cloudinary.com/djy1yx724/image/upload/f_auto,q_auto/v1781475235/europa-project/reels/reel_2_actual_thumb.jpg"
  },
  {
    id: 3,
    url: "https://www.instagram.com/reel/DYUzMPoSipb/",
    video: "https://res.cloudinary.com/djy1yx724/video/upload/f_auto,q_auto/v1781468849/europa-project/reels/reel_3.mp4",
    poster: "https://res.cloudinary.com/djy1yx724/image/upload/f_auto,q_auto/v1781475236/europa-project/reels/reel_3_actual_thumb.jpg"
  },
  {
    id: 4,
    url: "https://www.instagram.com/reel/DWWvILaOwAR/",
    video: "https://res.cloudinary.com/djy1yx724/video/upload/f_auto,q_auto/v1781468857/europa-project/reels/reel_4.mp4",
    poster: "https://res.cloudinary.com/djy1yx724/image/upload/f_auto,q_auto/v1781475237/europa-project/reels/reel_4_actual_thumb.jpg"
  },
  {
    id: 5,
    url: "https://www.instagram.com/reel/DWRllGGuM5Z/",
    video: "https://res.cloudinary.com/djy1yx724/video/upload/f_auto,q_auto/v1781468863/europa-project/reels/reel_5.mp4",
    poster: "https://res.cloudinary.com/djy1yx724/image/upload/f_auto,q_auto/v1781475238/europa-project/reels/reel_5_actual_thumb.jpg"
  }
];

export default function Mission({ setActivePage }) {
  const [scrollY, setScrollY] = useState(0);
  const [videoStarted, setVideoStarted] = useState(false);
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

  // Helper to optimize Cloudinary video URLs dynamically
  const getOptimizedVideoUrl = (url) => {
    if (!url) return '';
    if (url.includes('cloudinary.com') && url.includes('/video/upload/')) {
      const parts = url.split('/video/upload/');
      // Use the fully-cached best quality transformation to ensure byte-range request support on mobile devices
      return `${parts[0]}/video/upload/f_auto,q_auto:best/${parts[1]}`;
    }
    return url;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Safety fallback: if video doesn't play within 2.5s, fade out the mask anyway
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoStarted(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleJoinMovement = () => {
    setActivePage('community');
    setTimeout(() => {
      const dbSection = document.getElementById('creator-database-section');
      if (dbSection) {
        dbSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleTimeUpdate = (e) => {
    // Loop back to start at 2:27 (147 seconds)
    if (e.target.currentTime >= 147) {
      e.target.currentTime = 0;
    }
    if (e.target.currentTime > 0) {
      setVideoStarted(true);
    }
  };

  const heroOpacity = Math.max(0, 1 - scrollY / 400);
  const headerOpacity = Math.min(1, Math.max(0, (scrollY - 100) / 300));
  const translateY = Math.max(0, 20 * (1 - headerOpacity));

  return (
    <div className="animate-fade-in">
      
      <section style={{ 
        position: 'relative',
        width: '100%',
        height: '100vh',
        marginTop: '-80px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: '140px 8% 80px 8%'
      }}>
        {/* Background Video (acting as a background canvas, not interactive) */}
        {assets.trailer ? (
          <>
            <video
              src={getOptimizedVideoUrl(assets.trailer)}
              autoPlay
              loop
              muted
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onPlaying={() => setVideoStarted(true)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: isMobile ? '100%' : '140%',
                objectFit: 'cover',
                zIndex: 0,
                pointerEvents: 'none'
              }}
            />
            {/* White mask that covers the video until it starts playing */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: isMobile ? '100%' : '140%',
              backgroundColor: '#ffffff',
              zIndex: 1,
              opacity: videoStarted ? 0 : 1,
              transition: 'opacity 0.8s ease-in-out',
              pointerEvents: 'none'
            }} />
          </>
        ) : (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#f3f4f6',
            zIndex: 0
          }} />
        )}

        {/* Readability Overlay Gradient (Light Mode) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.85) 10%, rgba(255, 255, 255, 0.5) 25%, rgba(255, 255, 255, 0.15) 45%, rgba(255, 255, 255, 0.02) 70%, rgba(255, 255, 255, 0) 100%)',
          zIndex: 1,
          pointerEvents: 'none'
        }} />

        {/* Bottom Content Wrapper (Heading on left, Button on right) */}
        <div style={{ 
          position: 'relative', 
          zIndex: 2, 
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '32px',
          opacity: heroOpacity,
          pointerEvents: scrollY >= 400 ? 'none' : 'auto',
          transition: 'opacity 0.05s linear'
        }}>
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
            A bold and inclusive vision for Europe’s future.
          </h1>
          <div style={{ flexShrink: 0, paddingBottom: '8px' }}>
            <button 
              className="btn-primary" 
              onClick={handleJoinMovement}
              style={{ padding: '14px 32px', fontSize: '0.95rem' }}
            >
              Join the Movement
            </button>
          </div>
        </div>
      </section>

      {/* Main Text Section - Full width with 8% margins */}
      <section style={{ 
        width: '100%', 
        padding: '100px 8% 80px 8%',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}>

        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '32px',
          marginBottom: '40px',
          opacity: headerOpacity,
          transform: `translateY(${translateY}px)`,
          transition: 'opacity 0.05s linear, transform 0.05s linear'
        }}>
          <h2 style={{
            fontSize: '4.25rem',
            fontFamily: 'var(--font-title)',
            color: '#0f172a',
            fontWeight: 800,
            lineHeight: '1.1',
            maxWidth: '850px',
            letterSpacing: '-0.03em',
            margin: 0
          }}>
            We tell stories of hope.
          </h2>
          <div style={{ flexShrink: 0, paddingBottom: '8px' }}>
            <button 
              className="btn-primary" 
              onClick={handleJoinMovement}
              style={{ padding: '14px 32px', fontSize: '0.95rem' }}
            >
              Join the Movement
            </button>
          </div>
        </div>

        <div className="editorial-grid" style={{ gap: '24px', marginTop: '40px' }}>
          <div className="glass-card" style={{ flex: 1, padding: '32px' }}>
            <h3 style={{ 
              fontSize: '1.4rem', 
              fontWeight: 700, 
              color: 'var(--color-primary)', 
              marginBottom: '16px',
              fontFamily: 'var(--font-title)'
            }}>
              Fragile Peace
            </h3>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-muted)', margin: 0 }}>
              In our lifetime, Europe has been a place of remarkable peace. But rising nationalism and political division are shaking that fragile foundation, reminding us it can never be taken for granted.
            </p>
          </div>
          
          <div className="glass-card" style={{ flex: 1, padding: '32px' }}>
            <h3 style={{ 
              fontSize: '1.4rem', 
              fontWeight: 700, 
              color: 'var(--color-primary)', 
              marginBottom: '16px',
              fontFamily: 'var(--font-title)'
            }}>
              Solidarity
            </h3>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-muted)', margin: 0 }}>
              The Europa project is our call to resist this drift toward indifference. Through stories of connection and hope, we remind ourselves what Europe truly stands for.
            </p>
          </div>
          
          <div className="glass-card" style={{ flex: 1, padding: '32px' }}>
            <h3 style={{ 
              fontSize: '1.4rem', 
              fontWeight: 700, 
              color: 'var(--color-primary)', 
              marginBottom: '16px',
              fontFamily: 'var(--font-title)'
            }}>
              Action
            </h3>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-muted)', margin: 0 }}>
              Unity, cooperation, and peace are not guaranteed. They are active values that we must collectively fight to preserve, or we risk losing them in our lifetime.
            </p>
          </div>
        </div>

      </section>

      {/* Cinematic Film CTA Section */}
      <section style={{
        width: '100%',
        padding: '0 8% 80px 8%',
        background: '#ffffff'
      }}>
        <div className="cinematic-cta-card">
          {/* Subtle ambient glow inside the card */}
          <div style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(234, 88, 12, 0.05) 0%, rgba(234, 88, 12, 0) 70%)',
            pointerEvents: 'none',
            zIndex: 0
          }} />

          <div className="cinematic-grid">
            {/* Left Column: Video Preview */}
            <div className="cinematic-video-preview">
              {assets.trailer ? (
                <video
                  src={assets.trailer}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    pointerEvents: 'none'
                  }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b'
                }}>
                  Teaser Preview
                </div>
              )}
            </div>

            {/* Right Column: Content */}
            <div className="cinematic-content">
              <span className="section-tag" style={{ color: 'var(--color-accent)', borderColor: 'rgba(234, 88, 12, 0.2)', marginBottom: '16px' }}>
                Now In Post Production
              </span>
              <h3 style={{
                color: '#ffffff',
                fontSize: '2.5rem',
                fontWeight: 800,
                fontFamily: 'var(--font-title)',
                lineHeight: '1.25',
                letterSpacing: '-0.02em',
                margin: '0 0 16px 0'
              }}>
                Chapter I: The Walk of Peace
              </h3>
              <p style={{
                color: '#94a3b8',
                fontSize: '1.05rem',
                lineHeight: '1.75',
                marginBottom: '32px',
                maxWidth: '540px'
              }}>
                We are currently documenting the first chapter of our journey. The historical Walk of Peace trail traverses the breathtaking Julian Alps, connecting remnants of history and stories of human connection. Watch the official teaser trailer.
              </p>
              <button
                onClick={() => setActivePage('films')}
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
                  boxShadow: '0 4px 14px rgba(234, 88, 12, 0.3)'
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
                Watch Trailer
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section style={{ 
        width: '100%', 
        padding: '80px 8%',
        background: '#ffffff',
      }}>
        {/* Floating Container Panel */}
        <div style={{
          width: '100%',
          background: '#f5f5f4',
          borderRadius: '8px',
          padding: '80px 5%',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.04)'
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
              <h2 style={{
                fontSize: '3.25rem',
                fontFamily: 'var(--font-title)',
                color: '#0f172a',
                fontWeight: 800,
                lineHeight: '1.15',
                letterSpacing: '-0.02em',
                margin: '0 0 24px 0'
              }}>
                How you can support us?
              </h2>
              <p style={{
                fontSize: '1.15rem',
                lineHeight: '1.75',
                color: 'var(--text-muted)',
                marginBottom: '36px',
                maxWidth: '540px'
              }}>
                We are a small, collaborative team hiking across Europe's border trails. If our films and community resonate with you, here are the best ways to support the project.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '16px',
                width: '100%',
                maxWidth: '420px'
              }}>
                {/* Patreon Card */}
                <a 
                  href="https://www.patreon.com/cw/TheEuropaProject?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink" 
                  target="_blank" 
                  rel="noreferrer" 
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
                  <svg viewBox="0 0 1080 1080" fill="#ff424d" width="24" height="24" style={{ marginBottom: '12px', flexShrink: 0 }}>
                    <path d="M1033.05,324.45c-0.19-137.9-107.59-250.92-233.6-291.7c-156.48-50.64-362.86-43.3-512.28,27.2 C106.07,145.41,49.18,332.61,47.06,519.31c-1.74,153.5,13.58,557.79,241.62,560.67c169.44,2.15,194.67-216.18,273.07-321.33 c55.78-74.81,127.6-95.94,216.01-117.82C929.71,603.22,1033.27,483.3,1033.05,324.45z"/>
                  </svg>
                  <h3 style={{
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: '#0f172a',
                    fontFamily: 'var(--font-title)',
                    marginBottom: '6px'
                  }}>
                    Become a Patron
                  </h3>
                  <p style={{ fontSize: '0.8rem', lineHeight: '1.4', color: 'var(--text-muted)', margin: 0 }}>
                    Memberships from €5/month to fund creators, maps, and translations.
                  </p>
                </a>

                {/* Email Card */}
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
                    Say Hello
                  </h3>
                  <p style={{ fontSize: '0.8rem', lineHeight: '1.4', color: 'var(--text-muted)', margin: 0 }}>
                    Not supporting financially? Send us a quick hello or trail update.
                  </p>
                </a>
              </div>
            </div>

            {/* Right Column: Team Image */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
              {assets.team ? (
                <div style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(0, 0, 0, 0.06)'
                }}>
                  <img 
                    src={assets.team} 
                    alt="The Europa Project Team" 
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              ) : (
                <div style={{
                  height: '350px',
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
                fontSize: '0.85rem', 
                color: 'var(--text-muted)', 
                marginTop: '16px', 
                fontStyle: 'italic',
                textAlign: 'center' 
              }}>
                Left to right: Ažbe Železnik (Co-director, Chapter 1), Benjamin Wiesner (Co-founder & Director), Rowena Yates (Co-founder & Producer), Diogo Linhares (Co-director, Chapter 1), Jye Turner (Co-founder & Partnerships)
              </span>
            </div>
          </div>

          {/* Divider */}
          <div style={{
            height: '1px',
            background: 'rgba(0, 0, 0, 0.08)',
            margin: '56px 0 48px 0',
            width: '100%',
            position: 'relative',
            zIndex: 1
          }} />

          {/* Our Content Subsection */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '2.5rem',
              fontFamily: 'var(--font-title)',
              color: '#0f172a',
              fontWeight: 800,
              lineHeight: '1.2',
              marginBottom: '48px',
              maxWidth: '800px'
            }}>
              Get inspired and follow along.
            </h3>

            {/* Reels Grid */}
            <div className="reels-grid">
              {REELS.map((reel) => (
                <a
                  key={reel.id}
                  href={reel.url}
                  target="_blank"
                  rel="noreferrer"
                  className="reel-card"
                  title="View on Instagram"
                >
                  <img
                    src={reel.poster}
                    alt="Instagram Reel"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  <div className="reel-overlay" />
                </a>
              ))}
            </div>

            {/* Large Social Links */}
            <div className="large-social-links">
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
      </section>
    </div>
  );
}
