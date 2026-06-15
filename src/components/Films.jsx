import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import assetData from '../data/cloudinary-assets.json';

const WATCH_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='46' viewBox='0 0 110 46'%3E%3Cdefs%3E%3Cfilter id='shadow' x='-10%25' y='-10%25' width='120%25' height='135%25'%3E%3CfeDropShadow dx='0' dy='4' stdDeviation='4' flood-color='%23000000' flood-opacity='0.18'/%3E%3C/filter%3E%3C/defs%3E%3Crect x='6' y='4' width='98' height='34' rx='17' fill='%23ffffff' fill-opacity='0.95' filter='url(%23shadow)'/%3E%3Cpolygon points='24,16 24,26 32,21' fill='%230f172a'/%3E%3Ctext x='40' y='25' font-family='system-ui, -apple-system, sans-serif' font-size='12' font-weight='700' fill='%230f172a' letter-spacing='0.08em'%3EWATCH%3C/text%3E%3C/svg%3E") 55 21, pointer`;


const getCountryStyle = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const rand1 = Math.abs((hash % 100) / 100);
  const rand2 = Math.abs(((hash >> 8) % 100) / 100);
  const rand3 = Math.abs(((hash >> 16) % 100) / 100);
  
  // Straight/flat positioning (0 rotation) but scattered vertically and horizontally.
  const translateX = Math.floor((rand1 - 0.5) * 50); // range: -25px to +25px
  const translateY = Math.floor((rand2 - 0.5) * 36); // range: -18px to +18px
  
  // Slightly adjust margins to add organic flow
  const marginTop = Math.floor(rand1 * 10 + 6);
  const marginBottom = Math.floor(rand2 * 10 + 6);
  const marginLeft = Math.floor(rand3 * 12 + 6);
  const marginRight = Math.floor(rand1 * 12 + 6);

  return {
    margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
    '--x-offset': `${translateX}px`,
    '--y-offset': `${translateY}px`,
    display: 'inline-block'
  };
};

export default function Films({ setActivePage }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [cardTransform, setCardTransform] = useState('none');
  const [cardTransition, setCardTransition] = useState('none');
  const [videoStarted, setVideoStarted] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  
  const assets = assetData;
  const partnerLogos = [
    { name: 'ACT Government', url: assets.logos.act_government },
    { name: 'Walk of Peace', url: assets.logos.walk_of_peace },
    { name: 'Go 2025', url: assets.logos.go2025_nova_gorica },
    { name: 'RTV SLO', url: assets.logos.rtv_slo },
    { name: 'Ulvang', url: assets.logos.ulvang },
    { name: 'Durston', url: assets.logos.durston }
  ];
  const videoRef = useRef(null);
  const bgVideoRef = useRef(null);
  const cardRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const flipDataRef = useRef(null);

  const countries = [
    'Albania', 'England', 'Estonia', 'Finland', 'France', 'Germany', 'Greece',
    'Ireland', 'Italy', 'Kosovo', 'Latvia', 'Lithuania', 'Montenegro', 'Norway',
    'Portugal', 'Romania', 'Scotland', 'Slovenia', 'Spain', 'Sweden', 'Wales'
  ];

  const handleVideoPlaying = () => {
    setVideoStarted(true);
  };

  // Sync volume with video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  // Handle skeleton unmounting after fade-out transition
  useEffect(() => {
    if (videoStarted) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 500); // 500ms matches the CSS fade transition
      return () => clearTimeout(timer);
    }
  }, [videoStarted]);

  // Safety fallback: if video doesn't play within 3s, fade out the skeleton anyway
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoStarted(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Spacebar play/pause key interception in watch mode
  useEffect(() => {
    if (!isFocused) return;

    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault(); // Prevent page scrolling
        if (videoRef.current) {
          if (videoRef.current.paused) {
            videoRef.current.play().catch(err => console.log('Play failed:', err));
            setIsPlaying(true);
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
            setShowControls(true);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFocused]);

  // Clear controls timer on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // Handle play/pause toggles (custom controls)
  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      videoRef.current.play().catch(err => console.log('Play failed:', err));
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      const muteState = newVol === 0;
      videoRef.current.muted = muteState;
      setIsMuted(muteState);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      if (newMuted) {
        setVolume(0);
      } else {
        setVolume(0.8);
      }
    }
  };

  const handleMouseMove = () => {
    if (!isFocused) return;

    // In watch mode, show controls and reset hide timer
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setShowControls(false);
      }
    }, 2500);
  };

  const handleCardClick = (e) => {
    if (isFocused) {
      // Toggle play/pause when in active watch mode
      togglePlay(e);
      return;
    }
    e.stopPropagation();

    // Store the current size and scroll position for the FLIP transition
    if (cardRef.current) {
      flipDataRef.current = {
        firstRect: cardRef.current.getBoundingClientRect(),
        firstScrollY: window.scrollY
      };
    }

    setIsFocused(true);
    setIsPlaying(true);
    setVolume(1.0);
    setIsMuted(false);

    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(err => console.log('Play failed:', err));
    }
  };

  // FLIP and custom smooth scroll synchronization
  useLayoutEffect(() => {
    if (isFocused && flipDataRef.current) {
      const { firstRect, firstScrollY } = flipDataRef.current;
      flipDataRef.current = null;

      const cardEl = cardRef.current;
      if (!cardEl) return;

      // 1. Measure the final layout geometry
      const lastRect = cardEl.getBoundingClientRect();

      // 2. Calculate sizing scales
      const scaleX = firstRect.width / lastRect.width;
      const scaleY = firstRect.height / lastRect.height;

      // 3. Compute absolute top and final scroll target to center video
      const cardAbsoluteTop = lastRect.top + window.scrollY;
      const targetScrollTop = cardAbsoluteTop - (window.innerHeight - lastRect.height) / 2;

      // 4. Calculate translation offsets (accounting for the margin and scroll difference)
      const deltaX = firstRect.left - lastRect.left;
      const deltaY = (firstRect.top + firstScrollY) - cardAbsoluteTop;

      // 5. Apply the inverted transform instantly
      setCardTransform(`translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scaleX}, ${scaleY})`);
      setCardTransition('none');

      // 6. Custom synchronized smooth scroll
      const duration = 600;
      const startY = window.scrollY;
      const difference = targetScrollTop - startY;
      const startTime = performance.now();
      let isCancelled = false;

      const cancelScroll = () => {
        isCancelled = true;
        window.removeEventListener('wheel', cancelScroll);
        window.removeEventListener('touchmove', cancelScroll);
      };

      window.addEventListener('wheel', cancelScroll, { passive: true });
      window.addEventListener('touchmove', cancelScroll, { passive: true });

      const scrollStep = (currentTime) => {
        if (isCancelled) return;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4); // easeOutQuart

        window.scrollTo(0, startY + difference * ease);

        if (progress < 1) {
          requestAnimationFrame(scrollStep);
        } else {
          window.removeEventListener('wheel', cancelScroll);
          window.removeEventListener('touchmove', cancelScroll);
        }
      };

      requestAnimationFrame(scrollStep);

      // 7. Transition to the final state in the next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setCardTransition('transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s cubic-bezier(0.25, 1, 0.5, 1)');
          setCardTransform('translate3d(0, 0, 0) scale(1)');
        });
      });

      // 8. Clean up styles after transition finishes
      const cleanupTimeout = setTimeout(() => {
        setCardTransform('none');
        setCardTransition('none');
      }, duration + 50);

      return () => {
        clearTimeout(cleanupTimeout);
        isCancelled = true;
        window.removeEventListener('wheel', cancelScroll);
        window.removeEventListener('touchmove', cancelScroll);
      };
    }
  }, [isFocused]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      if (!videoStarted && time > 0.1) {
        setVideoStarted(true);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTimelineChange = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
    if (bgVideoRef.current) {
      bgVideoRef.current.currentTime = time;
    }
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (!cardRef.current) return;
    if (!document.fullscreenElement) {
      cardRef.current.requestFullscreen().catch(err => console.log('Fullscreen failed:', err));
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // FAQ Hover State
  const [activeFaq, setActiveFaq] = useState(null);



  return (
    <div className="animate-fade-in">
      
      {/* Hero and Trailer Wrapper with seamless blurred background */}
      <div className="films-hero-wrapper" style={{ position: 'relative', width: '100%', overflow: 'hidden', marginTop: '-80px', backgroundColor: '#ffffff', overflowAnchor: 'none' }}>
        
        {/* Super blurred video background anchored to the top of the viewport */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          overflow: 'hidden',
          zIndex: 0,
          pointerEvents: 'none'
        }}>
          {assets.trailer ? (
            <video
              ref={bgVideoRef}
              src={assets.trailer}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'blur(80px) saturate(1.7) brightness(1.05)',
                opacity: (videoStarted && isPlaying) ? 0.42 : 0,
                transition: 'opacity 1s ease-in-out',
                transform: 'scale(1.2) translate3d(0, 0, 0)', // Force GPU layering
                willChange: 'transform'
              }}
            />
          ) : null}
          {/* Soft linear gradient to fade out the video towards the bottom, with a white fade behind the hero sentence */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.1) 20%, transparent 40%, transparent 46%, rgba(255, 255, 255, 0.75) 58%, #ffffff 68%, #ffffff 100%)', // Fades to white between 58% and 68% height
          }} />
        </div>

        {/* Hero Header Section - Centered, transparent, and positioned higher */}
        <section className="films-hero-section" style={{ 
          width: '100%', 
          height: '60vh',
          minHeight: '440px',
          padding: '160px 8% 40px 8%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          textAlign: 'center',
          background: 'transparent',
          position: 'relative',
          zIndex: 1
        }}>
          <h1 style={{ 
            fontSize: '4.75rem', 
            fontFamily: 'var(--font-title)', 
            color: '#0f172a',
            fontWeight: 800,
            lineHeight: '1.1',
            maxWidth: '900px',
            letterSpacing: '-0.03em',
            margin: 0
          }}>
            We’re hiking <span style={{ color: 'var(--color-secondary)' }}>Europe</span> to tell a <span style={{ color: 'var(--color-secondary)' }}>story</span>.
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--text-muted)',
            marginTop: '24px',
            maxWidth: '620px',
            lineHeight: '1.6'
          }}>
            A cinematic exploration of borders, culture, and community.
          </p>
        </section>

        {/* Interactive Trailer Player - Massive card overlapping the Hero section high up */}
        <section 
          ref={playerContainerRef}
          className="films-player-section"
          style={{ 
            padding: '0 8% 60px 8%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: isFocused ? '-120px' : '-180px',
            position: 'relative',
            zIndex: 2,
            overflowAnchor: 'none'
          }}
        >
          <div 
            ref={cardRef}
            className="video-player-card"
            onMouseMove={handleMouseMove}
            onClick={handleCardClick}
            style={{ 
              position: 'relative',
              width: '100%',
              maxWidth: isFocused ? '1600px' : '1350px',
              aspectRatio: '16/9',
              background: '#000000',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: isFocused ? '0 40px 90px rgba(0, 0, 0, 0.24)' : '0 25px 60px rgba(0, 0, 0, 0.12)', // Deepened shadow when focused
              cursor: isFocused ? 'auto' : WATCH_CURSOR,
              transform: cardTransform,
              transition: cardTransition,
              willChange: 'transform',
              overflowAnchor: 'none'
            }}
          >
            {/* Logo Watermark Overlay */}
            {assets.logo && (
              <img 
                src={assets.logo} 
                alt="Logo" 
                style={{ 
                  position: 'absolute', 
                  top: '24px', 
                  left: '24px', 
                  height: '32px', 
                  width: 'auto', 
                  opacity: 0.85, 
                  zIndex: 5, 
                  pointerEvents: 'none',
                  filter: 'brightness(0) invert(1)' // Convert dark text logo to pure white
                }} 
              />
            )}

            {assets.trailer ? (
              <>
                <video
                  ref={videoRef}
                  src={assets.trailer}
                  autoPlay
                  loop
                  muted={!isFocused}
                  playsInline
                  crossOrigin="anonymous"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onPlaying={handleVideoPlaying}
                  onPlay={() => {
                    if (bgVideoRef.current && !bgVideoRef.current.paused) return;
                    bgVideoRef.current?.play().catch(err => console.log('BG play failed:', err));
                  }}
                  onPause={() => {
                    bgVideoRef.current?.pause();
                  }}
                  onSeeked={() => {
                    if (bgVideoRef.current && videoRef.current) {
                      bgVideoRef.current.currentTime = videoRef.current.currentTime;
                    }
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'translate3d(0, 0, 0)',
                    willChange: 'transform'
                  }}
                />
                {showSkeleton && (
                  <div className={`video-player-skeleton ${videoStarted ? 'fade-out' : ''}`}>
                    <div className="skeleton-thumbnail shimmer"></div>
                    <div className="skeleton-footer">
                      <div className="skeleton-avatar shimmer"></div>
                      <div className="skeleton-text-container">
                        <div className="skeleton-line title shimmer"></div>
                        <div className="skeleton-line subtitle shimmer"></div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: '#9ca3af',
                padding: '24px',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🎞️</span>
                <p style={{ fontWeight: 600 }}>Europa Project Trailer</p>
                <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>Uploading video from downloads folder to Cloudinary...</p>
              </div>
            )}

            {/* Custom Modern Minimalist Controls (Watch mode only) */}
            {isFocused && assets.trailer && (
              <div 
                className="video-controls-overlay"
                style={{
                  opacity: showControls ? 1 : 0,
                  pointerEvents: showControls ? 'auto' : 'none'
                }}
              >
                {/* Center Play/Pause Button */}
                <button 
                  onClick={(e) => { e.stopPropagation(); togglePlay(e); }} 
                  className="center-play-btn"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>

                {/* Top-Right Volume Control */}
                <div className="volume-control-wrapper" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={toggleMute} 
                    className="volume-btn"
                    aria-label="Toggle Mute"
                  >
                    {isMuted || volume === 0 ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </svg>
                    ) : volume < 0.5 ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                    )}
                  </button>
                  <div className="volume-slider-popover">
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="vertical-volume-slider"
                      style={{
                        background: `linear-gradient(to right, #ffffff 0%, #ffffff ${volume * 100}%, rgba(255, 255, 255, 0.25) ${volume * 100}%, rgba(255, 255, 255, 0.25) 100%)`
                      }}
                    />
                  </div>
                </div>

                {/* Bottom Timeline and Fullscreen button */}
                <div className="bottom-controls-bar">
                  <span className="current-time-display">
                    {formatTime(currentTime)}
                  </span>
                  
                  {/* Bottom Play/Pause Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); togglePlay(e); }} 
                    className="bottom-play-btn"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                  </button>

                  <div className="timeline-container" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="range" 
                      min="0" 
                      max={duration || 100} 
                      value={currentTime} 
                      onChange={handleTimelineChange}
                      className="custom-scrubber"
                      style={{
                        background: `linear-gradient(to right, var(--color-secondary) 0%, var(--color-secondary) ${(currentTime / (duration || 1)) * 100}%, rgba(255, 255, 255, 0.25) ${(currentTime / (duration || 1)) * 100}%, rgba(255, 255, 255, 0.25) 100%)`
                      }}
                    />
                  </div>
                  <button onClick={toggleFullscreen} className="fullscreen-btn" aria-label="Toggle Fullscreen">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

      {/* Narrative Section */}
      <section style={{ 
        width: '100%', 
        padding: '80px 8% 80px 8%',
        background: 'transparent',
        marginTop: '-1px', // Eliminate subpixel rendering line separator
        borderBottom: '1px solid rgba(0, 0, 0, 0.03)',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden' // Crop the SVG trail so it doesn't spill out
      }}>
        {/* Trail SVG Map Path */}
        <svg 
          className="trail-map-svg"
          viewBox="0 0 1200 600" 
          preserveAspectRatio="xMidYMid slice" // Preserves aspect ratio and scales uniformly
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0
          }}
        >
          <path 
            d="M 1200,180 C 1050,150 900,120 780,200 C 660,280 580,160 480,210 C 400,250 380,330 330,340 C 280,350 260,260 220,280 C 180,300 170,390 220,440 C 270,490 360,400 380,480 C 390,520 330,540 290,540 C 200,540 100,500 0,470"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2.5"
            strokeDasharray="8 6"
            strokeLinecap="round"
            strokeOpacity="0.42"
            vectorEffect="non-scaling-stroke"
          />
          {/* Minimalist Modern GPS Navigator Arrowheads in orange along the trail */}
          <g transform="translate(550, 190) rotate(-100) scale(0.6) translate(-12, -12)">
            <path d="M12 2L2 22l10-6 10 6L12 2z" fill="var(--color-accent)" />
          </g>
          <g transform="translate(350, 300) rotate(-135) scale(0.6) translate(-12, -12)">
            <path d="M12 2L2 22l10-6 10 6L12 2z" fill="var(--color-accent)" />
          </g>
          <g transform="translate(240, 300) rotate(-60) scale(0.6) translate(-12, -12)">
            <path d="M12 2L2 22l10-6 10 6L12 2z" fill="var(--color-accent)" />
          </g>
          <g transform="translate(290, 460) rotate(15) scale(0.6) translate(-12, -12)">
            <path d="M12 2L2 22l10-6 10 6L12 2z" fill="var(--color-accent)" />
          </g>
          <g transform="translate(100, 495) rotate(-160) scale(0.6) translate(-12, -12)">
            <path d="M12 2L2 22l10-6 10 6L12 2z" fill="var(--color-accent)" />
          </g>
        </svg>

        {/* Main Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '56px', width: '100%', position: 'relative', zIndex: 1 }}>
          <h2 style={{ 
            fontFamily: 'var(--font-title)', 
            fontSize: '3.5rem', 
            color: '#0f172a', 
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: '1.1',
            margin: 0
          }}>
            15 Trails, 21 Countries
          </h2>
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--color-primary)', 
            lineHeight: '1.4', 
            fontWeight: 600,
            fontFamily: 'var(--font-title)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            margin: 0
          }}>
            One trail at a time.
          </p>
        </div>

        <div className="narrative-grid">
          {/* Left Column: Country Pills Cloud */}
          <div className="pills-cloud">
            {countries.map((country) => {
              const isExplored = country === 'Slovenia' || country === 'Italy';
              return (
                <span 
                  key={country} 
                  className={`country-pill ${isExplored ? 'country-pill-explored' : ''}`}
                  style={getCountryStyle(country)}
                >
                  {country} {isExplored && '✦'}
                </span>
              );
            })}
          </div>

          {/* Right Column: Origin story and info cards grid, with white masking background */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-start',
            gap: '32px',
            background: '#ffffff', // Solid white background masks the trail underneath
            position: 'relative',
            zIndex: 1, // Sit above the SVG trail layer
            padding: '24px', // Extra padding to mask the trail nicely
            margin: '-24px', // Pull back margin to keep layout exact
            borderRadius: '12px'
          }}>
            <p style={{ fontSize: '1.4rem', color: '#0f172a', lineHeight: '1.85', fontWeight: 500, margin: 0 }}>
              Imagine this: You're sitting at a café with friends on a warm spring day. Someone throws out an idea—what if we hiked across Europe as a way to counter growing division? A week later, the plan is in motion, and your life is about to change.
            </p>

            {/* Graphic Info Cards Grid (placed directly under the text) */}
            <div className="info-cards-grid">
              {/* Card 1: Chapter I - Featured (Most important, first, and widest) */}
              <div className="info-card-item info-card-featured info-card-dark">
                <span style={{ 
                  color: 'var(--color-accent)', 
                  fontSize: '0.75rem', 
                  fontWeight: 800, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em',
                  marginBottom: '2px'
                }}>
                  Now In Post Production
                </span>
                <h3 className="info-card-title">Pot Miru, The Walk of Peace</h3>
                <p className="info-card-desc">
                  Filming completed in July 2025 on the Pot Miru. Post-production is underway, with upcoming chapters in active pre-production.
                </p>
              </div>

              {/* Card 2: Collaboration */}
              <div className="info-card-item">
                <h3 className="info-card-title">Local Filmmaking</h3>
                <p className="info-card-desc">
                  Collaborating on every border trail with local filmmakers and crews to capture what makes each region unique, while exploring what connects us.
                </p>
              </div>

              {/* Card 3: Deliverables */}
              <div className="info-card-item">
                <h3 className="info-card-title">8 chapters, 1 documentary</h3>
                <p className="info-card-desc">
                  Producing eight distinct chapters covering individual trails, culminating in a single feature-length documentary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      </div>

      {/* FAQ Section */}
      <section id="faq" style={{ 
        width: '100%', 
        padding: '100px 8% 24px 8%',
        scrollMarginTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          fontSize: '3rem', 
          fontFamily: 'var(--font-title)', 
          color: '#0f172a',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          marginBottom: '16px',
          margin: 0
        }}>
          Frequently Asked Questions
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '48px', maxWidth: '600px' }}>
          Hover over each question to reveal the answers and find out more about the trail, crew, and funding.
        </p>

        {/* Horizontal scroll/grid row for FAQ cards */}
        <div className="faq-grid-row">
          {/* FAQ 1: Trails */}
          <div 
            className="faq-hover-card"
            onMouseEnter={() => setActiveFaq('trails')}
            onMouseLeave={() => setActiveFaq(null)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: activeFaq === 'trails' ? '16px' : '0' }}>
              <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--text-main)', textAlign: 'left', margin: 0 }}>
                How do you pick the trails?
              </h3>
              <span style={{ fontSize: '1.25rem', color: 'var(--color-primary)', fontWeight: 700, marginLeft: '12px' }}>
                {activeFaq === 'trails' ? '−' : '+'}
              </span>
            </div>
            {activeFaq === 'trails' && (
              <div style={{ animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards', textAlign: 'left' }}>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                  We map out culturally significant trails, then consider geographical location, historical relevance, and the socio-political context. We look for stories that resonate today and connect people.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 2: Funding */}
          <div 
            className="faq-hover-card"
            onMouseEnter={() => setActiveFaq('funding')}
            onMouseLeave={() => setActiveFaq(null)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: activeFaq === 'funding' ? '16px' : '0' }}>
              <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--text-main)', textAlign: 'left', margin: 0 }}>
                How is the project funded?
              </h3>
              <span style={{ fontSize: '1.25rem', color: 'var(--color-primary)', fontWeight: 700, marginLeft: '12px' }}>
                {activeFaq === 'funding' ? '−' : '+'}
              </span>
            </div>
            {activeFaq === 'funding' && (
              <div style={{ animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards', textAlign: 'left' }}>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                  This is a labor of love. We invest personal resources, small grants, and crowdfunding. Funding priority goes to paying local creatives. The directors work voluntarily.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 3: Crew */}
          <div 
            className="faq-hover-card"
            onMouseEnter={() => setActiveFaq('crew')}
            onMouseLeave={() => setActiveFaq(null)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: activeFaq === 'crew' ? '16px' : '0' }}>
              <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--text-main)', textAlign: 'left', margin: 0 }}>
                How many crew members?
              </h3>
              <span style={{ fontSize: '1.25rem', color: 'var(--color-primary)', fontWeight: 700, marginLeft: '12px' }}>
                {activeFaq === 'crew' ? '−' : '+'}
              </span>
            </div>
            {activeFaq === 'crew' && (
              <div style={{ animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards', textAlign: 'left' }}>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                  Our crew is limited to five people. This ensures that interviewees feel comfortable, open, and not intimidated by a large production footprint on the trail.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 4: Hiking */}
          <div 
            className="faq-hover-card"
            onMouseEnter={() => setActiveFaq('hiking')}
            onMouseLeave={() => setActiveFaq(null)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: activeFaq === 'hiking' ? '16px' : '0' }}>
              <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--text-main)', textAlign: 'left', margin: 0 }}>
                Why hike to tell this story?
              </h3>
              <span style={{ fontSize: '1.25rem', color: 'var(--color-primary)', fontWeight: 700, marginLeft: '12px' }}>
                {activeFaq === 'hiking' ? '−' : '+'}
              </span>
            </div>
            {activeFaq === 'hiking' && (
              <div style={{ animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards', textAlign: 'left' }}>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                  Walking a well-worn trail invites open, respectful conversations. By filming this journey, we bring this quiet camaraderie and sense of shared future to the screen.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section style={{ 
        width: '100%', 
        padding: '0 8% 100px 8%',
        display: 'flex',
        justifyContent: 'center'
      }}>
        {/* Large Dark Mode Panel */}
        <div style={{
          width: '100%',
          maxWidth: '1250px',
          background: '#0a0e17', // Dark mode background
          borderRadius: '8px',
          padding: '64px 60px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '28px',
          position: 'relative'
        }} className="partner-dark-panel">
          
          <h2 style={{ 
            fontFamily: 'var(--font-title)', 
            fontSize: '3.5rem', 
            fontWeight: 800, 
            color: '#ffffff',
            lineHeight: '1.1',
            margin: 0
          }}>
            Want to partner with us?
          </h2>

          <p style={{ 
            fontSize: '1.15rem', 
            color: '#d1d5db', 
            lineHeight: '1.6', 
            margin: '0 auto',
            maxWidth: '680px'
          }}>
            Do you manage a cultural trail in Europe or share our vision? We’d love to hear from you! Let's build connections together.
          </p>

          <button 
            onClick={() => {
              setActivePage('partners-press');
              window.scrollTo({ top: 0, behavior: 'smooth' });
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
              marginTop: '8px'
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
            Get in Touch
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>

          <div style={{
            width: '100%',
            maxWidth: '800px',
            height: '1px',
            background: 'rgba(255, 255, 255, 0.1)',
            margin: '32px 0 12px 0'
          }} />

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '40px',
            width: '100%'
          }}>
            {partnerLogos.map((logo) => (
              <img 
                key={logo.name}
                src={logo.url}
                alt={logo.name}
                className={`partner-logo-img ${logo.name === 'Walk of Peace' ? 'partner-logo-wop' : ''}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
