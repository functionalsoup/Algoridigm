import { useState } from "react";
import { motion } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";
import PresentationLayout from "@/components/presentation/PresentationLayout";
import NavigationButton from "@/components/presentation/NavigationButton";
import { RotatingMandelaBackground } from "@/components/presentation/RotatingMandelaBackground";
import { ArrowRight, Calendar, HelpCircle, Users, Zap } from "lucide-react";

export default function RevealSlide() {
  const { goToSlide } = usePresentationContext();
  const [animateOut, setAnimateOut] = useState(false);
  
  const handleAboutClick = () => {
    setAnimateOut(true);
    setTimeout(() => {
      goToSlide(3); // Go to About slide
    }, 800);
  };

  return (
    <PresentationLayout slideNumber={2} showNextButton={false} showErrors={true}>
      {/* Rotating Mandela background as a simulated AI hallucination */}
      <RotatingMandelaBackground 
        direction="clockwise"
        speed="slow"
        scale={2.2}
        opacity={0.2}
        initialDelay={0.5}
        isActive={true}
      />
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMjAgMCBMIDAgMCAwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwxNjIsMjU1LDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]
         mix-blend-mode-multiply pointer-events-none opacity-60"></div>
      
      {/* Warning Banner - AI Hallucination */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#ff2a6d]/90 to-[#ff2a6d]/70 text-black py-1.5 text-xs font-medium text-center"
        initial={{ y: -30 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <span className="tracking-wider">⚠️ HALLUCINATION DETECTED IN NEURAL FRAMEWORK ⚠️</span>
      </motion.div>
      
      <motion.div
        id="reveal-slide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="px-4 md:px-6 py-6 relative z-20 max-w-5xl mx-auto"
      >
        {/* Updated Autonomous Training Module Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative inline-block">
            <motion.div
              className="absolute -top-1 -left-1 text-[#ff2a6d]/80 opacity-70 blur-[0.3px]"
              animate={{
                opacity: [0.5, 0.7, 0.5],
                x: [0, -1, 0],
                y: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              AUTONOMOUS TRAINING MODULE
            </motion.div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold tracking-wider text-[#00a2ff]">
              AUTONOMOUS TRAINING MODULE
            </h2>
          </div>
          
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#00a2ff] to-transparent w-full max-w-lg mx-auto my-4"></div>
          
          <div className="text-sm text-white/60 mt-2 font-mono tracking-wide">J-TECH INDUSTRIES • EST. 2050</div>
          
          <motion.div 
            className="mt-5"
            animate={{ 
              y: [0, -5, 0],
              filter: [
                "drop-shadow(0 0 8px rgba(128, 255, 0, 0.5))",
                "drop-shadow(0 0 12px rgba(128, 255, 0, 0.7))",
                "drop-shadow(0 0 8px rgba(128, 255, 0, 0.5))"
              ]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <span className="text-xl md:text-2xl font-display font-bold text-[#80ff00]">ALGORIDIGM</span>
          </motion.div>
        </motion.div>
        
        {/* Main Content Panel with Futuristic Design */}
        <motion.div 
          className="bg-[#0c0c14]/80 border border-[#1a3a59] rounded-2xl p-5 sm:p-6 md:p-7 backdrop-blur-md mb-8 relative"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Simulated hologram effect */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div 
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00a2ff]/80 to-transparent"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-[#00a2ff]/80 to-transparent"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            />
          </div>
          
          {/* Content Header */}
          <div className="mb-6">
            <div className="flex items-center mb-1">
              <div className="h-4 w-4 bg-[#00a2ff] rounded-full mr-3 animate-pulse"></div>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-white">
                Theatre Workshop: MACHINAL Adaptation - Summer 2025
              </h3>
            </div>
            <div className="pl-7 text-white/60 text-sm border-l border-[#1a3a59] ml-[7px]">
              ALGORIDIGM: A Devised Theatre Experience
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            <div className="lg:w-3/5">
              <div className="text-white/90 space-y-4 mb-6">
                <p>
                  We're seeking creative collaborators for our experimental adaptation of Sophie Treadwell's "MACHINAL." This innovative project welcomes participants of all experience levels to join our collective process.
                </p>
              </div>
              
              {/* Features Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#0a0a14] border border-[#1a3a59] p-4 rounded-xl">
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
                </div>
                
                <div className="bg-[#0a0a14] border border-[#1a3a59] p-4 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-[#00a2ff]/20 p-2 rounded-lg">
                      <Calendar size={18} className="text-[#00a2ff]" />
                    </div>
                    <h4 className="text-[#00a2ff] font-medium">Program Details</h4>
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
                </div>
              </div>
              
              <div className="bg-[#0a0a14] border border-[#1a3a59] p-4 rounded-xl mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#00a2ff]/20 p-2 rounded-lg">
                    <ArrowRight size={18} className="text-[#00a2ff]" />
                  </div>
                  <h4 className="text-[#00a2ff] font-medium">Next Steps</h4>
                </div>
                <p className="text-white/80 text-sm mb-0">
                  Contact us to learn more about MACHINAL and our adaptation plans. Reaching out simply <span className="text-[#ff2a6d] font-medium">expresses interest</span> and is not a commitment to the workshop.
                </p>
              </div>
            </div>
            
            {/* Contact Panel */}
            <div className="lg:w-2/5 flex flex-col justify-start">
              <div className="bg-gradient-to-b from-[#0c1623] to-[#07080f] border border-[#1a3a59] rounded-xl p-5 relative overflow-hidden">
                {/* Simulated data stream background effect */}
                <motion.div 
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  animate={{ 
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{ 
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  style={{
                    backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzAwMDAxMCIvPgogIDxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwYTJmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiPgogICAgPHBhdGggZD0iTTEyLDUgTDEyLDE1IiBvcGFjaXR5PSIwLjQiIC8+CiAgICA8cGF0aCBkPSJNMjUsMTAgTDM1LDEwIiBvcGFjaXR5PSIwLjQiIC8+CiAgICA8cGF0aCBkPSJNMTMsMzAgTDEzLDQwIiBvcGFjaXR5PSIwLjQiIC8+CiAgICA8cGF0aCBkPSJNNDMsMjUgTDQzLDQ1IiBvcGFjaXR5PSIwLjQiIC8+CiAgICA8cGF0aCBkPSJNMzMsMzAgTDQwLDMwIiBvcGFjaXR5PSIwLjQiIC8+CiAgICA8cGF0aCBkPSJNNSwzNSBMMTAsMzUiIG9wYWNpdHk9IjAuNCIgLz4KICA8L2c+Cjwvc3ZnPg==')",
                  }}
                />
                
                <h3 className="text-xl font-display text-[#00a2ff] mb-4 flex items-center">
                  <Zap size={20} className="mr-2" />
                  CONTACT INFO
                </h3>
                
                <div className="flex flex-col justify-center p-3 bg-[#000a14]/40 border border-[#1a3a59]/50 rounded-lg mb-5">
                  <div className="text-white/80 text-sm space-y-3">
                    <p className="mb-2">
                      Contact portal is active. <span className="text-[#ff2a6d] font-medium">Express your interest</span> in our MACHINAL adaptation today.
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00a2ff] animate-pulse"></div>
                        <div className="text-xs text-white/50">PORTAL STATUS: ACTIVE</div>
                      </div>
                      <div className="text-xs text-[#00a2ff]">SEC.LEVEL: OPEN</div>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => window.location.href = "/register"}
                  className="w-full bg-gradient-to-r from-[#00a2ff] to-[#0076be] text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-[#00a2ff]/20 uppercase tracking-wider flex items-center justify-center gap-2"
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 0 20px rgba(0, 162, 255, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Contact Us</span>
                  <ArrowRight size={18} />
                </motion.button>
                
                {/* Download Preview - Coming Soon */}
                <div className="mt-5">
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
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="text-center mt-8 sm:mt-10 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <NavigationButton onClick={handleAboutClick} variant="about">
            <div className="flex items-center gap-2">
              <HelpCircle size={16} />
              <span>About functional_soup</span>
            </div>
          </NavigationButton>
        </motion.div>
      </motion.div>
    </PresentationLayout>
  );
}
