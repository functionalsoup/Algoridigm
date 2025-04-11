import { AnimatePresence, motion } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";

type RevealTransitionProps = {
  isRevealing: boolean;
};

export function RevealTransition({ isRevealing }: RevealTransitionProps) {
  return (
    <AnimatePresence>
      {isRevealing && (
        <motion.div
          className="fixed inset-0 bg-black z-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="text-6xl font-display font-bold text-corp-magenta relative overflow-hidden"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 1.2 }}
            data-text="SYSTEM BREACH"
          >
            <span className="glitch relative z-10 inline-block">SYSTEM BREACH</span>
            
            <motion.span
              className="absolute inset-0 text-corp-cyan"
              animate={{
                x: [0, -5, 0, 5, 0],
                opacity: [0, 0.5, 0.3, 0.5, 0],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              SYSTEM BREACH
            </motion.span>
            
            <motion.span
              className="absolute inset-0 text-corp-magenta"
              animate={{
                x: [0, 5, 0, -5, 0],
                opacity: [0, 0.5, 0.3, 0.5, 0],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.15,
              }}
            >
              SYSTEM BREACH
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RevealTransition;
