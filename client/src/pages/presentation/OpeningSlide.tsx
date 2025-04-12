import { motion } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";
import NavigationButton from "@/components/presentation/NavigationButton";
import { BackgroundParticles } from "@/components/presentation/BackgroundElements";
import Timer from "@/components/presentation/Timer";
import { useState, useEffect } from "react";
import mandelaImage from "@assets/Algoridigm Mandela Psy 3.png";

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
        {/* Rotating Mandela Image */}
        <motion.div
          className="mb-12 text-center relative"
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
          {/* Background glow effect that fades in behind the image */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-corp-cyan/30 to-corp-magenta/30 blur-xl z-0"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ 
              opacity: showCompanyName ? 0.6 : 0,
              scale: showCompanyName ? 1.2 : 0.7 
            }}
            transition={{
              duration: 3,
              delay: 0.3,
              ease: "easeOut"
            }}
          />
          
          {/* Rotating Mandela Image */}
          <motion.div
            className="w-36 h-36 md:w-48 md:h-48 mx-auto relative z-10"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <img 
              src={mandelaImage} 
              alt="Algoridigm Mandala" 
              className="w-full h-full object-contain" 
            />
          </motion.div>
          
          <motion.div 
            className="h-0.5 w-0 bg-gradient-to-r from-transparent via-corp-cyan to-transparent mx-auto mt-4"
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
        
        {/* ALGORIDIGM */}
        <motion.div
          className="text-center mb-20 relative"
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
          {/* Background lighting effect that fades in behind the text */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-corp-burnt-orange/20 via-corp-magenta/20 to-corp-cyan/20 blur-3xl z-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: showTitle ? 0.8 : 0,
              scale: showTitle ? 1.2 : 0.8
            }}
            transition={{
              duration: 3,
              delay: 0.3,
              ease: "easeOut"
            }}
          />
          
          <h1 className="text-6xl md:text-8xl xl:text-9xl font-display font-bold tracking-wider relative z-10">
            <motion.span 
              className="relative inline-block text-white"
              animate={{
                textShadow: [
                  "0 0 20px rgba(255, 100, 50, 0.7), 0 0 30px rgba(255, 100, 50, 0.5), 0 0 40px rgba(255, 50, 150, 0.3)",
                  "0 0 20px rgba(50, 255, 255, 0.7), 0 0 30px rgba(50, 255, 255, 0.5), 0 0 40px rgba(50, 100, 255, 0.3)",
                  "0 0 20px rgba(255, 100, 50, 0.7), 0 0 30px rgba(255, 100, 50, 0.5), 0 0 40px rgba(255, 50, 150, 0.3)"
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ALGORIDIGM
            </motion.span>
          </h1>
          
          {/* Underline effect */}
          <motion.div 
            className="h-1 w-0 bg-gradient-to-r from-corp-cyan to-corp-magenta mx-auto mt-2 relative z-10"
            animate={{ 
              width: showTitle ? "80%" : "0%"
            }}
            transition={{
              duration: 1.5,
              delay: 0.7,
              ease: "easeInOut"
            }}
          />
          
          {/* Animated glow pulse under text */}
          <motion.div
            className="h-2 w-1/2 mx-auto rounded-full bg-gradient-to-r from-corp-burnt-orange to-corp-magenta relative z-5 opacity-70 mt-1"
            initial={{ opacity: 0, width: "40%" }}
            animate={{ 
              opacity: showTitle ? [0.4, 0.7, 0.4] : 0,
              width: showTitle ? ["60%", "70%", "60%"] : "40%",
              boxShadow: showTitle ? [
                "0 0 10px rgba(255, 100, 50, 0.5), 0 0 20px rgba(255, 50, 150, 0.3)",
                "0 0 20px rgba(255, 100, 50, 0.7), 0 0 30px rgba(255, 50, 150, 0.5)",
                "0 0 10px rgba(255, 100, 50, 0.5), 0 0 20px rgba(255, 50, 150, 0.3)"
              ] : "none"
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1.5
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
          className="mt-16 relative"
        >
          {/* Background glow effect that fades in behind the button */}
          <motion.div
            className="absolute inset-0 -top-4 -bottom-4 -left-10 -right-10 rounded-full bg-gradient-to-br from-corp-cyan/20 via-transparent to-corp-magenta/20 blur-2xl z-0"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ 
              opacity: showButton ? [0.3, 0.6, 0.3] : 0,
              scale: showButton ? [1.2, 1.4, 1.2] : 0.7 
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          
          <motion.div
            className="relative z-10"
            animate={{ 
              boxShadow: showButton ? [
                "0 0 0px rgba(0, 255, 255, 0), 0 0 0px rgba(255, 100, 150, 0)",
                "0 0 40px rgba(0, 240, 255, 0.5), 0 0 20px rgba(255, 100, 150, 0.3)",
                "0 0 10px rgba(0, 240, 255, 0.3), 0 0 30px rgba(255, 100, 150, 0.2)"
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
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 5px rgba(255, 255, 255, 0.5)",
                    "0 0 15px rgba(255, 255, 255, 0.8)",
                    "0 0 5px rgba(255, 255, 255, 0.5)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                BEGIN
              </motion.span>
            </NavigationButton>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
