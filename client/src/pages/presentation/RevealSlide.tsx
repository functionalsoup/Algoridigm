import { useState } from "react";
import { motion } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";
import PresentationLayout from "@/components/presentation/PresentationLayout";
import NavigationButton from "@/components/presentation/NavigationButton";
import { RotatingMandelaBackground } from "@/components/presentation/RotatingMandelaBackground";
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
      {/* Rotating Mandela background with counterclockwise rotation */}
      <RotatingMandelaBackground 
        direction="counterclockwise"
        speed="slow"
        scale={2}
        opacity={0.1}
        initialDelay={0.5}
      />
      
      <motion.div
        id="reveal-slide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="px-2 md:px-0"
      >
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-4 md:mb-6 text-center"
          data-text="functional_soup"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="glitch relative z-10 inline-block text-corp-cyan" data-text="functional_soup">
            functional_soup
          </span>
          
          <motion.span
            className="absolute inset-0 text-corp-orange opacity-0"
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
            className="absolute inset-0 text-corp-green opacity-0"
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
          className="text-xl sm:text-2xl font-display text-center mb-6 md:mb-10 text-corp-cyan"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Summer Devised Theatre Workshop
        </motion.h3>
        
        <motion.div 
          className="bg-corp-bg/40 backdrop-blur-md rounded-lg border border-corp-cyan/40 p-4 sm:p-6 md:p-8 mb-6 md:mb-10"
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
          <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 md:mb-4 text-corp-orange">Join Us for ALGORIDIGM</h3>
          <p className="mb-4 md:mb-6 text-sm sm:text-base">We're beginning the process of devising an adaptation of Sophie Treadwell's expressionist masterpiece MACHINAL! We need Actor/Performers, Designers, Techs, Visual Artists, and more! All skill and experience levels are welcome. Innovation and collaboration are required.</p>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="md:w-1/2">
              <h4 className="text-lg sm:text-xl font-display font-semibold mb-2 text-corp-cyan">What We Need</h4>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li className="flex items-start">
                  <span className="text-corp-orange mr-2 shrink-0">→</span>
                  <span>Actors & Performers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-corp-green mr-2 shrink-0">→</span>
                  <span>Designers (set, costume, light, sound)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-corp-orange mr-2 shrink-0">→</span>
                  <span>Technical crew</span>
                </li>
                <li className="flex items-start">
                  <span className="text-corp-green mr-2 shrink-0">→</span>
                  <span>Visual artists</span>
                </li>
                <li className="flex items-start">
                  <span className="text-corp-orange mr-2 shrink-0">→</span>
                  <span>Writers & Dramaturgs</span>
                </li>
              </ul>
            </div>
            
            <div className="md:w-1/2 mt-4 md:mt-0">
              <h4 className="text-lg sm:text-xl font-display font-semibold mb-2 text-corp-cyan">Important Details</h4>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li className="flex items-start">
                  <span className="text-corp-green mr-2 shrink-0">→</span>
                  <span>18+ only due to mature themes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-corp-orange mr-2 shrink-0">→</span>
                  <span>All experience levels welcome</span>
                </li>
                <li className="flex items-start">
                  <span className="text-corp-green mr-2 shrink-0">→</span>
                  <span>Multiple roles and positions available</span>
                </li>
                <li className="flex items-start">
                  <span className="text-corp-orange mr-2 shrink-0">→</span>
                  <span>Flexible scheduling: we have lives but we make it work</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 md:mt-8 text-center">
            <Button 
              id="register-button"
              onClick={() => window.location.href = "/register"}
              className="bg-gradient-to-r from-corp-cyan to-corp-orange hover:bg-corp-orange/90 text-white font-bold py-3 sm:py-4 px-6 sm:px-10 text-lg sm:text-xl shadow-lg shadow-corp-orange/40 uppercase tracking-widest"
              size="lg"
            >
              Register Now
            </Button>
            <p className="mt-3 md:mt-4 text-xs sm:text-sm opacity-80">
              Join our collaborative theatre-making experience!
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          className="text-center mt-10 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <NavigationButton onClick={handleAboutClick} variant="about">
            About functional_soup
          </NavigationButton>
        </motion.div>
      </motion.div>
    </PresentationLayout>
  );
}
