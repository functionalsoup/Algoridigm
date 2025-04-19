import { useState } from "react";
import { motion } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";
import PresentationLayout from "@/components/presentation/PresentationLayout";
import { RotatingMandelaBackground } from "@/components/presentation/RotatingMandelaBackground";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, MapPin, Globe } from "lucide-react";

export default function AboutUsSlide() {
  const { goToSlide } = usePresentationContext();
  const [animateOut, setAnimateOut] = useState(false);
  const [showResume, setShowResume] = useState(false);
  
  const handleRegisterClick = () => {
    setAnimateOut(true);
    setTimeout(() => {
      window.location.href = "/contact";
    }, 500);
  };
  
  const toggleResume = () => {
    setShowResume(!showResume);
  };
  
  return (
    <PresentationLayout slideNumber={3} showNextButton={false}>
      {/* Rotating Mandela background with enhanced visibility */}
      <RotatingMandelaBackground 
        direction="clockwise"
        speed="fast"
        scale={1.5}
        opacity={0.15} // Increased from 0.08 for better visibility
        initialDelay={0.3}
      />
      
      {/* Additional background glow effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-corp-cyan/10 via-transparent to-corp-orange/10 z-0"
        animate={{
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      <motion.div
        key="about-slide-content"
        initial={{ 
          y: 20, 
          opacity: 0
        }}
        animate={{ 
          y: 0, 
          opacity: 1
        }}
        exit={{ 
          y: -20, 
          opacity: 0
        }}
        className={`transition-all duration-500 px-2 md:px-0 ${animateOut ? 'bg-corp-orange bg-opacity-10' : ''}`}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 md:mb-8 text-center relative"
          animate={{ 
            color: ["#00FFFF", "#88FF00", "#FF8800", "#00FFFF"],
            textShadow: [
              "0 0 15px rgba(0, 255, 255, 0.7), 0 0 25px rgba(0, 255, 255, 0.3)",
              "0 0 15px rgba(136, 255, 0, 0.7), 0 0 25px rgba(136, 255, 0, 0.3)", 
              "0 0 15px rgba(255, 136, 0, 0.7), 0 0 25px rgba(255, 136, 0, 0.3)",
              "0 0 15px rgba(0, 255, 255, 0.7), 0 0 25px rgba(0, 255, 255, 0.3)"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          Functional Soup: A Collective Creation
        </motion.h2>
        
        <div className="bg-corp-bg/40 backdrop-blur-md rounded-lg border border-corp-cyan/40 p-4 sm:p-5 md:p-8 mb-6 md:mb-10">
          <p className="mb-4 md:mb-5 italic text-sm sm:text-base md:text-lg text-center">
            Inspired by the revolutionary spirit of the Bauhaus, the critical engagement of Epic Theatre, and the dynamic collaboration inherent in devised practices.
          </p>
          
          <h3 className="text-lg sm:text-xl md:text-2xl font-display font-semibold mb-4 md:mb-5 text-corp-cyan">
            Core Principles
          </h3>
          
          <div className="space-y-3 md:space-y-6">
            <motion.div 
              className="border-l-4 border-corp-orange pl-3 sm:pl-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-base sm:text-lg md:text-xl font-display font-semibold mb-1 md:mb-2">The Unity of Arts and Practice</h4>
              <p className="text-xs md:text-sm">We embrace the dynamic interplay of diverse theatrical techniques and forms inherent in devised theatre, dissolving traditional hierarchies between artistic disciplines.</p>
            </motion.div>
            
            <motion.div 
              className="border-l-4 border-corp-cyan pl-3 sm:pl-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-base sm:text-lg md:text-xl font-display font-semibold mb-1 md:mb-2">Radical Inclusivity and Accessibility</h4>
              <p className="text-xs md:text-sm">Functional Soup is founded on the principle of radical inclusivity, valuing all forms of artistic expression and levels of experience.</p>
            </motion.div>
            
            <motion.div 
              className="border-l-4 border-corp-orange pl-3 sm:pl-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h4 className="text-base sm:text-lg md:text-xl font-display font-semibold mb-1 md:mb-2">Collaborative Creation and Ensemble</h4>
              <p className="text-xs md:text-sm">Our creative foundation lies in structured collective processes. Every participant is recognized as both creator and performer.</p>
            </motion.div>
            
            <motion.div 
              className="border-l-4 border-corp-cyan pl-3 sm:pl-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h4 className="text-base sm:text-lg md:text-xl font-display font-semibold mb-1 md:mb-2">Socially Conscious Engagement</h4>
              <p className="text-xs md:text-sm">We are committed to deep engagement with our local context and the use of art as social practice, fostering dialogue around relevant themes.</p>
            </motion.div>
            
            <motion.div 
              className="border-l-4 border-corp-orange pl-3 sm:pl-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <h4 className="text-base sm:text-lg md:text-xl font-display font-semibold mb-1 md:mb-2">Exploration, Experimentation, and Emergence</h4>
              <p className="text-xs md:text-sm">Our process is constantly evolving and adapting, moving through cycles of proposal, exploration, development, and presentation.</p>
            </motion.div>
          </div>
        </div>

        <div className="bg-corp-bg/40 backdrop-blur-md rounded-lg border border-corp-cyan/40 p-4 sm:p-5 md:p-8 mb-6 md:mb-10">
          <motion.h3
            className="text-lg sm:text-xl md:text-2xl font-display font-semibold mb-4 md:mb-5 text-corp-cyan"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            About the Director
          </motion.h3>

          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <p className="text-xs md:text-sm">
              <strong>Stuart Campbell</strong> is a director and theatre-maker based in Longview, TX, with a background in devised performance, ensemble-driven storytelling, and experimental theatre. A graduate of the University of Arkansas – Fort Smith, he has directed and acted in a range of works spanning classical texts, new writing, and movement-based pieces, including a nationally recognized devised production. Stuart's work emphasizes collaborative creation, and the intersection of technology and live performance.
            </p>
            
            <motion.div 
              className="mt-4 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
            >
              <button 
                className="inline-block px-4 py-2 bg-gradient-to-r from-corp-cyan/30 to-corp-cyan/10 border border-corp-cyan/50 rounded-md text-corp-cyan hover:bg-corp-cyan/20 transition-all duration-300 text-sm"
                onClick={toggleResume}
              >
                <span className="flex items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {showResume ? "Hide Resume" : "Stuart's Resume"}
                </span>
              </button>
            </motion.div>
            
            {showResume && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4 max-h-[60vh] overflow-y-auto bg-[#0c1623]/80 border border-[#1a3a59] rounded-2xl p-4 backdrop-blur-sm"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-2 text-[#00a2ff]">
                    Stuart Campbell
                  </h3>
                  
                  <div className="flex flex-wrap justify-center gap-4 text-xs text-white/80">
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1 text-[#ff2a6d]" />
                      <span>Longview, TX</span>
                    </div>
                    <div className="flex items-center">
                      <Mail size={14} className="mr-1 text-[#ff2a6d]" />
                      <span>functional_soup@outlook.com</span>
                    </div>
                  </div>
                </div>
                
                {/* Professional Summary */}
                <div className="mb-4">
                  <h4 className="text-sm md:text-base font-semibold mb-1 text-[#00a2ff] border-b border-[#1a3a59] pb-1">
                    Professional Summary
                  </h4>
                  <p className="text-xs text-white/90">
                    Theatre director and collaborative artist with a focus on devised performance, ensemble-generated work, and interdisciplinary storytelling. Founder of Functional Soup Productions, dedicated to exploring empathy, identity, and technology through experimental performance. Experienced in directing, design, and ensemble development across regional and academic settings.
                  </p>
                </div>
                
                {/* Experience - Keep it very brief */}
                <div className="mb-4">
                  <h4 className="text-sm md:text-base font-semibold mb-1 text-[#00a2ff] border-b border-[#1a3a59] pb-1">
                    Selected Experience
                  </h4>
                  <ul className="text-xs space-y-2">
                    <li>
                      <span className="text-[#80ff00] font-medium">The Vortex Theatre – Austin, TX</span> | 2015–2016
                      <ul className="text-white/90 list-disc ml-5 mt-1 space-y-1">
                        <li><span className="text-white/90">Deviser:</span> <em>Privacy Settings</em> (Workshop)</li>
                      </ul>
                    </li>
                    <li>
                      <span className="text-[#80ff00] font-medium">Plethora Theatre Company – Ft. Smith, AR</span> | 2014–2015
                      <ul className="text-white/90 list-disc ml-5 mt-1 space-y-1">
                        <li><span className="text-white/90">Director:</span> <em>The Woman in Black</em></li>
                        <li><span className="text-white/90">Workshop Leader:</span> Devised Performance and Movement (Northwestern Oklahoma State University)</li>
                      </ul>
                    </li>
                    <li>
                      <span className="text-[#80ff00] font-medium">University of Arkansas – Fort Smith Theatre</span> | 2011–2014
                      <ul className="text-white/90 list-disc ml-5 mt-1 space-y-1">
                        <li><span className="text-white/90">Directed:</span> <em>God of Carnage</em></li>
                        <li><span className="text-white/90">Directed:</span> <em>Memorandum of Love Lost</em> (Original devised piece)</li>
                        <li><span className="text-white/90">Actor:</span> <em>Burn This by Lanford Wilson</em> (Larry)</li>
                        <li><span className="text-white/90">Performance:</span> <em>Dromnium</em> (Writer/Performer – KCACTF Regional & National Selection)</li>
                        <li><span className="text-white/90">Other Roles:</span> <em>Aqua Vita</em> (Devised Movement)</li>
                        <li><span className="text-white/90">Actor:</span> <em>Midsummer Night's Dream</em> (Bottom)</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                
                {/* Education */}
                <div className="mb-4">
                  <h4 className="text-sm md:text-base font-semibold mb-1 text-[#00a2ff] border-b border-[#1a3a59] pb-1">
                    Education
                  </h4>
                  <ul className="text-xs space-y-2">
                    <li>
                      <span className="text-[#80ff00] font-medium">University of Arkansas – Fort Smith</span> | 2011–2014
                      <ul className="text-white/90 list-disc ml-5 mt-1 space-y-1">
                        <li><span className="text-white/90">B.A. Theatre: Acting & Directing</span></li>
                        <li><span className="text-white/90">Graduated with Academic Achievement in Theatre</span></li>
                      </ul>
                    </li>
                    <li>
                      <span className="text-[#80ff00] font-medium">Northwestern Oklahoma State University</span> | 2009–2011
                      <ul className="text-white/90 list-disc ml-5 mt-1 space-y-1">
                        <li><span className="text-white/90">Theatre Program, KCACTF Region 6 – Student Director for 10-Minute Play Festival</span></li>
                        <li><span className="text-white/90">Theatre Shop Assistant and Technical Support</span></li>
                      </ul>
                    </li>
                  </ul>
                </div>
                
                {/* Skills - Very brief */}
                <div>
                  <h4 className="text-sm md:text-base font-semibold mb-1 text-[#00a2ff] border-b border-[#1a3a59] pb-1">
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-1 text-xs">
                    <span className="px-2 py-1 bg-corp-cyan/20 rounded-full text-white/90">Devised Performance</span>
                    <span className="px-2 py-1 bg-corp-cyan/20 rounded-full text-white/90">Ensemble Direction</span>
                    <span className="px-2 py-1 bg-corp-cyan/20 rounded-full text-white/90">Movement</span>
                    <span className="px-2 py-1 bg-corp-cyan/20 rounded-full text-white/90">Collaborative Writing</span>
                    <span className="px-2 py-1 bg-corp-cyan/20 rounded-full text-white/90">Scenic Design</span>
                    <span className="px-2 py-1 bg-corp-cyan/20 rounded-full text-white/90">Technical Direction</span>
                    <span className="px-2 py-1 bg-corp-cyan/20 rounded-full text-white/90">Digital Storytelling</span>
                    <span className="px-2 py-1 bg-corp-cyan/20 rounded-full text-white/90">Interdisciplinary Art</span>
                    <span className="px-2 py-1 bg-corp-cyan/20 rounded-full text-white/90">Technology Integration</span>
                    <span className="px-2 py-1 bg-corp-cyan/20 rounded-full text-white/90">Workshop Facilitation</span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
        
        <div className="text-center mt-8 sm:mt-10 md:mt-12 mb-8 md:mb-12 relative">
          {/* Animated glow effect behind the button */}
          <motion.div 
            className="absolute inset-0 top-[-30px] left-[-30px] right-[-30px] bottom-[-30px] rounded-full bg-gradient-to-r from-corp-cyan/30 via-corp-orange/20 to-corp-cyan/30 blur-xl z-0"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          
          <div className="relative z-10">
            <motion.button
              onClick={handleRegisterClick}
              className="inline-block bg-gradient-to-r from-corp-cyan via-corp-orange to-corp-cyan text-white px-8 sm:px-12 py-4 sm:py-5 rounded-md text-xl sm:text-2xl font-bold uppercase tracking-widest transition-all duration-300 border-2 border-corp-orange/50 backdrop-blur-sm mb-4 md:mb-0 shadow-lg shadow-corp-orange/40"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 40px rgba(0, 255, 255, 0.7), 0 0 20px rgba(255, 136, 0, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 15px rgba(0, 255, 255, 0.3), 0 0 5px rgba(255, 136, 0, 0.2)",
                  "0 0 25px rgba(0, 255, 255, 0.5), 0 0 15px rgba(255, 136, 0, 0.4)",
                  "0 0 15px rgba(0, 255, 255, 0.3), 0 0 5px rgba(255, 136, 0, 0.2)"
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
            >
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 5px rgba(255, 255, 255, 0.5)",
                    "0 0 15px rgba(0, 255, 255, 0.8)",
                    "0 0 5px rgba(255, 136, 0, 0.5)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                Contact Us
              </motion.span>
            </motion.button>
            
            <p className="opacity-80 mt-4 md:mt-6 mb-2 text-sm sm:text-base font-semibold text-corp-cyan">Join us in this ongoing endeavor of collective creation.</p>
          </div>
        </div>
        

      </motion.div>
    </PresentationLayout>
  );
}