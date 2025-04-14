import { useEffect, useRef, useState } from 'react';
import { audioEvents } from './MusicControls';

// Create an AudioContext
let audioContext: AudioContext | null = null;

// Store audio contexts globally so they can be accessed by MusicControls
if (typeof window !== 'undefined') {
  (window as any).__AUDIO_CONTEXTS__ = [];
}

// This is a very small encoded MP3 silence (1/10 second)
const silenceDataURI = 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRAAAOwAYAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';

export function SilentAudio() {
  const silentAudioRef = useRef<HTMLAudioElement | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  
  useEffect(() => {
    // First try to create and play a silent audio element
    // This helps unlock audio on iOS and other restrictive browsers
    if (!silentAudioRef.current) {
      silentAudioRef.current = new Audio(silenceDataURI);
      silentAudioRef.current.loop = true;
      
      const playPromise = silentAudioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Silent audio unlocked the Web Audio API");
            
            // Now we can safely create a real synth sound
            createAudioSynth();
          })
          .catch(err => {
            console.warn("Could not play silent audio:", err);
          });
      }
    }
    
    function createAudioSynth() {
      try {
        // Initialize AudioContext
        if (!audioContext) {
          audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        
        // Create oscillator
        if (!oscillatorRef.current && audioContext) {
          // Create gain node for volume control
          const gainNode = audioContext.createGain();
          gainNode.gain.value = 0.04; // Set volume to 4% - very quiet
          gainNode.connect(audioContext.destination);
          
          // Create oscillator for ambient drone
          oscillatorRef.current = audioContext.createOscillator();
          oscillatorRef.current.type = 'sine';
          oscillatorRef.current.frequency.value = 220; // A3
          
          // Add a slight detune for interest
          oscillatorRef.current.detune.value = -10;
          
          // Connect oscillator to gain node
          oscillatorRef.current.connect(gainNode);
          
          // Create a second oscillator for richness
          const osc2 = audioContext.createOscillator();
          osc2.type = 'sine';
          osc2.frequency.value = 220 * 1.5; // Perfect fifth up
          osc2.detune.value = 5; // Slight detune
          
          // Create gain node for second oscillator
          const gain2 = audioContext.createGain();
          gain2.gain.value = 0.02; // Lower volume for harmonic
          gain2.connect(audioContext.destination);
          
          // Connect second oscillator
          osc2.connect(gain2);
          
          // Store the gain nodes globally
          const audioContextObj = {
            audioContext,
            gainNode,
            gain2,
            isMuted: false
          };
          
          // Add to global registry
          if (typeof window !== 'undefined') {
            (window as any).__AUDIO_CONTEXTS__ = [
              ...(window as any).__AUDIO_CONTEXTS__,
              audioContextObj
            ];
          }
          
          // Listen for mute/unmute events
          const handleToggleMute = () => {
            audioContextObj.isMuted = !audioContextObj.isMuted;
            
            // Apply mute/unmute
            gainNode.gain.value = audioContextObj.isMuted ? 0 : 0.04;
            gain2.gain.value = audioContextObj.isMuted ? 0 : 0.02;
          };
          
          // Listen for mute toggle events
          document.addEventListener('audio:toggleMute', handleToggleMute);
          
          // Start oscillators
          oscillatorRef.current.start();
          osc2.start();
          
          console.log("Started background audio synthesis");
          
          // Gradually change the note every 10 seconds for interest
          let noteIndex = 0;
          const notes = [220, 196, 174.61, 164.81, 196]; // A3, G3, F3, E3, G3
          
          const intervalId = setInterval(() => {
            if (oscillatorRef.current && audioContext) {
              noteIndex = (noteIndex + 1) % notes.length;
              const currentTime = audioContext.currentTime;
              
              // Smooth transition
              oscillatorRef.current.frequency.exponentialRampToValueAtTime(
                notes[noteIndex], 
                currentTime + 2
              );
              
              // Update the second oscillator to maintain the perfect fifth
              osc2.frequency.exponentialRampToValueAtTime(
                notes[noteIndex] * 1.5,
                currentTime + 2
              );
            }
          }, 10000);
          
          // Store the interval ID for cleanup
          if (typeof window !== 'undefined') {
            (window as any).__AUDIO_INTERVAL__ = intervalId;
          }
        }
      } catch (err) {
        console.error('Failed to initialize audio synthesis:', err);
      }
    }
    
    // Attempt direct initialization - might work in permissive browsers
    createAudioSynth();
    
    // Clean up when component unmounts
    return () => {
      if (silentAudioRef.current) {
        silentAudioRef.current.pause();
      }
      
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        } catch (e) {
          console.error('Error stopping oscillator:', e);
        }
      }
      
      // Clear the interval
      if (typeof window !== 'undefined' && (window as any).__AUDIO_INTERVAL__) {
        clearInterval((window as any).__AUDIO_INTERVAL__);
      }
      
      // Remove event listeners
      if (typeof window !== 'undefined' && (window as any).__AUDIO_CONTEXTS__) {
        (window as any).__AUDIO_CONTEXTS__ = [];
      }
      
      if (audioContext) {
        audioContext.close().catch(e => {
          console.error('Error closing audio context:', e);
        });
      }
    };
  }, []);
  
  return null; // This component doesn't render anything
}

export default SilentAudio;