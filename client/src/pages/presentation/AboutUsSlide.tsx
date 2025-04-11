import { motion } from "framer-motion";
import PresentationLayout from "@/components/presentation/PresentationLayout";
import { usePresentationContext } from "@/lib/presentationContext";

export default function AboutUsSlide() {
  const { goToSlide } = usePresentationContext();
  
  return (
    <PresentationLayout slideNumber={4} showNextButton={false}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
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
            onClick={() => {
              // Navigate back to slide 3 (Reveal slide)
              goToSlide(3);
              // Then set a timeout to click the register button
              setTimeout(() => {
                const registerBtn = document.querySelector('#reveal-slide .bg-corp-magenta');
                if (registerBtn) {
                  (registerBtn as HTMLButtonElement).click();
                }
              }, 800);
            }}
            className="inline-block bg-corp-magenta text-white hover:bg-corp-magenta/90 px-8 py-3 rounded-md text-lg font-bold transition-all duration-300 transform hover:scale-105 mb-4 shadow-lg shadow-corp-magenta/30 animate-pulse"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            REGISTER NOW
          </motion.button>
          <p className="opacity-70">Join us in this ongoing endeavor of collective creation.</p>
        </div>
      </motion.div>
    </PresentationLayout>
  );
}
