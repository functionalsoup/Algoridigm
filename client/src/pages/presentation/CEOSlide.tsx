import { motion } from "framer-motion";
import PresentationLayout from "@/components/presentation/PresentationLayout";

export default function CEOSlide() {
  return (
    <PresentationLayout slideNumber={2} showErrors={true}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 glitch relative" data-text="About the Founder">
          About the Founder
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
              repeatDelay: 5,
            }}
          >
            About the Founder
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
              repeatDelay: 5,
              delay: 0.15,
            }}
          >
            About the Founder
          </motion.span>
        </h2>
        
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-2/5">
            <motion.div 
              className="aspect-square bg-corp-bg border border-corp-blue/20 rounded-lg overflow-hidden relative"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-full h-full bg-gradient-to-br from-corp-dark via-corp-bg to-corp-dark relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
                    <circle cx="100" cy="100" r="90" stroke="url(#paint0_linear)" strokeWidth="2"/>
                    <circle cx="100" cy="100" r="60" stroke="url(#paint1_linear)" strokeWidth="2"/>
                    <circle cx="100" cy="100" r="30" fill="url(#paint2_radial)"/>
                    <defs>
                      <linearGradient id="paint0_linear" x1="100" y1="10" x2="100" y2="190" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00F0FF"/>
                        <stop offset="1" stopColor="#00F0FF" stopOpacity="0.2"/>
                      </linearGradient>
                      <linearGradient id="paint1_linear" x1="100" y1="40" x2="100" y2="160" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF00F5"/>
                        <stop offset="1" stopColor="#FF00F5" stopOpacity="0.2"/>
                      </linearGradient>
                      <radialGradient id="paint2_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 100) rotate(90) scale(30)">
                        <stop stopColor="#00F0FF" stopOpacity="0.3"/>
                        <stop offset="1" stopColor="#FF00F5" stopOpacity="0.3"/>
                      </radialGradient>
                    </defs>
                  </svg>
                </div>
                <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-corp-blue/10 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-corp-dark to-transparent p-4">
                  <h3 className="text-2xl font-display font-bold">George H. Jones</h3>
                  <p className="text-corp-cyan">Founder & CEO</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="md:w-3/5">
            <motion.div 
              className="border-l-2 border-corp-magenta pl-6 mb-8"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="italic text-lg opacity-80">"Humanity's destiny isn't just waiting for us in the stars—we're going to build it ourselves. J-AI isn't just disruptive technology, it's the fork in the evolutionary road that will make us a multi-planetary species with immortal consciousness."</p>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-2xl font-display font-semibold mb-4 text-corp-cyan">Relentless Innovation</h3>
              <p className="mb-4">George H. Jones abandoned a promising academic career to found J-Tech Industries in 2032. His controversial approach to quantum neural networks and consciousness mapping has divided the scientific community while attracting billions in venture capital.</p>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="text-2xl font-display font-semibold mb-4 mt-8 text-corp-cyan">Achievements</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-corp-magenta mr-2">→</span>
                  <span>Time Person of the Year (2041)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-corp-magenta mr-2">→</span>
                  <span>Pioneered Autonomous Colony Systems on Mars</span>
                </li>
                <li className="flex items-start">
                  <span className="text-corp-magenta mr-2">→</span>
                  <span>Author of "Extinction or Transcendence: Why We Must Become Post-Human"</span>
                </li>
                <li className="flex items-start">
                  <span className="text-corp-magenta mr-2">→</span>
                  <span>Launched first commercial neural lace after self-experimenting with prototypes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-corp-magenta mr-2">→</span>
                  <span>Known for working 20-hour days and sleeping on the factory floor</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </PresentationLayout>
  );
}
