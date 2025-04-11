import { useState } from "react";
import { motion } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";
import PresentationLayout from "@/components/presentation/PresentationLayout";
import NavigationButton from "@/components/presentation/NavigationButton";
import { Button } from "@/components/ui/button";

export default function RevealSlide() {
  const { goToSlide } = usePresentationContext();
  const [animateOut, setAnimateOut] = useState(false);
  
  const handleAboutClick = () => {
    setAnimateOut(true);
    setTimeout(() => {
      goToSlide(4);
    }, 800);
  };

  return (
    <PresentationLayout slideNumber={3} showNextButton={false}>
      <motion.div
        id="reveal-slide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-4xl md:text-6xl font-display font-bold mb-6 text-center"
          data-text="functional_soup"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="glitch relative z-10 inline-block" data-text="functional_soup">
            functional_soup
          </span>
          
          <motion.span
            className="absolute inset-0 text-corp-burnt-orange opacity-0"
            animate={{
              x: [0, -3, 0, 3, 0],
              opacity: [0, 0.3, 0, 0.3, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 4,
            }}
          >
            functional_soup
          </motion.span>
          
          <motion.span
            className="absolute inset-0 text-corp-magenta opacity-0"
            animate={{
              x: [0, 3, 0, -3, 0],
              opacity: [0, 0.3, 0, 0.3, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 4,
              delay: 0.15,
            }}
          >
            functional_soup
          </motion.span>
        </motion.h2>
        
        <motion.h3 
          className="text-2xl font-display text-center mb-10 text-corp-cyan scanline"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Summer Devised Theatre Workshop
        </motion.h3>
        
        <AnimatePresence mode="sync">
          {!showRegistrationForm ? (
            <motion.div 
              className="bg-corp-bg tech-panel rounded-lg border border-corp-cyan/40 p-8 mb-10 data-stream"
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                transition: { delay: 0.2, duration: 0.5 }
              }}
              exit={{ 
                y: -20, 
                opacity: 0,
                backgroundColor: "rgba(255, 77, 0, 0.2)",
                filter: "brightness(1.5)",
                transition: { duration: 0.5 }
              }}
            >
              <h3 className="text-2xl font-display font-semibold mb-4 text-corp-magenta">Join Us for ALGORIDIGM</h3>
              <p className="mb-6">We're beginning the process of devising an adaptation of Sophie Treadwell's expressionist masterpiece MACHINAL! We need Actor/Performers, Designers, Techs, Visual Artists, and more! All skill and experience levels are welcome. Innovation and collaboration are required.</p>
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <h4 className="text-xl font-display font-semibold mb-2 text-corp-cyan">What We Need</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-corp-burnt-orange mr-2">→</span>
                      <span>Actors & Performers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-corp-magenta mr-2">→</span>
                      <span>Designers (set, costume, light, sound)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-corp-burnt-orange mr-2">→</span>
                      <span>Technical crew</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-corp-magenta mr-2">→</span>
                      <span>Visual artists</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-corp-burnt-orange mr-2">→</span>
                      <span>Writers & Dramaturgs</span>
                    </li>
                  </ul>
                </div>
                
                <div className="md:w-1/2">
                  <h4 className="text-xl font-display font-semibold mb-2 text-corp-cyan">Important Details</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-corp-magenta mr-2">→</span>
                      <span>18+ only due to mature themes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-corp-burnt-orange mr-2">→</span>
                      <span>All experience levels welcome</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-corp-magenta mr-2">→</span>
                      <span>Multiple roles and positions available</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-corp-burnt-orange mr-2">→</span>
                      <span>Flexible scheduling: we have lives but we make it work</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  id="register-button"
                  onClick={() => window.location.href = "/register"}
                  className="bg-gradient-to-r from-corp-burnt-orange to-corp-magenta hover:bg-corp-magenta/90 text-white font-bold py-4 px-10 text-xl shadow-lg shadow-corp-burnt-orange/40 uppercase tracking-widest pulse-glow animate-pulse"
                  size="lg"
                >
                  Register Now
                </Button>
                <p className="mt-4 text-sm opacity-80">
                  Join our collaborative theatre-making experience!
                </p>
              </div>
            </motion.div>
          ) : (
            <WorkshopRegistrationForm />
          )}
        </AnimatePresence>
        
        <motion.div 
          className="text-center mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {showRegistrationForm && (
            <Button 
              onClick={() => setShowRegistrationForm(false)}
              variant="outline"
              className="mr-4 border-corp-magenta text-corp-magenta hover:bg-corp-magenta/10"
            >
              Back to Information
            </Button>
          )}
          {!showRegistrationForm && (
            <NavigationButton onClick={handleAboutClick} variant="about">
              About functional_soup
            </NavigationButton>
          )}
        </motion.div>
      </motion.div>
    </PresentationLayout>
  );
}
