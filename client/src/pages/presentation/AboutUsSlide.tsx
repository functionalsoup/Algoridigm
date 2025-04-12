import { useState } from "react";
import { motion } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";
import PresentationLayout from "@/components/presentation/PresentationLayout";
import { RotatingMandelaBackground } from "@/components/presentation/RotatingMandelaBackground";
import { Button } from "@/components/ui/button";

export default function AboutUsSlide() {
  const { goToSlide } = usePresentationContext();
  const [animateOut, setAnimateOut] = useState(false);
  
  const handleRegisterClick = () => {
    setAnimateOut(true);
    setTimeout(() => {
      window.location.href = "/register";
    }, 500);
  };
  
  return (
    <PresentationLayout slideNumber={4} showNextButton={false}>
      {/* Rotating Mandela background with fast clockwise rotation */}
      <RotatingMandelaBackground 
        direction="clockwise"
        speed="fast"
        scale={1.5}
        opacity={0.08}
        initialDelay={0.3}
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
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-4 md:mb-6 text-center text-corp-cyan">
          Functional Soup: A Collective Creation
        </h2>
        
        <div className="bg-corp-bg/40 backdrop-blur-md rounded-lg border border-corp-cyan/40 p-3 sm:p-4 md:p-8 mb-6 md:mb-10">
          <p className="mb-3 md:mb-4 italic text-sm sm:text-base md:text-lg text-center">
            Inspired by the revolutionary spirit of the Bauhaus, the critical engagement of Epic Theatre, and the dynamic collaboration inherent in devised practices.
          </p>
          
          <h3 className="text-lg sm:text-xl md:text-2xl font-display font-semibold mb-3 md:mb-4 text-corp-cyan">
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
        
        <div className="text-center mt-6 md:mt-10 mb-8 md:mb-12">
          <motion.button
            onClick={handleRegisterClick}
            className="inline-block bg-gradient-to-r from-corp-cyan to-corp-orange text-white hover:opacity-90 px-6 sm:px-10 py-3 sm:py-4 rounded-md text-base sm:text-lg font-bold uppercase tracking-widest transition-all duration-300 transform hover:scale-105 mb-3 md:mb-4 shadow-lg shadow-corp-orange/40"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(0, 255, 255, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Register Now
          </motion.button>
          <p className="opacity-70 mt-3 md:mt-4 mb-2 text-xs sm:text-sm">Join us in this ongoing endeavor of collective creation.</p>
        </div>
        

      </motion.div>
    </PresentationLayout>
  );
}