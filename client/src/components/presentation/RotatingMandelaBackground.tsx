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
  
  // Preload the image before displaying it
  useEffect(() => {
    const img = new Image();
    img.src = mandelaImage;
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);
  
  // Map speed names to rotation durations (in seconds)
  const speedMap = {
    slow: 120, // Very slow rotation
    medium: 80, 
    fast: 40
  };
  
  // Calculate duration based on speed
  const duration = speedMap[speed];
  
  // Rotation keyframes
  const rotationKeyframes = direction === "clockwise" 
    ? [0, 360] // Clockwise rotation keyframes
    : [0, -360]; // Counter-clockwise rotation keyframes
    
  // The scale animation properties
  const scaleStart = shrink ? 8 : scale;
  const scaleEnd = isActive ? scale : shrink ? 8 : scale;

  // Don't render anything until the image is loaded
  if (!imageLoaded) return <>{children}</>;

  return (
    <>
      {/* Fixed background container */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Glitch and Scale Animation */}
        <motion.div
          className="w-full h-full flex items-center justify-center"
          initial={{ 
            opacity: 0,
            scale: scaleStart,
            x: 20, // Start slightly offset
            filter: "blur(10px) hue-rotate(90deg) brightness(1.5)" // Start with heavy distortion
          }}
          animate={{ 
            opacity: isActive ? opacity : 0,
            scale: scaleEnd,
            x: 0, // Center properly
            filter: "blur(0px) hue-rotate(0deg) brightness(1)" // Remove distortion
          }}
          transition={{
            opacity: { 
              duration: 1.5, 
              ease: "steps(3)", // Stepped animation for glitch effect
              delay: initialDelay,
              times: [0, 0.2, 0.3, 0.4, 0.6, 1] // Irregular timing for a glitch feel
            },
            scale: { 
              duration: shrink ? 7 : 4, 
              ease: "easeInOut", 
              delay: initialDelay 
            },
            x: {
              duration: 1,
              ease: "backOut",
              delay: initialDelay
            },
            filter: {
              duration: 1.2,
              ease: "steps(4)", // Stepped filter changes for digital glitch look
              delay: initialDelay
            }
          }}
        >
          {/* Continuous Rotation Animation */}
          <motion.div
            className="w-full h-full flex items-center justify-center"
            initial={{ rotate: 0 }} // Start at 0
            animate={{ rotate: rotationKeyframes[1] }} // End at full rotation
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
              {/* Main image */}
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
              
              {/* Glitch overlay effect that disappears */}
              {isActive && (
                <>
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center overflow-hidden"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0 }}
                    transition={{ 
                      opacity: { 
                        duration: 1.8, 
                        delay: initialDelay + 0.3,
                        ease: "steps(5)" // Stepped fade for digital glitch feel
                      }
                    }}
                  >
                    <motion.img 
                      src={mandelaImage} 
                      alt=""
                      className="w-full h-full object-contain"
                      style={{ 
                        maxWidth: '250vmin', 
                        maxHeight: '250vmin',
                        filter: "hue-rotate(90deg) contrast(1.5) brightness(1.5)",
                        mixBlendMode: "overlay"
                      }}
                      animate={{ 
                        x: [5, -10, 8, 0, -5, 0],
                        y: [8, -5, 0, 10, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "steps(6)",
                        times: [0, 0.2, 0.3, 0.5, 0.7, 1],
                        delay: initialDelay
                      }}
                    />
                  </motion.div>
                
                  {/* Scan lines effect that fades out */}
                  <motion.div 
                    className="absolute inset-0 pointer-events-none z-10"
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 0 }}
                    transition={{ 
                      opacity: { 
                        duration: 2.5, 
                        delay: initialDelay + 0.7 
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
                  
                  {/* Digital noise overlay */}
                  <motion.div 
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0.25 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 2, delay: initialDelay + 1 }}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      mixBlendMode: "overlay"
                    }}
                  />
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
      {children}
    </>
  );
}