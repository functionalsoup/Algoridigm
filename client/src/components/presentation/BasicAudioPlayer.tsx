import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface BasicAudioPlayerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export function BasicAudioPlayer({ 
  position = 'bottom-right',
}: BasicAudioPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
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
  
  return (
    <motion.div
      className={`fixed z-50 bg-corp-dark bg-opacity-80 backdrop-blur-sm border-2 border-corp-cyan p-3 rounded-lg ${getPositionClasses()}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex flex-col">
        <div className="text-xs text-corp-cyan mb-2 cursor-pointer">
          <p className="font-bold text-sm">Wojciech Golczewski - Algoridgim</p>
          <p className="opacity-80 text-xs">{isExpanded ? 'Click to minimize' : 'Click to expand player'}</p>
        </div>
        
        {isExpanded && (
          <div className="mt-2">
            <audio 
              controls
              loop
              autoPlay
              preload="auto"
              style={{ width: '260px' }}
              className="rounded"
            >
              <source src="/audio/algoridgim.wav" type="audio/wav" />
              <source src="/audio/background-music.mp3" type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
            <div className="text-xs text-white mt-1 opacity-70">
              Click play above to start the music
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default BasicAudioPlayer;