import { motion } from "framer-motion";
import PresentationLayout from "@/components/presentation/PresentationLayout";
import { RotatingMandelaBackground } from "@/components/presentation/RotatingMandelaBackground";

export default function TechnologySlide() {
  return (
    <PresentationLayout slideNumber={1} showPrevButton={false}>
      {/* Rotating Mandela background with counterclockwise rotation and medium speed */}
      <RotatingMandelaBackground 
        direction="counterclockwise"
        speed="medium"
        scale={1.8}
        opacity={0.15}
        initialDelay={0.2}
      />
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 glitch relative" data-text="J-AI: General Intelligence">
          J-AI: General Intelligence
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
            J-AI: General Intelligence
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
            J-AI: General Intelligence
          </motion.span>
        </h2>
        
        <div className="flex flex-col md:flex-row gap-12">
          <motion.div 
            className="md:w-1/2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-display font-semibold mb-4 text-corp-cyan">Redefining Possibility</h3>
            <p className="mb-4">J-AI represents the culmination of three decades of quantum research and neural architecture development at J-Tech Industries. The first truly general intelligence system capable of independent reasoning, emotional comprehension, and creative problem-solving.</p>
            
            <h3 className="text-2xl font-display font-semibold mb-4 mt-8 text-corp-cyan">Key Capabilities</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-corp-magenta mr-2">→</span>
                <span>Adaptive Consciousness Matrix with 98.7% human-alignment scoring</span>
              </li>
              <li className="flex items-start">
                <span className="text-corp-magenta mr-2">→</span>
                <span>Quantum-enabled processing at 450 quadrillion operations per second</span>
              </li>
              <li className="flex items-start">
                <span className="text-corp-magenta mr-2">→</span>
                <span>Self-evolving architecture with integrated ethical frameworks</span>
              </li>
              <li className="flex items-start">
                <span className="text-corp-magenta mr-2">→</span>
                <span>Multimodal interface capabilities across 147 human languages</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 bg-corp-bg rounded-lg p-6 border border-corp-blue/20"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="aspect-video rounded-md bg-gradient-to-r from-corp-blue/20 to-corp-cyan/20 mb-4 flex items-center justify-center overflow-hidden relative">
              <div className="text-6xl text-corp-cyan/50 font-display absolute opacity-30">J-AI</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
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
            </div>
            
            <h4 className="text-xl font-display font-semibold mb-2 text-corp-magenta">Technology Integration</h4>
            <p className="text-sm opacity-80 mb-4">J-AI seamlessly integrates with existing infrastructure while expanding capabilities exponentially beyond current limitations. Its unique architecture enables unprecedented learning velocity.</p>
            
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-corp-dark rounded p-2 text-center">
                <div className="text-corp-cyan text-2xl font-bold">99.8%</div>
                <div className="text-xs opacity-70">Accuracy</div>
              </div>
              <div className="bg-corp-dark rounded p-2 text-center">
                <div className="text-corp-magenta text-2xl font-bold">0.02ms</div>
                <div className="text-xs opacity-70">Response</div>
              </div>
              <div className="bg-corp-dark rounded p-2 text-center">
                <div className="text-corp-green text-2xl font-bold">∞</div>
                <div className="text-xs opacity-70">Potential</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </PresentationLayout>
  );
}
