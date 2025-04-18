import { motion } from "framer-motion";
import mandelaImage from "@assets/IMG_2437.jpeg";
import { ReactNode, useState, useEffect } from "react";

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
  // State to track if image is loaded
  const [imageLoaded, setImageLoaded] = useState(false);
  // Simple glitch animation states
  const [glitchActive, setGlitchActive] = useState(false);
  // Track glitch displacement values
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });
  
  // Preload the image before displaying it
  useEffect(() => {
    const img = new Image();
    img.src = mandelaImage;
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);
  
  // Create a glitch effect animation with random frames
  useEffect(() => {
    if (isActive && imageLoaded) {
      // Initial main glitch - more intense
      setGlitchActive(true);
      setGlitchOffset({ x: 8, y: 5 }); // Stronger initial offset
      
      // Create more intense glitches at the beginning (reduced by 40%)
      const intensiveGlitchInterval = setInterval(() => {
        // Reduced chance of glitching by 40%
        const isOn = Math.random() > 0.52; // 48% chance of glitching (reduced from 80%)
        
        if (isOn) {
          const offsetX = Math.random() * 12 - 6; // Random between -6 and 6 (reduced from -10 to 10)
          const offsetY = Math.random() * 12 - 6; // Random between -6 and 6 (reduced from -10 to 10)
          setGlitchOffset({ x: offsetX, y: offsetY });
          setGlitchActive(true);
        } else {
          setGlitchActive(false);
        }
      }, 90); // Slower glitching (increased from 60ms)
      
      // After a period, transition to more subtle glitching
      const subtleGlitchTimer = setTimeout(() => {
        clearInterval(intensiveGlitchInterval);
        
        // Create random glitches at specific times - more subtle (reduced by 40%)
        const subtleGlitchInterval = setInterval(() => {
          // Random on/off (reduced by 40%)
          const isOn = Math.random() > 0.76; // 24% chance of glitching (reduced from 40%)
          
          if (isOn) {
            const offsetX = Math.random() * 4.8 - 2.4; // Random between -2.4 and 2.4 (reduced from -4 to 4)
            const offsetY = Math.random() * 4.8 - 2.4; // Random between -2.4 and 2.4 (reduced from -4 to 4)
            setGlitchOffset({ x: offsetX, y: offsetY });
            setGlitchActive(true);
          } else {
            setGlitchActive(false);
          }
        }, 160); // Even slower glitching (increased from 120ms)
        
        // Eventually reduce to occasional glitches
        const occasionalGlitchTimer = setTimeout(() => {
          clearInterval(subtleGlitchInterval);
          
          // Just occasional glitches (reduced by 40%)
          const occasionalGlitchInterval = setInterval(() => {
            // Random on/off - very rare glitches (reduced by 40%)
            const isOn = Math.random() > 0.91; // Only 9% chance of glitching (reduced from 15%)
            
            if (isOn) {
              const offsetX = Math.random() * 3 - 1.5; // Random between -1.5 and 1.5 (reduced from -2.5 to 2.5)
              const offsetY = Math.random() * 3 - 1.5; // Random between -1.5 and 1.5 (reduced from -2.5 to 2.5)
              setGlitchOffset({ x: offsetX, y: offsetY });
              setGlitchActive(true);
            } else {
              setGlitchActive(false);
            }
          }, 280); // Even slower glitching (increased from 200ms)
          
          return () => {
            clearInterval(occasionalGlitchInterval);
          };
        }, 4000); // After 4 seconds of subtle glitches
        
        return () => {
          clearInterval(subtleGlitchInterval);
          clearTimeout(occasionalGlitchTimer);
        };
      }, 2500); // First 2.5 seconds are intense glitches
      
      return () => {
        clearInterval(intensiveGlitchInterval);
        clearTimeout(subtleGlitchTimer);
      };
    }
  }, [isActive, imageLoaded]);
  
  // Map speed names to rotation durations (in seconds)
  const speedMap = {
    slow: 120, // Very slow rotation
    medium: 80, 
    fast: 40
  };
  
  // Calculate duration based on speed
  const duration = speedMap[speed];
  
  // Calculate end rotation based on direction
  const endRotation = direction === "clockwise" ? 360 : -360;
  
  // The scale animation properties
  const scaleStart = shrink ? 8 : scale;
  const scaleEnd = isActive ? scale : shrink ? 8 : scale;

  // Don't render anything until the image is loaded
  if (!imageLoaded) return <>{children}</>;

  return (
    <>
      {/* Fixed background container */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Basic Rotation and Scale Animation */}
        <motion.div
          className="w-full h-full flex items-center justify-center"
          initial={{ 
            opacity: 0,
            scale: scaleStart
          }}
          animate={{ 
            opacity: isActive ? opacity : 0,
            scale: scaleEnd
          }}
          transition={{
            opacity: { 
              duration: 1.5, 
              delay: initialDelay
            },
            scale: { 
              duration: shrink ? 7 : 4, 
              ease: "easeInOut", 
              delay: initialDelay 
            }
          }}
        >
          {/* Continuous Rotation Animation */}
          <motion.div
            className="w-full h-full flex items-center justify-center"
            animate={{ 
              rotate: endRotation
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
            {/* Main image with optional glitch filter */}
            <div 
              className="w-full h-full flex items-center justify-center"
              style={{ 
                filter: glitchActive ? "hue-rotate(90deg) contrast(1.2) brightness(1.5)" : "none",
                transition: "filter 0.05s"
              }}
            >
              {/* Main image layer */}
              <img 
                src={mandelaImage} 
                alt="Background Mandala" 
                className="w-full h-full object-contain"
                style={{ 
                  maxWidth: '250vmin', 
                  maxHeight: '250vmin',
                  transform: glitchActive ? `translateX(${glitchOffset.x}px) translateY(${glitchOffset.y}px)` : "none",
                  transformOrigin: 'center center',
                  userSelect: 'none',
                  transition: "transform 0.02s"
                }}
              />
              
              {/* Glitch overlay */}
              {glitchActive && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {/* Slice effect 1 (reduced by 40%) */}
                  <div 
                    className="absolute w-full overflow-hidden" 
                    style={{
                      height: '20%', // Reduced from 33%
                      top: `${Math.random() * 80}%`,
                      transform: `translateX(${Math.random() * 6 - 3}px)`, // Reduced from 10-5 to 6-3
                      opacity: 0.48, // Reduced from 0.8
                      mixBlendMode: "screen"
                    }}
                  >
                    <img 
                      src={mandelaImage} 
                      alt="" 
                      className="w-full h-[300%] object-contain"
                      style={{
                        transform: `translateY(-${Math.random() * 40}%)` // Reduced from 67%
                      }}
                    />
                  </div>
                  
                  {/* Slice effect 2 (reduced by 40%) */}
                  <div 
                    className="absolute w-full overflow-hidden" 
                    style={{
                      height: '12%', // Reduced from 20%
                      top: `${Math.random() * 88}%`,
                      transform: `translateX(${Math.random() * 6 - 3}px)`, // Reduced from 10-5 to 6-3
                      opacity: 0.3, // Reduced from 0.5
                      filter: "hue-rotate(180deg)",
                      mixBlendMode: "exclusion"
                    }}
                  >
                    <img 
                      src={mandelaImage} 
                      alt="" 
                      className="w-full h-[500%] object-contain"
                      style={{
                        transform: `translateY(-${Math.random() * 80}%)`
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Simple scan line effect that appears when active */}
          {isActive && (
            <motion.div 
              className="absolute inset-0 pointer-events-none z-10"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 0 }}
              transition={{ 
                opacity: { 
                  duration: 2, 
                  delay: initialDelay + 0.5
                }
              }}
              style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  rgba(0, 255, 255, 0.1),
                  rgba(0, 255, 255, 0.1) 1px,
                  transparent 1px,
                  transparent 2px
                )`,
                backgroundSize: '100% 4px'
              }}
            />
          )}
        </motion.div>
      </div>
      {children}
    </>
  );
}