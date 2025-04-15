import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

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
  
  // Auto-dismiss after 10 seconds
  useEffect(() => {
    const timer = setTimeout(handleDismiss, 10000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-corp-dark border-2 border-corp-orange p-6 rounded-lg max-w-lg relative"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            <button 
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-white/70 hover:text-white"
              aria-label="Close warning"
            >
              <X size={24} />
            </button>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 text-corp-orange pt-1">
                <AlertTriangle size={36} />
              </div>
              
              <div className="flex-1">
                <h2 className="text-corp-orange text-xl font-bold mb-2">
                  Photosensitivity Warning
                </h2>
                
                <p className="text-white/80 mb-4">
                  The following presentation contains flashing images, strobing effects, and rapid color changes that
                  may trigger seizures in people with photosensitive epilepsy. Viewer discretion is advised.
                </p>
                
                <motion.button
                  onClick={handleDismiss}
                  className="bg-corp-orange hover:bg-corp-orange/80 text-white py-2 px-4 rounded-md font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  I Understand - Continue
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FlashingImagesWarning;