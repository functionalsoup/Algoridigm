import { useEffect, useRef, useState } from 'react';
import { audioEvents } from './MusicControls';

interface AudioGeneratorProps {
  autoplay?: boolean;
}

export function AudioGenerator({ autoplay = false }: AudioGeneratorProps) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);
  const autoplayAttemptedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // Function to initialize audio
  const initializeAudio = () => {
    if (isPlaying) return;
    
    try {
      // Create audio context
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Create gain node for volume control
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.gain.value = 0.02; // Very low volume
        gainNodeRef.current.connect(audioContextRef.current.destination);
        
        // Create oscillator for ambient sound
        oscillatorRef.current = audioContextRef.current.createOscillator();
        oscillatorRef.current.type = 'sine';
        oscillatorRef.current.frequency.value = 220; // Base frequency
        
        // Connect oscillator to gain node
        oscillatorRef.current.connect(gainNodeRef.current);
        
        // Start oscillator
        oscillatorRef.current.start();
        
        // Add frequency modulation for interest
        intervalRef.current = window.setInterval(() => {
          if (oscillatorRef.current && Math.random() > 0.7) {
            const newFreq = 180 + Math.random() * 80;
            oscillatorRef.current.frequency.setValueAtTime(
              newFreq, 
              audioContextRef.current?.currentTime || 0
            );
          }
        }, 3000);
        
        setIsPlaying(true);
        console.log('Background audio generator started');
      }
    } catch (err) {
      console.error('Failed to initialize Web Audio API:', err);
    }
  };
  
  // Effect for initializing audio
  useEffect(() => {
    // Try autoplay if enabled
    if (autoplay && !autoplayAttemptedRef.current && !isPlaying) {
      autoplayAttemptedRef.current = true;
      initializeAudio();
    }
    
    // Initialize audio context on first user interaction as fallback
    const handleUserInteraction = () => {
      if (isPlaying) return;
      initializeAudio();
    };
    
    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    
    // Clean up
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      
      // Clear interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Stop and disconnect audio nodes
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        } catch (e) {
          console.error('Error stopping oscillator:', e);
        }
      }
      
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(e => {
          console.error('Error closing audio context:', e);
        });
      }
    };
  }, [isPlaying, autoplay]);
  
  // Effect for handling mute/unmute
  useEffect(() => {
    const handleToggleMute = () => {
      setIsMuted(prevMuted => !prevMuted);
    };
    
    // Listen for mute toggle events
    document.addEventListener('audio:toggleMute', handleToggleMute);
    
    return () => {
      document.removeEventListener('audio:toggleMute', handleToggleMute);
    };
  }, []);
  
  // Effect to apply mute state changes
  useEffect(() => {
    if (gainNodeRef.current) {
      // When muted, set gain to 0, otherwise restore to original value
      gainNodeRef.current.gain.value = isMuted ? 0 : 0.02;
    }
  }, [isMuted]);
  
  return null; // This component doesn't render anything
}

export default AudioGenerator;