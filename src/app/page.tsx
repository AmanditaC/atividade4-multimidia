'use client';
import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

// Componentes estilizados
const Body = styled.div`
  background-color: #222;
  height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', Roboto, sans-serif;
`;

const PlayerContainer = styled.div`
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  background-color: #111;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  background-color: #000;
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const InfoContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TextInfo = styled.div`
  text-align: center;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
`;

const Artist = styled.div`
  font-size: 14px;
  color: #00a8e8;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const PlayButton = styled.button`
  background-color: #00a8e8;
  color: #fff;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #0095d1;
    transform: scale(1.05);
  }
`;

const ControlButton = styled.button`
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(0, 168, 232, 0.2);
    color: #00a8e8;
  }
`;

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
`;

const VolumeButton = styled.button`
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    color: #00a8e8;
    background-color: rgba(0, 168, 232, 0.1);
  }
`;

const VolumeSlider = styled.input.attrs({ type: 'range' })`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 0.2);
  outline: none;
  appearance: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #00a8e8;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  &:hover::-webkit-slider-thumb {
    transform: scale(1.1);
  }
`;

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Inicialização segura do volume
    const savedVolume = localStorage.getItem('videoVolume');
    const initialVolume = savedVolume ? parseFloat(savedVolume) : 0.7;
    setVolume(initialVolume);

    if (videoRef.current) {
      videoRef.current.volume = initialVolume;
      setIsMuted(initialVolume === 0);
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume;
    }
    localStorage.setItem('videoVolume', volume.toString());
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => console.error('Playback failed:', error));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSkipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const handleSkipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  if (!isClient) {
    return (
      <Body>
        <PlayerContainer>
          <VideoContainer>
            <img 
              src="/Rosé.jpg" 
              alt="Video thumbnail" 
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </VideoContainer>
        </PlayerContainer>
      </Body>
    );
  }

  return (
    <Body>
      <PlayerContainer>
        <VideoContainer>
          <Video
            ref={videoRef}
            poster="/Rosé.jpg"
            onClick={handlePlayPause}
            playsInline
          >
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </Video>
        </VideoContainer>

        <InfoContainer>
          <TextInfo>
            <Title>Messy</Title>
            <Artist>ROSÉ</Artist>
          </TextInfo>
          
          <Controls>
            <ControlButton 
              onClick={handleSkipBackward} 
              aria-label="Skip backward 10 seconds"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 5V19L7 12L18 5Z" fill="currentColor"/>
                <path d="M11 5V19L0 12L11 5Z" fill="currentColor"/>
              </svg>
            </ControlButton>
            
            <PlayButton 
              onClick={handlePlayPause} 
              aria-label={isPlaying ? "Pause" : "Play"}
            >
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
            </PlayButton>
            
            <ControlButton 
              onClick={handleSkipForward} 
              aria-label="Skip forward 10 seconds"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 5V19L17 12L6 5Z" fill="currentColor"/>
                <path d="M13 5V19L24 12L13 5Z" fill="currentColor"/>
              </svg>
            </ControlButton>
          </Controls>

          <VolumeContainer>
            <VolumeButton 
              onClick={handleMuteToggle} 
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
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
            </VolumeButton>
            
            <VolumeSlider
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
            />
          </VolumeContainer>
        </InfoContainer>
      </PlayerContainer>
    </Body>
  );
}