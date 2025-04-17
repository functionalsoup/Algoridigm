import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, X } from 'lucide-react';

interface FlashingImagesWarningProps {
  onDismiss: () => void;
}

export function FlashingImagesWarning({ onDismiss }: FlashingImagesWarningProps) {
  const [isVisible, setIsVisible] = useState(true);
  
  const handleDismiss = () => {
    setIsVisible(false);
    // Delay the onDismiss callback to allow for exit animation
    setTimeout(onDismiss, 500);
  };
  
  // Auto-dismiss after 15 seconds
  useEffect(() => {
    const timer = setTimeout(handleDismiss, 15000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[999] bg-black flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-[#1a1a20] border border-[#2a2a35] p-6 rounded-2xl max-w-2xl relative shadow-lg shadow-[#00a2ff]/10"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            <button 
              onClick={handleDismiss}
              className="absolute top-3 right-3 text-white/70 hover:text-white"
              aria-label="Close warning"
            >
              <X size={24} />
            </button>
            
            <div className="mb-6">
              <div className="flex items-center mb-4 border-b border-[#2a2a35] pb-3">
                <div className="font-display text-[#00a2ff] text-2xl font-bold tracking-wide">
                  J-TECH INDUSTRIES
                </div>
                <div className="text-xs text-[#00a2ff]/70 ml-2 mt-1 tracking-wider">
                  EST. 2050
                </div>
              </div>
              
              <div className="text-[#00a2ff] text-lg font-medium mb-1">
                AUTONOMOUS TRAINING SYSTEM v3.11.2
              </div>
              <div className="text-white/50 text-sm">
                CLASSIFIED INFORMATION • AUTHORIZED PERSONNEL ONLY
              </div>
            </div>
            
            <div className="mb-5 border border-[#2a2a35] rounded-xl p-4 bg-[#14141a]">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0 text-[#00a2ff] pt-1">
                  <Info size={22} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white/90 font-medium mb-2">
                    IMPORTANT NOTICE
                  </h3>
                  <p className="text-white/70 text-sm">
                    What you are about to see is not set in stone. If you find this interesting, please register at the end to be added to the list for an invite to an in-person pitch meeting.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border border-[#ff3a3a] rounded-xl p-4 bg-[#140a0a]">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 text-[#ff3a3a] pt-1">
                  <AlertTriangle size={22} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-[#ff3a3a] font-medium mb-2">
                    PHOTOSENSITIVITY WARNING
                  </h3>
                  
                  <p className="text-white/70 text-sm mb-4">
                    The following presentation contains flashing images, strobing effects, and rapid color changes that
                    may trigger seizures in people with photosensitive epilepsy. Viewer discretion is advised.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <motion.button
                onClick={handleDismiss}
                className="bg-[#00a2ff] hover:bg-[#00a2ff]/90 text-black font-medium py-3 px-6 rounded-full transition-colors tracking-wider flex items-center gap-2"
                whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(0, 162, 255, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span>INITIALIZE SEQUENCE</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FlashingImagesWarning;