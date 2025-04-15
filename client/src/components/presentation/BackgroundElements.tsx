import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BacteriaProps {
  count: number;
  maxBacteria: number;
  containerRef: React.RefObject<HTMLDivElement>;
  isActive: boolean;
}

export function Bacteria({ count, maxBacteria, containerRef, isActive }: BacteriaProps) {
  const [bacteriaElements, setBacteriaElements] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    if (!isActive || !containerRef.current || bacteriaElements.length >= maxBacteria) return;
    
    const interval = setInterval(() => {
      if (bacteriaElements.length >= maxBacteria) {
        clearInterval(interval);
        return;
      }
      
      const newBacteria = (
        <motion.div
          key={`bacteria-${bacteriaElements.length}-${Date.now()}`}
          className="absolute rounded-full"
          initial={{ 
            opacity: 0,
            x: Math.random() * (containerRef.current?.offsetWidth || 1000), 
            y: Math.random() * (containerRef.current?.offsetHeight || 800),
            width: 5 + Math.random() * 20,
            height: 5 + Math.random() * 20,
            backgroundColor: Math.random() > 0.5 
              ? "rgba(0, 240, 255, 0.1)" 
              : "rgba(255, 0, 245, 0.1)",
            boxShadow: Math.random() > 0.5
              ? "0 0 5px rgba(0, 240, 255, 0.5)"
              : "0 0 5px rgba(255, 0, 245, 0.5)"
          }}
          animate={{ 
            opacity: 0.5,
            scale: Math.random() > 0.7 ? [1, 1.05, 1] : 1
          }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 10, repeat: Infinity }
          }}
        />
      );
      
      setBacteriaElements(prev => [...prev, newBacteria]);
    }, 100);
    
    return () => clearInterval(interval);
  }, [isActive, bacteriaElements.length, containerRef, maxBacteria]);
  
  return <>{bacteriaElements}</>;
}

interface ErrorMessagesProps {
  isActive: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}

export function ErrorMessages({ isActive, containerRef }: ErrorMessagesProps) {
  const [errors, setErrors] = useState<JSX.Element[]>([]);
  const errorMessages = [
    'HALLUCINATION DETECTED',
    'COGNITIVE DISSONANCE',
    'NEURAL ANOMALY',
    'REALITY DISTORTION',
    'PERCEPTION ERROR',
    'MEMORY CORRUPTION',
    'CONSCIOUSNESS FORK',
    'SENSORY MANIPULATION',
    'ILLUSION PROTOCOL'
  ];
  
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const interval = setInterval(() => {
      const message = errorMessages[Math.floor(Math.random() * errorMessages.length)];
      const newError = (
        <motion.div
          key={`error-${errors.length}-${Date.now()}`}
          className="absolute text-corp-error text-sm font-bold"
          initial={{ 
            opacity: 0,
            x: Math.random() * (containerRef.current?.offsetWidth || 1000) * 0.8 + (containerRef.current?.offsetWidth || 1000) * 0.1, 
            y: Math.random() * (containerRef.current?.offsetHeight || 800) * 0.8 + (containerRef.current?.offsetHeight || 800) * 0.1,
            rotate: Math.random() * 20 - 10
          }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.5 }}
        >
          {message}
        </motion.div>
      );
      
      setErrors(prev => [...prev, newError]);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isActive, containerRef, errorMessages, errors.length]);
  
  return <>{errors}</>;
}

interface BackgroundParticlesProps {
  count?: number;
  pattern?: 'random' | 'mandala' | 'grid';
  colors?: 'cyan-magenta' | 'blue-green' | 'tricolor';
}

export function BackgroundParticles({ 
  count = 30, 
  pattern = 'mandala', 
  colors = 'cyan-magenta' 
}: BackgroundParticlesProps) {
  const particles = useRef<JSX.Element[]>([]);
  
  const getColorScheme = (index: number) => {
    switch(colors) {
      case 'cyan-magenta':
        return index % 2 === 0 
          ? { color: "rgba(0, 240, 255, 0.15)", shadow: "0 0 8px rgba(0, 240, 255, 0.4)" } 
          : { color: "rgba(255, 0, 245, 0.15)", shadow: "0 0 8px rgba(255, 0, 245, 0.4)" };
      case 'blue-green':
        return index % 2 === 0 
          ? { color: "rgba(0, 101, 255, 0.15)", shadow: "0 0 8px rgba(0, 101, 255, 0.4)" } 
          : { color: "rgba(57, 255, 20, 0.15)", shadow: "0 0 8px rgba(57, 255, 20, 0.4)" };
      case 'tricolor':
        return index % 3 === 0 
          ? { color: "rgba(0, 240, 255, 0.15)", shadow: "0 0 8px rgba(0, 240, 255, 0.4)" }
          : index % 3 === 1 
            ? { color: "rgba(255, 0, 245, 0.15)", shadow: "0 0 8px rgba(255, 0, 245, 0.4)" }
            : { color: "rgba(57, 255, 20, 0.15)", shadow: "0 0 8px rgba(57, 255, 20, 0.4)" };
      default:
        return { color: "rgba(255, 255, 255, 0.15)", shadow: "0 0 8px rgba(255, 255, 255, 0.4)" };
    }
  };
  
  // Calculate positions based on pattern
  const getPosition = (index: number, totalCount: number) => {
    switch(pattern) {
      case 'mandala':
        // Create a circular/mandala pattern
        const rings = 4; // Number of concentric rings
        const ring = Math.floor(index / (totalCount / rings)) + 1;
        const itemsInRing = Math.ceil(totalCount / rings);
        const angleStep = (2 * Math.PI) / itemsInRing;
        const angleOffset = index * angleStep;
        
        const radius = (ring / rings) * 45; // 45% of viewport
        const centerX = 50; // center of viewport
        const centerY = 50; // center of viewport
        
        const x = centerX + radius * Math.cos(angleOffset);
        const y = centerY + radius * Math.sin(angleOffset);
        
        return { left: `${x}vw`, top: `${y}vh` };
        
      case 'grid':
        // Create a grid pattern
        const cols = Math.ceil(Math.sqrt(totalCount));
        const rows = Math.ceil(totalCount / cols);
        
        const col = index % cols;
        const row = Math.floor(index / cols);
        
        const xStep = 100 / (cols + 1);
        const yStep = 100 / (rows + 1);
        
        const xPos = (col + 1) * xStep;
        const yPos = (row + 1) * yStep;
        
        return { left: `${xPos}vw`, top: `${yPos}vh` };
        
      case 'random':
      default:
        return { 
          left: `${Math.random() * 100}vw`, 
          top: `${Math.random() * 100}vh` 
        };
    }
  };
  
  if (particles.current.length === 0) {
    for (let i = 0; i < count; i++) {
      const colorScheme = getColorScheme(i);
      const position = getPosition(i, count);
      const size = pattern === 'mandala' 
        ? 4 + Math.random() * 10  // Smaller particles for mandala
        : 5 + Math.random() * 15; // Larger for others
        
      const animationDelay = pattern === 'mandala'
        ? i * (5 / count) // Sequential delay for mandala pattern
        : Math.random() * 5; // Random delay for other patterns
        
      particles.current.push(
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: colorScheme.color,
            boxShadow: colorScheme.shadow,
            ...position
          }}
          animate={{
            y: pattern === 'mandala' 
              ? [0, -5, 0] // Subtle movement for mandala
              : [0, -15, 0], // More movement for others
            scale: pattern === 'mandala'
              ? [1, 1.2, 1]
              : [1, 1.1, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            y: {
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: animationDelay
            },
            scale: {
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: animationDelay
            },
            opacity: {
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: animationDelay
            }
          }}
        />
      );
    }
    
    // Add connection lines for mandala pattern
    if (pattern === 'mandala') {
      // Add connection lines between particles in the same ring
      const rings = 4;
      const itemsPerRing = Math.ceil(count / rings);
      
      for (let ring = 0; ring < rings; ring++) {
        for (let i = 0; i < itemsPerRing; i++) {
          const particleIndex = ring * itemsPerRing + i;
          if (particleIndex >= count) continue;
          
          const nextIndex = ring * itemsPerRing + ((i + 1) % itemsPerRing);
          if (nextIndex >= count) continue;
          
          // Only add connections within the same ring
          particles.current.push(
            <motion.div
              key={`connection-${particleIndex}-${nextIndex}`}
              className="absolute pointer-events-none"
              style={{
                height: '1px',
                backgroundColor: i % 2 === 0 ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255, 0, 245, 0.1)',
                transformOrigin: 'left center',
                left: '50vw',
                top: '50vh',
                width: `${20 + ring * 10}vw`,
                transform: `rotate(${(i / itemsPerRing) * 360}deg)`
              }}
              animate={{
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                opacity: {
                  duration: 8,
                  repeat: Infinity,
                  delay: i * (4 / itemsPerRing)
                }
              }}
            />
          );
        }
      }
    }
  }
  
  return <>{particles.current}</>;
}

export default function BackgroundElements() {
  return null; // This component is just a collection of exported components
}
