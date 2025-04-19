import { motion } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";
import { useState, useEffect, useRef } from "react";
import { VideoBackground } from "@/components/presentation/VideoBackground";
import FlashingImagesWarning from "@/components/presentation/FlashingImagesWarning";
import Timer from "@/components/presentation/Timer";
import { ArrowRight, Database, Play, Server, Shield, Terminal, Cpu } from "lucide-react";

export default function VideoOpeningSlide() {
  const { goToSlide, startTimer } = usePresentationContext();
  // Animation phase state - controls the sequence
  const [animationPhase, setAnimationPhase] = useState(0);
  // State to control showing the flashing images warning
  const [showWarning, setShowWarning] = useState(true);
  // Container ref for error messages
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Phase 0: Nothing visible (initial state)
  // Phase 1: Boot sequence (terminal effects) - 3 seconds
  // Phase 2: J-Tech logo and loading elements - after Phase 1 - 4 seconds
  // Phase 3: Initialize AI message - after Phase 2 - 3 seconds
  // Phase 4: Begin button - after Phase 3
  
  useEffect(() => {
    // Only start animations if warning has been dismissed
    if (showWarning) return;
    
    // Start with phase 0 (nothing visible)
    const phase1Timer = setTimeout(() => {
      setAnimationPhase(1); // Boot sequence
      
      const phase2Timer = setTimeout(() => {
        setAnimationPhase(2); // Logo and loading
        
        const phase3Timer = setTimeout(() => {
          setAnimationPhase(3); // AI message
          
          const phase4Timer = setTimeout(() => {
            setAnimationPhase(4); // Begin button
          }, 3000);
          
          return () => clearTimeout(phase4Timer);
        }, 4000);
        
        return () => clearTimeout(phase3Timer);
      }, 3000);
      
      return () => clearTimeout(phase2Timer);
    }, 500);
    
    return () => clearTimeout(phase1Timer);
  }, [showWarning]);
  
  // Start timer when animations complete (phase 4)
  useEffect(() => {
    if (animationPhase === 4) {
      startTimer();
    }
  }, [animationPhase, startTimer]);
  
  // Handle advancing to next slide
  const handleBeginClick = () => {
    goToSlide(1);
  };
  
  // Stats data
  const stats = [
    { label: "CONNECTION", value: "SECURED", icon: <Terminal size={14} className="sm:w-4 sm:h-4 md:w-[16px] md:h-[16px]" /> },
    { label: "CORE SYSTEMS", value: "ONLINE", icon: <Cpu size={14} className="sm:w-4 sm:h-4 md:w-[16px] md:h-[16px]" /> },
    { label: "DATA STREAMS", value: "ACTIVE", icon: <Database size={14} className="sm:w-4 sm:h-4 md:w-[16px] md:h-[16px]" /> },
    { label: "SYSTEM INTEGRITY", value: "100%", icon: <Shield size={14} className="sm:w-4 sm:h-4 md:w-[16px] md:h-[16px]" /> },
    { label: "QUANTUM NODES", value: "ONLINE", icon: <Server size={14} className="sm:w-4 sm:h-4 md:w-[16px] md:h-[16px]" /> }
  ];
  
  return (
    <motion.div
      className="slide flex flex-col items-center justify-center h-full relative bg-[#050507] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      ref={containerRef}
    >
      {/* Flashing Images Warning */}
      {showWarning && (
        <FlashingImagesWarning onDismiss={() => setShowWarning(false)} />
      )}
      
      {/* Timer in top right corner */}
      <div className="absolute top-3 sm:top-6 right-3 sm:right-6 opacity-30 hover:opacity-80 transition-opacity duration-500 z-50">
        <Timer />
      </div>
      
      {/* Video Background with Rotating Symbols at 30% opacity */}
      <VideoBackground symbolsOpacity={0.3}>
        {/* CONTENT LAYERS - Only shown after warning is dismissed */}
        {!showWarning && (
          <>
            {/* BOOT SEQUENCE - Appears in phase 1 */}
            {animationPhase >= 1 && (
              <motion.div
                className="absolute inset-0 z-20 flex flex-col justify-center items-center p-4 md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: animationPhase === 1 ? 1 : 0 }}
                transition={{ duration: 1 }}
              >
                <div className="max-w-4xl w-full bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-corp-cyan/40 font-mono text-corp-cyan text-xs sm:text-sm md:text-base overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <p className="mb-1">$ initializing J-Tech Industries neural interface...</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <p className="mb-1">$ loading core systems... <span className="text-green-400">OK</span></p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    <p className="mb-1">$ initializing quantum network protocols... <span className="text-green-400">OK</span></p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.7 }}
                  >
                    <p className="mb-1">$ activating virtual training module... <span className="text-green-400">OK</span></p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 2.2 }}
                  >
                    <p className="text-yellow-400">SYSTEM READY</p>
                  </motion.div>
                </div>
              </motion.div>
            )}
            
            {/* MAIN CONTENT - Appears in phase 2 and stays */}
            {animationPhase >= 2 && (
              <motion.div
                className="relative z-30 flex flex-col items-center justify-center w-full h-full px-4 sm:px-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {/* J-TECH LOGO */}
                <motion.div
                  className="mb-6 sm:mb-12"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-corp-cyan via-corp-orange to-corp-cyan">
                    J-TECH <span className="text-white/80">INDUSTRIES</span>
                  </h1>
                </motion.div>
                
                {/* STATS PANEL */}
                <motion.div
                  className="mb-8 sm:mb-10 w-full max-w-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 bg-black/40 backdrop-blur-sm rounded-lg border border-corp-cyan/30">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        className={`flex items-center p-2 sm:p-3 rounded-md ${
                          index < 3 ? "col-span-1" : "col-span-1 sm:col-span-1.5"
                        } bg-corp-bg/50 border border-corp-cyan/20`}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                      >
                        <div className="mr-2 text-corp-orange">
                          {stat.icon}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full text-[10px] sm:text-xs">
                          <span className="text-corp-cyan font-medium">{stat.label}</span>
                          <span className="font-mono text-white/90 font-bold">{stat.value}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                {/* AI WELCOME MESSAGE - Appears in phase 3 */}
                {animationPhase >= 3 && (
                  <motion.div
                    className="w-full max-w-2xl mb-8 sm:mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="bg-black/50 backdrop-blur-sm border border-corp-orange/40 rounded-lg p-4 sm:p-5">
                      <h2 className="text-xl sm:text-2xl font-display mb-3 sm:mb-4 text-corp-orange">
                        AUTONOMOUS TRAINING MODULE
                      </h2>
                      <p className="text-sm sm:text-base mb-3 text-white/90">
                        Welcome, Administrator. This presentation contains proprietary information about project <span className="text-corp-lime font-bold">ALGORIDIGM</span>, authorized for qualified personnel only.
                      </p>
                      <p className="text-xs text-white/60">
                        © 2050 J-Tech Industries // All Rights Reserved
                      </p>
                    </div>
                  </motion.div>
                )}
                
                {/* BEGIN BUTTON - Appears in phase 4 */}
                {animationPhase >= 4 && (
                  <motion.button
                    onClick={handleBeginClick}
                    className="relative group bg-gradient-to-r from-corp-cyan to-corp-magenta px-8 py-3 sm:px-10 sm:py-4 rounded-md text-white font-bold text-lg sm:text-xl uppercase tracking-widest overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-white/10"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                    />
                    
                    <div className="flex items-center">
                      <span className="mr-2">BEGIN PRESENTATION</span>
                      <ArrowRight size={18} />
                    </div>
                    
                    <motion.div
                      className="absolute inset-0 border-2 border-white/30 rounded-md"
                      animate={{ 
                        boxShadow: ["0 0 0px rgba(0, 255, 255, 0)", "0 0 20px rgba(0, 255, 255, 0.5)", "0 0 0px rgba(0, 255, 255, 0)"]
                      }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                    />
                  </motion.button>
                )}
              </motion.div>
            )}
          </>
        )}
      </VideoBackground>
    </motion.div>
  );
}