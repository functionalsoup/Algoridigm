import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

// Create a custom event for controlling audio globally
export const audioEvents = {
  toggleMute: new Event('audio:toggleMute'),
};

export function MusicControls() {
  const [isMuted, setIsMuted] = useState(false);
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Dispatch the event for audio components to listen to
    document.dispatchEvent(audioEvents.toggleMute);
  };
  
  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50 bg-corp-dark bg-opacity-40 backdrop-blur-sm border border-corp-cyan/30 p-2 rounded-full cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleMute}
      title={isMuted ? "Unmute background music" : "Mute background music"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-corp-orange" />
      ) : (
        <Volume2 className="w-5 h-5 text-corp-cyan" />
      )}
    </motion.div>
  );
}

export default MusicControls;