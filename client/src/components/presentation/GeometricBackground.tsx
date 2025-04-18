import { motion } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";

interface GeometricBackgroundProps {
  direction?: "clockwise" | "counterclockwise";
  speed?: "slow" | "medium" | "fast";
  scale?: number;
  opacity?: number;
  initialDelay?: number;
  isActive?: boolean;
  shrink?: boolean;
  children?: ReactNode;
}

export function GeometricBackground({ 
  direction = "clockwise", 
  speed = "medium",
  scale = 2.5,
  opacity = 0.7,
  initialDelay = 0.5,
  isActive = true,
  shrink = false,
  children
}: GeometricBackgroundProps) {
  // Simple glitch animation states
  const [glitchActive, setGlitchActive] = useState(false);
  // Track glitch displacement values
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });
  
  // Create glitch effect when component is active
  useEffect(() => {
    if (!isActive) return;
    
    // Start with intensive glitching (reduced by 40%)
    const intensiveGlitchInterval = setInterval(() => {
      // Random on/off (reduced by 40%)
      const isOn = Math.random() > 0.64; // 36% chance of glitching (reduced from 60%)
      
      if (isOn) {
        const offsetX = Math.random() * 6 - 3; // Random between -3 and 3 (reduced from -5 to 5)
        const offsetY = Math.random() * 6 - 3; // Random between -3 and 3 (reduced from -5 to 5)
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
  }, [isActive]);
  
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
  const scaleEnd = scale;
  
  // Size of the pattern elements
  const numberOfShapes = 12;
  const shapes = [];
  
  // Generate each shape with different angles
  for (let i = 0; i < numberOfShapes; i++) {
    const angle = (i * 360) / numberOfShapes;
    shapes.push(angle);
  }

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
            {/* Main geometric pattern with optional glitch filter */}
            <div 
              className="w-full h-full flex items-center justify-center"
              style={{ 
                filter: glitchActive ? "hue-rotate(90deg) contrast(1.2) brightness(1.5)" : "none",
                transition: "filter 0.05s"
              }}
            >
              {/* Geometric Pattern */}
              <div 
                className="relative w-[600px] h-[600px]"
                style={{ 
                  transform: glitchActive ? `translateX(${glitchOffset.x}px) translateY(${glitchOffset.y}px)` : "none",
                  transformOrigin: 'center center',
                  userSelect: 'none',
                  transition: "transform 0.02s"
                }}
              >
                {/* Concentric circles */}
                <div className="absolute inset-0 border-[1px] border-[#00a2ff]/30 rounded-full" />
                <div className="absolute inset-[40px] border-[1px] border-[#ff00f5]/30 rounded-full" />
                <div className="absolute inset-[80px] border-[1px] border-[#80ff00]/30 rounded-full" />
                <div className="absolute inset-[120px] border-[1px] border-[#00a2ff]/30 rounded-full" />
                <div className="absolute inset-[160px] border-[1px] border-[#ff00f5]/30 rounded-full" />
                <div className="absolute inset-[200px] border-[1px] border-[#80ff00]/30 rounded-full" />
                
                {/* Radiating lines */}
                {shapes.map((angle, index) => (
                  <div 
                    key={`line-${index}`}
                    className="absolute top-1/2 left-1/2 w-[300px] h-[1px]"
                    style={{ 
                      transformOrigin: '0 0',
                      transform: `rotate(${angle}deg)`,
                      background: index % 3 === 0 
                        ? 'linear-gradient(90deg, rgba(0,162,255,0.4) 0%, rgba(0,162,255,0) 100%)' 
                        : index % 3 === 1 
                          ? 'linear-gradient(90deg, rgba(255,0,245,0.4) 0%, rgba(255,0,245,0) 100%)'
                          : 'linear-gradient(90deg, rgba(128,255,0,0.4) 0%, rgba(128,255,0,0) 100%)'
                    }}
                  />
                ))}
                
                {/* Inner geometric shapes */}
                <div className="absolute inset-[120px] border-[1px] border-[#00a2ff]/40 rotate-45" />
                <div className="absolute inset-[150px] border-[1px] border-[#ff00f5]/40 rotate-[30deg]" />
                <div className="absolute inset-[180px] border-[1px] border-[#80ff00]/40 rotate-[60deg]" />
                
                {/* Central elements */}
                <div className="absolute inset-[240px] border-[2px] border-[#00a2ff]/70 rounded-full" />
                <div className="absolute inset-[260px] border-[2px] border-[#ff00f5]/70 rotate-45" />
                <div className="absolute inset-[280px] border-[2px] border-[#80ff00]/70 rounded-full" />
                
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
                      <div 
                        className="relative w-[600px] h-[600px]"
                        style={{
                          transform: `translateY(-${Math.random() * 70}%)`, // Randomize vertical position
                          filter: "hue-rotate(90deg) saturate(150%)"
                        }}
                      >
                        {/* Duplicate concentric circles for the glitch effect */}
                        <div className="absolute inset-0 border-[1px] border-[#00a2ff]/30 rounded-full" />
                        <div className="absolute inset-[40px] border-[1px] border-[#ff00f5]/30 rounded-full" />
                        <div className="absolute inset-[80px] border-[1px] border-[#80ff00]/30 rounded-full" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Children are rendered inside the background */}
      {children}
    </>
  );
}

export default GeometricBackground;