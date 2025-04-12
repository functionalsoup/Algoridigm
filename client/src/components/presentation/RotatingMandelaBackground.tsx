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
  opacity = 0.7,
  initialDelay = 0.5,
  isActive = true,
  shrink = false,
  children
}: RotatingMandelaBackgroundProps) {
  // Map speed names to rotation durations (in seconds)
  const speedMap = {
    slow: 120, // Very slow rotation
    medium: 80, 
    fast: 40
  };
  
  // Calculate duration based on speed
  const duration = speedMap[speed];
  
  // Simple animation approach - no state management required
  // Just define a single continuous rotation animation
  const rotationKeyframes = direction === "clockwise" 
    ? [0, 360] // Clockwise rotation keyframes
    : [0, -360]; // Counter-clockwise rotation keyframes
    
  // The scale animation properties
  const scaleStart = shrink ? 8 : scale;
  const scaleEnd = isActive ? scale : shrink ? 8 : scale;

  return (
    <>
      {/* Fixed background container */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Opacity and Scale Animation */}
        <motion.div
          className="w-full h-full flex items-center justify-center"
          initial={{ opacity: 0, scale: scaleStart }}
          animate={{ opacity: isActive ? opacity : 0, scale: scaleEnd }}
          transition={{
            opacity: { 
              duration: 3, 
              ease: "easeInOut", 
              delay: initialDelay 
            },
            scale: { 
              duration: shrink ? 7 : 4,  // Even longer for the shrink animation
              ease: "easeInOut", 
              delay: initialDelay 
            }
          }}
        >
          {/* Continuous Rotation Animation - Separate from opacity/scale */}
          <motion.div
            className="w-full h-full flex items-center justify-center"
            animate={{ 
              rotate: rotationKeyframes
            }}
            transition={{
              rotate: {
                duration: duration,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop"
              }
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src={mandelaImage} 
                alt="Background Mandala" 
                className="w-full h-full object-contain"
                style={{ 
                  maxWidth: '250vmin', 
                  maxHeight: '250vmin',
                  transformOrigin: 'center center',
                  userSelect: 'none'
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
      {children}
    </>
  );
}