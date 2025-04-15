import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface InvisiblePlayerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  autoPlay?: boolean;
}

export function InvisiblePlayer({ 
  position = 'bottom-right',
  autoPlay = false
}: InvisiblePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio element
  useEffect(() => {
    audioRef.current = document.createElement('audio');
    audioRef.current.src = '/audio/algoridgim.wav';
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    // Set up event listeners
    audioRef.current.addEventListener('play', () => setIsPlaying(true));
    audioRef.current.addEventListener('pause', () => setIsPlaying(false));
    audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    
    // If autoplay is enabled, try to play
    if (autoPlay) {
      const attemptAutoplay = () => {
        if (audioRef.current) {
          audioRef.current.play()
            .catch(err => {
              console.log('Autoplay prevented by browser:', err);
            });
        }
      };
      
      // Try to play when the user interacts with the page
      const enableAudio = () => {
        document.removeEventListener('click', enableAudio);
        document.removeEventListener('keydown', enableAudio);
        attemptAutoplay();
      };
      
      document.addEventListener('click', enableAudio);
      document.addEventListener('keydown', enableAudio);
      
      // Try anyway (might work in some browsers)
      attemptAutoplay();
    }
    
    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.remove();
      }
    };
  }, [autoPlay]);
  
  // Play/pause functions
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play()
        .catch(err => {
          console.error('Error playing audio:', err);
        });
    }
  };
  
  const toggleMute = () => {
    if (!audioRef.current) return;
    
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(!isMuted);
  };
  
  // Get position classes
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
  
  return (
    <motion.div
      className={`fixed z-50 bg-corp-dark bg-opacity-50 backdrop-blur-sm rounded-full p-2 ${getPositionClasses()}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center gap-2">
        <motion.div 
          className="cursor-pointer p-2 rounded-full bg-corp-dark/80 hover:bg-corp-cyan/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          title={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-corp-cyan" />
          ) : (
            <Play className="w-6 h-6 text-corp-cyan" />
          )}
        </motion.div>
        
        <motion.div 
          className="cursor-pointer p-2 rounded-full bg-corp-dark/80 hover:bg-corp-cyan/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMute}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-corp-orange" />
          ) : (
            <Volume2 className="w-6 h-6 text-corp-cyan" />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default InvisiblePlayer;