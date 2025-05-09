import { motion } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";
import { RotatingMandelaBackground } from "@/components/presentation/RotatingMandelaBackground";
import RotatingSymbolsBackground from "@/components/presentation/RotatingSymbolsBackground";
import { ErrorMessages } from "@/components/presentation/BackgroundElements";
import Timer from "@/components/presentation/Timer";
import { useState, useEffect, useRef } from "react";
import FlashingImagesWarning from "@/components/presentation/FlashingImagesWarning";
import { ArrowRight, Database, Play, Server, Shield, Terminal, Cpu } from "lucide-react";

export default function OpeningSlide() {
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
  // Phase 3: Initialize AI message and mandala - after Phase 2 - 3 seconds
  // Phase 4: Begin button - after Phase 3
  
  useEffect(() => {
    // Only start animations if warning has been dismissed
    if (showWarning) return;
    
    // Start with phase 0 (nothing visible)
    setAnimationPhase(0);
    
    // After a small delay for component to render, show phase 1 (boot sequence)
    const phase1Timer = setTimeout(() => setAnimationPhase(1), 200);
    
    // After 3 seconds, go to phase 2 (J-Tech logo and loading)
    const phase2Timer = setTimeout(() => setAnimationPhase(2), 3000);
    
    // After 7 seconds total, go to phase 3 (AI initialization)
    const phase3Timer = setTimeout(() => setAnimationPhase(3), 7000);
    
    // After 10 seconds total, go to phase 4 (begin button)
    const phase4Timer = setTimeout(() => setAnimationPhase(4), 10000);
    
    return () => {
      clearTimeout(phase1Timer);
      clearTimeout(phase2Timer);
      clearTimeout(phase3Timer);
      clearTimeout(phase4Timer);
    };
  }, [showWarning]);
  
  const handleBegin = () => {
    startTimer();
    goToSlide(1); // Go to the reveal slide
  };
  
  // Function to generate console messages - Restored original boot sequence
  const renderConsoleMessages = () => {
    const messages = [
      { text: "INITIALIZING J-TECH AUTONOMOUS TRAINING SYSTEM v3.11.2...", delay: 0 },
      { text: "LOADING CORE MODULES...", delay: 0.6 },
      { text: "NEURAL NETWORK CALIBRATION: OK", delay: 1.2 },
      { text: "ENVIRONMENT SENSOR ARRAY: ONLINE", delay: 1.6 },
      { text: "BIOMETRIC INTERFACE: INITIALIZED", delay: 2.0 },
      { text: "SECURITY PROTOCOLS: ACTIVE", delay: 2.4 },
      { text: "LOADING TRAINING SEQUENCE: ALGORIDIGM", delay: 2.8 }
    ];
    
    return messages.map((msg, index) => (
      <motion.div 
        key={`console-${index}`}
        className="font-mono text-[#00a2ff] text-sm mb-1"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: msg.delay }}
      >
        <span className="text-white/60 mr-2">&gt;</span>
        {msg.text}
      </motion.div>
    ));
  };
  
  // Animated stats for HUD-like display - Restoring system-focused stats
  const stats = [
    { label: "NEURAL NETWORK", value: "ONLINE", icon: <Cpu size={14} className="sm:w-4 sm:h-4 md:w-[16px] md:h-[16px]" /> },
    { label: "MEMORY ALLOCATION", value: "84.3%", icon: <Database size={14} className="sm:w-4 sm:h-4 md:w-[16px] md:h-[16px]" /> },
    { label: "SECURITY LEVEL", value: "ALPHA", icon: <Shield size={14} className="sm:w-4 sm:h-4 md:w-[16px] md:h-[16px]" /> },
    { label: "SYSTEM INTEGRITY", value: "NOMINAL", icon: <Server size={14} className="sm:w-4 sm:h-4 md:w-[16px] md:h-[16px]" /> }
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
      
      <div className="absolute top-3 sm:top-6 right-3 sm:right-6 opacity-30 hover:opacity-80 transition-opacity duration-500 z-50">
        <Timer />
      </div>
      
      {/* Error/Hallucination Messages removed as requested */}
      
      {/* Rotating Symbols Background - Always present */}
      <RotatingSymbolsBackground symbolCount={20} isActive={true} />
      
      {/* ROTATING MANDALA - Positioned behind everything - appears in phase 3 */}
      {animationPhase >= 3 && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <RotatingMandelaBackground 
            direction="clockwise"
            speed="slow"
            opacity={0.3}
            isActive={true} 
            shrink={false}
            initialDelay={0.1}
            scale={1.8}
          />
        </div>
      )}
      
      {/* Grid/Scan line overlay effect */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMjAgMCBMIDAgMCAwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwxNjIsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]
         mix-blend-mode-multiply pointer-events-none opacity-60 z-[5]"></div>
      
      {/* Main content container */}
      <div className="w-full max-w-5xl mx-auto px-4 relative z-20 flex flex-col items-center justify-center h-full">
        
        {/* Boot sequence terminal - Phase 1 */}
        {animationPhase >= 1 && animationPhase <= 3 && (
          <motion.div 
            className="absolute top-4 sm:top-8 left-2 sm:left-8 w-[calc(100%-16px)] sm:w-full max-w-md bg-[#0c0c14]/90 border border-[#1a3a59] rounded-xl p-3 sm:p-4 backdrop-blur-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: animationPhase === 1 ? 1 : animationPhase === 2 ? 0.7 : animationPhase === 3 ? 0.3 : 0,
              y: 0 
            }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-2 border-b border-[#1a3a59] pb-1 sm:pb-2">
              <Terminal size={14} className="text-[#00a2ff] mr-2" />
              <span className="text-[#00a2ff] text-xs font-mono">SYSTEM BOOT SEQUENCE</span>
            </div>
            <div className="font-mono text-[10px] sm:text-xs space-y-1 max-h-[25vh] sm:max-h-none overflow-y-auto">
              {renderConsoleMessages()}
            </div>
          </motion.div>
        )}

        {/* AI Initialization (NEURAL PATTERN) - TOP PRIORITY POSITIONING */}
        {animationPhase >= 2 && (
          <motion.div
            className="text-center mb-8 sm:mb-10 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Background glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00a2ff]/5 via-[#ff2a6d]/5 to-[#00a2ff]/5 blur-[60px] z-0"
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
            
            {/* AI Status Text - POSITIONED AT TOP */}
            <motion.div 
              className="text-center mb-3 sm:mb-6 relative z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-white/80 text-base sm:text-lg md:text-xl mb-1">INITIALIZING TRAINING SEQUENCE</div>
              <motion.h2 
                className="text-lg sm:text-xl md:text-2xl font-bold text-[#80ff00] font-display tracking-wide mb-2 sm:mb-4"
                style={{ textShadow: "0 0 10px rgba(128, 255, 0, 0.5)" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  filter: [
                    "drop-shadow(0 0 10px rgba(128, 255, 0, 0.5))",
                    "drop-shadow(0 0 20px rgba(128, 255, 0, 0.8))",
                    "drop-shadow(0 0 10px rgba(128, 255, 0, 0.5))"
                  ]
                }}
                transition={{ 
                  opacity: { duration: 1.2 },
                  scale: { duration: 1.5 },
                  filter: { 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }
                }}
              >
                ALGORIDIGM
              </motion.h2>
              
              <motion.div 
                className="text-white/60 text-xs sm:text-sm max-w-xl mx-auto px-3 sm:px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <p className="mb-2 sm:mb-4">
                  Performance optimization sequence initiated. Educational content prepared for authorized personnel.
                  <br />Proceed with caution: simulation may contain instructional anomalies for learning assessment.
                </p>
                
                <div className="inline-block px-2 sm:px-4 py-1 bg-[#ff2a6d]/10 border border-[#ff2a6d]/30 rounded-lg text-[#ff2a6d] text-[10px] sm:text-xs font-medium mb-2">
                  HALLUCINATION PROBABILITY 63%
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
        
        {/* Loading bar - Middle */}
        {animationPhase >= 2 && (
          <motion.div
            className="w-full max-w-xl mx-auto h-1 bg-[#131320] rounded-full overflow-hidden mt-2 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#0054a6] via-[#00a2ff] to-[#0054a6]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, delay: 0.8, ease: "easeInOut" }}
            />
          </motion.div>
        )}
        
        {/* J-Tech Logo and Module info - MOVED TO BOTTOM */}
        {animationPhase >= 2 && (
          <motion.div
            className="text-center mt-4 mb-4 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Updated Autonomous Training Module Header */}
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >  
              <h1 className="text-xl sm:text-2xl md:text-4xl font-display font-bold tracking-wider text-[#00a2ff] px-1">
                AUTONOMOUS TRAINING MODULE
              </h1>
              <div className="text-white/40 text-xs sm:text-sm mt-2 font-mono tracking-wide">J-TECH INDUSTRIES • EST. 2050</div>
            </motion.div>
            
            {/* Stats indicators */}
            <motion.div 
              className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-6 mt-4 sm:mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={`stat-${index}`}
                  className="bg-[#0c0c14]/80 border border-[#1a3a59] rounded-lg px-2 sm:px-3 py-1 sm:py-2 flex items-center"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.4 + index * 0.15 }}
                >
                  <div className="text-[#00a2ff] mr-1 sm:mr-2">{stat.icon}</div>
                  <div>
                    <div className="text-[8px] sm:text-[10px] text-white/50 uppercase tracking-wider">{stat.label}</div>
                    <div className="text-[10px] sm:text-xs font-semibold text-white/90">{stat.value}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
        
        {/* Begin button - Phase 4 */}
        {animationPhase >= 4 && (
          <motion.div
            className="mt-4 sm:mt-6 md:mt-8 relative z-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >

            
            {/* Animated glow behind button */}
            <motion.div
              className="absolute inset-0 -top-4 sm:-top-6 -bottom-4 sm:-bottom-6 -left-4 sm:-left-8 -right-4 sm:-right-8 rounded-full bg-gradient-to-r from-[#00a2ff]/10 to-[#ff2a6d]/10 blur-xl"
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
            
            <motion.button
              onClick={handleBegin}
              className="relative bg-gradient-to-r from-[#00a2ff] to-[#0088e0] text-black font-bold text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6 md:px-8 rounded-full tracking-wider flex items-center gap-1 sm:gap-2 shadow-lg shadow-[#00a2ff]/20"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 25px rgba(0, 162, 255, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span>BEGIN</span>
              <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}