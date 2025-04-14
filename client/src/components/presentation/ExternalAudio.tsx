import { useEffect, useRef, useState } from 'react';
import { audioEvents } from './MusicControls';

// This audio file "Algoridigm1Wojciech Golczewski - The Signal (DATA061) - 06 Spectre.wav" 
// is referenced from an external source since we cannot read the attached file directly
const AUDIO_URL = "https://files.catbox.moe/3pdqvn.mp3";

export function ExternalAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const autoplayAttemptedRef = useRef(false);
  
  // Effect for initializing audio playback
  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio(AUDIO_URL);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.25; // Set to 25% volume (adjust as needed)
      audioRef.current.muted = false; // Start unmuted
      
      // Fallback in case the audio file can't be loaded
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio file error:', e);
        console.warn('Could not load external audio file');
      });
    }
    
    // Try to play audio automatically when component mounts
    if (!autoplayAttemptedRef.current && !isPlaying) {
      autoplayAttemptedRef.current = true;
      
      const startAudio = () => {
        if (audioRef.current) {
          // Force a play attempt without waiting for user interaction
          const playPromise = audioRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                // Autoplay successful
                setIsPlaying(true);
                console.log('Background music started playing automatically');
              })
              .catch(err => {
                console.warn('Autoplay failed:', err);
                // If autoplay fails, fall back to playing on user interaction
                setupUserInteractionHandler();
              });
          }
        }
      };
      
      // Try to start playing immediately
      startAudio();
      
      // Also try again after a short delay (helps on some browsers)
      setTimeout(startAudio, 500);
    }
    
    // Function to set up user interaction handlers if autoplay fails
    function setupUserInteractionHandler() {
      const handleUserInteraction = () => {
        if (audioRef.current && !isPlaying) {
          audioRef.current.play()
            .then(() => {
              setIsPlaying(true);
              console.log('Background music started playing after user interaction');
              
              // Remove the event listeners once we've successfully started playback
              document.removeEventListener('click', handleUserInteraction);
              document.removeEventListener('keydown', handleUserInteraction);
            })
            .catch(err => {
              console.error('Failed to play audio after user interaction:', err);
            });
        }
      };
      
      // Add event listeners to common user interactions
      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('keydown', handleUserInteraction);
    }
    
    // Effect for handling mute/unmute
    const handleToggleMute = () => {
      setIsMuted(prevMuted => {
        const newMutedState = !prevMuted;
        
        if (audioRef.current) {
          audioRef.current.muted = newMutedState;
        }
        
        return newMutedState;
      });
    };
    
    // Listen for mute toggle events
    document.addEventListener('audio:toggleMute', handleToggleMute);
    
    // Clean up event listeners and audio on unmount
    return () => {
      document.removeEventListener('audio:toggleMute', handleToggleMute);
      
      // Pause and reset audio when component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isPlaying]);
  
  return null; // This component doesn't render anything visually
}

export default ExternalAudio;