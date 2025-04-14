import { useEffect, useRef, useState } from 'react';
import AudioGenerator from './AudioGenerator';
import { audioEvents } from './MusicControls';

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const autoplayAttemptedRef = useRef(false);
  
  // Effect for initializing audio playback
  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio('/assets/audio/background-music.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4; // Set to 40% volume
      audioRef.current.muted = false; // Start unmuted
      
      // Add error event handler for audio loading failure
      audioRef.current.addEventListener('error', () => {
        console.warn('Background music file not found, using generated audio fallback');
        setUseFallback(true);
      });
    }
    
    // Try to play audio automatically as soon as the component mounts
    if (!autoplayAttemptedRef.current && !isPlaying && !useFallback) {
      autoplayAttemptedRef.current = true;
      
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
    
    // Function to set up user interaction handlers if autoplay fails
    function setupUserInteractionHandler() {
      const handleUserInteraction = () => {
        if (audioRef.current && !isPlaying && !useFallback) {
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
              setUseFallback(true);
            });
        }
      };
      
      // Add event listeners to common user interactions
      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('keydown', handleUserInteraction);
    }
    
    // Clean up event listeners and audio on unmount
    return () => {
      // Pause and reset audio when component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isPlaying, useFallback]);
  
  // Effect for handling mute/unmute
  useEffect(() => {
    const handleToggleMute = () => {
      setIsMuted(prevMuted => !prevMuted);
      
      if (audioRef.current) {
        audioRef.current.muted = !audioRef.current.muted;
      }
    };
    
    // Listen for mute toggle events
    document.addEventListener('audio:toggleMute', handleToggleMute);
    
    return () => {
      document.removeEventListener('audio:toggleMute', handleToggleMute);
    };
  }, []);
  
  // Effect to apply mute state whenever it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);
  
  // Return the audio generator as fallback if the audio file fails to load
  if (useFallback) {
    return <AudioGenerator autoplay={true} />;
  }
  
  return null; // This component doesn't render anything when using file audio
}

export default BackgroundMusic;