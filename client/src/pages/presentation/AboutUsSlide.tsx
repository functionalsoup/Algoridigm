import { useState } from "react";
import { motion } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";
import PresentationLayout from "@/components/presentation/PresentationLayout";
import { Button } from "@/components/ui/button";
import { HiMail } from "react-icons/hi";

export default function AboutUsSlide() {
  const { goToSlide } = usePresentationContext();
  const [animateOut, setAnimateOut] = useState(false);
  const [showContactTooltip, setShowContactTooltip] = useState(false);
  
  const handleRegisterClick = () => {
    setAnimateOut(true);
    setTimeout(() => {
      goToSlide(3);
      // Then set a timeout to click the register button
      setTimeout(() => {
        const registerBtn = document.querySelector('#reveal-slide .bg-corp-magenta');
        if (registerBtn) {
          (registerBtn as HTMLButtonElement).click();
        }
      }, 300);
    }, 500);
  };
  
  return (
    <PresentationLayout slideNumber={4} showNextButton={false}>
      <motion.div
        key="about-slide-content"
        initial={{ 
          y: 20, 
          opacity: 0,
          filter: "brightness(1.2) hue-rotate(15deg)"
        }}
        animate={{ 
          y: 0, 
          opacity: 1,
          filter: "brightness(1) hue-rotate(0deg)"
        }}
        exit={{ 
          y: -20, 
          opacity: 0,
          filter: "brightness(1.5) hue-rotate(30deg)"
        }}
        className={`transition-all duration-500 ${animateOut ? 'bg-corp-burnt-orange bg-opacity-10' : ''}`}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-center">
          Functional Soup: A Collective Creation
        </h2>
        
        <div className="bg-corp-bg rounded-lg border border-corp-cyan/40 p-4 md:p-8 mb-10">
          <p className="mb-4 italic text-base md:text-lg text-center">
            Inspired by the revolutionary spirit of the Bauhaus, the critical engagement of Epic Theatre, and the dynamic collaboration inherent in devised practices.
          </p>
          
          <h3 className="text-xl md:text-2xl font-display font-semibold mb-4 text-corp-cyan">
            Core Principles
          </h3>
          
          <div className="space-y-4 md:space-y-6">
            <motion.div 
              className="border-l-4 border-corp-magenta pl-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-lg md:text-xl font-display font-semibold mb-1 md:mb-2">The Unity of Arts and Practice</h4>
              <p className="text-xs md:text-sm">We embrace the dynamic interplay of diverse theatrical techniques and forms inherent in devised theatre, dissolving traditional hierarchies between artistic disciplines.</p>
            </motion.div>
            
            <motion.div 
              className="border-l-4 border-corp-cyan pl-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-lg md:text-xl font-display font-semibold mb-1 md:mb-2">Radical Inclusivity and Accessibility</h4>
              <p className="text-xs md:text-sm">Functional Soup is founded on the principle of radical inclusivity, valuing all forms of artistic expression and levels of experience.</p>
            </motion.div>
            
            <motion.div 
              className="border-l-4 border-corp-magenta pl-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h4 className="text-lg md:text-xl font-display font-semibold mb-1 md:mb-2">Collaborative Creation and Ensemble</h4>
              <p className="text-xs md:text-sm">Our creative foundation lies in structured collective processes. Every participant is recognized as both creator and performer.</p>
            </motion.div>
            
            <motion.div 
              className="border-l-4 border-corp-cyan pl-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h4 className="text-lg md:text-xl font-display font-semibold mb-1 md:mb-2">Socially Conscious Engagement</h4>
              <p className="text-xs md:text-sm">We are committed to deep engagement with our local context and the use of art as social practice, fostering dialogue around relevant themes.</p>
            </motion.div>
            
            <motion.div 
              className="border-l-4 border-corp-magenta pl-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <h4 className="text-lg md:text-xl font-display font-semibold mb-1 md:mb-2">Exploration, Experimentation, and Emergence</h4>
              <p className="text-xs md:text-sm">Our process is constantly evolving and adapting, moving through cycles of proposal, exploration, development, and presentation.</p>
            </motion.div>
          </div>
        </div>
        
        <div className="text-center">
          <motion.button
            onClick={handleRegisterClick}
            className="inline-block bg-gradient-to-r from-corp-burnt-orange to-corp-magenta text-white hover:opacity-90 px-10 py-4 rounded-md text-lg font-bold uppercase tracking-widest transition-all duration-300 transform hover:scale-105 mb-4 shadow-lg shadow-corp-burnt-orange/40 pulse-glow"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(255, 77, 0, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Register Now
          </motion.button>
          <p className="opacity-70">Join us in this ongoing endeavor of collective creation.</p>
        </div>
        
        {/* Contact Us Small Button */}
        <div className="absolute bottom-4 right-4">
          <div className="relative">
            <Button
              size="sm"
              variant="outline"
              className="border-corp-burnt-orange text-corp-burnt-orange hover:bg-corp-burnt-orange/10 rounded-full flex items-center gap-1"
              onMouseEnter={() => setShowContactTooltip(true)}
              onMouseLeave={() => setShowContactTooltip(false)}
              onClick={() => {
                window.location.href = "mailto:contact@functionalsoup.com";
              }}
            >
              <HiMail className="w-4 h-4" />
              <span className="text-xs">Contact</span>
            </Button>
            
            {showContactTooltip && (
              <motion.div 
                className="absolute bottom-full right-0 mb-2 bg-corp-bg border border-corp-burnt-orange text-white p-2 rounded text-xs w-48"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
              >
                Click to email us at contact@functionalsoup.com
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </PresentationLayout>
  );
}