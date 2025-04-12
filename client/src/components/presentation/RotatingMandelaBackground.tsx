import { motion } from "framer-motion";
import mandelaImage from "@assets/Algoridigm Mandela Psy 3.png";
import { ReactNode } from "react";

interface RotatingMandelaBackgroundProps {
  direction?: "clockwise" | "counterclockwise";
  speed?: "slow" | "medium" | "fast";
  scale?: number;
  opacity?: number;
  initialDelay?: number;
  isActive?: boolean;
  shrink?: boolean;
  children?: ReactNode;
}

export function RotatingMandelaBackground({ 
  direction = "clockwise", 
  speed = "medium",
  scale = 2.5,
  opacity = 0.15,
  initialDelay = 0.5,
  isActive = true,
  shrink = false,
  children
}: RotatingMandelaBackgroundProps) {
  // Map speed names to rotation durations (in seconds)
  const speedMap = {
    slow: 45,
    medium: 25,
    fast: 12
  };
  
  // Calculate rotation based on direction
  const rotateTo = direction === "clockwise" ? 360 : -360;
  
  // Calculate duration based on speed
  const duration = speedMap[speed];
  
  return (
    <>
      <motion.div 
        className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0"
        initial={{ 
          opacity: 0, 
          scale: shrink ? 8 : scale, 
          rotate: 0 
        }}
        animate={{ 
          opacity: isActive ? shrink ? [0, 0.5, 0.35, opacity] : opacity : 0,
          scale: isActive ? shrink ? [8, 6, 4, scale] : scale : shrink ? 8 : scale,
          rotate: rotateTo
        }}
        transition={{
          opacity: {
            duration: shrink ? 20 : 3,
            times: shrink ? [0, 0.3, 0.6, 1] : undefined,
            ease: "easeInOut",
            delay: initialDelay
          },
          scale: {
            duration: shrink ? 20 : 3,
            times: shrink ? [0, 0.3, 0.6, 1] : undefined,
            ease: "easeInOut",
            delay: initialDelay
          },
          rotate: {
            duration,
            repeat: Infinity,
            ease: "linear"
          }
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0
        }}
      >
        <img 
          src={mandelaImage} 
          alt="Background Mandala" 
          className="w-full h-full object-contain"
          style={{ 
            maxWidth: '250vmin', 
            maxHeight: '250vmin',
            transformOrigin: 'center center',
            opacity: opacity
          }}
        />
      </motion.div>
      {children}
    </>
  );
}