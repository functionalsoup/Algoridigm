import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  showControls?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  autoplayOnSlide?: number; // If set, will autoplay when this slide is active
  currentSlide?: number; // Current slide number
}

export function AlgoridgimAudioPlayer({ 
  showControls = true,
  position = 'bottom-right',
  autoplayOnSlide,
  currentSlide = 0
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Create audio element on component mount
  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      console.log('Creating audio element for algoridgim.wav');
      
      // Check if file exists
      fetch('/audio/algoridgim.wav')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          console.log('Audio file exists and is accessible');
        })
        .catch(error => {
          console.error('Audio file check failed:', error);
        });
      
      audioRef.current = new Audio('/audio/algoridgim.wav');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4; // Set to 40% volume for better audibility
      
      // Log when loaded
      audioRef.current.addEventListener('canplaythrough', () => {
        console.log('Audio file loaded and ready to play');
      });
      
      // Log errors
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio error occurred:', e);
        if (audioRef.current && audioRef.current.error) {
          console.error('Error code:', audioRef.current.error.code);
          console.error('Error message:', audioRef.current.error.message);
        }
      });
    }
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Handle autoplay based on slide number
  useEffect(() => {
    if (autoplayOnSlide !== undefined && currentSlide === autoplayOnSlide && audioRef.current && !isPlaying) {
      // Wait for user interaction before playing
      const handleUserInteraction = () => {
        playAudio();
        // Remove event listeners after first interaction
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      };
      
      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('keydown', handleUserInteraction);
      
      return () => {
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      };
    }
  }, [autoplayOnSlide, currentSlide, isPlaying]);
  
  // Play/pause functions
  const playAudio = () => {
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            console.log('Algoridgim audio playing');
          })
          .catch(err => {
            console.error('Browser blocked autoplay:', err);
            console.log('Please interact with the page to enable audio playback');
          });
      }
    }
  };
  
  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };
  
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };
  
  // Calculate position classes
  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-6 right-6';
      case 'top-left':
        return 'top-6 left-6';
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'bottom-right':
      default:
        return 'bottom-6 right-6';
    }
  };
  
  if (!showControls) {
    // Return an invisible component that can still play audio
    return null;
  }
  
  return (
    <motion.div
      className={`fixed z-50 bg-corp-dark bg-opacity-80 backdrop-blur-sm border-2 border-corp-cyan p-3 rounded-lg flex gap-3 items-center ${getPositionClasses()}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="text-xs text-corp-cyan flex-1">
        <p className="font-bold text-sm">Wojciech Golczewski</p>
        <p className="opacity-80">Algoridgim</p>
      </div>
      
      <motion.div 
        className="cursor-pointer p-2 rounded-full bg-corp-dark hover:bg-corp-cyan/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-corp-cyan" />
        ) : (
          <Play className="w-6 h-6 text-corp-cyan" />
        )}
      </motion.div>
      
      <motion.div 
        className="cursor-pointer p-2 rounded-full bg-corp-dark hover:bg-corp-cyan/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMute}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-corp-orange" />
        ) : (
          <Volume2 className="w-6 h-6 text-corp-cyan" />
        )}
      </motion.div>
      
      {/* Fallback HTML audio element (hidden) */}
      <audio 
        className="hidden"
        src="/audio/algoridgim.wav"
        ref={(element) => {
          // Only set this if our Audio API approach is not working
          if (!audioRef.current && element) {
            console.log('Using HTML5 audio element as fallback');
            audioRef.current = element;
          }
        }}
        loop
        preload="auto"
      />
    </motion.div>
  );
}

export default AlgoridgimAudioPlayer;