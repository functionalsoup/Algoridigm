import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";

export function Timer() {
  const { timerSeconds, timerSpeed } = usePresentationContext();

  // Format time as HH:MM:SS
  const formattedTime = useMemo(() => {
    const hours = Math.floor(timerSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((timerSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (timerSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }, [timerSeconds]);

  // Determine color based on timer speed
  const colorClass = useMemo(() => {
    if (timerSpeed < 200) return "text-corp-error";
    if (timerSpeed < 500) return "text-corp-magenta";
    return "text-corp-cyan";
  }, [timerSpeed]);

  return (
    <motion.div 
      className={`timer text-2xl font-display font-bold ${colorClass}`}
      animate={{ 
        scale: timerSpeed < 300 ? [1, 1.05, 1] : 1 
      }}
      transition={{ 
        scale: { 
          duration: 0.5, 
          repeat: Infinity, 
          repeatType: "loop" 
        } 
      }}
    >
      {formattedTime}
    </motion.div>
  );
}

export default Timer;
