import { useState, useRef } from 'react';

const DEVICES = [
  { name: 'iPhone 15 Pro', width: 393, height: 852, ratio: '19.5:9', type: 'ios' },
  { name: 'Samsung Galaxy S24', width: 360, height: 800, ratio: '20:9', type: 'android' },
  { name: 'Google Pixel 8 Pro', width: 412, height: 892, ratio: '19.5:9', type: 'android' },
  { name: 'iPhone SE', width: 375, height: 667, ratio: '16:9', type: 'ios-old' },
  { name: 'iPad Mini', width: 768, height: 1024, ratio: '4:3', type: 'tablet' }
];

export default function MobileSimulator() {
  const [selectedDevice, setSelectedDevice] = useState(DEVICES[0]);
  const [isLandscape, setIsLandscape] = useState(false);
  const [key, setKey] = useState(0); // For reloading the iframe
  const iframeRef = useRef(null);

  const handleReload = () => {
    setKey(prev => prev + 1);
  };

  const handleOrientationToggle = () => {
    setIsLandscape(prev => !prev);
  };

  const activeWidth = isLandscape ? selectedDevice.height : selectedDevice.width;
  const activeHeight = isLandscape ? selectedDevice.width : selectedDevice.height;

  const handleClose = () => {
    // Redirect to the homepage without the simulator parameter
    window.location.href = window.location.origin + window.location.pathname;
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#090d16',
      color: '#f8fafc',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      display: 'grid',
      gridTemplateColumns: '320px 1fr',
      overflow: 'hidden'
    }}>
      {/* Control Panel Sidebar */}
      <aside style={{
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(12px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        height: '100%',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}>
        {/* Header */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              padding: '2px 8px',
              borderRadius: '9999px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>Dev Tool</span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>v1.0.0</span>
          </div>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            margin: 0,
            background: 'linear-gradient(to right, #f8fafc, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Mobile Simulator
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '4px 0 0 0', lineHeight: 1.4 }}>
            Test your responsive adjustments in real-time.
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.08)', margin: 0 }} />

        {/* Device Selector */}
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Select Device
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {DEVICES.map((device) => {
              const isActive = selectedDevice.name === device.name;
              return (
                <button
                  key={device.name}
                  onClick={() => setSelectedDevice(device)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: isActive ? '#f97316' : 'rgba(255, 255, 255, 0.05)',
                    backgroundColor: isActive ? 'rgba(249, 115, 22, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                    color: isActive ? '#fdba74' : '#e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                  }}
                >
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{device.name}</span>
                  <span style={{ fontSize: '0.75rem', color: isActive ? '#f97316' : '#64748b', marginTop: '2px' }}>
                    {device.width} × {device.height}px ({device.ratio})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.08)', margin: 0 }} />

        {/* Configuration Controls */}
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Controls
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Orientation */}
            <button
              onClick={handleOrientationToggle}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                color: '#e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '0.85rem'
              }}
            >
              <span>Orientation: <strong>{isLandscape ? 'Landscape' : 'Portrait'}</strong></span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{
                transform: isLandscape ? 'rotate(90deg)' : 'none',
                transition: 'transform 0.3s ease',
                color: '#f97316'
              }}>
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </button>

            {/* Reload */}
            <button
              onClick={handleReload}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                color: '#e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '0.85rem'
              }}
            >
              <span>Refresh Sandbox</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#f97316' }}>
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
            </button>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.08)', margin: 0 }} />

        {/* Local Network Info */}
        <div style={{
          backgroundColor: 'rgba(249, 115, 22, 0.05)',
          border: '1px dashed rgba(249, 115, 22, 0.2)',
          borderRadius: '8px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: '#fdba74', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <line x1="12" y1="20" x2="12.01" y2="20" />
            </svg>
            Physical Phone Testing
          </h4>
          <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4 }}>
            Connect your phone to the same Wi-Fi network and scan/visit the network URL:
          </p>
          <code style={{
            display: 'block',
            backgroundColor: '#020617',
            padding: '6px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            color: '#38bdf8',
            textAlign: 'center',
            wordBreak: 'break-all',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            http://192.168.1.4:5173/
          </code>
        </div>

        {/* Exit Button */}
        <button
          onClick={handleClose}
          style={{
            marginTop: 'auto',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#fca5a5',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
            e.currentTarget.style.color = '#f87171';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.color = '#fca5a5';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Exit Simulator
        </button>
      </aside>

      {/* Simulator Workspace Screen */}
      <main style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        position: 'relative',
        background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)',
        overflow: 'auto'
      }}>
        {/* Device Frame Wrapper */}
        <div style={{
          position: 'relative',
          width: `${activeWidth}px`,
          height: `${activeHeight}px`,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 12px rgba(30, 41, 59, 0.8)',
          borderRadius: selectedDevice.type === 'tablet' ? '24px' : '44px',
          border: '4px solid #475569',
          backgroundColor: '#000000',
          boxSizing: 'content-box'
        }}>
          {/* Top Notch/Dynamic Island for iOS phones (when in portrait) */}
          {!isLandscape && selectedDevice.type === 'ios' && (
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '110px',
              height: '30px',
              backgroundColor: '#000000',
              borderRadius: '20px',
              zIndex: 10,
              boxShadow: 'inset 0 0 4px rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 12px',
              boxSizing: 'border-box'
            }}>
              {/* Camera Lens */}
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
              {/* Sensor */}
              <div style={{ width: '30px', height: '4px', borderRadius: '2px', backgroundColor: '#0f172a' }} />
            </div>
          )}

          {/* Android Punch Hole Camera (when in portrait) */}
          {!isLandscape && selectedDevice.type === 'android' && (
            <div style={{
              position: 'absolute',
              top: '14px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '12px',
              height: '12px',
              backgroundColor: '#0f172a',
              borderRadius: '50%',
              border: '2px solid #000000',
              zIndex: 10
            }} />
          )}

          {/* Device Screen Iframe Container */}
          <div style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            borderRadius: selectedDevice.type === 'tablet' ? '18px' : '38px',
            backgroundColor: '#ffffff',
            position: 'relative'
          }}>
            <iframe
              key={key}
              ref={iframeRef}
              src="/"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                backgroundColor: '#ffffff'
              }}
              title="Simulator Viewport"
            />
          </div>

          {/* Home Indicator / Bottom Bar for modern mobile UI */}
          {!isLandscape && (selectedDevice.type === 'ios' || selectedDevice.type === 'android') && (
            <div style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '5px',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '2.5px',
              zIndex: 10,
              pointerEvents: 'none'
            }} />
          )}
        </div>

        {/* Viewport size tag */}
        <div style={{
          position: 'absolute',
          bottom: '24px',
          right: '24px',
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '8px 14px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          color: '#94a3b8',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
          Viewport: <strong>{activeWidth}px × {activeHeight}px</strong>
        </div>
      </main>
    </div>
  );
}
