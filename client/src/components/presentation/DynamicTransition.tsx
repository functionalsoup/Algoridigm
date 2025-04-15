import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TransitionType = 
  | 'fade' 
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale' 
  | 'glitch' 
  | 'hallucination-detected' 
  | 'orange-flash';

interface DynamicTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
  type?: TransitionType;
  duration?: number;
  delay?: number;
  className?: string;
}

export function DynamicTransition({
  children,
  isVisible,
  type = 'fade',
  duration = 0.5,
  delay = 0,
  className = ''
}: DynamicTransitionProps) {
  
  let initial = {};
  let animate = {};
  let exit = {};
  
  // Configure the animation based on type
  switch (type) {
    case 'fade':
      initial = { opacity: 0 };
      animate = { opacity: 1 };
      exit = { opacity: 0 };
      break;
      
    case 'slide-up':
      initial = { opacity: 0, y: 100 };
      animate = { opacity: 1, y: 0 };
      exit = { opacity: 0, y: -100 };
      break;
      
    case 'slide-down':
      initial = { opacity: 0, y: -100 };
      animate = { opacity: 1, y: 0 };
      exit = { opacity: 0, y: 100 };
      break;
      
    case 'slide-left':
      initial = { opacity: 0, x: 100 };
      animate = { opacity: 1, x: 0 };
      exit = { opacity: 0, x: -100 };
      break;
      
    case 'slide-right':
      initial = { opacity: 0, x: -100 };
      animate = { opacity: 1, x: 0 };
      exit = { opacity: 0, x: 100 };
      break;
      
    case 'scale':
      initial = { opacity: 0, scale: 0.8 };
      animate = { opacity: 1, scale: 1 };
      exit = { opacity: 0, scale: 0.8 };
      break;
      
    case 'glitch':
      initial = { opacity: 0, filter: 'blur(0px)' };
      animate = { opacity: 1, filter: 'blur(0px)' };
      exit = { 
        opacity: [1, 0.5, 0.8, 0.2, 0],
        x: [0, -10, 5, -5, 0],
        filter: ['blur(0px)', 'blur(2px)', 'blur(0px)', 'blur(4px)', 'blur(0px)']
      };
      break;
      
    case 'hallucination-detected':
      initial = { opacity: 0 };
      animate = { opacity: 1 };
      exit = { 
        opacity: [1, 1, 0.8, 0.5, 0],
        scale: [1, 1.02, 0.98, 1.1, 0],
        filter: [
          'hue-rotate(0deg) brightness(1) contrast(1)',
          'hue-rotate(90deg) brightness(1.2) contrast(1.5)',
          'hue-rotate(180deg) brightness(0.8) contrast(2)',
          'hue-rotate(0deg) brightness(1) contrast(1)'
        ]
      };
      break;
      
    case 'orange-flash':
      initial = { opacity: 0, scale: 0.95 };
      animate = { opacity: 1, scale: 1 };
      exit = { 
        opacity: [1, 1, 0.5, 0],
        scale: [1, 1.02, 1.05, 0.9],
        backgroundColor: [
          'rgba(255, 77, 0, 0)', 
          'rgba(255, 77, 0, 0.3)', 
          'rgba(255, 77, 0, 0.7)', 
          'rgba(0, 0, 0, 0)'
        ]
      };
      break;
  }
  
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className={className}
          initial={initial}
          animate={{
            ...animate,
            transition: { 
              duration, 
              delay, 
              ease: "easeInOut" 
            }
          }}
          exit={{
            ...exit,
            transition: { 
              duration: duration * 1.2,
              ease: "easeInOut" 
            }
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}