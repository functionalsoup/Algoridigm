import { motion } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";
import { JTechLogo } from "@/components/presentation/JTechLogo";
import NavigationButton from "@/components/presentation/NavigationButton";
import { BackgroundParticles } from "@/components/presentation/BackgroundElements";
import Timer from "@/components/presentation/Timer";
import { useState, useEffect } from "react";

export default function OpeningSlide() {
  const { goToSlide, startTimer } = usePresentationContext();
  const [showLogo, setShowLogo] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    // Sequence the animations with increasing delays
    const logoTimer = setTimeout(() => setShowLogo(true), 500);
    const titleTimer = setTimeout(() => setShowTitle(true), 1500);
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 2500);
    const buttonTimer = setTimeout(() => setShowButton(true), 3500);
    
    return () => {
      clearTimeout(logoTimer);
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(buttonTimer);
    };
  }, []);
  
  const handleBegin = () => {
    startTimer();
    goToSlide(1);
  };
  
  return (
    <motion.div
      className="slide flex flex-col items-center justify-center h-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute top-6 right-6 opacity-50 hover:opacity-100 transition-opacity duration-300">
        <Timer />
      </div>
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <BackgroundParticles count={30} pattern="mandala" colors="cyan-magenta" />
      </div>
      
      <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto">
        <motion.div 
          className="mb-12"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: showLogo ? 1 : 0.8, opacity: showLogo ? 1 : 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <JTechLogo size="large" animated={true} />
        </motion.div>
        
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: showTitle ? 1 : 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <h1 
            className="text-6xl md:text-8xl font-display font-bold mb-6 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-corp-cyan via-white to-corp-magenta"
          >
            <span className="relative opacity-90 inline-block">ALGORIDIGM</span>
          </h1>
          
          <motion.div 
            className="text-sm md:text-base tracking-[0.3em] font-code text-corp-cyan opacity-0"
            animate={{ opacity: showSubtitle ? 0.7 : 0 }}
            transition={{ duration: 1.5, ease: "easeIn" }}
          >
            J-TECH INDUSTRIES
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: showButton ? 1 : 0,
            y: showButton ? 0 : 10
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mt-12"
        >
          <motion.div
            animate={{ 
              boxShadow: showButton ? [
                "0 0 0px rgba(0, 255, 255, 0)",
                "0 0 30px rgba(0, 255, 255, 0.3)",
                "0 0 5px rgba(0, 255, 255, 0.1)"
              ] : "0 0 0px rgba(0, 255, 255, 0)"
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
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
