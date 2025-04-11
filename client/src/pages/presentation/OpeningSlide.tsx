import { motion } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";
import Logo from "@/components/presentation/Logo";
import NavigationButton from "@/components/presentation/NavigationButton";
import { BackgroundParticles } from "@/components/presentation/BackgroundElements";
import Timer from "@/components/presentation/Timer";

export default function OpeningSlide() {
  const { goToSlide, startTimer } = usePresentationContext();
  
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
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-6 right-6">
        <Timer />
      </div>
      
      <div className="absolute inset-0 pointer-events-none">
        <BackgroundParticles count={30} />
      </div>
      
      <Logo />
      
      <motion.h1
        className="text-5xl md:text-7xl font-display font-bold mb-4 relative"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        data-text="ALGORIDIGM"
      >
        <span className="glitch relative z-10 inline-block">ALGORIDIGM</span>
        
        <motion.span
          className="absolute inset-0 text-corp-cyan opacity-0"
          animate={{
            x: [0, -2, 0, 2, 0],
            opacity: [0, 0.3, 0, 0.3, 0],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 5,
          }}
        >
          ALGORIDIGM
        </motion.span>
        
        <motion.span
          className="absolute inset-0 text-corp-magenta opacity-0"
          animate={{
            x: [0, 2, 0, -2, 0],
            opacity: [0, 0.3, 0, 0.3, 0],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 5,
            delay: 0.15,
          }}
        >
          ALGORIDIGM
        </motion.span>
      </motion.h1>
      
      <motion.p
        className="text-xl md:text-2xl mb-12 text-corp-cyan opacity-80"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        J-Tech Industries
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <NavigationButton onClick={handleBegin} variant="begin">
          BEGIN
        </NavigationButton>
      </motion.div>
    </motion.div>
  );
}
