import { motion } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";
import NavigationButton from "@/components/presentation/NavigationButton";
import { BackgroundParticles } from "@/components/presentation/BackgroundElements";
import Timer from "@/components/presentation/Timer";
import { useState, useEffect } from "react";

export default function OpeningSlide() {
  const { goToSlide, startTimer } = usePresentationContext();
  const [showCompanyName, setShowCompanyName] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    // Sequence the animations with precise timing
    const companyTimer = setTimeout(() => setShowCompanyName(true), 1000);
    const titleTimer = setTimeout(() => setShowTitle(true), 3000);
    const buttonTimer = setTimeout(() => setShowButton(true), 5000);
    
    return () => {
      clearTimeout(companyTimer);
      clearTimeout(titleTimer);
      clearTimeout(buttonTimer);
    };
  }, []);
  
  const handleBegin = () => {
    startTimer();
    goToSlide(1);
  };
  
  return (
    <motion.div
      className="slide flex flex-col items-center justify-center h-full relative bg-corp-dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="absolute top-6 right-6 opacity-30 hover:opacity-80 transition-opacity duration-500">
        <Timer />
      </div>
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <BackgroundParticles count={20} pattern="mandala" colors="cyan-magenta" />
      </div>
      
      <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto px-4">
        {/* J-TECH INDUSTRIES */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ 
            opacity: showCompanyName ? 1 : 0,
            y: showCompanyName ? 0 : -10
          }}
          transition={{ 
            duration: 2.5, 
            ease: "easeOut"
          }}
        >
          <h2 className="text-3xl md:text-4xl font-code uppercase tracking-[0.3em] text-corp-cyan font-bold">
            <span className="relative text-shadow-subtle">Algoridigm Playhouse</span>
          </h2>
          
          <motion.div 
            className="h-0.5 w-0 bg-gradient-to-r from-transparent via-corp-cyan to-transparent mx-auto"
            animate={{ 
              width: showCompanyName ? "100%" : "0%"
            }}
            transition={{
              duration: 2,
              delay: 0.5,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* PLAYHOUSE */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ 
            opacity: showTitle ? 1 : 0,
            scale: showTitle ? 1 : 0.97
          }}
          transition={{ 
            duration: 2.5,
            ease: "easeOut"
          }}
        >
          <h1 className="text-6xl md:text-8xl xl:text-9xl font-display font-bold tracking-wider">
            <span className="text-shadow-glow relative inline-block text-white">PLAYHOUSE</span>
          </h1>
          
          {/* Underline effect */}
          <motion.div 
            className="h-0.5 w-0 bg-gradient-to-r from-corp-cyan to-corp-magenta mx-auto mt-2"
            animate={{ 
              width: showTitle ? "80%" : "0%"
            }}
            transition={{
              duration: 1.5,
              delay: 0.7,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* BEGIN BUTTON */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: showButton ? 1 : 0,
            scale: showButton ? 1 : 0.95
          }}
          transition={{ 
            duration: 2,
            ease: "easeOut"
          }}
          className="mt-16"
        >
          <motion.div
            animate={{ 
              boxShadow: showButton ? [
                "0 0 0px rgba(0, 255, 255, 0)",
                "0 0 40px rgba(0, 240, 255, 0.4)",
                "0 0 10px rgba(0, 240, 255, 0.2)"
              ] : "0 0 0px rgba(0, 255, 255, 0)"
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1
            }}
          >
            <NavigationButton 
              onClick={handleBegin} 
              variant="begin"
            >
              BEGIN
            </NavigationButton>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
