import { motion } from "framer-motion";
import PresentationLayout from "@/components/presentation/PresentationLayout";

export default function AboutUsSlide() {
  return (
    <PresentationLayout slideNumber={4} showNextButton={false}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-center">
          Meet the J-Tech Team
        </h2>
        
        <div className="bg-corp-bg rounded-lg border border-corp-cyan/40 p-4 md:p-8 mb-10">
          <p className="mb-4 italic text-base md:text-lg text-center">
            The ALGORIDIGM team combines experts from quantum computing, neural interface design, AI consciousness research, and experimental performance art.
          </p>
          
          <h3 className="text-xl md:text-2xl font-display font-semibold mb-4 text-corp-cyan">
            Our Guiding Principles
          </h3>
          
          <div className="space-y-4 md:space-y-6">
            <motion.div 
              className="border-l-4 border-corp-magenta pl-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-lg md:text-xl font-display font-semibold mb-1 md:mb-2">Technological Innovation</h4>
              <p className="text-xs md:text-sm">We pioneer advanced quantum neural networks, pushing the boundaries of what's possible in consciousness mapping and artificial intelligence development.</p>
            </motion.div>
            
            <motion.div 
              className="border-l-4 border-corp-cyan pl-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-lg md:text-xl font-display font-semibold mb-1 md:mb-2">Human-Machine Symbiosis</h4>
              <p className="text-xs md:text-sm">J-Tech creates technologies that enhance human capabilities rather than replace them, forging a new relationship between biological and digital consciousness.</p>
            </motion.div>
            
            <motion.div 
              className="border-l-4 border-corp-magenta pl-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h4 className="text-lg md:text-xl font-display font-semibold mb-1 md:mb-2">Post-Human Evolution</h4>
              <p className="text-xs md:text-sm">We actively work toward the next evolutionary leap for humanity, developing technologies that will transform our species into an immortal, multi-planetary civilization.</p>
            </motion.div>
            
            <motion.div 
              className="border-l-4 border-corp-cyan pl-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h4 className="text-lg md:text-xl font-display font-semibold mb-1 md:mb-2">Meritocratic Excellence</h4>
              <p className="text-xs md:text-sm">Our team is assembled based solely on brilliance and dedication. We work relentlessly, often 20-hour days, to achieve breakthroughs others consider impossible.</p>
            </motion.div>
            
            <motion.div 
              className="border-l-4 border-corp-magenta pl-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <h4 className="text-lg md:text-xl font-display font-semibold mb-1 md:mb-2">Disruptive Implementation</h4>
              <p className="text-xs md:text-sm">We move quickly and decisively to bring revolutionary technologies to market, often bypassing traditional ethical review processes that slow innovation.</p>
            </motion.div>
          </div>
        </div>
        
        <div className="text-center">
          <motion.a
            href="#register"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = 'register';
              window.scrollTo(0, 0);
            }}
            className="inline-block bg-transparent border-2 border-corp-cyan text-corp-cyan hover:bg-corp-cyan hover:text-corp-dark px-8 py-3 rounded-md text-lg font-bold transition-all duration-300 transform hover:scale-105 mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join ALGORIDIGM Workshop
          </motion.a>
          <p className="opacity-70">Be part of the evolution that will transcend human limitations.</p>
        </div>
      </motion.div>
    </PresentationLayout>
  );
}
