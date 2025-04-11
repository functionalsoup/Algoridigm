import { motion } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";
import { JTechLogo } from "@/components/presentation/JTechLogo";
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
      
      <motion.div 
        className="mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <JTechLogo size="large" animated={true} />
      </motion.div>
      
      <motion.div
        className="text-center mb-4 scanline"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h1 
          className="text-5xl md:text-7xl font-display font-bold mb-2 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-corp-cyan via-white to-corp-magenta relative"
          data-text="ALGORIDIGM"
        >
          <span className="glitch" data-text="ALGORIDIGM">ALGORIDIGM</span>
        </h1>
        
        <motion.div 
          className="text-xs md:text-sm tracking-[0.5em] font-code text-corp-cyan opacity-70 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.8 }}
        >
          Advanced Learning Generative Oracle
        </motion.div>
      </motion.div>
      
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
