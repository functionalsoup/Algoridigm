import { motion } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";
import { NavigationButton } from "@/components/presentation/NavigationButton";
import { BackgroundParticles } from "@/components/presentation/BackgroundElements";
import { RotatingMandelaBackground } from "@/components/presentation/RotatingMandelaBackground";
import Timer from "@/components/presentation/Timer";
import { useState, useEffect } from "react";

export default function OpeningSlide() {
  const { goToSlide, startTimer } = usePresentationContext();
  // Animation phase state - controls the sequence
  const [animationPhase, setAnimationPhase] = useState(0);
  
  // Phase 0: Nothing visible (initial state)
  // Phase 1: Just background effects (rotating mandala and particles) - 5 seconds
  // Phase 2: Add text (ALGORIDIGM) - after Phase 1
  // Phase 3: Add button - after Phase 2
  
  useEffect(() => {
    // Start with phase 0 (nothing visible)
    setAnimationPhase(0);
    
    // After a small delay for component to render, show phase 1 (just backgrounds)
    const phase1Timer = setTimeout(() => setAnimationPhase(1), 200);
    
    // After 5 full seconds, go to phase 2 (add text)
    const phase2Timer = setTimeout(() => setAnimationPhase(2), 5000);
    
    // Finally after 7.5 seconds total, go to phase 3 (add button)
    const phase3Timer = setTimeout(() => setAnimationPhase(3), 7500);
    
    return () => {
      clearTimeout(phase1Timer);
      clearTimeout(phase2Timer);
      clearTimeout(phase3Timer);
    };
  }, []);
  
  const handleBegin = () => {
    startTimer();
    goToSlide(1); // Now goes to the combined slide
  };
  
  return (
    <motion.div
      className="slide flex flex-col items-center justify-center h-full relative bg-corp-dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="absolute top-2 sm:top-6 right-2 sm:right-6 opacity-30 hover:opacity-80 transition-opacity duration-500 z-50">
        <Timer />
      </div>
      
      {/* Background particles - appear in phase 1 */}
      {animationPhase >= 1 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <BackgroundParticles 
            count={35} 
            pattern="mandala" 
            colors="cyan-magenta" 
          />
        </div>
      )}
      
      {/* MANDALA BACKGROUND - Positioned before everything else */}
      {animationPhase >= 1 && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <RotatingMandelaBackground 
            direction="clockwise"
            speed="medium"
            opacity={0.7}
            isActive={true} 
            shrink={false}
            initialDelay={0.1}
            scale={2.5}
          />
        </div>
      )}
      
      <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto px-4 relative z-20">
        {/* Company name section */}
        <motion.div
          className="mb-12 text-center relative"
          initial={{ opacity: 0, y: -10 }}
          animate={{ 
            opacity: animationPhase >= 2 ? 1 : 0,
            y: animationPhase >= 2 ? 0 : -10
          }}
          transition={{ 
            duration: 2.5, 
            ease: "easeOut"
          }}
        >
          {/* Background glow effect for text */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-corp-cyan/30 via-corp-green/20 to-corp-orange/30 blur-xl z-0"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ 
              opacity: animationPhase >= 2 ? 0.6 : 0,
              scale: animationPhase >= 2 ? 1.2 : 0.7 
            }}
            transition={{
              duration: 3,
              delay: 0.3,
              ease: "easeOut"
            }}
          />
          
          <motion.div 
            className="h-0.5 w-0 bg-gradient-to-r from-transparent via-corp-cyan to-transparent mx-auto mt-4"
            animate={{ 
              width: animationPhase >= 2 ? "100%" : "0%"
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
          className="text-center mb-10 sm:mb-16 md:mb-20 relative"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ 
            opacity: animationPhase >= 2 ? 1 : 0,
            scale: animationPhase >= 2 ? 1 : 0.97
          }}
          transition={{ 
            duration: 2.5,
            ease: "easeInOut"
          }}
        >
          {/* Background lighting effect that fades in behind the text */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-corp-burnt-orange/20 via-corp-magenta/20 to-corp-cyan/20 blur-3xl z-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: animationPhase >= 2 ? 0.8 : 0,
              scale: animationPhase >= 2 ? 1.2 : 0.8
            }}
            transition={{
              duration: 4,
              delay: 0.3,
              ease: "easeInOut"
            }}
          />
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl xl:text-9xl font-display font-bold tracking-wider relative z-10 px-2">
            <motion.span 
              className="relative inline-block text-white"
              animate={{
                textShadow: [
                  "0 0 20px rgba(0, 255, 255, 0.7), 0 0 30px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 102, 204, 0.3)", /* Turquoise to Deep Blue */
                  "0 0 20px rgba(136, 255, 0, 0.7), 0 0 30px rgba(136, 255, 0, 0.5), 0 0 40px rgba(0, 102, 204, 0.3)", /* Lime Green to Deep Blue */
                  "0 0 20px rgba(255, 136, 0, 0.7), 0 0 30px rgba(255, 136, 0, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)" /* Gold/Orange to Turquoise */
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
          
          {/* Underline effect - Using Mandela colors */}
          <motion.div 
            className="h-1 w-0 bg-gradient-to-r from-corp-cyan via-corp-green to-corp-orange mx-auto mt-2 relative z-10"
            animate={{ 
              width: animationPhase >= 2 ? "80%" : "0%",
              boxShadow: animationPhase >= 2 ? "0 0 10px rgba(0, 255, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.4)" : "none"
            }}
            transition={{
              width: {
                duration: 1.5,
                delay: 0.7,
                ease: "easeInOut"
              },
              boxShadow: {
                duration: 2,
                delay: 1.2,
                ease: "easeInOut"
              }
            }}
          />
          
          {/* Animated glow pulse under text - Using Mandela colors */}
          <motion.div
            className="h-2 w-1/2 mx-auto rounded-full bg-gradient-to-r from-corp-orange to-corp-cyan relative z-5 opacity-70 mt-1"
            initial={{ opacity: 0, width: "40%" }}
            animate={{ 
              opacity: animationPhase >= 2 ? [0.4, 0.7, 0.4] : 0,
              width: animationPhase >= 2 ? ["60%", "70%", "60%"] : "40%",
              boxShadow: animationPhase >= 2 ? [
                "0 0 10px rgba(255, 136, 0, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)", /* Gold/Orange to Turquoise */
                "0 0 20px rgba(0, 102, 204, 0.7), 0 0 30px rgba(136, 255, 0, 0.5)", /* Deep Blue to Lime Green */
                "0 0 10px rgba(255, 136, 0, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)" /* Gold/Orange to Turquoise */
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
            opacity: animationPhase >= 3 ? 1 : 0,
            scale: animationPhase >= 3 ? 1 : 0.95
          }}
          transition={{ 
            duration: 2.5, 
            ease: "easeInOut" 
          }}
          className="mt-8 sm:mt-12 md:mt-16 relative"
        >
          {/* Background glow effect that fades in behind the button - Using Mandela colors */}
          <motion.div
            className="absolute inset-0 -top-4 -bottom-4 -left-10 -right-10 rounded-full bg-gradient-to-br from-corp-cyan/20 via-corp-green/10 to-corp-orange/20 blur-2xl z-0"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ 
              opacity: animationPhase >= 3 ? [0.3, 0.6, 0.3] : 0,
              scale: animationPhase >= 3 ? [1.2, 1.4, 1.2] : 0.7 
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
              boxShadow: animationPhase >= 3 ? [
                "0 0 0px rgba(0, 255, 255, 0), 0 0 0px rgba(136, 255, 0, 0)",
                "0 0 40px rgba(0, 255, 255, 0.5), 0 0 20px rgba(136, 255, 0, 0.3)", /* Turquoise to Lime Green */
                "0 0 10px rgba(0, 255, 255, 0.3), 0 0 30px rgba(0, 102, 204, 0.2)" /* Turquoise to Deep Blue */
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
                    "0 0 15px rgba(0, 255, 255, 0.8)", /* Turquoise glow */
                    "0 0 5px rgba(255, 136, 0, 0.5)" /* Gold/Orange glow */
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