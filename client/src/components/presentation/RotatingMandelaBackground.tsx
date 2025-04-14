import { motion } from "framer-motion";
import mandelaImage from "@assets/Algoridigm Mandela Psy 3.png";
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
      
      // Create more intense glitches at the beginning
      const intensiveGlitchInterval = setInterval(() => {
        // More likely to glitch in the beginning
        const isOn = Math.random() > 0.2; // 80% chance of glitching
        
        if (isOn) {
          const offsetX = Math.random() * 20 - 10; // Random between -10 and 10 (more extreme)
          const offsetY = Math.random() * 20 - 10; // Random between -10 and 10 (more extreme)
          setGlitchOffset({ x: offsetX, y: offsetY });
          setGlitchActive(true);
        } else {
          setGlitchActive(false);
        }
      }, 60); // Very fast glitching
      
      // After a period, transition to more subtle glitching
      const subtleGlitchTimer = setTimeout(() => {
        clearInterval(intensiveGlitchInterval);
        
        // Create random glitches at specific times - more subtle
        const subtleGlitchInterval = setInterval(() => {
          // Random on/off
          const isOn = Math.random() > 0.6; // 40% chance of glitching
          
          if (isOn) {
            const offsetX = Math.random() * 8 - 4; // Random between -4 and 4 (more subtle)
            const offsetY = Math.random() * 8 - 4; // Random between -4 and 4 (more subtle) 
            setGlitchOffset({ x: offsetX, y: offsetY });
            setGlitchActive(true);
          } else {
            setGlitchActive(false);
          }
        }, 120); // Slower glitching
        
        // Eventually reduce to occasional glitches
        const occasionalGlitchTimer = setTimeout(() => {
          clearInterval(subtleGlitchInterval);
          
          // Just occasional glitches
          const occasionalGlitchInterval = setInterval(() => {
            // Random on/off - rare glitches
            const isOn = Math.random() > 0.85; // Only 15% chance of glitching
            
            if (isOn) {
              const offsetX = Math.random() * 5 - 2.5; // Random between -2.5 and 2.5 (subtle)
              const offsetY = Math.random() * 5 - 2.5; // Random between -2.5 and 2.5 (subtle)
              setGlitchOffset({ x: offsetX, y: offsetY });
              setGlitchActive(true);
            } else {
              setGlitchActive(false);
            }
          }, 200); // Very slow glitching
          
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
                  {/* Slice effect 1 */}
                  <div 
                    className="absolute w-full overflow-hidden" 
                    style={{
                      height: '33%',
                      top: `${Math.random() * 67}%`,
                      transform: `translateX(${Math.random() * 10 - 5}px)`,
                      opacity: 0.8,
                      mixBlendMode: "screen"
                    }}
                  >
                    <img 
                      src={mandelaImage} 
                      alt="" 
                      className="w-full h-[300%] object-contain"
                      style={{
                        transform: `translateY(-${Math.random() * 67}%)`
                      }}
                    />
                  </div>
                  
                  {/* Slice effect 2 */}
                  <div 
                    className="absolute w-full overflow-hidden" 
                    style={{
                      height: '20%',
                      top: `${Math.random() * 80}%`,
                      transform: `translateX(${Math.random() * 10 - 5}px)`,
                      opacity: 0.5,
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