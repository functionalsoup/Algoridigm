import { useEffect, useState, useRef } from 'react';
import { audioEvents } from './MusicControls';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface SpectreMusicPlayerProps {
  autoplay?: boolean;
  showControls?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'custom';
  className?: string;
  style?: React.CSSProperties;
}

export function SpectreMusicPlayer({ 
  autoplay = false, 
  showControls = true,
  position = 'bottom-right',
  className = '',
  style = {}
}: SpectreMusicPlayerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle global mute/unmute from MusicControls
  useEffect(() => {
    const handleToggleMute = () => {
      setIsMuted(prev => !prev);
      if (audioRef.current) {
        audioRef.current.muted = !audioRef.current.muted;
      }
    };
    
    document.addEventListener('audio:toggleMute', handleToggleMute);
    
    return () => {
      document.removeEventListener('audio:toggleMute', handleToggleMute);
    };
  }, []);
  
  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/spectre.wav');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.15; // Set to 15% volume
      audioRef.current.muted = isMuted;
      
      // Log when audio is loaded
      audioRef.current.addEventListener('canplaythrough', () => {
        console.log('Spectre audio file loaded and ready to play');
        if (autoplay) {
          playAudio();
        }
      });
      
      // Error handling
      audioRef.current.addEventListener('error', (e) => {
        console.error('Spectre audio file error:', e);
        console.error('Error code:', (e.target as HTMLMediaElement).error?.code);
      });
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [autoplay]);
  
  // Play/pause functions
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          console.log('Spectre audio playing');
        })
        .catch(err => {
          console.error('Failed to play Spectre audio:', err);
        });
    }
  };
  
  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      console.log('Spectre audio paused');
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
        return 'bottom-6 right-24'; // Right of the global music control
    }
  };
  
  if (!showControls) {
    // Return an invisible component that can still play audio
    return null;
  }
  
  return (
    <motion.div
      className={`fixed z-50 bg-corp-dark bg-opacity-50 backdrop-blur-sm border border-corp-cyan/50 p-3 rounded-lg flex gap-3 items-center ${getPositionClasses()} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      style={style}
    >
      <div className="text-xs text-corp-cyan flex-1">
        <p className="font-bold">Wojciech Golczewski</p>
        <p className="opacity-80">Spectre</p>
      </div>
      
      <motion.div 
        className="cursor-pointer p-1 rounded-full bg-corp-dark/80"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-corp-cyan" />
        ) : (
          <Play className="w-5 h-5 text-corp-cyan" />
        )}
      </motion.div>
      
      <motion.div 
        className="cursor-pointer p-1 rounded-full bg-corp-dark/80"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMute}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-corp-orange" />
        ) : (
          <Volume2 className="w-5 h-5 text-corp-cyan" />
        )}
      </motion.div>
    </motion.div>
  );
}

export default SpectreMusicPlayer;