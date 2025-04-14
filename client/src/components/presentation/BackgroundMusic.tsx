import { useEffect, useRef } from 'react';
import { audioEvents } from './MusicControls';

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/audio/background-music.mp3');
    audioRef.current = audio;
    
    // Configure audio
    audio.loop = true;
    audio.volume = 0.15;
    
    // Play automatically when possible
    const playAudio = () => {
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Auto-play prevented:', error);
        });
      }
    };
    
    // Try to play automatically
    playAudio();
    
    // Also play on first user interaction
    const handleUserInteraction = () => {
      playAudio();
      document.removeEventListener('click', handleUserInteraction);
    };
    
    document.addEventListener('click', handleUserInteraction);
    
    // Handle mute/unmute from MusicControls
    const handleToggleMute = () => {
      if (audioRef.current) {
        audioRef.current.muted = !audioRef.current.muted;
      }
    };
    
    document.addEventListener('audio:toggleMute', handleToggleMute);
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('audio:toggleMute', handleToggleMute);
    };
  }, []);
  
  return null;
}

export default BackgroundMusic;