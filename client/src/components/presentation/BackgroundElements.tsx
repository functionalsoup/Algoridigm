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
    'SECURITY BREACH',
    'HOSTILE ENTITY DETECTED',
    'SYSTEM FAILURE',
    'PROTOCOL VIOLATION',
    'NEURAL CORRUPTION',
    'COUNTERMEASURES FAILING',
    'ERROR 451',
    'CONSCIOUSNESS FORK',
    'REALITY DISTORTION'
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
}

export function BackgroundParticles({ count = 30 }: BackgroundParticlesProps) {
  const particles = useRef<JSX.Element[]>([]);
  
  if (particles.current.length === 0) {
    for (let i = 0; i < count; i++) {
      particles.current.push(
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${5 + Math.random() * 15}px`,
            height: `${5 + Math.random() * 15}px`,
            backgroundColor: Math.random() > 0.5 ? "rgba(0, 240, 255, 0.1)" : "rgba(255, 0, 245, 0.1)",
            boxShadow: Math.random() > 0.5 ? "0 0 5px rgba(0, 240, 255, 0.5)" : "0 0 5px rgba(255, 0, 245, 0.5)",
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: 0.3
          }}
          transition={{
            y: {
              duration: 6,
              repeat: Infinity,
              delay: Math.random() * 5
            }
          }}
        />
      );
    }
  }
  
  return <>{particles.current}</>;
}

export default function BackgroundElements() {
  return null; // This component is just a collection of exported components
}
