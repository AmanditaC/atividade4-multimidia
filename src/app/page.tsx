'use client';
import { useRef, useState } from 'react';

export default function Home() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSkipForward = () => {
    videoRef.current.currentTime += 10;
  };

  const handleSkipBackward = () => {
    videoRef.current.currentTime -= 10;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const handleMuteToggle = () => {
    videoRef.current.volume = isMuted ? volume : 0;
    setIsMuted(!isMuted);
  };

  return (
    <div style={styles.body}>
      <div style={styles.playerContainer}>
        <div style={styles.videoContainer}>
          <video
            ref={videoRef}
            poster="/Rosé.jpg"
            style={styles.video}
            onClick={handlePlayPause}
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </div>

        <div style={styles.infoContainer}>
          <div style={styles.textInfo}>
            <div style={styles.title}>Messy</div>
            <div style={styles.artist}>ROSÉ</div>
          </div>
          
          <div style={styles.controls}>
            <button onClick={handleSkipBackward} style={styles.controlButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 5V19L7 12L18 5Z" fill="currentColor"/>
                <path d="M11 5V19L0 12L11 5Z" fill="currentColor"/>
              </svg>
            </button>
            
            <button onClick={handlePlayPause} style={styles.playButton}>
              {isPlaying ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <rect x="6" y="5" width="4" height="14" fill="currentColor"/>
                  <rect x="14" y="5" width="4" height="14" fill="currentColor"/>
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                </svg>
              )}
            </button>
            
            <button onClick={handleSkipForward} style={styles.controlButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 5V19L17 12L6 5Z" fill="currentColor"/>
                <path d="M13 5V19L24 12L13 5Z" fill="currentColor"/>
              </svg>
            </button>
          </div>

          <div style={styles.volumeContainer}>
            <button onClick={handleMuteToggle} style={styles.volumeButton}>
              {isMuted || volume === 0 ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 10V14H7L12 19V5L7 10H3Z" fill="currentColor"/>
                  <path d="M16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12Z" fill="currentColor"/>
                </svg>
              ) : volume > 0.5 ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 10V14H7L12 19V5L7 10H3Z" fill="currentColor"/>
                  <path d="M16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12Z" fill="currentColor"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 10V14H7L12 19V5L7 10H3Z" fill="currentColor"/>
                </svg>
              )}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              style={styles.volumeSlider}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  body: {
    backgroundColor: '#222', 
    height: '100vh',
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '"Segoe UI", Roboto, sans-serif'
  },
  playerContainer: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)', 
    backgroundColor: '#111' 
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    paddingTop: '56.25%',
    backgroundColor: '#000' 
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    cursor: 'pointer'
  },
  infoContainer: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  textInfo: {
    textAlign: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff', 
    marginBottom: 4
  },
  artist: {
    fontSize: 14,
    color: '#00a8e8' 
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24
  },
  playButton: {
    backgroundColor: '#00a8e8', 
    color: '#fff',
    borderRadius: '50%',
    width: 56,
    height: 56,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.2s ease'
  },
  controlButton: {
    backgroundColor: 'rgba(255,255,255,0.1)', 
    color: '#fff', 
    borderRadius: '50%',
    width: 40,
    height: 40,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.2s ease'
  },
  volumeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '0 16px'
  },
  volumeButton: {
    backgroundColor: 'transparent',
    color: '#fff', 
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    borderRadius: '50%',
    transition: 'all 0.2s ease'
  },
  volumeSlider: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.2)', 
    outline: 'none',
    appearance: 'none',
    cursor: 'pointer'
  }
};