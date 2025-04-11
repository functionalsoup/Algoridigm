import { motion } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";
import PresentationLayout from "@/components/presentation/PresentationLayout";
import NavigationButton from "@/components/presentation/NavigationButton";

export default function RevealSlide() {
  const { goToSlide } = usePresentationContext();
  
  return (
    <PresentationLayout slideNumber={3} showNextButton={false}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-center glitch relative" data-text="functional_soup">
          functional_soup
          <motion.span
            className="absolute inset-0 text-corp-cyan opacity-0"
            animate={{
              x: [0, -3, 0, 3, 0],
              opacity: [0, 0.3, 0, 0.3, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 2,
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
              repeatDelay: 2,
              delay: 0.15,
            }}
          >
            functional_soup
          </motion.span>
        </h2>
        
        <h3 className="text-2xl font-display text-center mb-10 text-corp-cyan">
          Summer Devised Theatre Workshop
        </h3>
        
        <motion.div 
          className="bg-corp-bg rounded-lg border border-corp-magenta/40 p-8 mb-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-display font-semibold mb-4 text-corp-magenta">Join Us for Machinal</h3>
          <p className="mb-6">We're beginning the process of devising an adaptation of Sophie Treadwell's Machinal. We need Actor/Performers, Designers, Techs, Visual Artists, and more! All skill and experience levels are welcome.</p>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h4 className="text-xl font-display font-semibold mb-2 text-corp-cyan">What We Need</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-corp-magenta mr-2">→</span>
                  <span>Actors & Performers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-corp-magenta mr-2">→</span>
                  <span>Designers (set, costume, light, sound)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-corp-magenta mr-2">→</span>
                  <span>Technical crew</span>
                </li>
                <li className="flex items-start">
                  <span className="text-corp-magenta mr-2">→</span>
                  <span>Visual artists</span>
                </li>
                <li className="flex items-start">
                  <span className="text-corp-magenta mr-2">→</span>
                  <span>All other creative collaborators</span>
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
                  <span className="text-corp-magenta mr-2">→</span>
                  <span>All experience levels welcome</span>
                </li>
                <li className="flex items-start">
                  <span className="text-corp-magenta mr-2">→</span>
                  <span>Please include summer availability</span>
                </li>
                <li className="flex items-start">
                  <span className="text-corp-magenta mr-2">→</span>
                  <span>Submit resume or statement of interest</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="mb-4">Send your information to:</p>
            <a 
              href="mailto:functional_soup@outlook.com" 
              className="text-2xl text-corp-cyan hover:text-corp-magenta transition-colors"
            >
              functional_soup@outlook.com
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <NavigationButton onClick={() => goToSlide(4)} variant="about">
            About Us
          </NavigationButton>
        </motion.div>
      </motion.div>
    </PresentationLayout>
  );
}
