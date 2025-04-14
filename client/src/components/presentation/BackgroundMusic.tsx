import { useEffect, useRef, useState } from 'react';
import { audioEvents } from './MusicControls';

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [autoplayFailed, setAutoplayFailed] = useState(false);

  useEffect(() => {
    // Handle mute/unmute from MusicControls
    const handleToggleMute = () => {
      setIsMuted(prev => !prev);
    };
    
    document.addEventListener('audio:toggleMute', handleToggleMute);
    
    // Attempt autoplay on first load
    const attemptAutoPlay = () => {
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Autoplay successful');
            })
            .catch(error => {
              console.warn('Autoplay failed:', error);
              setAutoplayFailed(true);
            });
        }
      }
    };
    
    // Try to autoplay when component mounts
    if (audioRef.current) {
      attemptAutoPlay();
    }
    
    // Cleanup
    return () => {
      document.removeEventListener('audio:toggleMute', handleToggleMute);
    };
  }, []);
  
  // Setup click handlers to start audio if autoplay fails
  useEffect(() => {
    if (!autoplayFailed) return;
    
    const startAudioOnInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            console.log('Audio started after user interaction');
            document.removeEventListener('click', startAudioOnInteraction);
          })
          .catch(err => {
            console.error('Failed to play even after interaction:', err);
          });
      }
    };
    
    document.addEventListener('click', startAudioOnInteraction);
    
    return () => {
      document.removeEventListener('click', startAudioOnInteraction);
    };
  }, [autoplayFailed]);
  
  return (
    <>
      {/* Visible audio element for diagnostic purposes */}
      <audio 
        ref={audioRef}
        src="/audio/background-music.mp3"
        loop
        muted={isMuted}
        controls
        style={{
          position: 'fixed',
          bottom: '60px',
          right: '10px',
          width: '250px',
          zIndex: 1000,
          background: 'rgba(0,0,0,0.5)',
          borderRadius: '4px',
          padding: '5px'
        }}
      />
      
      {/* If autoplay fails, show explicit play button */}
      {autoplayFailed && (
        <button 
          onClick={() => audioRef.current?.play()}
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '10px',
            zIndex: 1001,
            background: 'rgba(255,255,255,0.9)',
            color: 'black',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            cursor: 'pointer'
          }}
        >
          Play Music
        </button>
      )}
    </>
  );
}

export default BackgroundMusic;