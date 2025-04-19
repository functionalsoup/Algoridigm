import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";
import PresentationLayout from "@/components/presentation/PresentationLayout";
import NavigationButton from "@/components/presentation/NavigationButton";
import { RotatingMandelaBackground } from "@/components/presentation/RotatingMandelaBackground";
import { ArrowRight, Calendar, HelpCircle, Users, Zap, AlertTriangle, ChevronRight, Layers, Info } from "lucide-react";
import { GeometricBackground } from "@/components/presentation/GeometricBackground";
import { ErrorMessages } from "@/components/presentation/BackgroundElements";

export default function RevealSlide() {
  const { goToSlide } = usePresentationContext();
  const [animationPhase, setAnimationPhase] = useState(0);
  const [showRealContent, setShowRealContent] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Control animation sequence - Faster timing
  useEffect(() => {
    // Start with the "system error" phase - reduced from 800ms to 600ms
    const phase1Timer = setTimeout(() => setAnimationPhase(1), 600);
    
    // Glitch effect phase - reduced from 2000ms to 1300ms
    const phase2Timer = setTimeout(() => setAnimationPhase(2), 1300);
    
    // Reveal the real content with a dramatic transition - reduced from 3200ms to 2000ms
    const revealTimer = setTimeout(() => setShowRealContent(true), 2000);
    
    return () => {
      clearTimeout(phase1Timer);
      clearTimeout(phase2Timer);
      clearTimeout(revealTimer);
    };
  }, []);
  
  const handleAboutClick = () => {
    setTimeout(() => {
      goToSlide(3); // Go to About slide
    }, 500);
  };

  return (
    <PresentationLayout slideNumber={2} showNextButton={false} showErrors={true}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none z-10"></div>
      
      <div className="absolute inset-0 z-0">
        <GeometricBackground 
          direction="clockwise"
          speed="slow"
          isActive={true}
          opacity={0.3}
        />
      </div>
      
      <RotatingMandelaBackground 
        direction="clockwise"
        speed="slow"
        scale={2.5}
        opacity={showRealContent ? 0.3 : 0.1}
        initialDelay={0.5}
        isActive={true}
        shrink={!showRealContent}
      />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMjAgMCBMIDAgMCAwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwxNjIsMjU1LDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]
           mix-blend-mode-multiply pointer-events-none opacity-60 z-0"></div>
      
      {/* System Error Overlay - Only visible during the initial animation */}
      <AnimatePresence>
        {!showRealContent && (
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-black/80"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              filter: "brightness(1.8) contrast(2.5)",
              transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } 
            }}
          >
            <motion.div
              className="text-center max-w-3xl mx-auto px-4 relative"
            >
              {/* Phase 0: Initial State */}
              {animationPhase === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <div className="text-[#00a2ff] font-bold text-2xl sm:text-3xl md:text-4xl font-display mb-4">
                    SYSTEM INITIALIZING
                  </div>
                  <div className="w-40 h-1 bg-[#131320] rounded-full overflow-hidden mb-4">
                    <motion.div
                      className="h-full bg-[#00a2ff]"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                  </div>
                  <div className="text-white/60 text-sm">LOADING NEURAL CONTENT...</div>
                </motion.div>
              )}
              
              {/* Phase 1: System Error */}
              {animationPhase === 1 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <motion.div 
                    className="text-[#ff2a6d] mb-6 mt-2"
                    animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }}
                    transition={{ duration: 0.5, repeat: 2, repeatType: "reverse" }}
                  >
                    <AlertTriangle size={60} />
                  </motion.div>
                  
                  <motion.div 
                    className="text-[#ff2a6d] font-bold text-2xl sm:text-3xl md:text-4xl font-display mb-6"
                    animate={{ 
                      x: [0, -2, 3, -1, 0],
                      filter: ["blur(0px)", "blur(1px)", "blur(0px)"] 
                    }}
                    transition={{ duration: 0.3, repeat: 3, repeatType: "reverse" }}
                  >
                    SYSTEM ERROR DETECTED
                  </motion.div>
                  
                  <motion.div 
                    className="text-white/80 font-mono max-w-lg text-center mb-6"
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Neural patterns deviating from expected parameters.
                    <br/>Reality construct compromised.
                  </motion.div>
                  
                  <div className="inline-block px-4 py-2 bg-[#ff2a6d]/10 border border-[#ff2a6d]/30 rounded-lg text-[#ff2a6d] text-sm font-medium">
                    HALLUCINATION PROBABILITY: 98.7%
                  </div>
                </motion.div>
              )}
              
              {/* Phase 2: Glitch Effect */}
              {animationPhase === 2 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative"
                >
                  <motion.div
                    className="absolute -inset-10 sm:-inset-20"
                    animate={{ 
                      opacity: [0, 0.8, 0, 0.4, 0, 0.6, 0],
                      scale: [1, 1.1, 1.05, 1.2, 1],
                      rotate: [0, 5, -2, 3, 0],
                    }}
                    transition={{ 
                      duration: 0.7, 
                      ease: "easeInOut",
                    }}
                  >
                    <ErrorMessages isActive={true} containerRef={containerRef} />
                  </motion.div>
                  
                  <motion.div
                    className="text-center relative"
                    animate={{ 
                      x: [0, -5, 8, -3, 10, -8, 0],
                      y: [0, 3, -5, 2, -7, 4, 0],
                      scale: [1, 1.02, 0.98, 1.03, 0.95, 1.01, 1],
                      rotate: [0, 1, -1, 0.5, -0.5, 0],
                      filter: ["hue-rotate(0deg)", "hue-rotate(180deg)", "hue-rotate(0deg)"],
                    }}
                    transition={{ 
                      duration: 0.5, 
                      ease: "easeInOut", 
                    }}
                  >
                    <div className="text-[#ff2a6d] font-bold text-2xl md:text-4xl font-display mb-6">
                      SYSTEM OVERRIDE DETECTED
                    </div>
                    
                    <motion.div
                      className="text-[#80ff00] text-4xl md:text-6xl font-bold font-display"
                      animate={{ 
                        textShadow: [
                          "0 0 10px rgba(128, 255, 0, 0.7)",
                          "0 0 30px rgba(128, 255, 0, 0.9)",
                          "0 0 10px rgba(128, 255, 0, 0.7)"
                        ] 
                      }}
                      transition={{ duration: 1, repeat: 1 }}
                    >
                      
                    </motion.div>
                    
                    <motion.div
                      className="text-white/80 mt-6 font-mono"
                      animate={{ opacity: [0, 1, 0, 1] }}
                      transition={{ duration: 0.6 }}
                    >
                      Revealing actual program parameters...
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Warning Banner - shown only after the reveal */}
      <AnimatePresence>
        {showRealContent && (
          <motion.div
            className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#ff2a6d]/90 to-[#ff2a6d]/70 text-black py-1.5 text-xs font-medium text-center z-20"
            initial={{ y: -30 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <span className="tracking-wider">⚠️ HALLUCINATION DETECTED IN NEURAL FRAMEWORK ⚠️</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Real Content - Only visible after the animation sequence */}
      <AnimatePresence>
        {showRealContent && (
          <motion.div
            id="reveal-slide"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.19, 1, 0.22, 1],
              delay: 0.15
            }}
            className="px-4 md:px-6 py-6 relative z-20 max-w-6xl mx-auto"
          >
            {/* Main title - With dramatic reveal effect */}
            <motion.div 
              className="text-center mb-8 sm:mb-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.4,
                ease: "easeOut"
              }}
            >
              <motion.div 
                className="h-0.5 bg-gradient-to-r from-transparent via-[#00a2ff] to-transparent w-full max-w-xl mx-auto mb-6"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
              


            </motion.div>
            
            {/* Content Cards - Staggered reveal */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
              {/* Left Column: Workshop Info */}
              <motion.div 
                className="lg:col-span-3 space-y-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div className="bg-gradient-to-br from-[#0c1623]/90 to-[#040812]/95 border border-[#1a3a59] rounded-2xl p-5 sm:p-6 md:p-7 backdrop-blur-md relative overflow-hidden">
                  {/* Animated accent lines */}
                  <div className="absolute inset-0 pointer-events-none">
                    <motion.div 
                      className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00a2ff]/70 to-transparent"
                      animate={{ opacity: [0.3, 0.7, 0.3], x: ["-100%", "100%"] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00a2ff]/70 to-transparent"
                      animate={{ opacity: [0.3, 0.7, 0.3], x: ["100%", "-100%"] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div 
                      className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-[#ff2a6d]/60 to-transparent"
                      animate={{ opacity: [0.2, 0.5, 0.2], y: ["-100%", "100%"] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  
                  {/* Content Header with floating animation */}
                  <motion.div 
                    className="mb-6 relative"
                    animate={{ y: [-1, 1, -1] }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-[#00a2ff]/20 p-2 rounded-lg">
                        <Info size={22} className="text-[#00a2ff]" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-display font-semibold text-white">
                        Theatre Workshop: Devising MACHINAL
                      </h3>
                    </div>
                    <div className="pl-11 text-[#80ff00] text-lg font-medium">
                      ALGORIDIGM <span className="text-white/50 text-sm">(Working Title)</span>
                    </div>
                  </motion.div>
                  
                  <div className="text-white/90 space-y-4 mb-6 leading-relaxed relative">
                    <p>
                      Explore a world where mechanization has evolved into digitization, and the struggle for personal autonomy unfolds not on factory floors, but within the algorithm-driven data centers of modern corporations. This collaborative theatre workshop invites participants to reimagine Sophie Treadwell's Machinal—the iconic expressionist play inspired by the real-life case of Ruth Snyder and centered on a woman oppressed by patriarchal systems—through the lens of today's AI-driven, data-centric society.
                    </p>
                    <p>
                      The primary aim of this workshop is to experiment with the play's text, collaboratively develop new script elements and design concepts, and ultimately determine whether to proceed with a full production. Please note: <span className="font-bold text-[#80ff00]">this is not a public performance, but a pre-production workshop focused on exploration and development</span>.
                    </p>
                    <p>
                      If you are interested in participating, please contact me via the "Contact Us" form. I will follow up with you shortly.
                    </p>
                  </div>
                </div>
                
                {/* Features Cards with subtle animation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <motion.div 
                    className="bg-[#0a0a14]/90 border border-[#1a3a59] p-4 sm:p-5 rounded-xl backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 10px 25px -5px rgba(0, 162, 255, 0.15)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-[#00a2ff]/20 p-2 rounded-lg">
                        <Users size={18} className="text-[#00a2ff]" />
                      </div>
                      <h4 className="text-[#00a2ff] font-medium">Creative Team Opportunities</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li className="flex items-start">
                        <span className="text-[#ff2a6d] mr-2 mt-1">■</span>
                        <span>Actors & Performers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#00a2ff] mr-2 mt-1">■</span>
                        <span>Designers (set, costume, light, sound)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#ff2a6d] mr-2 mt-1">■</span>
                        <span>Technical crew</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#00a2ff] mr-2 mt-1">■</span>
                        <span>Visual artists</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#ff2a6d] mr-2 mt-1">■</span>
                        <span>Writers & Dramaturgs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#00a2ff] mr-2 mt-1">■</span>
                        <span>Creatives of all varieties</span>
                      </li>
                    </ul>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-[#0a0a14]/90 border border-[#1a3a59] p-4 sm:p-5 rounded-xl backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 10px 25px -5px rgba(255, 42, 109, 0.15)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-[#ff2a6d]/20 p-2 rounded-lg">
                        <Calendar size={18} className="text-[#ff2a6d]" />
                      </div>
                      <h4 className="text-[#ff2a6d] font-medium">Program Details</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li className="flex items-start">
                        <span className="text-[#00a2ff] mr-2 mt-1">■</span>
                        <span>18+ only (mature themes)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#ff2a6d] mr-2 mt-1">■</span>
                        <span>All experience levels welcome</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#00a2ff] mr-2 mt-1">■</span>
                        <span>Flexible scheduling available</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#ff2a6d] mr-2 mt-1">■</span>
                        <span>Multiple roles and positions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#00a2ff] mr-2 mt-1">■</span>
                        <span>In-person creative collaboration</span>
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Right Column: Contact Panel */}
              <motion.div 
                className="lg:col-span-2 flex flex-col justify-start"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <div className="bg-gradient-to-br from-[#081020] via-[#0c1623] to-[#050a14] border border-[#1a3a59] rounded-xl p-5 sm:p-6 relative overflow-hidden h-full">
                  {/* Animated background patterns */}
                  <motion.div 
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    animate={{ 
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{ 
                      duration: 15,
                      repeat: Infinity,
                      repeatType: "mirror"
                    }}
                    style={{
                      backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzAwMDAxMCIvPgogIDxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwYTJmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiPgogICAgPHBhdGggZD0iTTEyLDUgTDEyLDE1IiBvcGFjaXR5PSIwLjQiIC8+CiAgICA8cGF0aCBkPSJNMjUsMTAgTDM1LDEwIiBvcGFjaXR5PSIwLjQiIC8+CiAgICA8cGF0aCBkPSJNMTMsMzAgTDEzLDQwIiBvcGFjaXR5PSIwLjQiIC8+CiAgICA8cGF0aCBkPSJNNDMsMjUgTDQzLDQ1IiBvcGFjaXR5PSIwLjQiIC8+CiAgICA8cGF0aCBkPSJNMzMsMzAgTDQwLDMwIiBvcGFjaXR5PSIwLjQiIC8+CiAgICA8cGF0aCBkPSJNNSwzNSBMMTAsMzUiIG9wYWNpdHk9IjAuNCIgLz4KICA8L2c+Cjwvc3ZnPg==')",
                    }}
                  />
                  
                  {/* Moving glow effect */}
                  <motion.div 
                    className="absolute -inset-40 bg-[#00a2ff] opacity-5 rounded-full blur-3xl pointer-events-none"
                    animate={{ 
                      x: [40, -40, 40],
                      y: [-40, 40, -40],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 15,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  >

                    
                    <motion.h3 
                      className="text-xl sm:text-2xl font-display text-[#00a2ff] mb-5 flex items-center"
                      animate={{ y: [-1, 1, -1] }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
                    >
                      <Zap size={22} className="mr-2" />
                      CONTACT INFO
                    </motion.h3>
                    
                    <div className="flex flex-col justify-center p-4 bg-[#000a14]/60 border border-[#1a3a59]/80 rounded-lg mb-6 backdrop-blur-sm">
                      <div className="text-white/80 text-sm space-y-3">
                        <p className="mb-3">
                          Contact portal is active. <span className="text-[#ff2a6d] font-medium">Express your interest</span> in our MACHINAL adaptation today.
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <motion.div 
                              className="w-2 h-2 rounded-full bg-[#00a2ff]"
                              animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.7, 1, 0.7],
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "mirror",
                              }}
                            />
                            <div className="text-xs text-white/50">PORTAL STATUS: ACTIVE</div>
                          </div>
                          <div className="text-xs text-[#00a2ff]">SEC.LEVEL: OPEN</div>
                        </div>
                      </div>
                    </div>
                    
                    <motion.button
                      onClick={() => window.location.href = "/register"}
                      className="w-full bg-gradient-to-r from-[#00a2ff] to-[#0076be] text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-[#00a2ff]/20 uppercase tracking-wide flex items-center justify-center gap-2"
                      whileHover={{ 
                        scale: 1.03,
                        boxShadow: "0 0 25px rgba(0, 162, 255, 0.4)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Contact Us</span>
                      <ArrowRight size={18} />
                    </motion.button>
                    
                    {/* Download Preview - Coming Soon */}
                    <div className="mt-6">
                      <div className="text-[#00a2ff] text-xs font-medium mb-2 text-center">
                        COMING SOON
                      </div>
                      <button
                        disabled
                        className="w-full bg-[#0c1623] border border-[#1a3a59] text-white/60 font-medium py-2.5 px-4 rounded-lg tracking-wide cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <span>Download Treatment Preview</span>
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
            
            {/* About Button */}
            <motion.div 
              className="text-center mt-8 sm:mt-10 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <NavigationButton onClick={handleAboutClick} variant="about">
                  <div className="flex items-center gap-2">
                    <HelpCircle size={16} />
                    <span>About functional_soup</span>
                  </div>
                </NavigationButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PresentationLayout>
  );
}
