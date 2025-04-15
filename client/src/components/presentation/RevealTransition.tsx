import { AnimatePresence, motion } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";

type RevealTransitionProps = {
  isRevealing: boolean;
};

export function RevealTransition({ isRevealing }: RevealTransitionProps) {
  const { timerSpeed } = usePresentationContext();

  return (
    <AnimatePresence>
      {isRevealing && (
        <motion.div
          className="fixed inset-0 bg-black z-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Grid of static-like elements */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div 
                key={i}
                className="absolute bg-corp-cyan"
                style={{
                  width: Math.random() * 100 + 'px',
                  height: Math.random() * 5 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: Math.random() * 0.5,
                }}
              />
            ))}
          </div>
          
          <motion.div
            className="text-6xl md:text-7xl font-display font-bold text-corp-magenta relative overflow-hidden"
            initial={{ scale: 0.8, filter: "blur(10px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            exit={{ scale: 1.2, filter: "blur(20px)" }}
            transition={{ duration: 0.6 }}
            data-text="HALLUCINATION DETECTED"
          >
            <span className="glitch relative z-10 inline-block">HALLUCINATION DETECTED</span>
            
            <motion.span
              className="absolute inset-0 text-corp-cyan"
              animate={{
                x: [0, -7, 0, 7, 0],
                opacity: [0, 0.7, 0.4, 0.7, 0],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              HALLUCINATION DETECTED
            </motion.span>
            
            <motion.span
              className="absolute inset-0 text-corp-magenta"
              animate={{
                x: [0, 7, 0, -7, 0],
                opacity: [0, 0.7, 0.4, 0.7, 0],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.1,
              }}
            >
              HALLUCINATION DETECTED
            </motion.span>
          </motion.div>
          
          {/* Error-like messages appearing randomly */}
          <div className="absolute bottom-10 left-10 right-10 font-mono text-xs md:text-sm text-corp-error opacity-80">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              ERROR: Neural pattern anomaly detected_
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, delay: 0.8 }}
            >
              WARNING: Reality distortion field activated_
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, delay: 1.3 }}
            >
              ALERT: Cognitive desynchronization in progress_
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RevealTransition;
