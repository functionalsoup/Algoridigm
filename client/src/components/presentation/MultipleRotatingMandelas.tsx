import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import mandelaImage from "@assets/IMG_2437.jpeg";

interface MandelaConfig {
  id: number;
  scale: number;
  x: number;
  y: number;
  rotationDuration: number;
  direction: "clockwise" | "counterclockwise";
  opacity: number;
  zIndex: number;
}

interface MultipleRotatingMandelasProps {
  count?: number;
  isActive?: boolean;
  largeBackgroundOpacity?: number;
}

export function MultipleRotatingMandelas({ 
  count = 6,
  isActive = true,
  largeBackgroundOpacity = 0.15
}: MultipleRotatingMandelasProps) {
  const [mandelas, setMandelas] = useState<MandelaConfig[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Preload the image 
  useEffect(() => {
    const img = new Image();
    img.src = mandelaImage;
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);
  
  useEffect(() => {
    if (!isActive) return;
    
    // Generate random mandelas
    const newMandelas: MandelaConfig[] = [];
    for (let i = 0; i < count; i++) {
      newMandelas.push({
        id: i,
        scale: 0.3 + Math.random() * 0.7, // Between 0.3 and 1.0
        x: Math.random() * 90 - 45, // Random position offset
        y: Math.random() * 90 - 45, // Random position offset
        rotationDuration: 40 + Math.random() * 160, // Between 40s and 200s
        direction: Math.random() > 0.5 ? "clockwise" : "counterclockwise",
        opacity: 0.2 + Math.random() * 0.5, // Between 0.2 and 0.7
        zIndex: Math.floor(Math.random() * 5) // Random z-index 0-4
      });
    }
    
    setMandelas(newMandelas);
  }, [isActive, count]);
  
  if (!isActive || !imageLoaded) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Large background mandela with very low opacity */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-full h-full flex items-center justify-center"
          animate={{ 
            rotate: 360
          }}
          transition={{
            rotate: {
              duration: 180, // Very slow rotation
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop"
            }
          }}
          style={{ opacity: largeBackgroundOpacity }}
        >
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
        </motion.div>
      </div>
      
      {/* Multiple smaller mandelas with different rotation speeds/directions */}
      {mandelas.map((mandela) => (
        <motion.div
          key={`mandela-${mandela.id}`}
          className="absolute"
          style={{
            left: `calc(50% + ${mandela.x}px)`,
            top: `calc(50% + ${mandela.y}px)`,
            width: '100%',
            height: '100%',
            opacity: mandela.opacity,
            zIndex: mandela.zIndex,
            transformOrigin: 'center center'
          }}
          animate={{ 
            rotate: mandela.direction === "clockwise" ? 360 : -360
          }}
          transition={{
            rotate: {
              duration: mandela.rotationDuration,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop"
            }
          }}
        >
          <img 
            src={mandelaImage} 
            alt="" 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain select-none"
            style={{ 
              width: `${Math.min(window.innerWidth, window.innerHeight) * mandela.scale}px`,
              height: `${Math.min(window.innerWidth, window.innerHeight) * mandela.scale}px`,
              maxWidth: 'none',
              maxHeight: 'none'
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default MultipleRotatingMandelas;