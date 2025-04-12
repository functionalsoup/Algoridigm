import { motion } from "framer-motion";
import mandelaImage from "@assets/Algoridigm Mandela Psy 3.png";
import { ReactNode, useEffect, useState } from "react";

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
  opacity = 0.7, // Increased to 0.7 from 0.4
  initialDelay = 0.5,
  isActive = true,
  shrink = false,
  children
}: RotatingMandelaBackgroundProps) {
  // Map speed names to rotation durations (in seconds)
  const speedMap = {
    slow: 60,
    medium: 45, 
    fast: 30
  };
  
  // Calculate duration based on speed
  const duration = speedMap[speed];
  
  // Store animation state to prevent jumps
  const [animationState, setAnimationState] = useState({
    rotateFrom: 0,
    rotateTo: direction === "clockwise" ? 360 : -360
  });
  
  // This ensures a continuous seamless rotation
  useEffect(() => {
    if (!isActive) return;
    
    // Create interval to update rotation values
    const interval = setInterval(() => {
      setAnimationState(prev => ({
        rotateFrom: prev.rotateTo,
        rotateTo: prev.rotateTo + (direction === "clockwise" ? 360 : -360)
      }));
    }, duration * 1000);
    
    return () => clearInterval(interval);
  }, [isActive, direction, duration]);
  
  // The scale animation properties
  const scaleStart = shrink ? 8 : scale;
  const scaleEnd = isActive ? scale : shrink ? 8 : scale;
  
  return (
    <>
      {/* Static container to maintain positioning */}
      <div 
        className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0"
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
        {/* Separate animations for opacity/scale and rotation to prevent interruptions */}
        <motion.div
          initial={{ opacity: 0, scale: scaleStart }}
          animate={{ opacity: isActive ? opacity : 0, scale: scaleEnd }}
          transition={{
            opacity: { duration: 3, ease: "easeInOut", delay: initialDelay },
            scale: { 
              duration: shrink ? 6 : 4,  // Even longer, smoother duration
              ease: "easeInOut", 
              delay: initialDelay 
            }
          }}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Separate motion component for rotation only */}
          <motion.div
            initial={{ rotate: animationState.rotateFrom }}
            animate={{ rotate: animationState.rotateTo }}
            transition={{
              rotate: { duration, ease: "linear" }
            }}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img 
              src={mandelaImage} 
              alt="Background Mandala" 
              className="w-full h-full object-contain"
              style={{ 
                maxWidth: '250vmin', 
                maxHeight: '250vmin',
                transformOrigin: 'center center'
              }}
            />
          </motion.div>
        </motion.div>
      </div>
      {children}
    </>
  );
}