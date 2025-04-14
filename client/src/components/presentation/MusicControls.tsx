import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

// Create a custom global audio state
let isMutedGlobal = false;

// Create a custom event for controlling audio globally
export const audioEvents = {
  toggleMute: new Event('audio:toggleMute'),
};

export function MusicControls() {
  const [isMuted, setIsMuted] = useState(false);
  
  const toggleMute = () => {
    // Update local state
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // Update global state
    isMutedGlobal = newMutedState;
    
    // Dispatch the event for audio components to listen to
    document.dispatchEvent(audioEvents.toggleMute);
    
    // Attempt to find and control global AudioContext if it exists
    try {
      // This accesses the singleton AudioContext created in SilentAudio
      const audioContexts = (window as any).__AUDIO_CONTEXTS__;
      
      if (audioContexts && audioContexts.length > 0) {
        for (const ctx of audioContexts) {
          if (ctx.gainNode) {
            // Mute by setting gain to 0, or restore to default
            ctx.gainNode.gain.value = newMutedState ? 0 : 0.04;
          }
        }
      }
    } catch (err) {
      console.warn("Could not directly control audio context:", err);
    }
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