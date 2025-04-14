import { useEffect, useRef, useState } from 'react';
import { audioEvents } from './MusicControls';

// Using the local audio file from the public directory
const AUDIO_URL = "/audio/background-music.wav";

export function ExternalAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const autoplayAttemptedRef = useRef(false);
  
  // Effect for initializing audio playback
  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      console.log('Creating new audio element with source:', AUDIO_URL);
      
      // Create the audio element with preload attribute
      audioRef.current = new Audio();
      audioRef.current.preload = 'auto'; // Preload the audio file
      audioRef.current.src = AUDIO_URL;
      audioRef.current.loop = true;
      audioRef.current.volume = 0.15; // Set to 15% volume
      audioRef.current.muted = false; // Start unmuted
      
      // Log when audio is loaded
      audioRef.current.addEventListener('canplaythrough', () => {
        console.log('Audio file loaded and ready to play');
      });
      
      // Fallback in case the audio file can't be loaded
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio file error:', e);
        console.error('Error code:', (e.target as HTMLMediaElement).error?.code);
        console.warn('Could not load audio file from:', AUDIO_URL);
      });
    }
    
    // Multiple approaches to autoplay audio
    if (!autoplayAttemptedRef.current && !isPlaying) {
      autoplayAttemptedRef.current = true;
      
      // Try various techniques to start audio playback
      const attemptPlayback = () => {
        if (!audioRef.current) return;
        
        console.log('Attempting to play audio...');
        
        // Try with both muted and unmuted states
        const playWithMutedState = (muted: boolean) => {
          if (!audioRef.current) return Promise.reject('No audio element');
          
          audioRef.current.muted = muted;
          return audioRef.current.play()
            .then(() => {
              console.log(`Audio playing successfully (muted=${muted})`);
              setIsPlaying(true);
              
              // If we started muted, try to unmute after a short delay
              if (muted) {
                setTimeout(() => {
                  if (audioRef.current) {
                    audioRef.current.muted = false;
                    console.log('Unmuted audio after successful muted playback');
                  }
                }, 1000);
              }
              return true;
            })
            .catch(err => {
              console.warn(`Failed to play audio (muted=${muted}):`, err);
              return false;
            });
        };
        
        // First try unmuted playback
        playWithMutedState(false)
          .then(success => {
            // If unmuted fails, try muted (more likely to succeed due to autoplay policies)
            if (!success) {
              return playWithMutedState(true);
            }
            return success;
          })
          .then(finalSuccess => {
            // If all autoplay attempts fail, set up user interaction handlers
            if (!finalSuccess) {
              console.log('All autoplay attempts failed, setting up user interaction handlers');
              setupUserInteractionHandler();
            }
          });
      };
      
      // Make multiple attempts with delays
      attemptPlayback();
      setTimeout(attemptPlayback, 500);
      setTimeout(attemptPlayback, 2000);
    }
    
    // Enhanced function to set up user interaction handlers if autoplay fails
    function setupUserInteractionHandler() {
      // Create a visually hidden button that we'll show if all else fails
      const createAudioButton = () => {
        const existingButton = document.getElementById('audio-start-button');
        if (existingButton) return;
        
        const button = document.createElement('button');
        button.id = 'audio-start-button';
        button.textContent = 'Start Audio';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.padding = '10px';
        button.style.background = 'rgba(0,0,0,0.5)';
        button.style.color = 'white';
        button.style.border = '1px solid white';
        button.style.borderRadius = '4px';
        button.style.fontFamily = 'Arial, sans-serif';
        button.style.fontSize = '12px';
        button.style.cursor = 'pointer';
        button.style.zIndex = '9999';
        
        button.onclick = (e) => {
          e.stopPropagation();
          if (audioRef.current) {
            audioRef.current.muted = false;
            audioRef.current.play()
              .then(() => {
                setIsPlaying(true);
                console.log('Background music started from explicit button click');
                button.style.display = 'none';
              })
              .catch(err => {
                console.error('Failed to play audio even after button click:', err);
              });
          }
        };
        
        document.body.appendChild(button);
      };
      
      // Handle any user interaction to start audio
      const handleUserInteraction = () => {
        if (audioRef.current && !isPlaying) {
          // Try to unmute and play
          audioRef.current.muted = false;
          audioRef.current.play()
            .then(() => {
              setIsPlaying(true);
              console.log('Background music started playing after user interaction');
              
              // Remove the event listeners once we've successfully started playback
              document.removeEventListener('click', handleUserInteraction);
              document.removeEventListener('keydown', handleUserInteraction);
              document.removeEventListener('touchstart', handleUserInteraction);
              
              // Hide the button if it exists
              const button = document.getElementById('audio-start-button');
              if (button) button.style.display = 'none';
            })
            .catch(err => {
              console.error('Failed to play audio after user interaction:', err);
              // Show the explicit button as a last resort
              createAudioButton();
            });
        }
      };
      
      // Add event listeners to common user interactions
      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('keydown', handleUserInteraction);
      document.addEventListener('touchstart', handleUserInteraction);
      
      // After 3 seconds, if still not playing, show the button
      setTimeout(() => {
        if (!isPlaying && audioRef.current) {
          createAudioButton();
        }
      }, 3000);
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
      document.removeEventListener('click', setupUserInteractionHandler);
      document.removeEventListener('keydown', setupUserInteractionHandler);
      document.removeEventListener('touchstart', setupUserInteractionHandler);
      
      // Remove the start button if it exists
      const button = document.getElementById('audio-start-button');
      if (button && button.parentNode) {
        button.parentNode.removeChild(button);
      }
      
      // Pause and reset audio when component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.src = '';
      }
    };
  }, [isPlaying]);
  
  return null; // This component doesn't render anything visually
}

export default ExternalAudio;