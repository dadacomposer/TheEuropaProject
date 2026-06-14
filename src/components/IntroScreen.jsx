import { useState, useEffect, useRef } from 'react';

// Helper to preload video with safety timeout
const preloadVideo = (url) => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    
    let resolved = false;
    const done = () => {
      if (resolved) return;
      resolved = true;
      resolve();
    };
    
    // Resolve when the video is ready to stream smoothly
    video.oncanplaythrough = done;
    video.oncanplay = done;
    video.onloadeddata = done;
    video.onerror = done;
    
    video.src = url;
    video.load();
    setTimeout(done, 6000); // 6.0s safety timeout
  });
};

// Helper to preload image with safety timeout
const preloadImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = url;
    setTimeout(resolve, 3500); // 3.5s safety timeout
  });
};

export default function IntroScreen({ logoUrl, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(10);
  const [fadeOut, setFadeOut] = useState(false);
  
  const progressRef = useRef(0);
  const targetRef = useRef(10);

  useEffect(() => {
    targetRef.current = targetProgress;
  }, [targetProgress]);

  useEffect(() => {
    // Cinematic trailer URL to preload
    const trailerUrl = 'https://res.cloudinary.com/djy1yx724/video/upload/v1781432939/europa-project/europa_trailer.mp4';
    
    const preloads = [preloadVideo(trailerUrl)];
    if (logoUrl) {
      preloads.push(preloadImage(logoUrl));
    }

    Promise.all(preloads).then(() => {
      setTargetProgress(100);
    });

    const intervalTime = 16;
    const timer = setInterval(() => {
      if (progressRef.current >= 100) {
        clearInterval(timer);
        // Start fade out transition (wait 600ms once the bar is full)
        setTimeout(() => {
          setFadeOut(true);
          // Complete intro after fade transition finishes (0.5s)
          setTimeout(() => {
            onComplete();
          }, 500);
        }, 600);
        return;
      }

      // Smooth step towards the target progress
      const diff = targetRef.current - progressRef.current;
      let increment = 1.0; // Baseline progress speed
      if (diff > 30) {
        increment = 2.0; // Catch up if assets load quickly
      }
      
      // Caps progress at 85% until targetProgress reaches 100% (signaling all preloads finished!)
      const limit = targetRef.current === 100 ? 100 : 85;
      const nextProgress = Math.min(progressRef.current + increment, limit);
      
      progressRef.current = nextProgress;
      setProgress(nextProgress);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [logoUrl, onComplete]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#f9fafb', // off-white matching website background
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      opacity: fadeOut ? 0 : 1,
      transform: fadeOut ? 'scale(1.02)' : 'scale(1)',
      transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      pointerEvents: fadeOut ? 'none' : 'auto'
    }}>
      {/* Centered Logo - Height reduced to 40px */}
      <div style={{
        marginBottom: '28px',
        opacity: progress > 8 ? 1 : 0,
        transform: `translateY(${progress > 8 ? '0' : '10px'})`,
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
      }}>
        {logoUrl && (
          <img 
            src={logoUrl} 
            alt="The Europa Project Logo" 
            style={{ height: '40px', width: 'auto', display: 'block' }} 
          />
        )}
      </div>

      {/* Bold Loading Bar Container - Height increased to 6px */}
      <div style={{
        width: '200px',
        height: '6px',
        backgroundColor: 'rgba(0, 0, 0, 0.06)',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Loading Bar Progress */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
          transition: 'width 0.03s linear',
          boxShadow: '0 0 8px rgba(37, 99, 235, 0.3)'
        }} />
      </div>
    </div>
  );
}
