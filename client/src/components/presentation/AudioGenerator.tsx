import { useEffect, useRef, useState } from 'react';

export function AudioGenerator() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    // Initialize audio context on first user interaction
    const handleUserInteraction = () => {
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
          setInterval(() => {
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
    
    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    
    // Clean up
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      
      // Stop and disconnect audio nodes
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
      
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isPlaying]);
  
  return null; // This component doesn't render anything
}

export default AudioGenerator;